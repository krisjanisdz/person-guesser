<template>
  <div class="page">
    <Header />
    <main class="main">
      <h1 class="welcome">te būs spēle</h1>
    </main>
    <Footer />
  </div>
</template>  

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';

export default {
  name: 'MainPage',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      cards: [
        { title: 'Spēles režīms', description: 'Izvēlies spēles režīmu un uzsāc jautru minēšanas izaicinājumu!' },
        { title: 'Spēļu vēsture', description: 'Detalizēta informācija par iepriekš spēlētajām spēlēm – rezultāti, punkti un datumi' },
        { title: 'Profils', description: 'Veido savu spēlētāja identitāti – profils, avatārs un personīgie dati vienuviet' }
      ]
    };
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