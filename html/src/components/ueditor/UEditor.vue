<template>
  <div class="dsw-ueditor">
    <script :id="randomId" :name="name" type="text/plain"></script>
  </div>
</template>

<script>
  export default {
    name: 'UEditor',
    props: {
      name: {
        type: String,
        required: true
      },
      ueditorPath: {
        type: String,
        default: '/static/vendors/ueditor/'
      },
      ueditorConfig: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        randomId: 'ueditor_' + (Math.random() * 100000000000000000),
        instance: null,
        ueditorScriptTagCount: 0
      }
    },
    created () {
      if (window.UE !== undefined) {
        this.ueditorScriptTagCount = 2;
        this.initEditor();
      } else {
        this.insertUeditorScriptTag();
      }
    },
    beforeDestroy () {
      if (this.instance !== null && this.instance.destroy) {
        this.instance.destroy();
      }
    },
    methods: {
      insertUeditorScriptTag () {
        const head = document.getElementsByTagName('head')[0];
        let ueditorScriptTag = document.getElementById('ueditor-script-ag');
        let ueditorConfigScriptTag = document.getElementById('ueditor-config-script-tag');

        if (ueditorConfigScriptTag === null) {
          ueditorConfigScriptTag = document.createElement('script');
          ueditorConfigScriptTag.id = 'ueditor-config-script-tag';
          ueditorConfigScriptTag.type = 'text/javascript';

          ueditorConfigScriptTag.addEventListener('load', () => {
            this.ueditorScriptTagCount++;
            this.initEditor();
          });
          ueditorConfigScriptTag.src = this.ueditorPath + 'ueditor.config.js';

          head.appendChild(ueditorConfigScriptTag);
        }

        if (ueditorScriptTag === null) {
          ueditorScriptTag = document.createElement('script');
          ueditorScriptTag.id = 'ueditor-script-tag';
          ueditorScriptTag.type = 'text/javascript';

          ueditorScriptTag.addEventListener('load', () => {
            this.ueditorScriptTagCount++;
            this.initEditor();
          });
          ueditorScriptTag.src = this.ueditorPath + 'ueditor.all.min.js';

          head.appendChild(ueditorScriptTag);
        }

        this.initEditor();
      },
      initEditor () {
        if (this.ueditorScriptTagCount === 2 && this.instance === null) {
          this.$nextTick(() => {
            this.instance = window.UE.getEditor(this.randomId, this.ueditorConfig);
            this.instance.addListener('ready', () => {
              this.$emit('ueditorReady', this.instance);
            });
          });
        }
      }
    }
  };
</script>

<style lang="stylus">
  .dsw-ueditor{
    
  }
</style>

<style lang="stylus" scoped>
 
</style>
