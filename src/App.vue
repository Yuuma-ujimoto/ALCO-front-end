<template>
  <global-header/>
  <div id="main">
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
  components: {
    globalModal,
    globalToastAlert,
    globalHeader
  }
}
</script>
<style>
body {
  margin: 0;
}
a{
  text-decoration: none;
}
p {
  margin: 0;
}

#main {
  margin-top: 70px;
}

:root {
  --background-main-color: #F4F5F7;
  --border-main-color: #bdc3c7;
  --text-main-color: #34495e;
  --text-sub-color: #34495e
}
</style>
