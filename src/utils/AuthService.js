import jwtDecode from 'jwt-decode';

export default {
    getToken() {
      const loginData = JSON.parse(localStorage.getItem('vuex'));
      if (loginData && loginData.login.token) {
        const token = loginData.login.token;
        const decodedToken = jwtDecode(token);
        return decodedToken;
      }
      return null;
    },
    getRole() {
      const loginData = JSON.parse(localStorage.getItem('vuex'));
      if (loginData && loginData.login.token) {
        const token = loginData.login.token;
        const decodedToken = jwtDecode(token);
        return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        ;
      }
      return null;
    }
    }


 