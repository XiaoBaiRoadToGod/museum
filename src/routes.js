import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

// import Chart from './views/charts/echarts.vue'
// 导入所有的页面 并设置路由 可以不用管他
// 实时监控
import Real from './views/nv_RealTime/Real.vue'
// 预警平台
import Statistics from './views/nv_PreAlert/Statistics.vue'
import Inquire from './views/nv_PreAlert/Inquire.vue'
// 环境监控
import Environmental from './views/nv_DEMU/Environmental.vue'
// 设置
import Pto_Relic from './views/nv_Opations/DR_Relic_childen/Pto_Relic.vue'
import DR_Relic from './views/nv_Opations/DR_Relic.vue'
//import Help from './views/nv_Opations/Help.vue'
import ChangePassWord from './views/nv_Opations/ChangePassword.vue'
// 分析评估
import HistoryData from './views/nv_DataAnalyst/HistoryData.vue'
import Assessment from './views/nv_DataAnalyst/Assessment.vue'
import Childen_Chart from './views/nv_DataAnalyst/HistoryData_childen/Childen_Chart.vue'
import HeatField from './views/nv_DataAnalyst/HeatField.vue'
import MultiDataQuery from './views/nv_DataAnalyst/MultiDataQuery.vue'
import CustomGroup from './views/nv_DataAnalyst/CustomGroup.vue'
import MeanValue from './views/nv_DataAnalyst/HistoryData_childen/MeanValue.vue'
import Memorandum from './views/nv_DataAnalyst/memorandum.vue'
// 陈列文物
import TableOf_CR from './views/nv_CulturalRelicsShow/TableOf_CR.vue'
import Particulars from './views/nv_CulturalRelicsShow/TableOf_CR_childen/Particulars.vue'
// 概览
import Overviews from './views/nv_Overview/Overview.vue'

// 空调调控
import AirControl from './views/nv_AirControl/AirControl.vue'

// 设置仪器隐藏
import setLoggerHide from './views/nv_Opations/setLoggerHide.vue';


let mode = 'history'
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    { path: '/', redirect: '/overview',hidden: true},
    {
      path: '/',
      component: Home,
      name: '实时监测',
      iconCls: 'fa icon_img_lt_01',
      leaf: true,
      children: [
        {
          path: '/real',
          component:Real,
          name: '实时监测'
        }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '环境调控',
      iconCls: 'fa icon_img_lt_02',
      leaf: true,
      children: [
        {
          path: '/environmental',
          component:Environmental,
          name: '环境调控'
        }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '空调调控',
      iconCls: 'fa icon_img_lt_air',
      leaf: true,
      children: [
        {
          path: '/AirControl',
          component:AirControl,
          name: '空调调控'
        }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '预警平台',
      iconCls: 'fa icon_img_lt_03',
      children: [
        { path: '/Statistics', component: Statistics, name: '预警统计' },
        { path: '/Inquire', component: Inquire, name: '预警查询' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '分析评估',
      iconCls: 'fa icon_img_lt_04',
      children: [
        { path: '/historyData', component: HistoryData, name: '历史数据' },
        { path: '/multiDataQuery', component: MultiDataQuery, name: '数据分析' },
        { path: '/CustomGroup', component: CustomGroup, name: '分组统计' },
        { path: '/MeanValue', component: MeanValue, name: '平均值', hidden: true },
        { path: '/assessment', component: Assessment, name: '综合评估' },
        // { path: '/Memorandum', component: Memorandum, name: '备忘录' },
        { path: '/childen_Chart', component: Childen_Chart, name: '', hidden: true },
        // { path: '/heatField', component: HeatField, name: '热量场' }
        
      ]
    },
    {
      path: '/',
      component: Home,
      name: '陈列文物',
      leaf: true,
      iconCls: 'fa icon_img_lt_05',
      children: [
        {
          path: '/tableOf_CR',
          component: TableOf_CR,
          name: '展陈文物'
        },
        {
          path: '/particulars/:id',
          component: Particulars,
          name: '文物详情',
          hidden: true
        }
      ]
    },
    {
      path:'/',
      component: Home,
      name: '概览',
      iconCls: 'fa icon_img_lt_11',
      // hidden: true,
      leaf: true,
      children: [
        { path: '/overview', component: Overviews, name:'概览' }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '设置',
      iconCls: 'fa el-icon-setting',
      hidden: true,
      rel_set: true,
      children: [
        { path: '/changePassWord', component: ChangePassWord, name: '修改密码'  },
        { path: '/setLoggerHide', component: setLoggerHide, name: '隐藏仪器' },
        // { path: '/dR_Relic', component: DR_Relic, name: '导入文物信息' },
        // { path: '/pto_Relic', component: Pto_Relic, name: '导入文物图片' },
        //{ path: '/help', component: Help, name: '帮助',hidden:true }
      ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
