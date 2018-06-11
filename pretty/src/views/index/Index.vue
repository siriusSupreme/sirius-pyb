<template >
  <article>
    <ul>
      <li>
        <router-link :class="{active: currentIndex === 0}" @click.native='currentIndex = 0' to='/cabinet'>cabinet</router-link>
      </li>
      <li>
        <router-link :class="{active: currentIndex === 1}" @click.native='currentIndex = 1' to='/dossier'>dossier</router-link>
      </li>
      <li>
        <router-link :class="{active: currentIndex === 2}" @click.native='currentIndex = 2' to='/login'>login</router-link>
      </li>
    </ul>
  </article>
</template >

<script >
export default {
  name: 'Index',
  data () {
    return {
      currentIndex: -1
    }
  }
}
</script >

<style lang="stylus" scoped >
.active {
  color: red;
}
</style >
