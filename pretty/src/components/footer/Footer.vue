<template>
  <footer class="gs-footer" :style="{ height }">
    <slot></slot>
  </footer>
</template>

<script>
export default {
  name: 'Footer',

  componentName: 'GsFooter',

  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
}
</script>
