<script>
import Layout from "../../layouts/main";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  components: { Layout },
  mounted() {
    this.fetchUserJob();
  },
      computed: {
    ...mapGetters("login", ["getToken"]), 
  },
   data() {
    return {
      jobs: [],
    };
  },
  methods: {
    async updateJob(jobId){
      const token = this.getToken;
      for (let i = 0; i < this.jobs.length; i++){
        if (this.jobs[i].id === jobId) {
          this.jobs[i].status = "Devam Ediyor";
          this.sendUpdateToServer(this.jobs[i], token);
          console.log(this.jobs[i])
          break;
        }
      }
    },
    async deleteJob(jobId){
      const confirmed = window.confirm("Tamamladığınıza emin misiniz?");
      if(confirmed){
          const token = this.getToken;
          for (let i = 0; i < this.jobs.length; i++){
          if (this.jobs[i].id === jobId) {
          this.jobs[i].status = "Tamamlandı";
          this.sendUpdateToServer(this.jobs[i], token);
          console.log(this.jobs[i])
          break;
        }
      }   
      }     
    },
    async stopJob(jobId){
      const token = this.getToken;
      for (let i = 0; i < this.jobs.length; i++){
        if (this.jobs[i].id === jobId) {
          this.jobs[i].status = "Beklemede";
          this.sendUpdateToServer(this.jobs[i], token);
          console.log(this.jobs[i])
          break;
        }
      }
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
    async sendUpdateToServer(updatedJob, token){
      var response = await this.$appAxios.put("/api/Job/updateStatus",updatedJob,{
        headers: {
            Authorization: `Bearer ${token}`
          }
      })
      if (response.data == 200) {
            this.successmsg("İşlemi Başarılı!");
          } else {
            this.successmsg("İşlemi Başarısız!");
          }
      this.fetchUserJob();
    },
    async fetchUserJob() {
      const token = this.getToken;
      const userId = this.$auth.getToken().UserId
      this.$appAxios
        .get("/api/Job/getJob", {
          params:{ userId } ,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response)=>{
          this.jobs = response.data
          console.log(this.jobs)
        })
    }
  },
};

</script>
<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table align-middle dt-responsive nowrap w-100 table-check" id="job-list">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">İş Adı</th>
                    <th scope="col">İş Detayı</th>
                    <th scope="col">Başlangıç</th>
                    <th scope="col">Bitiş</th>
                    <th scope="col">Öncelik</th>
                    <th scope="col">Durumu</th>
                    <th scope="col">Başla / Tamamla</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="job in jobs" :key="job.id">
                    <th></th>
                    <td> {{ job.jobName }} </td>
                    <td> {{ job.jobDetail }} </td>
                    <td> {{ job.startingDate }} </td>
                    <td> {{ job.endDate }} </td>
                    <td><span :class="{
                    'bg-success': `${job.precedence}` === 'Bekleyebilir',
                    'bg-warning': `${job.precedence}` === 'Öncelikli',
                    'bg-danger': `${job.precedence}` === 'Acil',
                  }"
                  > {{ job.precedence }} </span></td>
                    <td><span :class="{
                    'bg-success': `${job.status}` === 'Tamamlandı',
                    'bg-warning': `${job.status}` === 'Devam Ediyor',
                    'bg-danger': `${job.status}` === 'Beklemede',
                  }"
                  > {{ job.status }} </span></td>
                    <td>
                    <a href="#jobStop" class="btn btn-sm btn-soft-danger" @click="stopJob(job.id)"><i
                        class="mdi mdi-pause"></i></a>
                    <a href="#jobUpdate"  class="btn btn-sm btn-soft-warning" @click="updateJob(job.id)"><i
                        class="mdi mdi-clock-outline"></i></a> 
                      <a href="#jobDelete" class="btn btn-sm btn-soft-success" @click="deleteJob(job.id)"><i
                        class="mdi mdi-check-outline"></i></a> 
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- end table -->
            </div>
            <!-- end table responsive -->
          </div>
          <!-- end card body -->
        </div><!--end card-->
      </div><!--end col-->
    </div>
  </Layout>
</template>