export const state = () => {
  return {
    pois1:[{location:{}}],
    pois2:[{location:{}}]
  }
}
export const mutations = {
  setPois1(state,value){
    state.pois1 = value
  },
  setPois2(state,value){
    state.pois2 = value
  }
}