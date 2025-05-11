<template>
  <div class="modal-backdrop">
    <div class="modal">
      <button class="close-button" @click="$emit('cancel')">X</button>
      <h2><strong>{{ title }}</strong></h2>
      <p class="mt-2">{{ message }}</p>
      <div class="button-row">
        <button class="confirm-btn" @click="$emit('confirm')">Jā, dzēst kontu</button>
        <button class="cancel-btn" @click="$emit('cancel')">Atcelt</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    title: { type: String, default: 'Apstiprinājums' },
    message: { type: String, default: '' }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: #e5c9cf;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  position: relative;
}
.close-button {
  background-color: #d9bcbc;
  color: #333;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  border: none;
  cursor: pointer;
}
.button-row {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.confirm-btn {
  background-color: #a33a3a;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
.cancel-btn {
  background-color: #ccc;
  color: black;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
</style>