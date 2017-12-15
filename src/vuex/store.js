import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    zhantingID: '100',   // 展厅ID
    Instrument_ID: '1',
    NewID:'',
    HistyID: '',
    ModifySn: '',
    overViewName:null,  //  概览展厅名称
    GroupID:'',         //  分组统计跳转数据分析参数
    startDate:null,
    endDate:null,
    historySn: null,     // 保存备忘录页的跳转数据(历史数据)
    MultiDataSn: null    // 数据分析
}

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    SETZHANTINGID(state, n){
        state.zhantingID = n
    },
    SETINSTRT(state,ID){
        state.Instrument_ID = ID
    },
    NEWID(state,Id){
        state.NewID = Id
    },
    HISTYID(state,id){
        state.HistyID = id
    },
    MODIFYSN(state,id){
        state.ModifySn = id
    },
    OVERVIEWNAME(state, obj){
        state.overViewName = obj
    },
    GROUPID(state, id){
        state.GroupID = id
    },
    STARTDATE(state, id){
        state.startDate = id;

    },
    ENDDATE(state, id){
        state.endDate = id;
    },
    HISTORYSN(state, id) {
        state.historySn = id;
    },
    MULTIDATASN(state, id) {
        state.MultiDataSn = id
    }


}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})