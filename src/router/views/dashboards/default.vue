<script>
import Layout from "../../layouts/main";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  components: {
    Layout,
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
    openAddJobModal() {
      this.showAddJobModal = true;
    },
    async editJob() {
      const token = this.getToken;
      
      const response = await this.$appAxios.put("/api/Job/updateJob", this.jobEditData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          if (response.status === 200) {
            this.successmsg("Düzenleme Başarılı!");
          } else {
            this.successmsg("Düzenleme Başarısız!");
          }
      this.fetchUsers();
    },
    showEditJob(job) {
       this.jobEditData = {
        Id: job.id,
        JobName: job.jobName,
        JobDetail: job.jobDetail,
        StartingDate: job.startingDate,
        EndDate: job.endDate,
        Precedence: job.precedence,
        Status: job.status,
        JobUser: job.jobUser
      }
      this.showEditModal = true;
    },
    async onSave() {
      const tokenOnSave = this.getToken;
      
      const response = await this.$appAxios.post("/api/Job/addJob", this.jobData, {
          headers: {
            Authorization: `Bearer ${tokenOnSave}`
          }
        })
          if (response.data == 201) {
            this.successmsg("İş Ataması Başarılı!");
          } else {
            this.successmsg("İş Ataması Başarısız!");
          }
      this.fetchUsers();
    },
    successmsg(msg) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: msg,
        showConfirmButton: false,
        timer: 1000,
      });
    },
    async deleteJob(id) {
      const confirmed = window.confirm("Silmek istediğinize emin misiniz?");
      if(confirmed){
        const token = this.getToken;
      var response = await this.$appAxios
        .delete(`/api/Job?id=${id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } 
      if (response.data == 200) {
            this.successmsg("Silme İşlemi Başarılı!");
          } else {
            this.successmsg("Silme İşlemi Başarısız!");
          }
       this.fetchUsers();
    },
    async fetchUsers() {
      const token = this.getToken;
      this.$appAxios
        .get("/api/Job",{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response)=>{
          this.jobsData = response.data
          console.log(response.data)
        });
    }
  },
    data() {
    return {
      showAddJobModal: false,
      showEditModal: false,
      title: "İşler",
      jobsData: [],
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
      jobEditData: {
            Id: null,
            JobName: null,
            JobDetail: null,
            StartingDate: null,
            EndDate: null,
            Precedence: null,
            Status: null,
            JobUser: {
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

};
</script>

<template>
  <Layout>
    <div class="row">
        <div v-if="isUserAdmin" class="mb-2 text-end">
          <button @click="openAddJobModal" class="btn btn-primary me-1">İş Atama</button>
        </div>
        <b-modal @ok="onSave" v-model="showAddJobModal" title="İş Atama">
          <form >
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
          </form>
        </b-modal>

          <b-modal @ok="editJob" v-model="showEditModal" title="İş Düzeltme">
          <form >
            <b-form-group
                    class="mb-3"
                    id="jobUserName"
                    label-cols-lg="2"
                    label="İş Verilen"
                    label-for="userName"
                  >
                    <b-form-input
                      for="userName"
                      v-model="jobEditData.JobUser.userName"
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
                      v-model="jobEditData.JobName"
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
                      v-model="jobEditData.JobDetail"
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
                      v-model="jobEditData.StartingDate"
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
                      v-model="jobEditData.EndDate"
                      type="date"
                    ></b-form-input>
                  </b-form-group>

                  <div class="mb-3 row">
                    <label class="col-md-2 col-form-label">Önemi</label>
                    <div class="col-md-10">
                      <select class="form-control" v-model="jobEditData.Precedence">
                        <option value="Öncelikli">Öncelikli</option>
                        <option value="Bekleyebilir">Bekleyebilir</option>
                        <option value="Acil">Acil</option>
                      </select>
                    </div>
                  </div>
          </form>
        </b-modal>

      <div v-for="jobs in jobsData" :key="jobs.id" class="col-xl-4 col-sm-6">
        <div class="card">
          <div class="card-body">
            <div class="d-flex">
              <div class="flex-grow-1 overflow-hidden">
                <h5 class="text-truncate font-size-15">
                  {{ jobs.jobName }}
                </h5>
                <p class="text-muted mb-4">Detaylar : {{ jobs.jobDetail }}</p>
                <div>
                  <div>
                    <p > Departman : {{  jobs.jobUser.department?.departmentName }}</p>
                    <p >{{ jobs.jobUser?.firstName }} {{ jobs.jobUser?.lastName }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 border-top">
            <ul class="list-inline mb-0">
              
              <li
                v-b-tooltip.hover.top
                class="list-inline-item me-3"
              >
                <i class="bx bx-calendar me-1"></i>
                Başlangıç
                {{ jobs.startingDate }}
              </li>
              <br>
              <li class="list-inline-item me-3">
                <span
                  class="badge"
                  :class="{
                    'bg-success': `${jobs.status}` === 'Tamamlandı',
                    'bg-warning': `${jobs.status}` === 'Devam Ediyor',
                    'bg-danger': `${jobs.status}` === 'Beklemede',
                  }"
                  >{{ jobs.status }}</span
                >
              </li>
              <li
                v-b-tooltip.hover.top
                class="list-inline-item me-3"
              >
                <i class="bx bx-calendar me-1"></i>
                Bitiş
                {{ jobs.endDate }}
              </li>
              <br>
              <li class="list-inline-item me-3">
                <span
                  class="badge"
                  :class="{
                    'bg-success': `${jobs.precedence}` === 'Bekleyebilir',
                    'bg-warning': `${jobs.precedence}` === 'Öncelikli',
                    'bg-danger': `${jobs.precedence}` === 'Acil',
                  }"
                  >{{ jobs.precedence }}</span
                >
              </li>
            </ul>
          </div>

          <div v-if="isUserAdmin" class="btn-group">
            <button @click="showEditJob(jobs)" class="btn btn-primary btn-sm">
      Düzenle
    </button>
    <button @click="deleteJob(jobs.id)" class="btn btn-danger btn-sm">
      Sil
    </button>
          </div>
          
        </div>
      </div>
    </div>
  </Layout>
</template>
