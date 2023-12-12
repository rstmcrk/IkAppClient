export const login ={
    namespaced: true,
    state: {
        token: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
          }
    },
    getters: {
        isAuthenticated: state => state.token !== null,
        getToken: (state) => state.token,
    }
}

