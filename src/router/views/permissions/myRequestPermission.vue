<script>
import Layout from "../../layouts/main";
import { mapGetters } from "vuex";

export default {
  components: { Layout },
  data() {
    return {
      title: "Permissions",
      dayOffRequests: []
    };
  },
  computed: {
    ...mapGetters("login", ["getToken"]), 
  },
  mounted() {
    const id = this.$auth.getToken().UserId
    this.fetchUsers(id);
  },
  methods: {
    async fetchUsers(id) {
        const token = this.getToken;
        this.$appAxios
        .get("/api/DayOffRequest",{
          params: {userId: id},
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response)=>{
          this.dayOffRequests = response.data;
          console.log(this.dayOffRequests)
        })
    },
  },
};
</script>

<template>
  <Layout>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">İzin Taleblerim</h4>
            <div class="table-responsive">
              <table class="table mb-0">
                <thead>
                  <tr> 
                    <th>İzin Tipi</th>
                    <th>İzin Detayı</th>
                    <th>Talep Edilen İzin Günü</th>
                    <th>Başlangıç Tarihi</th>
                    <th>Bitiş Tarihi</th>
                    <th>Onay Durumu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="dayOffRequest in dayOffRequests" :key="dayOffRequest.id">
                    <td> {{ dayOffRequest.permissionType }} </td>
                    <td> {{ dayOffRequest.permissionDetail }} </td>
                    <td> {{ dayOffRequest.dayOffNumber }} </td>
                    <td> {{ dayOffRequest.permissionStart }} </td>
                    <td> {{ dayOffRequest.permissionEnd }} </td>
                    <td> 
                        <span v-if="dayOffRequest.approval === false && dayOffRequest.status === false">Onay Sürecinde</span>
                        <span v-else-if="dayOffRequest.approval === false && dayOffRequest.status === true">Rededildi</span>
                        <span v-else>Onaylandı</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </Layout>
</template>