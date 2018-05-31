<template >
  <div class="slider">
    <div class="slider-group" ref="index-dossier-lists-wrapper">
      <ul class="slider-lists" ref="index-dossier-lists">
        <li class="slider-item" v-for="(dossier, index) in dossierLists" :key="index">
          <div class="dossier-wrapper" v-for="(item, i) in dossier" :key="i">
            <p class="dossier-name">赵明宇电动车被盗案{{index * 10 + i +1}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="slider-indicate">
      <ul class="indicate-dots">
        <li class="indicate-dot" :class="{active: currentPageIndex === index}"  v-for="(dossier, index) in dossierLists" :key="index" @click.stop="indicateDotHandler(index)">{{index + 1}}</li>
      </ul>
    </div>
  </div>
</template >

<script >
export default {
  name: 'Dossier'
}
</script >

<style lang="stylus" scoped >

</style >
