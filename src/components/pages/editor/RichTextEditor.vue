<template>
  <div id="editor" ref="editor">
    <p>欢迎使用wangEditor富文本编辑器</p>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'RichTextEditor',
  components: {},
  data() {
    return {
      editor: null,
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.editor = new E(this.$refs.editor)
      console.log(this.editor.config)
      // this.editor.customConfig.onchangeTimeout = 1000
      this.editor.customConfig.onchange = html => {
        console.log("object")
        this.editorContent = html;
        console.log(html)
        // this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
      };
      // this.editor.customConfig.pasteIgnoreImg = false
      this.editor.customConfig.linkImgCallback = url => {
        console.log(url)
      }
      this.editor.customConfig.onfocus = () => {
        console.log("onfocus")
      }
      this.editor.customConfig.onblur = () => {
        console.log("onblur")
      }
      this.editor.customConfig.lang = {
        '设置标题': 'title',
        '正文': 'p',
        '链接文字': 'link text',
        '链接': 'link',
        '上传图片': 'upload image',
        '上传': 'upload',
        '创建': 'init'
        // 还可自定添加更多
    }
    this.editor.customConfig.fontNames = [
      '宋体',
      '微软雅黑',
      'Arial',
      'Tahoma',
      '楷体',
      // 'Verdana'
    ]
    this.editor.customConfig.fontSize = [
      '宋体',
      '微软雅黑',
      'Arial',
      'Tahoma',
      '楷体',
      // 'Verdana'
    ]
    this.editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
    // this.editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
      // this.editor.customConfig.menus = [
      //   // 菜单配置
      //   "head", // 标题
      //   "bold", // 粗体
      //   "fontSize", // 字号
      //   "fontName", // 字体
      //   "italic", // 斜体
      //   "underline", // 下划线
      //   "strikeThrough", // 删除线
      //   "foreColor", // 文字颜色
      //   "backColor", // 背景颜色
      //   "link", // 插入链接
      //   "list", // 列表
      //   "justify", // 对齐方式
      //   "quote", // 引用
      //   "emoticon", // 表情
      //   "image", // 插入图片
      //   "table", // 表格
      //   "code", // 插入代码
      //   "undo", // 撤销
      //   "redo" // 重复
      // ];
      // console.log(this.editor.config)

      this.editor.create(); // 创建富文本实例
      console.log(this.editor.config)

    },
    
  },
}
</script>

<style lang='less' scoped>

</style>
