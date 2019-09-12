export const state = () => {
    return {
        myHistory:{
            arr:[]
        }
    }
}
export const mutations = {
    setHistory(state,data) {
        state.myHistory.arr = data
        
    }
}
