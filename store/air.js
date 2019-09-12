export const state = () => {
  return {
    allPrice:'',
    userNumber:''
  }
}
export const mutations = {
  setAllPrice(state,value){
    state.allPrice = value
  },
  setUserNumber(state,value){
    state.userNumber = value
  }
}