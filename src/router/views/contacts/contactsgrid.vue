<script>
import Layout from "../../layouts/main";
import { mapGetters } from "vuex";
export default {
  components: { Layout },
  data() {
    return {
      title: "Kullanıcılar",
      users: [],
    };
  },
  computed: {
    ...mapGetters("login", ["getToken"]), 
    isUserAdmin() {
      const userRole = this.$auth.getRole();
      return userRole === 'Admin';
    }
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const token = this.getToken;
      this.$appAxios
        .get("/api/User",{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response)=>{
          this.users = response.data
          console.log(this.users)
        })
    }
  },
};
</script> 

<template>
  <Layout>
    <div class="row">
        <div v-if="isUserAdmin" class="mb-2 text-end">
          <a href="/register" class="btn btn-primary me-1">Kullanıcı Ekle</a>
        </div>
      
      <div class="col-xl-3 col-sm-6" v-for="(user, index) in users" :key="index">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="font-size-15 mb-1">
              <a href="javascript: void(0);" class="text-dark">{{
                user.firstName
              }} {{ user.lastName }}</a>
            </h5>
            <p class="text-muted">Departman: {{ user.department?.departmentName }}</p>
            <p class="text-muted">Uzmanlık Alanı: {{ user.task?.taskName }}</p>
            <p class="text-muted">Email: {{ user.email }}</p>
          </div>
          <div class="card-footer bg-transparent border-top">
            <div class="contact-links d-flex font-size-20">
              <div class="flex-fill">
              </div>
              <div class="flex-fill">
              </div>
              <div class="flex-fill">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end col -->
    </div>
  </Layout>
</template>