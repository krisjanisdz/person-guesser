<template>
    <div class="page">
      <Header />
      <main class="main">
        <h1 class="welcome"> Profils</h1>
      </main>
      <Footer />
    </div>
  </template>  
  
  <script>
  import Header from '../Header.vue';
  import Footer from '../Footer.vue';
  
  export default {
    name: 'Profile',
    components: {
      Header,
      Footer
    },
  };
  </script>
  
  <style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
  background-color: #fff4f4;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.welcome {
    text-align: center;
    align-items: center;
    font-size: 70px;
    font-weight: 600;
}

</style>  