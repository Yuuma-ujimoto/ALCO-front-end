<template>
  <div class="favHeart" v-if="OnOff">
    <img src="../../assets/heart.svg" alt="">
  </div>
  <div class="favHeart" v-else>
    <img src="../../assets/heart-alt.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "favHeart",
  props:{
    OnOff:{
      type:Boolean,
      default:true
    }
  }
}
</script>

<style scoped>
.favHeart{
  width: 24px;
  height: 24px;
  margin: 8px;
}
</style>