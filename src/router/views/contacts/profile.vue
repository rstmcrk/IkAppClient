<script>
import Layout from "../../layouts/main";
import { mapGetters } from "vuex"; 
import Swal from "sweetalert2";
export default {
  page: {
    title: "Profile",
  },
  components: { Layout },
  data() {
    return {
      title: "Profile",
      showAddAddressModal: false,
      showAddressEditModal: false,
      user: [],
      addressData : {
        country: "Türkiye",
        province: null,
        district: null,
        openAddress: null,
        postCode: null,
        addressUserId: this.$auth.getToken().UserId
      },
      editAddressData : {
        AddressId: null,
        Country: "Türkiye",
        Province: null,
        District: null,
        OpenAddress: null,
        PostCode: null,
        AddressUserId: this.$auth.getToken().UserId
      },
    };
  },
  computed: {
    ...mapGetters("login", ["getToken"]), 
  }, 
  mounted(){
    const id = this.$auth.getToken().UserId
    this.fetchAddress(id);
  },
  methods: {

    successmsg(msg) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: msg,
        showConfirmButton: false,
        timer: 1000,
      });
    },
    openEditAddressModal(address){
      this.editAddressData = {
        AddressId: address.AddressId,
        Country: "Türkiye",
        Province: address.Province,
        District: address.District,
        OpenAddress: address.OpenAddress,
        PostCode: address.PostCode,
        AddressUserId: this.$auth.getToken().UserId
      },
      this.showAddressEditModal = true;
    },
    openAddAddressModal() {
      this.showAddAddressModal = true;
    },
    async fetchAddress(id){
      const token = this.getToken;
      this.$appAxios
        .get("/api/User/user",{
          params: {id: id},
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response)=>{
          this.user = response.data;
          console.log(this.user)
        })
    },
    async onDelete(){
      const token = this.getToken;
      const id = this.user.Address.AddressId
      this.$appAxios
        .delete(`/api/Address/?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const userId = this.$auth.getToken().UserId
        this.fetchAddress(userId);
    },
    async onSave() {
      const token = this.getToken;
      var response = await this.$appAxios.post("/api/Address/addAddress", this.addressData,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.data == 201) {
            this.successmsg("Kayıt Başarılı!");
          } else {
            this.successmsg("Kayıt Başarısız!");
          }
      const id = this.$auth.getToken().UserId
      this.fetchAddress(id);
    },
    async editAddress() {
      const token = this.getToken;
      
      const response = await this.$appAxios.put("/api/Address", this.editAddressData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          if (response.status === 200) {
            this.successmsg("Düzenleme Başarılı!");
          } else {
            this.successmsg("Düzenleme Başarısız!");
          }
      const id = this.$auth.getToken().UserId
      this.fetchAddress(id);
    },
  },
};
</script>

<template>
  <Layout>
    <div class="row">
      <div class="col-xl-12">
        <div class="card overflow-hidden">
          <div class="bg-soft bg-primary">
          </div>
          <div class="card-body pt-0">
            <div class="row">
              <div class="col-sm-6" >
                <h5 class="font-size-15 text-truncate">{{ user.FirstName }} {{ user.LastName  }}</h5>
                <p class="text-muted mb-0 text-truncate"> {{ user.Task?.TaskName }} </p>
              </div>
            </div>
          </div>
        </div>
        <!-- end card -->

        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">Personel Bilgileri</h4>
            <div class="table-responsive ">
              <table class="table table-nowrap mb-0">
                <tbody>
                  <tr>
                    <th scope="row">Ad Soyad</th>
                    <td> {{ user.FirstName }} {{ user.LastName }} </td>
                  </tr>
                  <tr>
                    <th scope="row">Kullanıcı Adı :</th>
                    <td>{{ user.UserName }}</td>
                  </tr>
                  <tr>
                    <th scope="row">E-mail :</th>
                    <td>{{ user.Email }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Departman :</th>
                    <td>{{ user.Department?.DepartmentName }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Başlangıç Tarihi :</th>
                    <td>{{ user.StartDateOfWork }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">Adres Bilgileri</h4>
            <div class="table-responsive ">
              <table class="table table-nowrap mb-0">
                <tbody>
                  <tr>
                    <th scope="row">Ülke :</th>
                    <td> {{ user.Address?.Country }}</td>
                  </tr>
                  <tr>
                    <th scope="row">İl :</th>
                    <td>{{ user.Address?.Province }}</td>
                  </tr>
                  <tr>
                    <th scope="row">İlçe :</th>
                    <td>{{ user.Address?.District }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Açık Adres :</th>
                    <td>{{ user.Address?.OpenAddress }}</td>
                  </tr>
                </tbody>
              </table>
              <div v-if="this.user.Address == null" class="mb-2 text-end">
                <button @click="openAddAddressModal" class="btn btn-primary me-1">Ekle</button>
              </div>
              <div v-else class="mb-2 text-end">
            <button class="btn btn-danger btn-sm" @click="onDelete">Sil</button>
            <button @click="openEditAddressModal(user.Address)" class="btn btn-primary btn-sm">Düzenle</button>
          </div>
          <b-modal @ok="editAddress" v-model="showAddressEditModal" title="Adres Düzeltme">
          <form >
            <b-form-group
                    class="mb-3"
                    id="addCountry"
                    label-cols-lg="2"
                    label="Ülke"
                    label-for="country"
                  >
                    <b-form-input
                      for="country"
                      v-model="editAddressData.Country"
                      placeholder="Türkiye"
                      disabled
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="addProvince"
                    label-cols-sm="2"
                    label-cols-lg="2"
                    label="İl"
                    label-for="province"
                  >
                    <b-form-input
                      for="province"
                      v-model="editAddressData.Province"
                      placeholder="İl"
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="addDistrict"
                    label-cols-lg="2"
                    label="İlçe"
                    label-for="district"
                  >
                    <b-form-input
                      for="district"
                      v-model="editAddressData.District"
                      placeholder="İlçe"
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="addOpenAddress"
                    label-cols-lg="2"
                    label="Açık Adres"
                    label-for="openAddress"
                  >
                    <b-form-input
                      for="openAddress"
                      v-model="editAddressData.OpenAddress"
                      placeholder="Açık Adres"
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                    <b-form-group
                    class="mb-3"
                    id="addPostCode"
                    label-cols-sm="2"
                    label-cols-lg="2"
                    label="Posta Kodu"
                    label-for="postCode"
                  >
                    <b-form-input
                      for="postCode"
                      v-model="editAddressData.PostCode"
                      type="text"
                    ></b-form-input>
                  </b-form-group>
          </form>
        </b-modal>
          <b-modal @ok="onSave" v-model="showAddAddressModal" title="Address Ekle">
          <form >
            <b-form-group
                    class="mb-3"
                    id="addCountry"
                    label-cols-lg="2"
                    label="Ülke"
                    label-for="country"
                  >
                    <b-form-input
                      for="country"
                      v-model="addressData.country"
                      placeholder="Türkiye"
                      disabled
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="addProvince"
                    label-cols-sm="2"
                    label-cols-lg="2"
                    label="İl"
                    label-for="province"
                  >
                    <b-form-input
                      for="province"
                      v-model="addressData.province"
                      placeholder="İl"
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="addDistrict"
                    label-cols-lg="2"
                    label="İlçe"
                    label-for="district"
                  >
                    <b-form-input
                      for="district"
                      v-model="addressData.district"
                      placeholder="İlçe"
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="mb-3"
                    id="addOpenAddress"
                    label-cols-lg="2"
                    label="Açık Adres"
                    label-for="openAddress"
                  >
                    <b-form-input
                      for="openAddress"
                      v-model="addressData.openAddress"
                      placeholder="Açık Adres"
                      type="text"
                    ></b-form-input>
                  </b-form-group>

                    <b-form-group
                    class="mb-3"
                    id="addPostCode"
                    label-cols-sm="2"
                    label-cols-lg="2"
                    label="Posta Kodu"
                    label-for="postCode"
                  >
                    <b-form-input
                      for="postCode"
                      v-model="addressData.postCode"
                      type="text"
                    ></b-form-input>
                  </b-form-group>
          </form>
        </b-modal>
            </div>
          </div>
        </div>
        <!-- end card -->

        <!-- <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-5">Experience</h4>
            <div class>
              <ul class="verti-timeline list-unstyled">
                <li class="event-list active">
                  <div class="event-timeline-dot">
                    <i class="bx bx-right-arrow-circle bx-fade-right"></i>
                  </div>
                  <div class="d-flex">
                    <div class="me-3">
                      <i class="bx bx-server h4 text-primary"></i>
                    </div>
                    <div class="flex-grow-1">
                      <div>
                        <h5 class="font-size-15">
                          <a href="javascript: void(0);" class="text-dark">Back end Developer</a>
                        </h5>
                        <span class="text-primary">2016 - 19</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="event-list">
                  <div class="event-timeline-dot">
                    <i class="bx bx-right-arrow-circle"></i>
                  </div>
                  <div class="d-flex">
                    <div class="me-3">
                      <i class="bx bx-code h4 text-primary"></i>
                    </div>
                    <div class="flex-grow-1">
                      <div>
                        <h5 class="font-size-15">
                          <a href="javascript: void(0);" class="text-dark">Front end Developer</a>
                        </h5>
                        <span class="text-primary">2013 - 16</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="event-list">
                  <div class="event-timeline-dot">
                    <i class="bx bx-right-arrow-circle"></i>
                  </div>
                  <div class="d-flex">
                    <div class="me-3">
                      <i class="bx bx-edit h4 text-primary"></i>
                    </div>
                    <div class="flex-grow-1">
                      <div>
                        <h5 class="font-size-15">
                          <a href="javascript: void(0);" class="text-dark">UI /UX Designer</a>
                        </h5>
                        <span class="text-primary">2011 - 13</span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div> -->
        <!-- end card -->
      </div>

      
    </div>
    <!-- end row -->
  </Layout>
</template>