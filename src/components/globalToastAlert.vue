<template>
  <div class="toast-wrapper">
    <div class="toast">
      <p>A</p>
    </div>
    <div class="toast">
      <p>B</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "globalToastAlert"
}
</script>

<style scoped>
  .toast-wrapper{
    width: 250px;
    height: auto;
    position: fixed;
    bottom: 15px;
    right: 15px;
    display: flex;
    flex-direction: column-reverse;
  }
  .toast{
    width: 100%;
    height: 100px;
    background: green;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 15px;
    border-radius: 1px;
  }
</style>