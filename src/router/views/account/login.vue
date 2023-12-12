<script>
import Layout from "../../layouts/auth";
import { mapMutations } from 'vuex';
import { required,helpers  } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Swal from "sweetalert2";
export default { 
    setup() {
    return { v$: useVuelidate() }
  },
  page: {
    title: "Login",
  },
  components: {
    Layout,
  },
  data() {
    return {
      userData : {
        userName: "",
        password: "",
      }
    };
  },
 validations() {
    return {
      userData: {
        userName: { required: helpers.withMessage("Kullanıcı Adı Gerekli",required) },
        password: { required: helpers.withMessage("Şifre Gerekli", required) },
      }
    }
  },
  methods: {
    ...mapMutations('login', ['setToken']),
    tryToLogIn() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.$appAxios
        .post("/api/User/login",this.userData)
        .then((response)=>{
          this.setToken(response.data.token)
          this.$router.push({name : "default"});
        })
        .catch((error) => {
        if (error.response && error.response.status === 401) {
          this.successmsg('Kullanıcı Adı veya Şifre Hatalı !!!')
        } else {
          console.log(error.response.data.errors);
        }
      });
      }
    },
        successmsg(msg) {
        Swal.fire({
        position: "center",
        icon: "error",
        title: msg,
        showConfirmButton: false,
        timer: 1000,
      });
    },
  }
};
</script>

<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-soft bg-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Hoşgeldiniz !</h5>
                  <p>Lütfen Giriş Yapın.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <b-form class="p-2" @submit.prevent="tryToLogIn">
              <b-form-group
                class="mb-3"
                id="input-group-1"
                label="User Name"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="userData.userName"
                  type="text"
                  placeholder="Enter User Name"
                  :class="{
                    'is-invalid': v$.userData.userName.$error,
                  }"
                ></b-form-input>
                <div
                  v-if="v$.userData.userName.$error"
                  class="invalid-feedback"
                >
                  <span v-if="v$.userData.userName.required.$message">{{
                    v$.userData.userName.required.$message
                  }}</span>
                </div>
              </b-form-group>

              <b-form-group
                class="mb-3"
                id="input-group-2"
                label="Password"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="userData.password"
                  type="password"
                  placeholder="Enter password"
                  :class="{
                    'is-invalid': v$.userData.password.$error,
                  }"
                ></b-form-input>
                <div
                  v-if="v$.userData.password.$error"
                  class="invalid-feedback"
                >
                  <span v-if="v$.userData.password.required.$message">{{
                    v$.userData.password.required.$message
                  }}</span>
                </div>
              </b-form-group>
              <b-form-checkbox
                class="form-check me-2"
                id="customControlInline"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted"
              >
                Remember me
              </b-form-checkbox>
              <div class="mt-3 d-grid">
                <b-button type="submit" variant="primary" class="btn-block"
                  >Log In</b-button
                >
              </div>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="mt-5 text-center">
          <p>
            © {{ new Date().getFullYear() }} Skote. Crafted with
          </p>
        </div>
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>