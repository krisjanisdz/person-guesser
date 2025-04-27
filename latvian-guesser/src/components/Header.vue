<template>
    <header class="header">
      <div class="logo">
        <!-- Your logo SVG or image -->
      </div>
      <nav class="nav-links">
        <a href="#">Spēļu vēsture</a>
        <a href="#">Kategorijas</a>
        <a href="#">Profils</a>
        <button class="logout-button">Izrakstīties</button>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header',
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #961C2F;
    padding: 1rem 2rem;
    color: white;
    height: 80px;
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.6);
  }
  .nav-links {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
  .logout-button {
    background-color: #333;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
  }
  </style>
  