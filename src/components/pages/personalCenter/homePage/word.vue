<template>
    <div>
      <input id="document" type="file">
      <div v-html="vHtml" />
    </div>
</template>
<script>
import mammoth from 'mammoth'
export default {
  data() {
    return {
        vHtml: '',
        // a:  ""
    }
  },
  mounted() {
    document.getElementById('document').addEventListener('change', this.uploading, false)
    this.uploading()
  },
  methods: {
    uploading(event) {
      const that = this
      // var file = require("‪C:\\Users\\gjy\\Desktop\\永中.doc") // 获取文件
      var file = event.target.files[0] // 获取文件
      console.log("uploading--1", file)
      var reader = new FileReader()
      console.log("uploading--2", reader)
      reader.readAsArrayBuffer(file)
      reader.onload = function(e) {
        const buffer = e.target.result // 此时是arraybuffer类型
        mammoth.convertToHtml({ arrayBuffer: buffer }).then((result) => {
          console.log("uploading--2", result)
          that.vHtml = result.value
        }).done()
      }
    },
  }
}
</script>