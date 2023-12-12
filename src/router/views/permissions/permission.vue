<script>
import Layout from "../../layouts/main";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  components: { Layout },
  data() {
    return {
      title: "Permissions",
      showAddRequestPermissionModal: false,
      dayOff: [],
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
  mounted() {
    const id = this.$auth.getToken().UserId
    this.fetchPermission(id);
  },
  methods: {
    async onSave() {
      const token = this.getToken;
      const response = await this.$appAxios.post("/api/DayOffRequest/AddDayOffRequest", this.dayOffData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data == 201) {
            this.successmsg("Talep Başarılı!");
          } else {
            this.successmsg("Talep Başarısız!");
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
    openAddRequestPermissionModal() {
      this.showAddRequestPermissionModal = true;
    },
    async fetchPermission(id) {
        const token = this.getToken;
        this.$appAxios
        .get("/api/DayOff",{
          params: {id: id},
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response)=>{
          this.dayOff = response.data;
          console.log(this.dayOff)
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
            <h4 class="card-title">İzin Bilgisi</h4>
            <div class="mb-2 text-end">
                <a href="/myRequestPermission" class="btn btn-primary me-1">Geçmiş</a>    
              <button @click="openAddRequestPermissionModal" class="btn btn-primary me-1">İzin Talebi</button>
            </div>
            <b-modal @ok="onSave" v-model="showAddRequestPermissionModal" title="İzin Talebi">
          <form >
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
                  <div class="mb-3 row"></div>
          </form>
        </b-modal>
            <div class="table-responsive">
              <table class="table mb-0">
                <thead>
                  <tr> 
                    <th>Kalan İzin Günü</th>
                    <th>İzin Hakediş Tarihi</th>
                    <th>Hakedilecek İzin Günü</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> {{ dayOff.remainingDayOff }} </td>
                    <td> {{ dayOff.dayOffAssignmentDate }} </td>
                    <td> {{ dayOff.dayOffAssign }} </td>
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