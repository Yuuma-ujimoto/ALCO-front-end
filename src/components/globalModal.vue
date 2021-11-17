<template>
  <div v-if="this.$store.getters.isModalOpen" class="modal-background" @click.self="closeModal">
    <div class="modal" v-show="this.$store.getters.getModalType === 'Post'">
      <div class="modal-column">
        <p class="alert-link" @click="redirectReport">報告（未実装）</p>
      </div>
      <div class="modal-column">
        <p @click="redirectStatusPage">投稿の個別ページに移動</p>
      </div>
      <div class="modal-column">
        <p class="closeButton" @click="closeModal">Close</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "globalModal",
  methods: {
    closeModal() {
      this.$store.dispatch("closeModal")
    },
    redirectStatusPage(){
      const modalId = this.$store.getters.getModalId
      this.closeModal()
      this.$router.push("/post/status/"+modalId)
    },
    redirectReport(){
      this.closeModal()
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
  .alert-link{
    color: red;
  }
  .modal-background {
    background:rgba(0,0,0,.65);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 20000;
    top: 0;
    left: 0;
  }
  .modal{
    background: #ffffff;
    padding: 15px 0;
    border-radius: 10px;
    width: 400px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
  }
  .modal-column{
    min-height: 50px;
    width: 100%;
    border-bottom: solid 1px var(--border-main-color);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .closeButton{

  }
</style>