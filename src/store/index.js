import { createStore } from 'vuex'

export default createStore({
  state: {
    ModalId:"",
    Token:null
  },
  getters:{
    isLogin:(state)=>{
      return !!state.Token
    }
  }
  ,
  mutations: {
    updateToken(state,Token) {
      state.Token = Token
    }
  },
  actions: {
    login(context,Token){
      context.commit("updateToken",Token)
    },
    logout(context){
      context.commit("updateToken",null)
    }
  },
  modules: {
  }
})
