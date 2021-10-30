import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state: {
        ModalId: "",
        Token: null
    },
    getters: {
        isLogin: (state) => {
            return !!state.Token
        },
        getToken: (state) => {
            return state.Token
        }
    }
    ,
    mutations: {
        updateToken(state, Token) {
            state.Token = Token
        }
    },
    actions: {
        login(context, Token) {
            context.commit("updateToken", Token)
        },
        logout(context) {
            context.commit("updateToken", null)
        }
    },
    modules: {},
    plugins: [createPersistedState()]
})
