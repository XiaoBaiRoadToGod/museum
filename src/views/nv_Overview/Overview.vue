<template>
<el-row type='flex' justify='space-between' class='myMain my_padding' >
	<el-col :span='8' class='myBorder myLeft'>
		<el-col :span='24' class='title'><i class='gailanIcon'></i>博物馆概览</el-col>
		<el-col :span='24' class="imgCont"><img  v-bind:src='imgUrl' alt=""></el-col>
		<el-col :span='24' class='fontSize18'>博物馆简介</el-col>
		<el-col :span='24' class='detail'>{{detail}}</el-col>
		<el-col :span='24' class='moreDetail'><a :href="detailsUrl" target='_blank'><i class='el-icon-caret-right'></i>更多详情</a></el-col>
	</el-col>
	<el-col :span='16' class="borderCont">
		<el-col :span='24' class='myBorder'>
			<el-col :span='24' class='title'><i class="linshiIcon"></i>{{ viewName }}</el-col>
			
			<el-col :span='11' class='right20'>
				<span class='shebeiTitle'>文物保存环境状态汇总</span>
				<el-table :data='environmentState'>
					<el-table-column prop='name' label='文物名称'></el-table-column>
					<el-table-column prop='num' label='超标数量'></el-table-column>
					<el-table-column prop='sum' label='文物总数'></el-table-column>
				</el-table>
			</el-col>
			<el-col :span='11' class='right20'>
				<span class='shebeiTitle'>监测设备运行状况汇总</span>
				<el-table :data='shebeiState' class='my-el-table'>
					<el-table-column prop='name' label='设备名称'></el-table-column>
					<el-table-column prop='num' label='设备数量'></el-table-column>
					<el-table-column prop='sum' label='异常数量'></el-table-column>
					<el-table-column prop='chaoB' label='超标数量'></el-table-column>
				</el-table>
			</el-col>
			
		</el-col>
		<el-col :span='24' class='myBorder' v-if='!quanguanInfo'>
			<el-col :span='24' class='title'><i class='quanIcon'></i>全馆运行环境情况监测</el-col>
			
			<el-col :span='11' class='right20'>
				<span class='shebeiTitle'>文物保存环境状态汇总</span>
				<el-table :data='quanguanEnState'>
					<el-table-column prop='name' label='文物名称'></el-table-column>
					<el-table-column prop='num' label='超标数量'></el-table-column>
					<el-table-column prop='sum' label='文物总数'></el-table-column>
				</el-table>
			</el-col>
			<el-col :span='11' class='right20'>
				<span class='shebeiTitle'>监测设备运行状况汇总</span>
				<el-table :data='quanguShebeiState'>
					<el-table-column prop='name' label='设备名称'></el-table-column>
					<el-table-column prop='num' label='异常数量'></el-table-column>
					<el-table-column prop='chaoB' label='超标数量'></el-table-column>
				</el-table>
			</el-col>
			
		</el-col>
		<el-col :span='24' v-if='quanguanInfo' v-loading='loading' element-loading-text="加载中">
			<el-col :span='24' align='left' style='margin-bottom:10px;'>
				
				<span style="width:50px;" class='textButton' @click='bianjiDialog = true'>编辑</span>
				<el-dialog :visible.sync='bianjiDialog' title='添加设备' class='overViewDialog' @close="closeDialog">
					  <div class='checkGroup'>
					  	<span class='checkTitle' style='border-bottom:1px solid #ccc'>展厅设备</span>
					  	<div class='checkList'>
					  		<el-checkbox-group v-model="checkedLoggers" @change="loggersChange">
							    <el-checkbox v-for="(city,idx) in loggers" :label="city.key" :key="city.name">{{city.name}}</el-checkbox>
							</el-checkbox-group>
					  	</div>
					  	<span class='checkTitle' style='border-top:1px solid #ccc'> <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="AllCheckChange"></el-checkbox>共选择 {{ num }} 项</span>
					  </div>
					  <span slot="footer" class="">
					    <el-button @click="closeDialog">取 消</el-button>
					    <el-button type="primary" @click="okDialog">确 定</el-button>
					  </span>
				</el-dialog>
				<span style="width:80px;" class='textButton' @click='setDate'>时间设定</span>
				<el-dialog class='setDialog' title='请设定时间' :visible.sync='setDialog' top='40%'>
					<div style='height:78px;line-height:78px;'>请设置时间： <input v-model='setDay' type="number" class='setInput'>  天</div>
					<span slot="footer" class="footer">
					    <el-button @click="closeDialog">取 消</el-button>
					    <el-button type="primary" @click="okSetDialog">确 定</el-button>
					  </span>
				</el-dialog>
				<span class='overViewInput' >{{myDay}}天</span>
			</el-col>
			<el-col :span='24' class='myBorder'>
				<el-table
					:data='overViewTableData'
					border
					>
					<el-table-column
						prop='name'
						label='设备名称'>
						
					</el-table-column>
					<el-table-column
						prop='location'
						label='设备位置'>
						
					</el-table-column>
					<el-table-column
						prop='temp'
						label='平均温度(℃)'>
						
					</el-table-column>
					<el-table-column
						prop='humi'
						label='平均湿度(%)'>
						
					</el-table-column>
					<el-table-column
						prop='tempMaxVal'
						label='温度最大值'>
						
					</el-table-column>
					<el-table-column
						prop='tempMinVal'
						label='温度最小值'>
						
					</el-table-column>
					<el-table-column
						prop='humiMaxVal'
						label='湿度最大值'>
						
					</el-table-column>
					<el-table-column
						prop='humiMinVal'
						label='湿度最小值'>
						
					</el-table-column>
					<el-table-column
						
						label='操作'>
						<template scope='scope'>
							<el-button type='text' @click.native.prevent="deleteRow(scope.$index, overViewTableData)">删除</el-button>
						</template>
					</el-table-column>
					
				</el-table>
			</el-col>
		</el-col>

	</el-col>

</el-row>
</template>

<script>
import qs from 'qs'
// 博物馆信息
import { museumInfo, wenwuEnvir, wenwuFacility, GetOverviewGroupLoggers,AddOverviewGroupLoggers, DeleteOverviewGroupLoggers, GetOverviewGroupDetails } from '../../api/api'
// 文物环境状态
// http://www.shenzhenmuseum.com.cn/   深圳博物馆的地址
// http://www.njmuseum.com/  南京博物院的地址
import {mapState} from 'vuex'
	export default {
		data() {
			return {
				zhantingID: this.$store.state.zhantingID,
				imgUrl:'',
				detail:'',
				environmentState: [],   //临时博物馆文物保存环境状态汇总
				shebeiState: [],          //临时博物馆设备运行状态汇总
				quanguanEnState:[],		//全馆文物保存环境状态汇总
				quanguShebeiState:[],		//全馆设备运行状态汇总
				user:'',
				viewName: '',
				overViewTableData:[],    //平均温湿度表格
				bianjiDialog: false,
				checkedLoggers:[], // 选择的的设备
				loggers:[],  // 未分组设备
				checkAll:false, 
				isIndeterminate:true,
				num: 0,     // 共选择了多少
				myDay: 7,
				setDay: null,
				setDialog: false,
				loading: false,
				quanguanInfo: true,     //  深博、国博、南博为true, 其他false
				// detailsUrl:'http://www.chnmuseum.cn/'         // 中国国家博物馆
				// detailsUrl:'http://www.njmuseum.com/'         // 南京博物馆
				// detailsUrl:'http://www.shenzhenmuseum.com/'   // 深圳博物馆
				// detailsUrl:'http://www.zyxbwg.cn'                // 镇原县博物馆
				// detailsUrl: 'http://www.zlbwg.com/'           //庄浪县博物馆
				// detailsUrl: 'http://www.jcsbwg.com'           //金昌市博物馆
				// detailsUrl: 'http://www.tssbwg.com.cn/'           //天水市博物馆
				detailsUrl: 'http://www.huato.com'
			} 
		},
		methods: {
			myReg(val){
				var reg = /\.\d/g;
				var reg1 = /(\-)+/g;
				var reg2 = /^\d+(\.\d)?$/;
				var reg3 = /^(\d)*$/;
				var reg4 = /^\+/g;
				if(val == null){

				}else{
					if(reg.test(val)){
						return true;
					}else{
						console.log(val);
						console.log(reg1.test(val));
						if(reg1.test(val)){
							return true;
						}else{
							if(reg4.test(val)){
								return true;
							}else{
								console.log(reg3.test(val));
								if(reg3.test(val)){
									return false;
								}else{
									return true;
								}
							}

						}
					}
				}

			},
			setDate(){
				this.setDialog = true;
				console.log(this.myDay);
				this.setDay = '';
				console.log(this.setDay);
				this.setDay = this.myDay;
				console.log(this.setDay);
				
			},
			okSetDialog(){
				
				console.log('-'+this.setDay+'-');
				if(this.myReg(this.setDay) || this.setDay == ''){
					this.$message({
						type:'warning',
						message:'请输入正确的天数！！！'
					})
				}else{
					// this.setDay.replace('.','');
					this.setDialog = false;
					this.myDay = parseInt(this.setDay);
					this.getGroupData();
				}
				
			},
			deleteRow(idx, rows){
				console.log(rows[idx].sn);
				var params = { sn: rows[idx].sn };
				DeleteOverviewGroupLoggers(params).then(res => {
					console.log(res);
					if(res == 200){
						this.$message({
							type:'success',
							message:'删除成功！！！'
						});
						this.getLoggers();
						this.getGroupData();
					}else{
						this.$message({
							type:'warning',
							message:'删除失败！！！'
						})
					}
				})
			},
			loggersChange(value){
				console.log(value);
				console.log(this.checkedLoggers);
				this.num = value.length;
				this.checkAll = value.length === this.loggers.length;
				this.isIndeterminate = value.length > 0 && value.length < this.loggers.length
			},
			AllCheckChange(event){
				console.log(event.target.checked);
				console.log(this.loggers);
				var logg = [];
				for(var j = 0;j<this.loggers.length;j++){
					logg.push(this.loggers[j].key);
				}
				this.checkedLoggers = event.target.checked ? logg : [];
				this.num = this.checkedLoggers.length;
				this.isIndeterminate = false;
				console.log(this.checkedLoggers)
			},
			closeDialog(){
				this.bianjiDialog = false;
				this.checkedLoggers = [];
				this.num = 0;
				this.checkAll = false;
				// console.log(this.isIndeterminate)
				this.setDialog = false;
			},
			okDialog(){
				if(this.checkedLoggers.length){
					var params = { sn: this.checkedLoggers.join(',').replace('"',"")};
					console.log(params);
					AddOverviewGroupLoggers(params).then(res => {
						console.log(res);
						if(res == 200){
							this.$message({
								type:'success',
								message:'添加成功！！！'
							});
							this.checkedLoggers = [];
							this.num = 0;
							this.getLoggers();
							this.getGroupData();
						}else{
							this.$message({
								type:'warning',
								message:'添加失败！！！'
							})
						}
					})
					this.bianjiDialog = false;
				}else{
					this.$message({
						type:'warning',
						message:'请选择设备！！！'
					})
				}
			},
			getGroupData(){
				this.loading = true;
				var params = {day: this.myDay};
				GetOverviewGroupDetails(params).then(res => {
					console.log(res);
					this.loading = false;
					this.overViewTableData = [];
					for(var i = 0;i<res.length;i++){
						this.overViewTableData.push({
							'name':res[i].LOGGER_NAME,
							'location':res[i].Position ,
							'temp': res[i].Ch1Avg || 0,
							'humi': res[i].Ch2Avg || 0,
							'tempMaxVal': res[i].Ch1Max || 0,
							'tempMinVal': res[i].Ch1Min || 0,
							'humiMaxVal': res[i].Ch2Max || 0,
							'humiMinVal': res[i].Ch2Min || 0,
							'sn': res[i].LOGGER_SN
						})
					}
				})
			},
			handleClose(){
				console.log('---');
				this.checkedLoggers = [];
				this.checkAll = false;
				
			},
			getData () {
				this.zhantingID = this.$store.state.zhantingID;
				var params = { SName: this.zhantingID };
				//console.log(params);
				wenwuEnvir(params).then(res => { // 获取临时展厅文物汇总
					//console.log(this.environmentState)
					this.environmentState = [];  // 清空数组
					// console.log(res);
					if(res != null){
						for(var i = 0; i<res.length; i++){
							this.environmentState.push({'name':res[i].name,'num':res[i].value,'sum':res[i].values});
						}
					}
				});
				wenwuFacility(params).then(res => { // 获取临时展厅运行汇总
					this.shebeiState = [];
					// console.log(res);
					if(res != null){
						for(var i = 0; i<res.length; i++){
							this.shebeiState.push({'name':res[i].name,'num':res[i].value,'sum':res[i].values,'chaoB': res[i].valuess});
						}
					}
					//console.log(shebeiState)
				});
				if(this.quanguanInfo){
					this.getLoggers();
				}
				

			},
			getLoggers(){
				var loggerParams = { groupid: this.zhantingID };
					GetOverviewGroupLoggers(loggerParams).then(res => {
						console.log(res);
						this.loggers = [];
						var allLoggers = [],notGroupLoggers = [];
						allLoggers = res[0].one;
						var groupLogger = res[0].tue;
						if(groupLogger.length != 0){
							for(var i = 0; i< groupLogger.length;i++){
								for(var j = 0;j<allLoggers.length;j++){
									if(groupLogger[i].LOGGER_SN == allLoggers[j].LOGGER_SN){
										allLoggers.splice(j,1);
										j = j-1 < 0 ? 0 : j-1;
									}
								}
							};
							for(var k = 0; k<allLoggers.length;k++){
								this.loggers.push({
									name:allLoggers[k].LOGGER_NAME,
									key:allLoggers[k].LOGGER_SN
								})
							}
						}else{
							for(var i = 0; i < allLoggers.length; i++){
								this.loggers.push({
									'key': allLoggers[i].LOGGER_SN,
									'name': allLoggers[i].LOGGER_NAME
								})
							}
						}
						console.log(this.loggers);

					});
				
					this.getGroupData();
			},
			windowResize(){
		      var ww = $(document).width();
		      $('.content-container').width(ww - 201);
		      var hh = $(document).height();
		      // console.log(hh);
		      $('.content-wrapper').css({'height':hh - 90 - 32,'overflow-y':'auto'});
		    },
		    changeZhanName(){
		    	// console.log(this.$store.state.overViewName);
		    	// console.log(this.$store.state.zhantingID);
		    	var zhantingGroup = this.$store.state.overViewName;
		    	var zhantingId = this.$store.state.zhantingID;
		    	if(zhantingGroup != null){
			    	for (var i = 0; i < zhantingGroup.length; i++) {
			    		if(zhantingGroup[i].GROUP_ID == zhantingId){
			    			this.viewName = zhantingGroup[i].GROUP_NAME;
			    			break;
			    		}
			    	}
			    }
		    }
		},
		updated(){
			this.changeZhanName();
		},
		mounted() {
			var _this = this
			museumInfo().then(res => { // 获取博物馆信息
				// console.log(res);
				this.imgUrl = res.ImageURL;
				this.detail = res.MDetails;
			});
			var quanParams = { SName: '' };
			wenwuEnvir(quanParams).then(res => { // 获取全馆展厅文物汇总
				// console.log(res);
				if(res != null){
					for(var i = 0; i<res.length; i++){
						this.quanguanEnState.push({'name':res[i].name,'num':res[i].value,'sum':res[i].values});
					}
				}
				//console.log(quanguanEnState)
			});
			wenwuFacility(quanParams).then(res => { // 获取全馆展厅运行汇总
				console.log(res);
				if(res != null){
					for(var i = 0; i<res.length; i++){
						this.quanguShebeiState.push({'name':res[i].name,'num':res[i].value,'sum':res[i].values,'chaoB': res[i].valuess});
					}
				}
			});
			// this.getData();
			if(this.environmentState == ''){
				this.getData();
			};
			
			this.$store.watch(
				function(state){
					return state.zhantingID;
				},function(){
					// console.log('gaibian',_this.getData())

					_this.getData();
					_this.changeZhanName();
				},{
					deep:true
			});
			this.windowResize();
			window.onresize = function(){  
				// console.log('resize')
               _this.windowResize();
                
            }
		},
		activated() {
			console.log('----')
			var ww = $('.my-el-table').width();
			$('.my-el-table div table').width(ww);
		}
	}

</script>
<style  media="screen">
.overViewDialog .el-dialog--small{
	width: 390px;
	height:468px;
	padding: 0 28px;
}
.overViewDialog .checkGroup{
	width: 256px;
	height:320px;
	margin-top:15px;
	border:1px solid #ccc;
}
.checkGroup .checkTitle{
	display: inline-block;
	width: 241px;
	height:36px;
	line-height: 36px;
	padding-left: 15px;
}
.checkGroup .checkList{
	height: 247px;
	overflow-y: auto;
}
.checkList .el-checkbox {
    margin-left: 15px;
    height:30px;
	line-height: 30px;
}
.checkList .el-checkbox__input .el-checkbox__inner{
	width: 14px;
	height:14px;
}
.checkList .el-checkbox__input .el-checkbox__inner:after{
	height: 6px;
    left: 3px;
}
.checkList .el-checkbox{
	font-size: 14px;
	color:#525252;
}
.textButton{
	display: inline-block;
	height:26px;
	line-height: 26px;
	color:#6fb3e0;
	font-size: 16px;
	text-align: center;
	cursor: pointer;
	margin-right: 10px;
	border-bottom: 1px solid #6fb3e0;
}
.overViewInput{
	display: inline-block;
	width: 60px;
	height:26px;
	line-height: 26px;
	border:1px solid #ccc;
	border-radius: 8px;
	text-align: center;
	color:#666;
}
.overViewInput.el-input input{
	display: inline-block;
	
	height:26px;
	border:1px solid #ccc;
	padding-left: 8px;
	text-indent: 1em;
}
.my_padding{
	padding:13px 11px;
}
.myLeft{
	min-height: 450px; 
	max-height:550px;
}
.setDialog .el-dialog--small{
	width: 390px;
	height: 196px;
}
.setDialog .setInput{
	width: 66px;
	height:20px;
	padding-left: 5px;
	border:1px solid #ffb752;
	border-radius: 6px;
	outline: none;
}
	.right20 .el-table{
		border:none;
	}
	.right20 .el-table td, .right20 .el-table th.is-leaf{
		border:none;
	}
	.el-table:after{
		width:0;
	}
	.el-table::before{
		height:0;
	}
	.el-table__fixed-header-wrapper thead div, .el-table__header-wrapper thead div, .el-table th{
		background: #fff;
	}
	.el-table{
		color:#666;
	}
	.gailanIcon{
		background-position: -119px -226px;
	}
	.linshiIcon{
		background-position: -119px -264px;
	}
	.quanIcon{
		background-position: -119px -264px;
	}
	.imgCont{
		padding: 10px;
	}
/*	.borderCont .myBorder{
		height:246px;
	}*/
	.right20{
		margin-left: 20px;
	}
	/*.el-table__body-wrapper{
		overflow:hidden;
	}*/
</style>
<style lang='scss' scoped>
	.el-table--hidden {
     visibility: visible; 
	}
	.myMain{
		/*padding-top: 10px;*/
		.myBorder{
			border:1px solid #ddd;
			margin-bottom: 20px;
    		vertical-align: middle;
    		display: table-cell;
    		text-align: center;
    		margin-right: 20px;

    		.imgCont{
				img {
					width:100%;
				}
    		}

			.title{
				height: 44px;
				line-height: 44px;
				background: #efeff0;
				padding-left: 20px;
				text-align: left;
				font-size: 14px;
				color:#333;
				i {
					display: inline-block;
					width: 28px;
					height:28px;
					vertical-align: middle;
					background-image: url(/static/img/icon.png) ;
					background-repeat: no-repeat;
					margin-right: 20px;
				}
			}
			.fontSize18{
				font-size: 18px;
				text-align: left;
				padding-left: 12px;
			}
			.detail{
				/*height:185px;*/
				overflow:hidden;
				color:#666;
				padding:10px 12px 0;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 6;
				text-align: left;
			}
			.moreDetail{
				text-align: right;
				padding-right: 22px;
				margin-top: 20px;
				color:#b2865d;
				a{
					color:#b2865d;
					text-decoration: none;
				}
			}
			.shebeiTitle{
				display: block;
				font-size: 16px;
				height: 40px;
				line-height: 40px;
				text-align: left;

			};
		}

	}
</style>
