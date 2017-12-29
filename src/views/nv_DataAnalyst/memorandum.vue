<template>
    <el-row class='myPadding memorandumContainer'>
        <el-col :span='24' class='title' >
            <el-form :inline='true'>
                <el-form-item label='时间:' >
                    <el-date-picker
                       v-model='startTime'
                       type='date'
                       size='small'
                       :picker-options="pickerOptions0">

                    </el-date-picker>
                </el-form-item>
                <el-form-item label='到:' >
                    <el-date-picker
                       v-model='endTime'
                       type='date'
                       size='small'
                       :picker-options="pickerOptions1"
                       @change='chooseEndTime'>
                        
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click='queryData'>查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span='24' class='logDataContainer'>
            <el-row align='middle'>
                <el-col :span='24' class='logDataContent' v-for='(item, idx) in logData' :key='idx'>
                    <el-col :span='3' class='logDate sameHeight'>
                        {{item.PreservationTime}}
                    </el-col>
                    <el-col :span='15' class='logContext sameHeight'>
                        {{item.Describe}}
                    </el-col>
                    <el-col :span='3' class='logOperation sameHeight'>
                        <span @click='jumpDataChart(item)' >查看</span>
                    </el-col>
                    <el-col :span='3' class='logOperation sameHeight deleteRmark'>
                        <span @click='Delete(item)' >删除</span>
                    </el-col>
                </el-col>
                <el-col :span='24'>
                    <el-pagination 
                        layout="prev, pager, next"
                        :page-size='pageSize'
                        :current-page.sync="pageIndex"
                        @current-change="PaginationCurrentChange"
                        :total="total">

                    </el-pagination>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
var today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
var oneday = 1000 * 60 * 60 * 24;
var definedStopDateTime = new Date();
    definedStopDateTime.setHours(23);
    definedStopDateTime.setMinutes(59);
    definedStopDateTime.setSeconds(59);
import { GetMemorandumAll, MemorandumDelect } from '../../api/api'
export default {
    data() {
        return {
            startTime: new Date(today - oneday * 6),
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            endTime: definedStopDateTime,
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            logData: [],
            pageIndex: 1,
            pageSize: 10,
            total: 0
        }
    },
    methods: {
        getData() {
            var params = {
                beginTime: this.timeFormatter(this.startTime),
                endTime: this.timeFormatter(this.endTime),
                pageIndex: this.pageIndex - 1
            };
            // console.log(this.timeFormatter(this.startTime));
            // console.log(this.timeFormatter(this.endTime))
            GetMemorandumAll(params).then(res => {
                console.log(res);
                this.logData = [];
                this.total = 0;
                if(res.length !== 0) {
                    this.total = res[0].Count
                    this.logData = res;
                }
                
            })
        },
        Delete (item) {
            let params = {id: item.Id}
            MemorandumDelect(params).then(res => {
                if(res == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功！！！'
                    });
                    this.getData()
                } else {
                    this.$message({
                        type: 'error',
                        message: '删除失败！！！'
                    })
                }
            })
        },
        queryData() {
            this.getData();
        },
        chooseEndTime(val){
            var newDate = new Date();
            // console.log('endtime')
            // console.log(val);
            var chooseDate = new Date(Date.parse(val.replace(/-/g, "/")));
            var stopDateTime = new Date(Date.parse(val.replace(/-/g, '/')));
                stopDateTime.setHours(23);
                stopDateTime.setMinutes(59);
                stopDateTime.setSeconds(59);
            // if(chooseDate.setHours(0,0,0,0) == newDate.setHours(0,0,0,0)){
            //     this.endTime = new Date();
            // }else{
                this.endTime = stopDateTime;
            // }
        },
        timeFormatter(value){
            var date = new Date(value);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+' '+ date.getHours()+':'+date.getMinutes();
        },
        PaginationCurrentChange(value) {
            console.log(value);
            this.pageIndex = value;
            this.getData();
        },
        jumpDataChart(val) {
            console.log(val);
            // this.$store.state.historyOrMultiData = val.LOGGER_SN;
            this.$store.state.startDate = val.BeginTime;
            this.$store.state.endDate = val.EndTime;
            this.$store.state.zhantingID = val.GROUP_ID
            // console.log(this.$store.state.historyOrMultiData)
            if( val.Entrance == '历史数据') {
                this.$store.commit('HISTORYSN', val.LOGGER_SN);
                console.log('历史数据-----'+ this.$store.state.historySn);
                // this.$store.state.history = val.LOGGER_SN;
                this.$router.push({path: '/historyData'});
            } else {
                // this.$store.state.MultiDataSn = val.LOGGER_SN;
                this.$store.commit('MULTIDATASN', val.LOGGER_SN);
                console.log('数据分析---'+ this.$store.state.MultiDataSn);
                this.$router.push({path: '/multiDataQuery'});
            }
        }
    },
    mounted() {
        
        //this.getData();
    },
    activated() {
        console.log('--activated--')
        this.getData();
    },
    deactivated() {
        this.$destroy(true)
    }

}
</script>
<style lang='scss'>
.memorandumContainer {
    .title{
        padding-top: 15px;
        .el-form {
            .el-button {
                height: 30px;
            }
            .el-input input{
                border: 1px solid #ccc;
            }
        }
     
    }
    .logDataContainer {
        // width: 100%;
        .logDataContent {
            width:100%;
            // min-height: 52px;
            // padding: 10px;
            // line-height: 52px;
            margin-bottom: 20px;
            display: table;
            // overflow:hidden;
            border: 1px solid #ccc;
            .sameHeight{
                display:table-cell;
                word-break: break-all;
                padding: 15px 0;
            }
            .deleteRmark {
                border-left: 1px solid #ccc;
            }
            .logDate {

                background: #ebf8ff;
                text-align: center;


            }
            .logContext {

                padding: 15px 15px;
                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;
            }
            .logOperation {

                color: #438eb9;
                cursor: pointer;
                text-align: center;

                span {
                    display: inline-block;
                    width: 50px;
                    // height: 50px;

                }
            }
            .el-col-3, .el-col-18, .el-col {
                float: none;
            }
        }
        .el-col .el-pagination {
            text-align: right;
        }
    }
}
</style>


