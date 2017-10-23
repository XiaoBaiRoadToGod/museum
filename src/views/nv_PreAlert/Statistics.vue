<template>
  <section class='my_padding' v-loading="loading" element-loading-text="加载中" >
    <el-form :inline='true'>
    	<el-form-item label='报警类型：'  class='myLabel'>
			<el-select  class='mySelect' :data='warningSelect' v-model='defaultWarning'>
				<el-option
					v-for='item in warningSelect'
					:value='item.value'
					:label='item.label'
					:key="item.value">
					
				</el-option>
			</el-select>
    	</el-form-item>
    	<el-form-item label='采集时间：'  class='myLabel'>
    		<el-date-picker :clearable='false' v-model='startDate' :type='dateType' class='myDate' @change='formatDate' format='yyyy-MM-dd HH:mm' :picker-options='pickerOptions0' placeholder="开始时间">

			</el-date-picker>
    	</el-form-item>
    	<el-form-item label='到：'  class='myLabel'>
    		<el-date-picker :clearable='false' v-model='endDate' :type='dateType' class='myDate' @change='formatDate1' format='yyyy-MM-dd HH:mm'  :picker-options='pickerOptions1' placeholder="结束时间">

			</el-date-picker>
    	</el-form-item>
    	<el-form-item >
    		<el-button type="primary" @click='queryData'>查询</el-button>
    	</el-form-item>
    </el-form>
	<el-row type='flex' justify='space-around'>
		<el-col :span='11' class='myBorder'>
			<p class='warningTitle'>实时报警统计比例图</p>
			<el-col :span='24' id='chartPieCurve' style='height:380px'></el-col>
		</el-col>
		<el-col :span='11'>
			<el-col :span='24'  class='myBorder'>
				<p class='warningTitle'>报警处理情况</p>
				<el-col :span='24' id='chartBar' style='height: 190px'></el-col>
			</el-col>
			<el-col :span='24'  class='myBorder marginTop'>
				<p class='warningTitle'>24小时报警曲线图</p>
				<el-col :span='24' id='chartCurve' style='height: 190px'></el-col>
			</el-col>
		</el-col>
	</el-row>
    
  </section>
</template>


<script>

var today = new Date();
	today.setHours(0);
	today.setMinutes(0);
	today.setSeconds(0);
	today.setMilliseconds(0);
var oneday = 1000 * 60 * 60 * 24;
import echarts from '../../../static/js/echarts'
import { warningStatistical, warningBar, warningCurve } from '../../api/api'
	export default {
		data() {
			return {
				loading : false,
				warningSelect: [{
					value: 1,
					label: '邮件报警'
				},{
					value: 2,
					label: '短信报警'
				}],
				startDate: new Date(today - oneday * 7),
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
				defaultWarning: '邮件报警',
				chartBar:null,
				chartPieCurve: null,
				chartCurve: null
			}
		},
		props: ['dateType'],
		methods: {
			formatDate(date){
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
			queryData() {
				if(this.$route.path == '/Statistics'){
					// console.log(this.$route.path);
					this.loading = true;
					if(new Date(this.startDate).getTime() > new Date(this.endDate).getTime() || this.startDate == '' || this.endDate == '' || this.startDate == undefined || this.endDate == undefined){
	                    this.$message({
	                        type:'warning',
	                        message:'请正确选择日期!!!'
	                    })
	                    this.loading = false;
	                }else{
						var user = JSON.parse(sessionStorage.getItem('user'));
						var params = {
							groupID: this.$store.state.zhantingID,
							flag: true,
							beginTime: this.timeFormatter(this.startDate),
							endTime: this.timeFormatter(this.endDate),
							UserName: user.name
						};
						warningStatistical(params).then(res => {
							this.drawBarChart(res);	
						});
						var pieParams = {groupID: this.$store.state.zhantingID};
						warningBar(pieParams).then(res => {
							this.drawPieChart(res);
							this.loading = false;
						});
						var curveParams = {
							groupID: this.$store.state.zhantingID,
							flag: true,
							beginTime: this.timeFormatter(this.startDate),
							endTime: this.timeFormatter(this.endDate)
						};
						warningCurve(curveParams).then(res => {
							this.drawCurveChart(res);
							this.loading = false;
						})
					}
				}
			},
			drawCurveChart(datas){
				var data = [];
				for (var i = 0; i < datas.length; i++) {
					data.push(datas[i].value);
				};
				this.chartCurve = echarts.init(document.getElementById('chartCurve'));
				this.chartCurve.setOption({
					title:{
						text: null,
						subtext: '(数量：个)',
						left: '40',
						top:'-30',
						subtextStyle:{
							color: '#333',

						},
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid: {
						left:'2%',
						right: '4%',
						bottom: '3%',
						top:'10%',
						containLabel:true
					},
					xAxis: {
						type: 'category',
						
						splitLine:{show:false},
						boundaryGap:true,
						data: ['00:00',  '04:00',  '08:00', '12:00', '16:00', '20:00', '24:00']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						type:'line',
						data: data
					}],
					color: ['#58a0d0']
				})
			},
			drawPieChart(datas){
				console.log(datas);
				var name = [], data = [], datazonghe = 0;
				for (var i = 0; i < datas.length; i++) {
					
					datazonghe = datazonghe += datas[i].value;
				};
				for (var i = 0; i < datas.length; i++) {
					name.push(datas[i].name);
					data.push({value: datas[i].value, name:datas[i].name});
				};
				this.chartPieCurve = echarts.init(document.getElementById('chartPieCurve'));
				this.chartPieCurve.setOption({
					title: {
						text: '总数量',
						subtext: datazonghe + '条',
						x: 'center',
						y:'center',
						subtextStyle: {
							color: '#333',
							fontSize: '18px'
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
					},
					legend: {
						orient: 'vertical',
						x: 'right',
						data: name,
						width: '60'
					},
					series: [{
						type: 'pie',
						radius: ['50%', '70%'],
						data: data
					}],
					color: ['#b7efcc', '#3dc8b3', '#2ec3ed', '#3d91c8']
					
				})
			},
			drawBarChart(datas) {
				console.log(datas);
				var categorys = [], data = [], maxx = datas[0].value<4?4:datas[0].value+1;
				console.log(maxx);
				for (var i = 0; i < datas.length; i++) {
					categorys.push(datas[i].group);
					data.push(datas[i].value);
				};
				this.chartBar = echarts.init(document.getElementById('chartBar'));
				// console.log(this.chartBar.setOption)
				this.chartBar.setOption({
					title:{
						text:null,
						subtext: '单位：个',
						right:'0',
						top:'-30',
						subtextStyle: {
							color: '#333'
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid: {
						left:'3%',
						right: '4%',
						bottom: '3%',
						top:'10%',
						containLabel:true
					},
					xAxis: {
						type: 'value',
						// boundaryGap: true,
						splitLine: {
							show: false
						},
						minInterval:1,
						max:maxx
					},
					yAxis: {
						type: 'category',
						data: categorys,
						splitLine: {
							show: true
						}
					},
					series: [{
						type:'bar',
						label: {
							normal: {
								show: true,
								position: 'inside'
							}
						},
						data: data,
						barWidth: '30px'
					}],
					color: ['#2ec3ed']
				})
			},
			timeFormatter(value){
				var date = new Date(value);
				return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' '+ date.getHours()+':'+date.getMinutes();
			},
			formatDateTime(val){
				var date = new Date(val);
				console.log(date);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? '0'+m : m;
				var d = date.getDate();
				d = d < 10 ? ('0'+ d) : d;
				var h = date.getHours();
				var minute = date.getMinutes();
				minute = minute < 10 ? ('0'+minute) : minute;
				console.log(y +  '-' + m + '-'+d+ ' '+ h + ":"+minute);
				return y +  '/' + m + '/'+d+ ' '+ h + ":"+minute;
			},
			windowResize(){
		      var ww = $(document).innerWidth();
		      $('.content-container').width(ww - 201);
		      var hh = $(document).height();
		      // console.log(hh);
		      $('.content-wrapper').css({'height':hh - 90 - 32,'overflow':'hidden'});
		    }
		},
		mounted() {
			
			var _this = this;
			_this.queryData();

			this.$store.watch(
				function(state){
					return state.zhantingID;
				},function(){
					_this.queryData();
				},{
					deep:true
			});
			this.windowResize();
			window.onresize = function(){  
                _this.windowResize();
                
            }
			
		}
	}
</script>
<style scoped>
	.el-form-item{
		margin-bottom:15px;
	}
</style>
<style >
	.my_padding{
		padding:13px 11px;
	}
	.warningTitle{
		height: 30px;
		background: #f5f5f5;
		line-height: 30px;
		text-align: center;
		color:#666;
	}
	.myBorder{
		border:1px solid #ddd;
	}
	.marginTop{
		margin-top: 20px;
	}
</style>