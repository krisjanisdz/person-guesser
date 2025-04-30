<template>
  <footer class="footer">
    <div class="social-icons">
      <a href="https://instagram.com" target="_blank" rel="noopener" class="icon-box">
        <img class="icon instagram" src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener" class="icon-box">
        <img class="icon youtube" src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg" alt="YouTube" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener" class="icon-box">
        <img class="icon linkedin" src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" />
      </a>
      <a href="https://x.com" target="_blank" rel="noopener" class="icon-box">
        <img class="icon x" src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg" alt="X" />
      </a>
    </div>
  </footer>
</template>
  
  <script>
  export default {
    name: 'Footer',
  };
  </script>
  
<style scoped>
.footer {
  background-color: #4A3439;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
}

.social-icons {
  display: flex;
  gap: 0.5rem;
}

.icon-box {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  filter: invert(100%);
  transition: transform 0.3s ease, filter 0.3s ease;
  display: block;
}

.icon.instagram {
  width: 22px;
  height: 24px;
}

.icon.youtube {
  width: 28px;
  height: 32px;
}

.icon.linkedin {
  width: 22px;
  height: 24px;
}

.icon.x {
  width: 20px;
  height: 22px;
}

.icon-box:hover .icon {
  transform: scale(1.2);
}

</style>