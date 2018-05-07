<template>
  <date-picker :date="date" :option="options"></date-picker>
</template>

<script>
import DatePicker from 'vue-datepicker/vue-datepicker-es6'

export default {
  name: 'DateTimePicker',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    date () {
      return {
        time: this.value
      }
    },
    options () {
      return {
        placeholder: this.placeholder,
        inputClass: 'form-control'
      }
    }
  },
  components: {
    DatePicker
  }
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>

</style>
