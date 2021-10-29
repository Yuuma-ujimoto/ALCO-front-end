<template>
  <header>
    <div class="header-left-area">

    </div>
    <div class="header-right-area">

    </div>
  </header>
</template>

<script>
export default {
  name: "globalHeader"
}
</script>

<style scoped>
  header{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    background: #333;
  }
  .header-left-area{
    width: 25px;
  }
  .header-right-area{
    width: 75%;
  }
</style>