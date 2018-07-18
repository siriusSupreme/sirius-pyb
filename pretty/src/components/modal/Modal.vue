<template>
  <article class="gs-modal" :style="{ width }">
    <slot></slot>
  </article>
</template>

<script>
export default {
  name: 'Modal',
  componentName: 'GsModal',
  props: {
    width: {
      type: String,
      default: '300px'
    }
  }
}
</script>
