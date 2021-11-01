import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state: {
        ModalId: "",
        Token: null,
        AccountName:null,
        DisplayName:null
    },
    getters: {
        isLogin: (state) => {
            return !!state.Token
        },
        getToken: (state) => {
            return state.Token
        },
        getAccountName:(state)=>{
            return state.AccountName
        },
        getDisplayName:(state)=>{
            return state.DisplayName
        }
    }
    ,
    mutations: {
        updateToken(state, Result) {
            state.Token = Result.Token
            state.AccountName = Result.AccountName
            state.DisplayName = Result.DisplayName
        }
    },
    actions: {
        login(context, Result) {
            context.commit("updateToken", Result)
        },
        logout(context) {
            context.commit("updateToken", null)
        }
    },
    modules: {},
    plugins: [createPersistedState()]
})
