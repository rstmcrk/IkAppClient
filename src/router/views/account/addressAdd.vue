<script>
import Layout from "../../layouts/main";
import { mapGetters } from "vuex";

export default {
  page: {
    title: "Adres Kayıt"
  },
  components: { Layout },
  computed: {
    ...mapGetters("login", ["getToken"]), 
  },
  data() {
    return {
      addressData : {
        country: "Türkiye",
        province: null,
        district: null,
        lastName: null,
        openAddress: null,
        postCode: null,
        addressUserId: this.$auth.getToken().UserId
      },
    };
  }, 
  methods: {
    async onSave() {
      const token = this.getToken;
      await this.$appAxios.post("/api/Address/addAddress", this.addressData,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      this.$router.push({name : "Profil"});
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
          <h4 class="card-title">Adres Bilgileri</h4>
          <br/>
          </div>
            <div class="row">
              <div class="col-12">
                <form class="form-horizontal" role="form">
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