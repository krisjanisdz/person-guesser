<template>
  <div id="background">
    <div class="header-bg"></div>
    <div class="main-bg"></div>
    <div class="footer-bg"></div>
  </div>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  computed: {
    // Computed property to check if token exists in localStorage
    isLoggedIn() {
      return !!localStorage.getItem('token'); 
    }
  },
};
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  overflow-x: hidden;
}

#background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; 
  display: flex;
  flex-direction: column;
}

.header-bg {
  background-color: #961C2F;
  height: 10vh; 
}

.main-bg {
  background-color: #fff4f4;
  flex: 1;
}

.footer-bg {
  background-color: #4A3439;
  height: 10vh;
}
</style>