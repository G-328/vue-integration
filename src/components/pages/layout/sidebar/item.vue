<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  render(h, context) {
    console.log("render", /* h, */ context)
    let { icon, title } = context.props
    let vNodes = []
    if (icon) {
      vNodes.push(<svg-icon icon-class={icon} />)
    }
    if (title) {
      vNodes.push(<span slot="title">{title}</span>)
    }
    console.log("render", /* h, */ /* context, */ vNodes)
    return vNodes
  },
}
</script>

<style lang='less' scoped>

</style>