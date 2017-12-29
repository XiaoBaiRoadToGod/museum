<template>
    <el-col :span='24' class='my_padding' v-loading="loading" element-loading-text="加载中" >
        <el-form :inline='true'>
            <div class='myLabelCont myInline'>
                <el-form-item label='预警等级:' class='myLabel'>
                    <el-select v-model='myGrade' @change='setGrade' class='mySelect'>
                        <el-option v-for='item in warning.grade' :key='item.value' :label='item.label' :value='item.value'>
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class='myLabelCont myInline'>
                <el-form-item label='预警类别:' class='myLabel'>
                    <el-select v-model='myCategory' @change='setCategory' class='mySelect'>
                        <el-option v-for='item in warning.category' :key='item.value' :label='item.label' :value='item.value'>
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class='myDateCont myInline'>
                <el-form-item label='查询时间:' class='myLabel'>
                    <el-date-picker :clearable='false' v-model='startDate' :type='dateType' class='myDate' @change='formatDate' format='yyyy-MM-dd HH:mm' :picker-options='pickerOptions0' placeholder="开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label='到:' class='myLabel'>
                    <el-date-picker :clearable='false' v-model='endDate' :type='dateType' class='myDate' @change='formatDate1' format='yyyy-MM-dd HH:mm' :picker-options='pickerOptions1' placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div class='myQueryCont myInline'>
                <el-form-item>
                    <el-button type="primary" @click='queryWarningData'>查询</el-button>
                    <!-- <el-button>导出数据</el-button> -->
                </el-form-item>
            </div>
        </el-form>
        <el-col class='block' :span="24">
            <el-table :data='warningData' border fit stripe class="warningTable" width='100%'>
                <el-table-column prop='monitoring' label='监测点'>
                </el-table-column>
                <el-table-column prop='instrument' label='仪器名称'>
                </el-table-column>
                <el-table-column prop='instrumentState' label='仪器运行状态'>
                </el-table-column>
                <el-table-column prop='showRoom' label='所属展厅'>
                </el-table-column>
                <el-table-column prop='warningDate' label='报警发生时间'>
                </el-table-column>
                <el-table-column prop='warningText' label='报警内容' width='300'>
                </el-table-column>
                <el-table-column prop='warningGrade' label='报警等级'>
                </el-table-column>
                <el-table-column prop='warningCate' label='报警类别'>
                </el-table-column>
            </el-table>
            <el-pagination class='myPageination' layout=' sizes, ->, prev, pager, next' :page-size='pageSize' :current-page='pageIndex' :total='pageNum' :page-sizes='pageSizes' @size-change='sizeChange' @current-change='pageIndexChange'>
            </el-pagination>
        </el-col>
    </el-col>
</template>
<script>


var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
var oneday = 1000 * 60 * 60 * 24;
import {
    warningQuery,
    warningQueryList
} from '../../api/api'
export default {
    data() {
            return {
                loading : false,
                warning: {
                    grade: [{
                        value: 5,
                        label: '全部'
                    }, {
                        value: 0,
                        label: '正常'
                    }, {
                        value: 1,
                        label: '一般'
                    }, {
                        value: 2,
                        label: '严重'
                    }, {
                        value: 3,
                        label: '致命'
                    }],
                    category: [{
                        value: 1,
                        label: '邮件报警'
                    }, {
                        value: 2,
                        label: '短信报警'
                    }]
                },
                myGrade: '',
                myCategory: '邮件报警',
                startDate: new Date(today - oneday * 6),
                endDate: new Date(),
                pickerOptions0: {
                  disabledDate(time) {
                    return time.getTime() > Date.now();
                  }
                },
                pickerOptions1: {
                  disabledDate(time) {
                    return time.getTime() > Date.now();
                  }
                },
                gradeNum: '5',
                categoryNum: '1',
                warningData: [],
                pageSize: 10,
                pageIndex: 1,
                pageNum: Number(''),
                pageSizes: [10, 15, 20]
            }
        },
        props: ['dateType'],
        methods: {
            setGrade() {
                this.gradeNum = this.myGrade;
            },
            setCategory() {
                this.categoryNum = this.myCategory;
            },
            timeFormatter(value) { // 格式化时间

                var date = new Date(Date.parse(value.replace("/Date(", "").replace(")/", "").replace("-", '/').replace('T', ' ').split("+")[0]));
                return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
            },
            moitoring(num) { // 判断监测点
                if (num == 0) {
                    return '展厅'
                } else if (num == 1) {
                    return '库房'
                } else {
                    return '馆外监测站'
                }
            },
            judgeState(num) {
                if (num == 0) {
                    return '停止运行'
                } else {
                    return '正常运行'
                }
            },
            judgeGrade(num) {
                if (num == 0) {
                    return '正常'
                } else if (num == 1) {
                    return '一般'
                } else if (num == 2) {
                    return '严重'
                } else {
                    return '致命'
                }
            },
            getData() {
                // if(this.$route.path == '/Inquire'){
                    this.loading = true;
                    if(new Date(this.startDate).getTime() > new Date(this.endDate).getTime() || this.startDate == '' || this.endDate == '' || this.startDate == undefined || this.endDate == undefined){
                        this.$message({
                            type:'warning',
                            message:'请正确选择日期!!!'
                        })
                        this.loading = false;
                    }else{
                        var params = {
                            groupID: this.$store.state.zhantingID,
                            beginTime: this.timeFormatter(this.startDate),
                            endTime: this.timeFormatter(this.endDate),
                            grade: this.myGrade == '全部' ? 5 : this.myGrade,
                            mode: this.myCategory == '邮件报警' ? 1 : this.myCategory,
                            flag: true
                        };
                        warningQuery(params).then(res => {
                            this.pageNum = res.length;
                        });
                        var paramsData = {
                            groupID: this.$store.state.zhantingID,
                            beginTime: this.timeFormatter(this.startDate),
                            endTime: this.timeFormatter(this.endDate),
                            grade: this.myGrade == '全部' ? 5 : this.myGrade,
                            mode: this.myCategory == '邮件报警' ? 1 : this.myCategory,
                            flag: true,
                            pageIndex: this.pageIndex - 1,
                            pageSize: this.pageSize
                        };
                        warningQueryList(paramsData).then(res => {
                            console.log(res);
                            this.warningData = [];
                            if (this.myCategory == 2) {
                                for (var i = 0; i < res.length; i++) {
                                    this.warningData.push({
                                        'monitoring': this.moitoring(res[i].ToGroups.GROUP_CATEGORY),
                                        'instrument': res[i].LoggerInfo.LOGGER_NAME,
                                        'instrumentState': this.judgeState(res[i].LoggerInfo.LOGGER_STATE),
                                        'showRoom': res[i].ToGroups.GROUP_NAME,
                                        'warningDate': this.timeFormatter(res[i].AlarmsSms.ALARM_CREATE_TIME),
                                        'warningText': res[i].AlarmsSms.ALARM_MSG,
                                        'warningGrade': this.judgeGrade(res[i].AlarmsSms.ALARM_LEVEL),
                                        'warningCate': '短信报警'
                                    })
                                }
                                this.loading = false;
                            } else {
                                for (var i = 0; i < res.length; i++) {
                                    this.warningData.push({
                                        'monitoring': this.moitoring(res[i].ToGroups.GROUP_CATEGORY),
                                        'instrument': res[i].LoggerInfo.LOGGER_NAME,
                                        'instrumentState': this.judgeState(res[i].LoggerInfo.LOGGER_STATE),
                                        'showRoom': res[i].ToGroups.GROUP_NAME,
                                        'warningDate': this.timeFormatter(res[i].AlarmEmail.ALARM_CREATE_TIME),
                                        'warningText': res[i].AlarmEmail.ALARM_MSG,
                                        'warningGrade': this.judgeGrade(res[i].AlarmEmail.ALARM_LEVEL),
                                        'warningCate': '邮件报警'
                                    })
                                }
                                this.loading = false;
                            }

                        })
                    }
                // }
            },
            pageIndexChange(pageIndex) {
                this.pageIndex = pageIndex;
                this.getData();
            },
            sizeChange(pageSize) {
                this.pageSize = pageSize;
                this.getData();
            },
            formatDate(date) {
                // this.startDate = date;
            },
            formatDate1(val) {
                var newDate = new Date();
                var chooseDate = new Date(Date.parse(val.replace(/-/g, "/")));
                var stopDateTime = new Date(Date.parse(val.replace(/-/g, '/')));
                    stopDateTime.setHours(23);
                    stopDateTime.setMinutes(59);
                    stopDateTime.setSeconds(59);
                if(chooseDate.getDate() == newDate.getDate()){
                    this.endDate = this.formatDateTime(new Date());
                }else{
                    this.endDate = this.formatDateTime(stopDateTime);
                }
                // this.endDate = val;
            },
            formatDateTime(val){
                var date = new Date(val);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? '0'+m : m;
                var d = date.getDate();
                d = d < 10 ? ('0'+ d) : d;
                var h = date.getHours();
                var minute = date.getMinutes();
                minute = minute < 10 ? ('0'+minute) : minute;
                return y +  '/' + m + '/'+d+ ' '+ h + ":"+minute;
            },
            queryWarningData() {
                this.getData();
            },
            getID(){
                this.myGrade = '全部';
            },
            windowResize(){
              var ww = $(document).width();
              $('.content-container').width(ww - 201);
              var hh = $(document).height();
              $('.content-wrapper').css({'height': hh-90-32, 'overflow-y':'auto'});
            },
            timeFormatter(value){
                var date = new Date(value);
                return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+ ' '+ date.getHours()+':'+date.getMinutes();
            }
        },
        mounted() {
            console.log(this.dateType);
            this.getData();
            this.getID();
            this.windowResize();
            var _this = this;
            this.$store.watch(
                function(state) {
                    return state.zhantingID;
                },
                function() {
                    _this.getData();
                    _this.getID();
                }, {
                    deep: true
                });
            window.onresize = function(){  
               _this.windowResize();
                
            }
            // this.SystemWH();
        }
}
</script>
<style >
.my_padding{
    padding:16px 11px;
}
.myPageination .el-select .el-input input{
    text-indent:0;
}
.myLabel label {
    padding: 5px 12px 5px 10px;
}

.mySelect .el-input input {
    height: 24px;
    width: 110px;
    padding-left: 15px;
    text-align: center;
    text-indent: 0;
    background: #fff;
    border: 1px solid #ddd;
}

.myDate input {
    height: 24px;
    text-indent: 0;
    background: #fff;
    border: 1px solid #ddd;
}
.myDate .el-input__icon+.el-input__inner{
    padding-right:0;
}
.myLabelCont {
    min-width: 205px;
}

.myDateCont {
    min-width: 450px;
}

.myLabel .el-date-editor.el-input {
    width: 165px;
}

.myQueryCont {
    max-width: 180px;
}

.myQueryCont button {
    height: 24px;
}

.myInline {
    display: inline-block;
}

.warningTable th {
    background: #ececec;
}
</style>
