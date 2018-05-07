<template >
  <dialog-container :title="extraParams['title']">
    <dsw-panel :is-show-heading="false" :is-show-footer="true">
      <div class="dsw-edit-container" ref="dsw-edit-container">
        <ul class="dsw-edit-lists">
          <li class="dsw-edit-item" v-for="index in 23" :key="index">
            <figure>
              <i class="fa fa-close"></i>
              <img src="./images/default.png" />
            </figure>
            <span>接受刑事案件登记表</span>
          </li>
        </ul>
      </div>

      <div class="dsw-btn-wrapper" slot="panel-footer">
        <button class="dsw-btn" id="dsw-select-btn">选择文件</button>
        <button class="dsw-btn">确认上传</button>
      </div>
    </dsw-panel>
  </dialog-container>
</template >

<script >
export default {
  name: 'Hidden'
}
</script >

<style scoped >

</style >
