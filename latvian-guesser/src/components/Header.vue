<template>
    <header class="header">
      <div class="logo">
        <!-- Your logo SVG or image -->
      </div>
      <div class="title" @click="handleTitleClick">
        UZMINI LATVIETI
      </div>
      <nav class="nav-links">
        <a v-for="link in navLinks" :key="link.href" :href="link.href">
          {{ link.text }}
        </a>
        <button class="logout-button" @click="handleButtonClick">
          {{ buttonText }}
        </button>
      </nav>
    </header>
  </template>
  

  <script>
  export default {
    name: 'Header',
    data() {
      return {
        pageTitle: '',
        navLinks: [],
        showLogoutButton: false,
        buttonText: '',
      };
    },
    watch: {
      '$route.path': {
        immediate: true,
        handler(newPath) {
          this.updateHeaderContent(newPath);
        },
      },
    },
    methods: {
      updateHeaderContent(path) {
        if (path === '/' || path === '/login' || path === '/register') {
          this.pageTitle = 'UZMINI LATVIETI';
          this.navLinks = [];
          this.buttonText = 'Pieslēgties';
          this.showLogoutButton = false;
        } else if (path.startsWith('/admin') || path.startsWith('/add') ) {
          this.pageTitle = 'Administrēšana';
          this.navLinks = [
            { text: 'Profils', href: '/admin/profile' },
          ];
          this.buttonText = 'Izrakstīties';
          this.showLogoutButton = true;
        } else {
          this.pageTitle = 'UZMINI LATVIETI';
          this.navLinks = [
            { text: 'Spēļu vēsture', href: '/history' },
            { text: 'Kategorijas', href: '/categories' },
            { text: 'Profils', href: '/profile' },
          ];
          this.buttonText = 'Izrakstīties';
          this.showLogoutButton = true;
        }
      },
      handleButtonClick() {
        if (this.buttonText === 'Pieslēgties') {
          this.$router.push('/login');
        } else {
          localStorage.removeItem('token');
          this.$router.push('/');
        }
      },
      handleTitleClick() {
      const isLoggedIn = !!localStorage.getItem('token');
      if (isLoggedIn) {
        this.$router.push('/user');
      } else {
        this.$router.push('/');
      }
    },
    },
  };
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #961C2F;
  padding: 1rem 2rem;
  color: white;
  height: 80px;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.2);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.3s ease;
}

.nav-links a:hover {
  color:#333
}

.logout-button {
  background-color: #333;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.logout-button:hover {
  background-color: #a9959b;
  box-shadow: 0 0 10px rgba(126, 30, 60, 0.8), 0 0 20px rgba(126, 30, 60, 0.4);
  color: #333;
}

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 23px;
  font-weight: 300;
  color: white;
  user-select: none;
}
</style>
