import { Promise } from 'es6-promise';
import axios from 'axios';
import qs from 'qs'

// axios.defaults.baseURL = 'http://172.16.50.245:8080/api';  //深博
// shenzhen 8080
   axios.defaults.baseURL = 'http://192.168.10.68:8080/api'; 
   // axios.defaults.baseURL = 'http://192.168.1.67:8080/api'; //展会
   // axios.defaults.baseURL = 'http://192.168.0.106:8080/api'; //展会
   // axios.defaults.baseURL = 'http://huato.net:8080/api'; 
   // axios.defaults.baseURL = 'http://huato.net:8025/api'; 
   // axios.defaults.baseURL = 'http://192.168.90.156:8080/api';   // 南博
// axios.defaults.baseURL = 'http://10.10.120.65:8080/api';     // 国博
// axios.defaults.baseURL = 'http://10.10.120.65:8015/api';     // 国博
// axios.defaults.baseURL = 'http://192.168.1.220:8080/api';     // 崇信
// axios.defaults.baseURL = 'http://192.168.100.200:8080/api';     // 庄浪
// axios.defaults.baseURL = 'http://192.168.10.104:8080/api';     // 陇西
// axios.defaults.baseURL = 'http://10.1.1.209:8080/api';     // 鄂尔多斯
// axios.defaults.baseURL = 'http://192.168.1.100:8080/api';     // 镇原
// axios.defaults.baseURL = 'http://192.168.0.117:8080/api';     // 金昌
// axios.defaults.baseURL = 'http://192.168.1.234:8080/api';     // 天水
// axios.defaults.baseURL = 'http://192.168.0.254:8080/api';     // 庆城
// axios.defaults.baseURL = 'http://192.168.1.110:8080/api';     // 绵阳
// axios.defaults.baseURL = '/api';

// let base = 'http://192.168.10.42:8080/api';
// let base = 'http://huato.net:8080/api';

export const addUser = params => { return axios.get(`/user/add`, params ); };

// 登录接口
export const userLogin = params => { return axios.post(`/Login/GetIPAddressByIP`, params); };
// 展厅列表
export const zhantingList = (params) => { return axios.post(`/Login/GetGrousShow`, params).then(res => res.data); };
// 实时监控 
export const DeviceInfo = (params) => { return axios.get(`/Head/GetDeviceInfo`, { params:params }).then(res => res.data)};
export const Succscore = (params) => { return axios.get(`/Head/GetGetScore`, { params:params }).then(res => res.data)};
export const EarlyWarning = (params) => { return axios.get(`/Head/GetDeviceAlarm`, { params: params }).then(res => res.data)};
export const EqmtStatistics = (params) => { return axios.get(`/Head/GetDeviceStatistics`, { params:params }).then(res => res.data)};
// 概览页面
// 博物馆信息
export const museumInfo = () => { return axios.get(`/Analysis/GetToMuseumShow`).then(res => res.data[0]); };
// 文物环境信息
export const wenwuEnvir = (params) => { return axios.get(`/Analysis/GetRlicShowALL`, { params:params }).then(res => res.data); };
// 监测设备
export const wenwuFacility = (params) => { return axios.get(`/Analysis/GetRlicShowALLss`, { params:params }).then(res => res.data); };
// 环境调控
export const Controls = (params) => { return axios.get(`/Controller/GetAlarmsList`, { params:params }).then(res => res.data); };
// 获取调控总条数
export const ControlNum = (params) => { return axios.get(`/Controller/GetController`, { params:params }).then(res => res.data); };

// 调控操作
export const ControlsSet = (params) => { return axios.get(`/Controller/GetDevice`, { params:params }).then(res => res.data); };
// 调控--除湿
export const ControlsDevicecopy = (params) => { return axios.get(`/Controller/GetDevicecopy`, { params:params }).then(res => res.data); };
// 调控--加湿
export const ControlsDeviceBack = (params) => { return axios.get(`/Controller/GetDeviceBack`, { params:params }).then(res => res.data); };


// 分析评估_通道数据接口 历史数据
// 展厅 => 仪器
export const Data_Instrument = (params) => { return axios.get(`/Login/GetLoggerInfoByGroupID`, { params:params }).then( res => res.data ); };
// 仪器 + 时间 => 表数据
export const DataAnalyzer = (params) => { return axios.get(`/LogsAll/GetInstrumentWaveAll`, { params:params }).then( res => res.data ); };
// 仪器 + 时间 => 统计图数据
export const DataStat = (params) => { return axios.get(`/LogsAll/GetDrawCurve`, { params: params }).then( res => res.data ); };
// 仪器 + 时间 => 统计图数据(饼图)
export const PieExceed = (params) => { return axios.get(`/LogsAll/GetInstrumentIimit`, { params: params }).then( res => res.data ); };
// 仪器 + 时间 => 导出数据
export const OutData = (params) => { return axios.get(`/LogsAll/GetExportExcel`, { params: params }).then( res => res.data ); };
// 多类仪器 + 时间 => 多种数据统计图数据 
// export const MultiData = (params) => { return axios.get(`./data.json`, { params: params }).then( res => res.data); };

/**
 * 原来的
 */

export const MultiData = (params) => { return axios.get(`/LogsAll/GetLoginfoContrast`, { params: params }).then( res => res.data); };
// 修改的

// export const MultiData = (params) => { return axios.get(`/GroupAll/GetRedisAll`, { params: params }).then( res => res.data); };


// 多类仪器 + 时间 => 多种数据统计表格数据
export const TabMulti = (params) => { return axios.get(`/LogsAll/GetLoginfoContrastWave`, { params: params }).then( res => res.data); };
/// 分页
export const historyPageList = (params) => { return axios.get(`/LogsAll/GetDrawCurveList`, { params: params }).then( res => res.data ); };

// 分析评估_通道数据接口 综合评估
// 展厅 + 时间 => 温湿度统计图 && 九宫格数据 && 合格率数据 && 仪器分析概览
export const BenchmarkStatistics = (params) => { return axios.get(`/Evaluation/GetTempHumiData`, { params: params }).then( res => res.data); };
export const SudukuMean = (params) => { return axios.get(`/Evaluation/GetNineSquareGraphData`, { params: params }).then( res => res.data); };
export const YIELD = (params) => { return axios.get(`/Evaluation/GetQualifiedRateData`, { params: params }).then( res => res.data); };
export const Wave = (params) => { return axios.get(`/Evaluation/GetFluctuateData`,{ params: params }).then( res => res.data); };
//  分析评估 && => 热量场
export const Field = (params) => { return axios.get(`/Head/GetHeatMapShow`,{ params:params }).then(res => res.data) };
// 陈展文物--文物列表
export const wenwuList = (params) => { return axios.get(`/Relic/GetRlicShow`, { params: params }).then( res => res.data ); };

// 文物列表  --分页
export const wenwuListPage = (params) => { return axios.get(`/Relic/GetRlicShowList`, { params: params }).then( res => res.data ); };
//  文物信息--详情
export const wenwuDetail = (params) => { return axios.get(`/Relic/GetRlicNameAll`, { params: params }).then( res => res.data ); };
//  文物详情--饼图
export const warningDetail = (params) => { return axios.get(`/Relic/GetRlicShowCount`, { params: params }).then( res => res.data ); };
//  文物详情--曲线图
export const humidGraphDetail = (params) => { return axios.get(`/Relic/GetRlicNameShow`, { params: params }).then( res => res.data ); };
//  文物详情--温湿度表格
export const humidTableDetail = (params) => { return axios.get(`/Relic/GetInstrumentWaveAlls`, { params: params }).then( res => res.data ); };

// 文物详情--实时数据以及上下限
export const wenwuDetailReal = (params) => { return axios.get(`/Relic/GetRlicNameAllss`, { params: params }).then( res => res.data ); };




// 预警查询
export const warningQuery = (params) => { return axios.get(`/LogsAll/GetAlarmsShow`, { params: params }).then( res => res.data ); };
//  预警查询--分页
export const warningQueryList = (params) => { return axios.get(`/LogsAll/GetAlarmsList`, { params: params }).then( res => res.data ); };
//   预警统计--柱状图
export const warningStatistical = (params) => { return axios.get(`/Alarm/GetHistogramData`, { params: params }).then( res => res.data ); };
//   预警统计--饼图
export const warningBar = (params) => { return axios.get(`/Alarm/GetDrawPieData`, { params: params }).then( res => res.data ); };
//   预警统计--24小时图
export const warningCurve = (params) => { return axios.get(`/Alarm/GetDrawCurveData`, { params: params }).then( res => res.data ); };

//  设置--修改密码
export const pwdChange = (params) => { return axios.post(`/Login/GetUpdatePwd`, params ).then( res => res.data ); };

//上传图片
export const uploadPostImg = (params,config) => { return axios.post(`/Setting/ImgUpload`, params, config ).then( res => res.data ); };
// 导入文物信息
export const uploadPostFile = (params,config) => { return axios.post(`/Setting/RelicUpload`, params, config ).then( res => res.data ); };
// 导入文物信息 -下载模板
export const uploadFileTemplate = () => { return axios.get(`/Setting/GetDownload`).then( res => res.data ); };
// 多数据分析--导出数据
export const multiDataOutExl = (params) => { return axios.get(`/LogsAll/GetContrastExportExcel`,{params,params}).then( res => res.data ); };

// 分组统计  新增分组
export const addGroup = (params) => { return axios.get(`/GroupAll/GetGroupllAdd`,{params,params}).then( res => res.data ); };
// 分组统计  删除分组
export const delateGroup = (params) => { return axios.get(`/GroupAll/GetGroupDelete`,{params,params}).then( res => res.data ); };
// 分组统计  编辑分组
export const updateGroup = (params) => { return axios.get(`/GroupAll/GetGroupUpdate`,{params,params}).then( res => res.data ); };
// 分组统计  查询分组
export const queryGroup = (params) => { return axios.get(`/GroupAll/GetGroupAllquery`,{params,params}).then( res => res.data ); };
// 分组统计  查询分组的设备
export const GetGroupLoggers = (params) => { return axios.get(`/GroupAll/GetLoggersnAll`,{params,params}).then( res => res.data ); };
// 分组统计-- 平均值
export const GetMeanValue = (params) => { return axios.get(`/GroupAll/GetLoginfoAvgAll`,{params,params}).then( res => res.data ); };

// 概览 查询分组仪器
export const GetOverviewGroupLoggers = (params) => { return axios.get(`/Analysis/GetInstrumentCountAll`,{params,params}).then( res => res.data ); };

// 概览   新增分组
export const AddOverviewGroupLoggers = (params) => { return axios.get(`/Analysis/GetInstrumentCountAdd`,{params,params}).then( res => res.data ); };
//  概览   删除分组仪器
export const DeleteOverviewGroupLoggers = (params) => { return axios.get(`/Analysis/GetInstrumentCountDel`,{params,params}).then( res => res.data ); };
// 概览   显示分组详情
export const GetOverviewGroupDetails = (params) => { return axios.get(`/Analysis/GetInstrumentCountShow`,{params,params}).then( res => res.data ); };





