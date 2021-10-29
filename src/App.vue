<template>
  <global-header/>
  <div id="app">
    <router-view/>
    <global-modal/>
    <global-toast-alert/>
  </div>
</template>
<script>
  import globalModal from "./components/globalModal";
  import globalToastAlert from "./components/globalToastAlert";
  import globalHeader from "./components/globalHeader";
  export default {
    components:{
      globalModal,
      globalToastAlert,
      globalHeader
    }
  }
</script>
<style>
  body{
    margin:0;
  }
</style>
