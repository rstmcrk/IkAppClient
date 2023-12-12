import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { login } from './modules/login';

const store = createStore({
  modules: {
    login
  },
  plugins: [createPersistedState()]
});

export default store;
