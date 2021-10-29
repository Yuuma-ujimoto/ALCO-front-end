<template>
  <div v-if="this.$store.getters.isModalOpen" class="modal-background" @click.self="closeModal">
    <div class="modal">
      <p>{{ this.$store.getters.getModalMessage }}</p>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "globalModal",
  methods: {
    closeModal() {
      this.$store.dispatch("updateModal", null)

    }
  }
}
</script>

<style scoped>

</style>