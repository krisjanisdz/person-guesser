<template>
    <div class="page">
      <Header />
      <main class="main">
        <div> Lapa priekš reģistrācijas</div>
      </main>
      <Footer />
    </div>
  </template>  
  
  <script>
  import Header from '../Header.vue';
  import Footer from '../Footer.vue';
  
  export default {
    name: 'GuestPage',
    components: {
      Header,
      Footer
    },
    data() {
      
    }
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
}


</style>  