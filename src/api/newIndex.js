import axios from "axios";
/**
 * @desc 请求环境地址配置
 * development 开发环境
 * production 生产环境
 */
switch (process.env.NODE_ENV) {
    case "development":
        axios.defaults.baseURL = "/dev";
        break;
    case "production":
        axios.defaults.baseURL = DeployIp;
        break;
    default:
        break;
}
const baseURL = 'http://localhost:3001';
//
export const uploadFile = (url, formData, onUploadProgress = () => {}) => {
    return axios({
        method: "post",
        url,
        baseURL,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: formData,
        onUploadProgress,
    });
};
//
export const mergeChunks = (url, data) => {
    return axios({
        method: "post",
        url,
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
        data,
    });
};
//
/* 
  文件资源分块
  1.根据 DefualtChunkSize = 5 * 1024 * 1024 ，即 5 MB ，来对文件进行资源分块进行计算，通过 spark-md5 根据文件内容计算出文件的 hash 值，方便做其他优化，比如：当 hash 值不变时，服务端没有必要重复读写文件等.
 */
// 获取文件分块
const getFileChunk = (file, chunkSize = DefualtChunkSize) => {
  return new Promise((resovle) => {
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
      chunks = Math.ceil(file.size / chunkSize),
      currentChunk = 0,
      spark = new SparkMD5.ArrayBuffer(),
      fileReader = new FileReader();

    fileReader.onload = function (e) {
      console.log('read chunk nr', currentChunk + 1, 'of');

      const chunk = e.target.result;
      spark.append(chunk);
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        let fileHash = spark.end();
        console.info('finished computed hash', fileHash);
        resovle({ fileHash });
      }
    };

    fileReader.onerror = function () {
      console.warn('oops, something went wrong.');
    };

    function loadNext() {
      let start = currentChunk * chunkSize,
        end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
      let chunk = blobSlice.call(file, start, end);
      fileChunkList.value.push({ chunk, size: chunk.size, name: currFile.value.name });
      fileReader.readAsArrayBuffer(chunk);
    }

    loadNext();
  });
}
/* 
  发送上传请求和合并请求
  1.通过 Promise.all 方法整合所有分块的上传请求，在所有分块资源上传完毕后，在 then 中发送合并请求.
 */
// 上传请求
const uploadChunks = (fileHash) => {
  const requests = fileChunkList.value.map((item, index) => {
    const formData = new FormData();
    formData.append(`${currFile.value.name}-${fileHash}-${index}`, item.chunk);
    formData.append("filename", currFile.value.name);
    formData.append("hash", `${fileHash}-${index}`);
    formData.append("fileHash", fileHash);
    return uploadFile('/upload', formData, onUploadProgress(item));
  });

  Promise.all(requests).then(() => {
    mergeChunks('/mergeChunks', { size: DefualtChunkSize, filename: currFile.value.name });
  });
}
/* 
  进度条数据
  1.分块进度数据利用 axios 中的 onUploadProgress 配置项获取数据，通过使用 computed 根据分块进度数据的变化自动自动计算当前文件的总进度.
 */
// 总进度条
const totalPercentage = computed(() => {
  if (!fileChunkList.value.length) return 0;
  const loaded = fileChunkList.value
    .map(item => item.size * item.percentage)
    .reduce((curr, next) => curr + next);
  return parseInt((loaded / currFile.value.size).toFixed(2));
})

// 分块进度条
const onUploadProgress = (item) => (e) => {
  item.percentage = parseInt(String((e.loaded / e.total) * 100));
}