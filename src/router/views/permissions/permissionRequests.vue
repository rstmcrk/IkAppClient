<script>
import Layout from "../../layouts/main";
import { mapGetters } from "vuex";

export default {
  components: { Layout },
  mounted() {
    this.fetchPermissionRequests();
  },
      computed: {
    ...mapGetters("login", ["getToken"]), 
  },
   data() {
    return {
      PermissionRequests: [],
      PermissionReject:{
        id: null,
        status: null,
        approval: null
      }
    };
  },
  methods: {
     async permissionReject(id){
       this.PermissionReject.id = id;
       this.PermissionReject.status = true;
       this.PermissionReject.approval = false;
       const token = this.getToken;
       this.$appAxios
        .put("/api/DayOffRequest", this.PermissionReject,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.fetchPermissionRequests();
     },
     async notificationConfirmation(id){
        this.PermissionReject.id = id;
        this.PermissionReject.status = true;
        this.PermissionReject.approval = true;
        const token = this.getToken;
        this.$appAxios
        .put("/api/DayOffRequest", this.PermissionReject,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.fetchPermissionRequests();
     },
    async fetchPermissionRequests() {
      const token = this.getToken;
      const userId = this.$auth.getToken().UserId
      this.$appAxios
        .get("/api/DayOffRequest/PermissionRequests", {
          params:{ userId } ,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response)=>{
          this.PermissionRequests = response.data
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
                    <th scope="col">İzin Tipi</th>
                    <th scope="col">İzin Detayı</th>
                    <th scope="col">Talep Edilen İzin Günü</th>
                    <th scope="col">Başlangıç Tarihi</th>
                    <th scope="col">Bitiş Tarihi</th>
                    <th scope="col">Talep Eden</th>
                    <th scope="col">Onayla</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="PermissionRequest in PermissionRequests" :key="PermissionRequest.id">
                    <th></th>
                    <td> {{ PermissionRequest.permissionType }} </td>
                    <td> {{ PermissionRequest.permissionDetail }} </td>
                    <td> {{ PermissionRequest.dayOffNumber }} </td>
                    <td> {{ PermissionRequest.permissionStart }} </td>
                    <td> {{ PermissionRequest.permissionEnd }} </td>
                    <td> {{ PermissionRequest.user?.firstName }} {{ PermissionRequest.user?.lastName }} </td>
                    <a href="#jobUpdate"  class="btn btn-sm btn-soft-danger" @click="permissionReject(PermissionRequest.id)"><i
                        class="mdi mdi-close-outline"></i></a> 
                      <a href="#jobDelete" class="btn btn-sm btn-soft-success" @click="notificationConfirmation(PermissionRequest.id)"><i
                        class="mdi mdi-check-outline"></i></a> 
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