<template>
  <aside class="gs-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
export default {
  name: 'Aside',

  componentName: 'GsAside',

  props: {
    width: {
      type: String,
      default: '300px'
    }
  }
}
</script>
