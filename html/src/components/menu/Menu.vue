<template>
    <ul class="dsw-menu-folder">
      <slot v-for="(item,index) in menuLists" :item="item" :index="index">
        <li class="dsw-menu-file" :key="index">
          <a @click.stop.prevent="clickHandler($event,item)" :href="item.url" >{{ item.title }}</a>
          <dsw-menu v-if="item.children && item.children.length > 0" :menuLists="item.children"></dsw-menu>
        </li >
      </slot>
    </ul>
</template>

<script>
export default {
  name: 'DswMenu',
  props: {
    menuLists: {
      type: Array,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    clickHandler (e, index) {
      console.log(index)
    }
  }
}
</script>

<style lang="stylus">
  .dsw-menu-folder{
    .dsw-menu-file{
      a{
        color : red
      }
    }
  }
</style>

<style lang="stylus" scoped>

</style>
