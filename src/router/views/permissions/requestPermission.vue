<script>
import Layout from "../../layouts/main";
import { mapGetters } from "vuex";
export default {
  page: {
    title: "İzin Talep"
  },
  components: { Layout },
  data() {
    return {
        dayOffData: {
            permissionType: null,
            permissionDetail: null,
            dayOffNumber: null,
            permissionStart: null,
            permissionEnd: null,
            approval: false,
            status: false,
            userId: this.$auth.getToken().UserId
        }
    };
  }, 
    computed: {
    ...mapGetters("login", ["getToken"]), 
  },
  methods: {
    async onSave() {
      const token = this.getToken;
      await this.$appAxios.post("/api/DayOffRequest/AddDayOffRequest", this.dayOffData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(() => {
        alert("Talep başarıyla tamamlandı!");
        this.$router.push({name : "Permission"});
      })
      .catch(error => {
      console.error("Talep işlemi sırasında bir hata oluştu:", error);
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
            <h4 class="card-title">İzin Talebi</h4>
            <br/>
            </div>
            <div class="row">
              <div class="col-12">
                <form class="form-horizontal" role="form">
                    <div class="mb-3 row">
                    <label class="col-md-2 col-form-label">İzin Tipi</label>
                    <div class="col-md-10">
                      <select class="form-control" v-model="dayOffData.permissionType">
                        <option value="Sağlık">Sağlık</option>
                        <option value="Yıllık">Yıllık</option>
                        <option value="Vefat">Vefat</option>
                        <option value="Evlilik">Evlilik</option>
                      </select>
                    </div>
                  </div>
                  <b-form-group
                    class="mb-3"
                    id="permissionDetail"
                    label-cols-lg="2"
                    label="İzin Detayı"
                    label-for="PermissionDetail"
                  >
                    <b-form-input
                      for="PermissionDetail"
                      v-model="dayOffData.permissionDetail"
                      placeholder="İzin Detayı"
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="dayOffNumber"
                    label-cols-sm="2"
                    label-cols-lg="2"
                    label="Taleb Edilen İzin"
                    label-for="DayOffNumber"
                  >
                    <b-form-input
                      for="DayOffNumber"
                      v-model="dayOffData.dayOffNumber"
                      type="number"
                    ></b-form-input>
                  </b-form-group>

                  

                  

                    <b-form-group
                    class="mb-3"
                    id="permissionStart"
                    label-cols-sm="2"
                    label-cols-lg="2"
                    label="Başlangıç Tarihi"
                    label-for="PermissionStart"
                  >
                    <b-form-input
                      id="PermissionStart"
                      v-model="dayOffData.permissionStart"
                      type="date"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="permissionEnd"
                    label-cols-sm="2"
                    label-cols-lg="2"
                    label="Bitiş Tarihi"
                    label-for="PermissionEnd"
                  >
                    <b-form-input
                      id="PermissionEnd"
                      v-model="dayOffData.permissionEnd"
                      type="date"
                    ></b-form-input>
                  </b-form-group>
                  <div class="mb-3 row">
        </div>
        <div class="mb-3 row">
          <div class="col-md-2"></div>
          <div class="col-md-10">
            <button class="btn btn-primary" @click="onSave">Talep Oluştur</button>
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