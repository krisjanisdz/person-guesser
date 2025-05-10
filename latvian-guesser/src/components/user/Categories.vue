<template>
  <div class="page">
    <Header />
    <main class="main">
      <h1 class="welcome">Personu kategorijas</h1>
      <div class="icons">
        <button class="emoji-button" v-for="card in cards" :key="card.title" @click="navigate(card.title)">
          <span class="emoji">{{ card.title }}</span>
        </button>
      </div>
    </main>
    <Footer />
  </div>
</template>  
  
  <script>
  import Header from '../Header.vue';
  import Footer from '../Footer.vue';
  
  export default {
    name: 'Categories',
    components: {
      Header,
      Footer
    },
    data() {
      return {
        cards: [
        { title: '👤', description: 'Uzmini šīsdienas personību!' },
        { title: '🏒', description: 'Uzmini kādu no latviešu izcilajiem sportistiem!' },
        { title: '🎶', description: 'Uzmini muzikantu! ' }
        ]
      };
    },
    methods: {
    navigate(title) { // SEIT BUS JAIZMAINA PATHI, KAD TIKS IZVEIDOTAS PAREJAS LAPAS
      if (title === '👤') {
        this.$router.push('/game');
      } else if (title === '🏒') {
        this.$router.push('/game');
      }
      else if (title === '🎶') {
        this.$router.push('/game');
      }
    }
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
  
  .welcome {
    text-align: center;
    padding: 70px;
    font-size: 70px;
    font-weight: 600;
  }
  
  .icons {
    display: flex;
    justify-content: center;
    gap: 12rem;
    margin-top: 40px;
  }
  
  .emoji-button {
    background-color: transparent;
    border: none;
    font-size: 80px;
    cursor: pointer;
    transition: transform 0.3s ease, color 0.3s ease;
  }
  
  .emoji-button:hover {
    transform: scale(1.2);
    color: #a33a3a; 
  }
  
  .emoji {
    display: inline-block;
    font-size: 100px;
  }
  </style>
  