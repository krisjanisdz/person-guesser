<template>
  <div class="modal-backdrop" v-if="visible">
    <div class="modal" :class="typeClass">
      <button class="close-button" @click="close">X</button>
      <div class="modal-content">
        <span v-if="type === 'success'" class="icon success">✔</span>
        <span v-if="type === 'error'" class="icon error">✖</span>
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationModal',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'success' 
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      visible: true
    };
  },
  computed: {
    typeClass() {
      return this.type === 'success' ? 'success-modal' : 'error-modal';
    }
  },
  mounted() {
    if (this.autoClose) {
      setTimeout(this.close, this.duration);
    }
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #e5c9cf;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  font-size: 1.2rem;
  color: #333;
}

.icon {
  font-size: 1.5rem;
}
.icon.success {
  color: #28a745;
}
.icon.error {
  color: #dc3545;
}

.success-modal {
  background-color: #d9f3e5;
}

.error-modal {
  background-color: #f8d7da;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 18px;
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 20px;
  cursor: pointer;
  width: 10px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>