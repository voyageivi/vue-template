export default {
  def: (file) => {
    return () => import(/* webpackChunkName : 'def' */ `@/pages/${file}`)
  }
}
