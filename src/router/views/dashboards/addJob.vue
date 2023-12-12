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
        jobData: {
            JobName: null,
            JobDetail: null,
            StartingDate: null,
            EndDate: null,
            Precedence: null,
            Status: "Beklemede",
            user: {
                Id: null,
                FirstName: null,
                LastName: null,
                userName: null,
                Email: null,
                StartDateOfWork: null,
                Address: null,
                Department: null,
                Task: null
            }
        },
    };
  }, 
    computed: {
    ...mapGetters("login", ["getToken"]), 
  },
  methods: {
    async onSave() {
      const token = this.getToken;
      await this.$appAxios.post("/api/Job/addJob", this.jobData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(() => {
        alert("Kayıt başarıyla tamamlandı!");
        this.$router.push({name : "default"});
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
            <h4 class="card-title">İş Atama</h4>
            <br/>
            </div>
            <div class="row">
              <div class="col-12">
                <form class="form-horizontal" role="form">
                  <b-form-group
                    class="mb-3"
                    id="jobUserName"
                    label-cols-lg="2"
                    label="İş Verilen"
                    label-for="userName"
                  >
                    <b-form-input
                      for="userName"
                      v-model="jobData.user.userName"
                      placeholder="Kullanıcı Adı"
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="jobName"
                    label-cols-sm="2"
                    label-cols-lg="2"
                    label="İş Adı"
                    label-for="name"
                  >
                    <b-form-input
                      for="name"
                      v-model="jobData.JobName"
                      placeholder="İş Adı"
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="jobDetail"
                    label-cols-lg="2"
                    label="İş Detayı"
                    label-for="jobDetail"
                  >
                    <b-form-input
                      for="jobDetail"
                      v-model="jobData.JobDetail"
                      placeholder="İş Detayı"
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                    <b-form-group
                    class="mb-3"
                    id="date"
                    label-cols-sm="2"
                    label-cols-lg="2"
                    label="Başlama Tarihi"
                    label-for="date"
                  >
                    <b-form-input
                      id="date"
                      v-model="jobData.StartingDate"
                      type="date"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="date"
                    label-cols-sm="2"
                    label-cols-lg="2"
                    label="Bitiş Tarihi"
                    label-for="date"
                  >
                    <b-form-input
                      id="date"
                      v-model="jobData.EndDate"
                      type="date"
                    ></b-form-input>
                  </b-form-group>

                  <div class="mb-3 row">
                    <label class="col-md-2 col-form-label">Önemi</label>
                    <div class="col-md-10">
                      <select class="form-control" v-model="jobData.Precedence">
                        <option value="Öncelikli">Öncelikli</option>
                        <option value="Bekleyebilir">Bekleyebilir</option>
                        <option value="Acil">Acil</option>
                      </select>
                    </div>
                  </div>
                              <div class="col-md-2"></div>
          <div class="col-md-10">
            <button class="btn btn-primary" @click="onSave">Kaydet</button>
          </div>
                </form>
              </div>
            </div>

            <!-- end row -->
          </div>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>