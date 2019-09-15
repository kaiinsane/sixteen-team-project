export const state = () => {
  return {
    infoData:{},
    scenicList:[],
    hotelList:[]
  }
}
export const mutations = {
  setInfoData(state,value){
    state.infoData = value
  },
  setScenicList(state,value){
    state.scenicList = value
  },
  setHotelList(state,value){
    state.hotelList = value
  }
}