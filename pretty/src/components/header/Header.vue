<template>
  <header class="gs-header" :style="{ height }">
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'Header',

  componentName: 'GsHeader',

  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
}
</script>
