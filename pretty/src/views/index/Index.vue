<template>
  <article>
    <ul>
      <li id='demo' data-a='1' data-b='true' data-c='{x:1}' data-d="{y:2}">
        <router-link :class="{active: currentIndex === 0}" @click.native='currentIndex = 0' to='/cabinet'>cabinet</router-link>
      </li>
      <li>
        <router-link :class="{active: currentIndex === 1}" @click.native='currentIndex = 1' to='/dossier'>dossier</router-link>
      </li>
      <li>
        <router-link :class="{active: currentIndex === 2}" @click.native='currentIndex = 2' to='/login'>login</router-link>
      </li>
    </ul>

    <button type="button" @click.stop='showHandler'>show——{{showText}}</button>
    <p>
      show
      <show-component v-show="isShow" v-demo></show-component>
    </p>
    <button type="button" @click.stop='ifHandler'>if——{{ifText}}</button>
    <p>
      if
      <if-component v-if='isIf' v-demo></if-component>
    </p>
    <router-link to='link/1'>link-1</router-link>
    <router-link to='link/2'>link-2</router-link>
    <p>
      if
      <router-view></router-view>
    </p>

    <p>
      <input type="text" v-model="vData" />
      <input type="text" v-model="cData" />

      <span>vData === {{vData}}</span>
      <span>cData === {{cData}}</span>

      <span v-demo:a:b.x.y.z:c.l.m.n='{vData, cData, isShow, isIf, demoHandler}'>
        v-demo
      </span>
    </p>
  </article>
</template>

<script>
import ShowComponent from './ShowComponent.vue'
import IfComponent from './IfComponent.vue'

export default {
  name: 'Index',
  data () {
    return {
      currentIndex: -1,
      isShow: true,
      showText: true,
      isIf: true,
      ifText: true,
      vData: '',
      cData: ''
    }
  },
  components: {
    ShowComponent,
    IfComponent
  },
  directives: {
    demo: {
      bind (el, binding, vnode, oldVnode) {
        console.log('bind')
        console.log(el)
        console.log(binding)
        console.log(vnode)
        console.log(oldVnode)
      },
      inserted (el, binding, vnode, oldVnode) {
        console.log('inserted')
        console.log(el)
        console.log(binding)
        console.log(vnode)
        console.log(oldVnode)
      },
      update (el, binding, vnode, oldVnode) {
        console.log('update')
        console.log(el)
        console.log(binding)
        console.log(vnode)
        console.log(oldVnode)
      },
      componentUpdated (el, binding, vnode, oldVnode) {
        console.log('componentUpdated')
        console.log(el)
        console.log(binding)
        console.log(vnode)
        console.log(oldVnode)
      },
      unbind (el, binding, vnode, oldVnode) {
        console.log('unbind')
        console.log(el)
        console.log(binding)
        console.log(vnode)
        console.log(oldVnode)
      }
    }
  },
  methods: {
    showHandler (e) {
      this.isShow = !this.isShow
      this.showText = this.isShow
    },
    ifHandler (e) {
      this.isIf = !this.isIf
      this.ifText = this.isIf
    },
    demoHandler (e) {
      console.log(e)
      console.log('hello world')
    }
  },
  beforeCreate () {
    console.log('index-beforeCreate')
  },
  created () {
    console.log('index-created')
  },
  beforeMount () {
    console.log('index-beforeMount')
  },
  mounted () {
    console.log('index-mounted')
  },
  activated () {
    console.log('index-activated')
  },
  deactivated () {
    console.log('index-deactivated')
  },
  beforeUpdate () {
    console.log('index-beforeUpdate')
  },
  updated () {
    console.log('index-updated')
  },
  beforeDestroy () {
    console.log('index-beforeDestroy')
  },
  destroyed () {
    console.log('index-destroyed')
  },
  beforeRouteEnter (to, from, next) {
    console.log('index-beforeRouteEnter')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('index-beforeRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('index-beforeRouteLeave')
    next()
  }
}
</script>

<style lang="stylus" scoped>
.active {
  color: red;
}
</style>
