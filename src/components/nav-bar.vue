<script>
import { mapGetters } from "vuex";

export default {
  components: {  },
    mounted() {
    this.fetchNotifications();
  },
  computed: {
    ...mapGetters("login", ["getToken"]), 
  },
  data() {
    return {
      notifications: [],
    };
  },
  methods: {
    async handleNotificationClick(id){
      const token = this.getToken;
      this.$appAxios
        .put(`/api/Notification?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .catch(error => {
  console.error("İstek hatası:", error); 
});
    },
    async fetchNotifications() {
      const token = this.getToken;
      const id = this.$auth.getToken().UserId
      this.$appAxios
        .get("/api/Notification", {
          params:{ id } ,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response)=>{
          this.notifications = response.data
          console.log(this.notifications)
        })
    },
    logout(){
      localStorage.clear();
      this.$router.push({name:'login'})
      location.reload();
    },
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="" alt height="17" />
            </span>
          </router-link>

          <router-link to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="" alt height="19" />
            </span>
          </router-link>
        </div>

        <button id="vertical-menu-btn" type="button" class="btn btn-sm px-3 font-size-16 header-item" @click="toggleMenu">
          <i class="fa fa-fw fa-bars"></i>
        </button>
      </div>

      <div class="d-flex">
        <b-dropdown right menu-class="dropdown-menu-lg p-0 dropdown-menu-end" toggle-class="header-item noti-icon"
          variant="black">
          <template v-slot:button-content>
            <i class="bx bx-bell bx-tada"></i>
            <span class="badge bg-danger rounded-pill">{{
              notifications.length > 0 ? `${notifications.length}` : 'Bildirimler'
            }}</span>
          </template>

          <div class="p-3">
            <div class="row align-items-center">
              <div class="col">
                <h6 class="m-0">
                  {{ ("Bildirimler") }}
                </h6>
              </div>
            </div>
          </div>

          <div v-for="(notification, index) in notifications" :key="index" >
          <a class="text-reset notification-item"  href="/permissionRequests" @click="handleNotificationClick(notification.id)">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <h6 class="mt-0 mb-1">
                    {{ notification.notificationTitle }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ notification.notificationDetail }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
          

          
        </b-dropdown>
        <b-dropdown right variant="black" toggle-class="header-item" menu-class="dropdown-menu-end">
          <template v-slot:button-content>
            <span class="d-none d-xl-inline-block ms-1">
              <div > {{ this.$auth.getToken().FirstName }} {{ this.$auth.getToken().LastName }} </div>
            </span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <b-dropdown-item>
            <router-link to="/profile" v-slot="{ navigate }" custom>
              <span @click="navigate" @keypress.enter="navigate">
                <i class="bx bx-user font-size-16 align-middle me-1"></i>
                {{ ("Profil") }}
              </span>
            </router-link>
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <a href="#" class="dropdown-item text-danger" @click="logout">
            <i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>
            {{ ("Çıkış") }}
          </a>
        </b-dropdown>
      </div>
    </div>
  </header>
</template>
