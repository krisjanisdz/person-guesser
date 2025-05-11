<template>
  <div class="page">
    <Header />
    <main class="main">
      <h1 class="welcome">Tavs profils</h1>
      <div class="fields">
        <form class="form">
          <div class="left">
            <label class="field-label">
              Lietotājvārds
              <input type="text" :value="user.username" disabled />
            </label>
            <label class="field-label">
              Epasts
              <input type="text" :value="user.email" disabled />
            </label>
          </div>

          <div class="middle">
            <label class="field-label">
              Jaunā parole
              <input type="password" v-model="newPassword" placeholder="Ievadi jaunu paroli" />
            </label>
            <label class="field-label">
              Apstiprini paroli
              <input type="password" v-model="confirmPassword" placeholder="Apstiprini jauno paroli" />
            </label>
            <button class="add-button" @click.prevent="changePassword">Mainīt paroli</button>
          </div>

          <div class="right">
            <label class="field-label">
              Konta dzēšana
              <div class="delete-box">
                <p>Dzēšot kontu, visi dati tiks neatgriezeniski dzēsti.</p>
              </div>
            </label>
            <div class="button-wrapper">
              <button class="add-button delete" @click.prevent="deleteAccount">Dzēst kontu</button>
            </div>
          </div>
        </form>
      </div>
      <NotificationModal
        v-if="showNotification"
        :message="notification.message"
        :type="notification.type"
        :autoClose="true"
        @close="showNotification = false"
      />
      <ConfirmModal
        v-if="showConfirmModal"
        title="Apstiprināt konta dzēšanu"
        message="Vai tiešām vēlies dzēst savu kontu? Šī darbība ir neatgriezeniska."
        @confirm="confirmDelete"
        @cancel="showConfirmModal = false"
      />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '../Header.vue';
import Footer from '../Footer.vue';
import NotificationModal from '../NotificationModal.vue';
import ConfirmModal from '../ConfirmModal.vue';

export default {
  name: 'ProfilePage',
  components: { Header, Footer, NotificationModal, ConfirmModal },
  data() {
    return {
      user: {
        username: '',
        email: '',
      },
      newPassword: '',
      confirmPassword: '',
      showNotification: false,
      showConfirmModal: false,
      notification: {
        message: '',
        type: 'success'
      }
    };
  },
  mounted() {
    this.user.username = localStorage.getItem('username');
    this.user.email = localStorage.getItem('email');
  },
  methods: {
    changePassword() {
      if (!this.newPassword || !this.confirmPassword) {
        this.triggerNotification('Lūdzu aizpildiet visus lauciņus!', 'error');
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        this.triggerNotification('Paroles nesakrīt!', 'error');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        this.triggerNotification('Autentifikācijas kļūda. Lūdzu ielogojieties vēlreiz.', 'error');
        return;
      }

      fetch('http://localhost:3001/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.triggerNotification(data.message, 'success');
            this.newPassword = '';
            this.confirmPassword = '';
          } else {
            this.triggerNotification(data.message || 'Neizdevās nomainīt paroli.', 'error');
          }
        })
        .catch(err => {
          console.error('Password change error:', err);
          this.triggerNotification('Servera kļūda. Mēģiniet vēlreiz vēlāk.', 'error');
        });
    },
    deleteAccount() {
      this.showConfirmModal = true;
    },
    async confirmDelete() {
      this.showConfirmModal = false;
      const token = localStorage.getItem('token');

      if (!token) {
        this.triggerNotification('Autentifikācijas kļūda!', 'error');
        return;
      }

      try {
        const res = await fetch('http://localhost:3001/api/delete-account', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token })
        });

        const data = await res.json();

        if (!res.ok) {
          this.triggerNotification(data.message || 'Kļūda dzēšot kontu!', 'error');
          return;
        }

        // Clear local storage and notify user
        localStorage.clear();
        this.triggerNotification('Konts ir dzēsts.', 'success');

        setTimeout(() => {
          this.$router.push('/');
        }, 1500);
      } catch (error) {
        console.error('Dzēšanas kļūda:', error);
        this.triggerNotification('Neizdevās dzēst kontu. Mēģiniet vēlreiz.', 'error');
      }
    },
    triggerNotification(message, type = 'success') {
      this.notification = { message, type };
      this.showNotification = true;
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
  padding: 30px;
  font-size: 60px;
  font-weight: 600;
}

.fields {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form {
  display: flex;
  gap: 40px;
  justify-content: center;
  margin-bottom: 30px;
}

.left, .middle, .right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field-label {
  font-weight: 500;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
}

input {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  width: 250px;
  background-color: white;
  font-size: 16px;
}

.delete-box {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  width: 250px;
  background-color: #fff;
  text-align: center;
  font-size: 14px;
  color: #444;
}

.button-wrapper {
  text-align: center;
  margin-top: 20px;
}

.add-button {
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
}

.add-button:hover {
  background-color: #333;
}

.add-button.delete {
  background-color: #a33a3a;
}

.add-button.delete:hover {
  background-color: #7a1d1d;
}
</style>