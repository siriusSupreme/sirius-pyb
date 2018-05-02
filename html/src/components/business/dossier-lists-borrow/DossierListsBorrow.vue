<template>
  <dialog-container :title="extraParams['title']">
    <h1>hello world</h1>
  </dialog-container>
</template>

<script>
import DialogContainer from 'components/common/dialog-container'

export default {
  name: 'DossierListsBorrow',
  components: {
    DialogContainer
  },
  mounted () {
    console.log(this)
  }
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>

</style>
