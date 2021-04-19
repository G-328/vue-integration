// 此文件配置eslint

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint"
  },
  // 自定义规则
  rules: {
    // "vue/max-attributes-per-line": [2, {
    //   "singleline": 10,
    //   "multiline": {
    //     "max": 1,
    //     "allowFirstLine": false
    //   }
    // }],
  }
}