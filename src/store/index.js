import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state: {
        ModalId: "",
        ModalType: "",
        Token: null,
        AccountName: null,
        DisplayName: null,
    },
    getters: {
        isLogin: (state) => {
            return !!state.Token
        },
        getToken: (state) => {
            return state.Token
        },
        getAccountName: (state) => {
            return state.AccountName
        },
        getDisplayName: (state) => {
            return state.DisplayName
        },
        getModalType:(state)=>{
          return state.ModalType
        },
        getModalId:(state)=>{
          return state.ModalId
        },
        isModalOpen: (state) => {
            return !!state.ModalId && !!state.ModalType
        }
    }
    ,
    mutations: {
        updateToken(state, Result) {
            if (!Result) {
                state.Token = null
                state.AccountName = null
                state.DisplayName = null
            } else {
                state.Token = Result.Token
                state.AccountName = Result.AccountName
                state.DisplayName = Result.DisplayName
            }
        },
        updateModal(state, Result) {
            if (!Result) {
                state.ModalId = null
                state.ModalType = null
            } else {
                state.ModalId = Result.ModalId
                state.ModalType = Result.ModalType
            }
        }
    },
    actions: {
        login(context, Result) {
            context.commit("updateToken", Result)
        },
        logout(context) {
            context.commit("updateToken", null)
        },
        openModal(context, Result) {
            context.commit("updateModal", Result)
        },
        closeModal(context) {
            context.commit("updateModal")
        }
    },
    modules: {},
    plugins: [createPersistedState()]
})
