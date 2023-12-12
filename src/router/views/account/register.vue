<script>
import Layout from "../../layouts/main";
import { mapGetters } from "vuex";
export default {
  page: {
    title: "Kullanıcı Kayıt"
  },
  components: { Layout },
  data() {
    return {
      users: [],
      roleName: null,
      userData : {
        userName: null,
        email: null,
        firstName: null,
        lastName: null,
        startDateOfWork: null,
        password: null,
        ManagerId: null,
        address: {
          country: "Türkiye",
          province: null,
          district: null,
          openAddress: null,
          postCode: null
      },
      department: {
        departmentName: null
      },
      task: {
        taskName: null
      }
      },
    };
  }, 
  mounted() {
    this.fetchUsers();
  },
    computed: {
    ...mapGetters("login", ["getToken"]), 
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
    },
    async onSave() {
      const token = this.getToken;
      await this.$appAxios.post(`/api/User/Register?roleName=${this.roleName}`, this.userData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(() => {
        alert("Kayıt başarıyla tamamlandı!");
        this.$router.push({name : "Users"});
      })
      .catch(error => {
      console.error("Kayıt işlemi sırasında bir hata oluştu:", error);
    });
    }
  }
};
</script>

<template>
  <Layout>
    <div class="row">
      <div class="col-12">
      <div class="card">
          <div class="card-body">
            <div>
            <h4 class="card-title">Yetki Bilgisi</h4>
            <br/>
            </div>
            <div class="row">
              <div class="col-12">
                <form class="form-horizontal" role="form">
                  <div class="mb-3 row">
                    <label class="col-md-2 col-form-label">Yetki Alanı</label>
                    <div class="col-md-10">
                      <select class="form-control" v-model="roleName">
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                      </select>
                    </div>
                    
                  </div>
                  <div class="mb-3 row">
                    <label class="col-md-2 col-form-label">Departman</label>
                    <div class="col-md-10">
                      <select class="form-control" v-model="userData.department.departmentName">
                        <option value="Yönetim">Yönetim</option>
                        <option value="Bulut Yazılımlar">Bulut Yazılımlar</option>
                        <option value="Mobil Yazılımlar">Mobil Yazılımlar</option>
                        <option value="Masa Üstü Yazılımlar">Masa Üstü Yazılımlar</option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label class="col-md-2 col-form-label">Görev</label>
                    <div class="col-md-10">
                      <select class="form-control" v-model="userData.task.taskName">
                        <option value="Yazılım Uzmanı">Yazılım Uzmanı</option>
                        <option value="İş Analisti">İş Analisti</option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label class="col-md-2 col-form-label">Yönetici</label>
                    <div class="col-md-10">
                      <select class="form-control" v-model="userData.ManagerId">
                        <option v-for="user in users" :key="user.id" :value="user.id"> {{ user.firstName }} {{ user.lastName }}</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <!-- end row -->
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div>
            <h4 class="card-title">Personel Bilgileri</h4>
            <br/>
            </div>
            <div class="row">
              <div class="col-12">
                <form class="form-horizontal" role="form">
                  <b-form-group
                    class="mb-3"
                    id="registerUserName"
                    label-cols-lg="2"
                    label="Kullancı Adı"
                    label-for="userName"
                  >
                    <b-form-input
                      for="userName"
                      v-model="userData.userName"
                      placeholder="Kullanıcı Adı"
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="registerMail"
                    label-cols-sm="2"
                    label-cols-lg="2"
                    label="EMail"
                    label-for="mail"
                  >
                    <b-form-input
                      for="mail"
                      v-model="userData.email"
                      placeholder="E Mail"
                      type="email"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="registerFirstName"
                    label-cols-lg="2"
                    label="Ad"
                    label-for="firstName"
                  >
                    <b-form-input
                      for="firstName"
                      v-model="userData.firstName"
                      placeholder="Ad"
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="registerLastName"
                    label-cols-lg="2"
                    label="Soyad"
                    label-for="lastName"
                  >
                    <b-form-input
                      for="lastName"
                      v-model="userData.lastName"
                      placeholder="Soyad"
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                    <b-form-group
                    class="mb-3"
                    id="date"
                    label-cols-sm="2"
                    label-cols-lg="2"
                    label="Giriş Tarihi"
                    label-for="date"
                  >
                    <b-form-input
                      id="date"
                      v-model="userData.startDateOfWork"
                      type="date"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="registerPassword"
                    label-cols-sm="2"
                    label-cols-lg="2"
                    label="Şifre"
                    label-for="pwd"
                  >
                    <b-form-input
                      id="pwd"
                      v-model="userData.password"
                      placeholder="Şifre"
                      type="password"
                    ></b-form-input>
                  </b-form-group>
                  <div class="mb-3 row">
        </div>
        
                </form>
              </div>
            </div>
            <!-- end row -->
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div>
            <h4 class="card-title">Adres Bilgileri</h4>
            <br/>
            </div>
            <div class="row">
              <div class="col-12">
                <form class="form-horizontal" role="form">
                  <b-form-group
                    class="mb-3"
                    id="registerCountry"
                    label-cols-lg="2"
                    label="Ülke"
                    label-for="country"
                  >
                    <b-form-input
                      for="country"
                      v-model="userData.address.country"
                      placeholder="Türkiye"
                      type="text"
                      disabled
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="registerProvince"
                    label-cols-sm="2"
                    label-cols-lg="2"
                    label="İl"
                    label-for="province"
                  >
                    <b-form-input
                      for="province"
                      v-model="userData.address.province"
                      placeholder="İl"
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="registerDistrict"
                    label-cols-lg="2"
                    label="İlçe"
                    label-for="district"
                  >
                    <b-form-input
                      for="district"
                      v-model="userData.address.district"
                      placeholder="İlçe"
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="registerOpenAddress"
                    label-cols-lg="2"
                    label="Açık Adres"
                    label-for="openAddress"
                  >
                    <b-form-input
                      for="openAddress"
                      v-model="userData.address.openAddress"
                      placeholder="Açık Adres"
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                    <b-form-group
                    class="mb-3"
                    id="registePostCode"
                    label-cols-sm="2"
                    label-cols-lg="2"
                    label="Posta Kodu"
                    label-for="postCode"
                  >
                    <b-form-input
                      for="postCode"
                      v-model="userData.address.postCode"
                      type="text"
                      placeholder="Posta Kodu "
                    ></b-form-input>
                  </b-form-group>

                  <div class="mb-3 row">
          <div class="col-md-2"></div>
          <div class="col-md-10">
            <button class="btn btn-primary" @click="onSave">Kaydet</button>
          </div>
        </div>
        
                </form>
              </div>
            </div>
            <!-- end row -->
          </div>
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>