<template>
	<el-row type="flex" justify="space-around" class='my_padding' v-loading="loading" element-loading-text="加载中" >
		<el-col :span='24'  >
			<el-table :data='controlData' border stripe  class='myTable' style='width:100%'>
				<el-table-column prop='name' label='名称' ></el-table-column>
				<el-table-column prop='device' label='设备类型' min-width='140'></el-table-column>
				<el-table-column prop='location' label='安装位置' ></el-table-column>
				<el-table-column label='温度(℃)' min-width='70'>
					<template slot-scope='scope'>
						<span :style='{color:controlData[scope.$index].Tcolor}'>{{ controlData[scope.$index].temp }}</span>
					</template>
				</el-table-column>
				<el-table-column label='湿度(%)' >
					<template slot-scope='scope'>
						<span :style='{color:controlData[scope.$index].Hcolor}'>{{ controlData[scope.$index].humi }}</span>
					</template>
				</el-table-column>
				<el-table-column prop='setTemp' label='设置温度(℃)' min-width='94'></el-table-column>
				<el-table-column prop='setHumi' label='设置湿度(%)' min-width='90'></el-table-column>
				<el-table-column  label='设备状态' >
					<template slot-scope='scope'>
						<span :style="{color:controlData[scope.$index].stateColor}">{{ controlData[scope.$index].state }}</span>
					</template>
				</el-table-column>
				<!-- <el-table-column  label='冷凝片状态' min-width='90'>
					<template slot-scope='scope'>
						<span :style='{color:controlData[scope.$index].condenColor}'>{{ controlData[scope.$index].conden }}</span>
					</template>
				</el-table-column> -->
				<!-- <el-table-column label='水箱温度'>
					<template slot-scope='scope'>
						<span :style='{color:controlData[scope.$index].Wcolor}'>{{ controlData[scope.$index].waterTank }}</span>
					</template>
				</el-table-column> -->
				<el-table-column  label='液位状态'>
					<template slot-scope='scope'>
						<img v-bind:src="controlData[scope.$index].imgUrl" class='levelImg'>
					</template>
				</el-table-column>
				<el-table-column  label='操作' min-width='145'>
					<template slot-scope='scope'>
						<el-button :disabled='controlData[scope.$index].buttonDisabled' @click.native.preven='setSomething(scope.$index,controlData)'>设置</el-button>
							<!-- 展柜小型电子恒湿机  弹出框 -->
						<el-dialog  :visible.sync="dialogSmallVisible" class='myDialog' @close="btnCancel" v-if='deviceState != []'>
								<p class='myTitle'>{{deviceState[0].hantang==true?'汉唐恒湿机':'展柜小型电子恒湿机'}} </p>
								<h3>状态信息</h3>
								<div class='deviceStateCont1 deviceStateCont' v-show='!deviceState[0].hantang'>
									
									<span class='StateText' >电源状态:</span><span class='stateImg'><img :src="deviceState[0].CompressH " ></span>
									<span class='StateText'>水位状态:</span><span class='stateImg' :style='{color:deviceState[0].waterColor}'>{{deviceState[0].CompressO}} </span>
									<span class='StateText'>风扇状态:</span><span class='stateImg'><img :src="deviceState[0].MainBlowerO " ></span>
									<span class='StateText'>设备温度:</span><span class='stateImg' :style='{color:deviceState[0].shebeiColor}'>{{deviceState[0].LoggerTemp}} </span>
									<span class='StateText'>传感器状态:</span><span class='stateImg'><img :src="deviceState[0].CompressL " ></span>
									<span class='StateText'>冷凝片状态:</span><span class='stateImg' :style='{color:deviceState[0].lingNingColor}'>{{deviceState[0].MainBlower}} </span>
								</div>
								<div class='deviceStateCont1 deviceStateCont' v-show='deviceState[0].hantang'>
									<span class='StateText'>水位状态:</span><span class='stateImg' :style='{color:deviceState[0].waterColor}'>{{deviceState[0].CompressO}} </span>
								</div>
								<p class=''>当前湿度是{{ RealHumi }}%，请设置湿度</p>
								<input v-model='setHumi' type="number" class='myInput smallInput cleanInput' >
								<span slot="footer" class="dialog-footer DialogFooter">
									<el-button @click="btnCancel">取 消</el-button>
		    						<el-button type="primary" @click="btnConfirm1">确 定</el-button>
		    					</span>
						</el-dialog>
						<!-- 展柜大型电子恒湿机  弹出框 -->
						<el-dialog  :visible.sync="dialogLargeVisible" class='myDialog' @close="btnCancel">
							<div class='dialogContent'>
								<p class='myTitle'>展柜大型电子恒湿机</p>
								<h3>状态信息</h3>
								<div class='deviceStateCont' >
								
									<span class='StateText'>压缩机高压:</span><span class='stateImg'><img :src="deviceState[0].CompressH " ></span>
									<span class='StateText'>高水位开关:</span><span class='stateImg'><img :src="deviceState[0].HWater " ></span>
									<span class='StateText'>送风机过载:</span><span class='stateImg'><img :src="deviceState[0].MainBlowerO " ></span>
									<span class='StateText'>压缩机低压:</span><span class='stateImg'><img :src="deviceState[0].CompressL " ></span>
									<span class='StateText'>低水位开关:</span><span class='stateImg'><img :src="deviceState[0].LWater " ></span>
									
									<span class='StateText'>报警状态:</span><span class='stateImg'><img :src="deviceState[0].AlarmState " > </span>
									<span class='StateText'>压缩机过载:</span><span class='stateImg'><img :src="deviceState[0].CompressO " ></span>
									<span class='StateText'>漏水报警开关:</span><span class='stateImg'><img :src="deviceState[0].OWater " ></span>
									
									<span class='StateText'>水箱温度:</span><span class='stateImg'>{{deviceState[0].LoggerTemp}} </span>
									<span class='StateText'>制冷除湿机压缩机:</span><span class='stateImg'><img :src="deviceState[0].Compresser " ></span>
									<span class='StateText'>水箱补水电磁阀:</span><span class='stateImg'><img :src="deviceState[0].IntoFlood " ></span>
									<span class='StateText'>系统送风机:</span><span class='stateImg'><img :src="deviceState[0].MainBlower " > </span>
									<span class='StateText'>制热加湿加热器:</span><span class='stateImg'><img :src="deviceState[0].AddHumi " ></span>
									<span class='StateText'>漏水断水电磁阀:</span><span class='stateImg'><img :src="deviceState[0].OutFlood " > </span>
								</div>
								<div class='fl'>
									<span class='realHumi'>当前湿度：{{ RealHumi }}%</span>
									<span class='realHumi'>
										<span>设置湿度：</span><input v-model='setHumi' type="number" class='myInput cleanInput laegeInput'>
									</span>
								</div>
								<div class='fr'>
									<p class='myResetWarning' @click='resetWarning'>预警复位</p>
								</div>
									
							</div>
							
								<span slot="footer" class="dialog-footer">
									<el-button @click="btnCancel">取 消</el-button>
		    						<el-button type="primary" @click="btnConfirm2">确 定</el-button>
		    					</span>
						</el-dialog>
						<!-- 加湿除湿净化一体机 -->
						<el-dialog  :visible.sync="dialogAIO" class='myDialog' @close="btnCancel" top='8%'>
							<div class='dialogContent'>
								<p class='myTitle'>{{deviceState[0].displayNone == true?'加湿除湿净化一体机v2':'加湿除湿净化一体机'}}</p>
								<h3>状态信息</h3>
								<div class='deviceStateCont' v-if='!deviceState[0].displayNone'>
								
									<span class='StateText' >压机高压:</span><span class='stateImg' ><img :src="deviceState[0].CompressH " ></span>
									<span class='StateText'>高水位开关:</span><span class='stateImg'><img :src="deviceState[0].HWater " ></span>
									<span class='StateText'>主风机过载:</span><span class='stateImg'><img :src="deviceState[0].MainBlowerO " ></span>

									<span class='StateText'>压机低压:</span><span class='stateImg'><img :src="deviceState[0].CompressL " ></span>
									<span class='StateText'>低水位开关:</span><span class='stateImg'><img :src="deviceState[0].LWater " ></span>
									<span class='StateText'>报警状态:</span><span class='stateImg'><img :src="deviceState[0].AlarmState " > </span>

									<span class='StateText'>压机过载:</span><span class='stateImg'><img :src="deviceState[0].CompressO " ></span>
									<span class='StateText'>超高水位开关:</span><span class='stateImg'><img :src="deviceState[0].OWater " > </span>
									<span class='StateText'>水箱温度:</span><span class='stateImg'>{{deviceState[0].LoggerTemp}}</span>

									<span class='StateText'>压机:</span><span class='stateImg'><img :src="deviceState[0].Compresser " ></span>
									<span class='StateText'>进水阀:</span><span class='stateImg'><img :src="deviceState[0].IntoFlood " > </span>
									<span class='StateText'>主风机:</span><span class='stateImg'><img :src="deviceState[0].MainBlower " ></span>
									
									
									<span class='StateText'>加湿:</span><span class='stateImg'><img :src="deviceState[0].AddHumi " ></span>
									<span class='StateText'>排水泵:</span><span class='stateImg'><img :src="deviceState[0].OutFlood " ></span>
									
								</div>
								<div class='deviceStateCont deviceStateCont1' v-if='deviceState[0].displayNone'>
									<span class='StateText'>水箱状态:</span><span class='stateImg'>{{deviceState[0].CompressO}}</span>
									<span class='StateText'>风机状态:</span><span class='stateImg'>{{deviceState[0].MainBlower}}</span>
									<span class='StateText'>运行状态:</span><span class='stateImg'>{{deviceState[0].CompressH}}</span>
									<span class='StateText'>漏水报警:</span><span class='stateImg'><img :src="deviceState[0].AlarmState " ></span>
								</div>
								<div class='myHumidification fl' :class='{myHumidification1: deviceState[0].displayNone}'>
									<p>{{ deviceState[0].displayNone == true ?"除湿":"除湿设置"}}</p>
									<span>{{ deviceState[0].displayNone == true ?"设点":"上限"}}：</span><input v-model='dehumiCeling' type="number" class='myInput'>
									<span v-if='!deviceState[0].displayNone'>下限：</span><input v-if='!deviceState[0].displayNone' v-model='dehumiFloor' type="number" class='myInput'>
								</div>
								<div class='myHumidification fl' :class='{myHumidification1: deviceState[0].displayNone}'>
									<p>{{ deviceState[0].displayNone == true ?"加湿":"加湿设置"}}</p>
									<span>{{ deviceState[0].displayNone == true ?"设点":"上限"}}：</span><input v-model='addHumiCeling' type="number" class='myInput'>
									<span v-if='!deviceState[0].displayNone'>下限：</span><input v-if='!deviceState[0].displayNone' v-model='addHumiFloor' type="number" class='myInput'>
								</div>
								<div class='myHumidification myResetWarningCont fr' v-if='!deviceState[0].displayNone'>
									<p class='myResetWarning' @click='resetWarning'>预警复位</p>
								</div>	
							</div>
							<span slot="footer" class="dialog-footer">
								<el-button @click="btnCancel">取 消</el-button>
		    					<el-button type="primary" @click="btnConfirm3">确 定</el-button>
		    				</span>
						</el-dialog>
						<!-- 恒温恒湿机组  -->
						<el-dialog  :visible.sync="dialogConstantSet" class='myDialog' @close="btnCancel">
							<div class='dialogContent'>
								<p class='myTitle'>恒温恒湿机组</p>
								<span class='realHumi'>当前温度是：{{ realTemp }}℃, 当前的湿度是：{{ RealHumi}}%</span>
								<span>设置温度：</span><input v-model='setTemp' type="number" class='myInput hengInput'>
								<span>设置湿度：</span><input v-model='setHumi' type="number" class='myInput hengInput'>
							</div>
							<span slot="footer" class="dialog-footer">
								<el-button @click="btnCancel">取 消</el-button>
		    					<el-button type="primary" @click="btnConfirm4">确 定</el-button>
		    				</span>
						</el-dialog>
						<el-switch @change='setSwitch($event, scope.$index, controlData)' v-model='controlData[scope.$index].value2' on-color='#8ab2c9' on-off='#f5f5f5' v-bind:disabled='controlData[scope.$index].isTrue'></el-switch>
					</template>
				</el-table-column>

			</el-table>
			<el-pagination class='myPageination' 
							layout=' sizes, ->, prev, pager, next' 
							:page-size='pageSize' 
							:current-page='pageIndex' 
							@current-change='pageIndexChange' 
							:total='pageNum' 
							:page-sizes='pageSizes' 
							@size-change='sizeChange'>
				
			</el-pagination>
		</el-col>
	</el-row>
</template>
 <script>
import { Controls, ControlsSet, ControlNum , ControlsDevicecopy, ControlsDeviceBack } from '../../api/api'

	export default {
		data(){
			return {
				loading: false,
				// zhantingID: '',
				controlData:[],
				pageIndex: 1,
				pageSize: 10,
				pageNum: null,
				pageSizes: [10, 15, 20],
				dialogSmallVisible: false,   // 小型恒湿机弹框
				dialogLargeVisible: false,   // 大型恒湿机
				dialogAIO:false,             // 加湿除湿净化一体机
				dialogAirCleaner: false,     // 空气净化机   这个不用
				dialogConstantSet: false,     // 恒温恒湿机组
				RealHumi: null,  /// 当前的湿度
				realTemp: null,  //   当前的温度
				setHumi: null,   //  设置的湿度
				setTemp: null,   //  设置的温度
				sn: null,          
				dataIndex: null,      //  
				setHumiOffset: null,   // 设置湿度偏差
				dehumiCeling: null,    // 除湿上限
				dehumiFloor: null,    // 除湿下限
				addHumiCeling: null,   // 加湿上限
				addHumiFloor:null,      // 加湿下限
				inputHumi:null,      //输入框里面显示的湿度
				inputTemp:null,       // 输入框里面显示的温度
				deviceState:[{        // 存储设备状态
					CompressH:'',
					CompressL:'',
					LoggerTemp:'',
					shebeiColor:'',
					CompressO:'',
					waterColor:'',
					MainBlowerO:'',
					MainBlower:'',
					lingNingColor:'',
					HWater:'',
					LWater:'',
					OWater:'',
					Compresser:'',
					AddHumi:'',
					IntoFlood:'',
					OutFlood:'',
					AlarmState:'',
					displayNone: false ,    //  加湿除湿净化一体机v2 状态隐藏
					hantang:false          //  汉唐恒湿机

				}]
			}
		},
		methods: {
			resetWarning(){
				var params = {type:'Reset', sn: this.sn, strVal1:'',strVal2:'',strVal3:'',strVal4:'',strVal5:'',strVal6:''};
				ControlsSet(params).then(res => {
					if(res == '200'){
						this.$message({
							type:'success',
							message:'设置成功！'
						})
					}else{
						this.$message({
							type:'error',
							message:'设置失败！'
						})
					}
				})
			},
			myReg(val){
				var reg = /^\.\d/;
				var reg1 = /^\-\d/;
				var reg2 = /^\d+(\.\d)?$/;
				if(val == null){

				}else{
					if(reg.test(val)){
						return true;
					}else{
						if(reg1.test(val)){
							return true;
						}else{
							if(reg2.test(val)){
								return false;
							}else{
								return true;
							}
							
						}
					}
				}
			},
			replacePoint(val){
				val = JSON.stringify(val);
				// console.log(val);
				var reg = /^\"\d+(\.\d)?\"/;
				// console.log(Number(val.match(reg)[0]));
				return val.match(reg)[0];
			},
			btnConfirm1(){
				if(this.setHumi == null || this.setHumi < 0 || this.setHumi > 100 || this.setHumi == ''){
					this.$message({
						type:'warning',
						message:'请输入0~100之间的数值!!!'
					})
				}else{
					if(this.myReg(this.setHumi) == true){
						this.$message({
							type:'warning',
							message:'请输入正确的数值!!!'
						})
					}else{
						this.dialogSmallVisible = false;
						this.controlData[this.dataIndex].setHumi = Number(this.setHumi);
						var params = { type: 'One', sn: this.sn, strVal1: eval(Number(this.setHumi)), strVal2:'',strVal3:'',strVal4:'',strVal5:'',strVal6:'' };
						ControlsSet(params).then(res => {
							// console.log(res);
							if(res == '200'){
								this.getDataNum();
								this.getData();
								this.$message({
									type:'success',
									message:'设置成功！'
								});
								this.setHumi = null;
							}else{
								this.$message({
									type:'error',
									message:'设置失败！'
								})
							}
						})
					}
					
				}
			},
			btnConfirm2(){
				if(this.setHumi == null || this.setHumi < 0 || this.setHumi > 100 || this.setHumi == ''){
					this.$message({
						type:'warning',
						message:'请输入0~100之间的数值!!!'
					})
				}else{
					if(this.myReg(this.setHumi) == true){
						this.$message({
							type:'warning',
							message:'请输入正确的数值!!!'
						})
					}else{
						this.dialogLargeVisible = false;
						this.controlData[this.dataIndex].setHumi = Number(this.setHumi);
						var params = { type: 'One', sn: this.sn, strVal1: eval(Number(this.setHumi)),strVal2:'',strVal3:'',strVal4:'',strVal5:'',strVal6:'' };
						ControlsSet(params).then(res => {
							if(res == '200'){
								this.getDataNum();
								this.getData();
								this.$message({
									type:'success',
									message:'设置成功！'
								});
								
								this.setHumi = null;
							}else{
								this.$message({
									type:'error',
									message:'设置失败！'
								})
							}
						})
					}
				}
			},
			btnConfirm3(){
				if((this.addHumiCeling != null && this.addHumiCeling != '') || (this.addHumiFloor != null && this.addHumiFloor != '') || (this.dehumiCeling != null && this.dehumiCeling != '') || (this.dehumiFloor != null && this.dehumiFloor != '') ){
						if(this.myReg(this.addHumiCeling)==true||this.myReg(this.addHumiFloor)==true||this.myReg(this.dehumiCeling)==true||this.myReg(this.dehumiFloor)==true){
							this.$message({
								type:'warning',
								message:'请输入正确的数值!!!',
								customClass: 'myMarginTop10'
							})
						}else{
							if((this.dehumiCeling != null && this.dehumiCeling != '') || (this.dehumiFloor != null && this.dehumiFloor != '') || (this.addHumiFloor != null && this.addHumiFloor != '')|| (this.addHumiCeling != null && this.addHumiCeling != '')){
								if(this.dehumiCeling == null || this.dehumiCeling == '' || this.dehumiFloor == null || this.dehumiFloor == '' || this.addHumiCeling == null || this.addHumiCeling == '' || this.addHumiFloor == null || this.addHumiFloor == ''){
									this.$message({
										type:'warning',
										message:'设置需要两个数值，请确认!!!',
										customClass: 'myMarginTop20'
									})
								}else{
									if(this.myReg(this.dehumiCeling) == true || this.myReg(this.dehumiFloor) == true || this.myReg(this.addHumiFloor) == true || this.myReg(this.addHumiCeling) == true){
										this.$message({
											type:'warning',
											message:'请输入正确的数值!!!',
											customClass: 'myMarginTop20'
										})
									}else{
										if(this.dehumiCeling < 0 || this.dehumiCeling > 100 || this.dehumiFloor < 0 || this.dehumiFloor > 100 || this.addHumiCeling < 0 || this.addHumiCeling > 100 || this.addHumiCeling < 0 || this.addHumiCeling > 100){
											this.$message({
												type:'warning',
												message:'请输入0~100之间的数值!!!',
												customClass: 'myMarginTop20'
											})
										}else{
											if(Number(this.dehumiCeling) <= Number(this.dehumiFloor || Number(this.addHumiCeling) <= Number(this.addHumiFloor)) ){
												this.$message({
													type:'warning',
													message:'上限不能低于或等于下限!!!',
													customClass: 'myMarginTop20'
												})
											}else{
												// console.log(this.dehumiCeling <= this.dehumiFloor);
												this.dialogAIO = false;
												var params = { sn: this.sn, strVal1: eval(Number(this.dehumiCeling)), strVal2: eval(Number(this.dehumiFloor)), strVal3: eval(Number(this.addHumiCeling)), strVal4: eval(Number(this.addHumiFloor)),strVal5:'',strVal6:'', type:'Three'};
												// console.log(params);
												ControlsSet(params).then(res => {
													// console.log(res);
													if(res == '200'){
														this.getDataNum();
														this.getData();
														this.dehumiCeling = null;
														this.dehumiFloor = null;
														this.$message({
															type:'success',
															message:'设置成功！',
															customClass: 'myMarginTop20'
														})
													}else{
														this.$message({
															type:'error',
															message:'设置失败！',
															customClass: 'myMarginTop20'
														})
													}
												})
											}
										}
									}
									
								}
							};

						}
				};
				
				if(this.addHumiCeling == null && this.addHumiCeling == '' && this.addHumiFloor == null && this.addHumiFloor == '' && this.dehumiCeling == null && this.dehumiCeling == '' && this.dehumiFloor == null && this.dehumiFloor == '' && this.setHumiOffset == null && this.setHumiOffset == '' && this.setHumi == null && this.setHumi == ''){
								this.$message({
									type:'warning',
									message:'请输入需要设置的数值！'
								});
				}

			},
			btnConfirm4(){
				if((this.setTemp != null && this.setTemp != '') || (this.setHumi != null && this.setHumi != '')){
					if(this.myReg(this.setTemp)==true||this.myReg(this.setHumi)==true){
						this.$message({
								type:'warning',
								message:'请输入正确的数值!!!',
								customClass: 'myMarginTop10'
							})
					}else{
						if(  this.setTemp != null && this.setTemp != '' || this.setHumi != null && this.setHumi != ''){
							if( this.myReg(this.setTemp) == true || this.myReg(this.setHumi) == true){
								this.$message({
									type:'warning',
									message:'请输入正确的数值!!!'
								})
							}else{
								if(this.setTemp<0 || this.setTemp >100 || this.setHumi < 0 || this.setHumi > 100){
									this.$message({
										type:'warning',
										message:'请输入0~100之间的数值!!!'
									})
								}else{
									this.dialogConstantSet = false;
									// console.log(this.myReg(this.setTemp)[0]);
									this.controlData[this.dataIndex].setTemp = Number(this.setTemp);
									this.controlData[this.dataIndex].setHumi = Number(this.setHumi);
									var params = { type: 'Five', sn: this.sn, strVal1: eval(Number(this.setTemp)),strVal2:eval(Number(this.setHumi)),strVal3:'',strVal4:'',strVal5:'',strVal6:'' };
									ControlsSet(params).then(res => {
										// console.log(res);
										if(res == '200'){
											this.getDataNum();
											this.getData();
											this.setTemp = null;
											this.$message({
												type:'success',
												message:'设置成功！'
											})
										}else{
											this.$message({
												type:'error',
												message:'设置失败！'
											})
										}
									})
								}
								
							}
						};


					}
				};
				
				if((this.setTemp == null || this.setTemp == '') && (this.setHumi == null || this.setHumi == '')){
					this.$message({
						type:'warning',
						message:'数值不能为空！'
					})
				}
			},
			btnCancel(){
				this.setHumi = null;
				this.setTemp = null;
				this.setHumiOffset = null;
				this.addHumiCeling = null;
				this.addHumiFloor = null;
				this.dehumiFloor = null;
				this.dehumiCeling = null;
				this.dialogSmallVisible = false;
				this.dialogLargeVisible = false;
				this.dialogAIO = false;
				this.dialogAirCleaner = false;
				this.dialogConstantSet = false;
			},
			setSomething(idx,rows) {
				var _this = this;
				this.deviceState = [];
				this.sn = rows[idx].sn;
				var shebei = rows[idx].device;
				this.RealHumi = rows[idx].humi;   // 当前的湿度
				this.realTemp = rows[idx].temp;      // 当前的温度
				this.setTemp = rows[idx].setTemp;  // 输入框的温度
				this.setHumi = rows[idx].setHumi;  // 输入框的湿度
				this.setHumiOffset = rows[idx].HumiDevi; // 湿度偏差
				this.dehumiCeling = rows[idx].Dehumidifys;  //除湿上限
				this.dehumiFloor = rows[idx].Dehumidifyx;   // 除湿下限
				this.addHumiCeling = rows[idx].Difications;  // 加湿上限
				this.addHumiFloor = rows[idx].Dificationx;  // 加湿下限
				this.dataIndex = idx;
				this.deviceState.push({
					'CompressH':rows[idx].CompressH,
					'CompressL':rows[idx].CompressL,
					'LoggerTemp':rows[idx].LoggerTemp,
					'shebeiColor':rows[idx].LoggerTemp == '低'?'#ea9706':rows[idx].LoggerTemp == '高'?'#ea9706':'#419700',
					'CompressO':rows[idx].CompressO,
					'waterColor':rows[idx].CompressO == '低温'?'#ea9706':'#419700',
					'MainBlowerO':rows[idx].MainBlowerO,
					'MainBlower':rows[idx].MainBlower,
					'lingNingColor':rows[idx].MainBlower == '结冰'?'#ea9706':'#419700',
					'HWater':rows[idx].HWater,
					'LWater':rows[idx].LWater,
					'OWater':rows[idx].OWater,
					'Compresser':rows[idx].Compresser,
					'AddHumi':rows[idx].AddHumi,
					'IntoFlood':rows[idx].IntoFlood,
					'OutFlood':rows[idx].OutFlood,
					'AlarmState':rows[idx].AlarmState,
					'displayNone':rows[idx].device=='加湿除湿净化一体机v2'?true:false,   // 
					'hantang':rows[idx].device=='汉唐恒湿机'?true:false
				});
				// console.log(this.deviceState);
				if(shebei == '展柜小型电子恒湿机'){
					this.dialogSmallVisible = true;

				}else if(shebei == '展柜大型电子恒湿机'){
					this.dialogLargeVisible = true;
				
				}else if(shebei == '加湿除湿净化一体机'){
					this.dialogAIO = true;
				
				}else if(shebei == '空气净化机'){

				}else if(shebei == '恒温恒湿机组'){
					this.dialogConstantSet = true;
				}else if(shebei == '汉唐恒湿机'){
					this.dialogSmallVisible = true;
				}else if(shebei == '加湿除湿净化一体机v2'){
					this.dialogAIO = true;
				};
				
			},
			setSwitch(val, idx,rows) { // 开关机
				var _this = this;
				var sn = rows[idx].sn;
				var switchState = rows[idx].value2;	
				// console.log(val);
				// console.log(idx);
				// console.log(rows);
				// console.log(switchState)			
				if(val){
					this.$confirm('是否开机', {
						type: 'warning'
					}).then(() => {
						var params = {type: 'KJ', sn: sn, strVal1: 1,strVal2:'',strVal3:'',strVal4:'',strVal5:'',strVal6:''};
						ControlsSet(params).then(res => {
							if(res == 200){
								this.$message({
									message:'已开机'
								});
								setTimeout(function(){

									_this.getDataNum();
									_this.getData();
								},0)
							}
						})
						
					}).catch(() => {
						rows[idx].value2 = !rows[idx].value2;
						
					})
				}else{

					this.$confirm('是否关机', {
						type: 'warning'
					}).then(() => {
						var params = {type: 'GJ', sn: sn, strVal1: 0,strVal2:'',strVal3:'',strVal4:'',strVal5:'',strVal6:''};
						ControlsSet(params).then(res => {
							// console.log(res)
							if(res == 200){
								this.$message({
									message:'已关机'
								});
								setTimeout(function(){
									// console.log('-------');
									_this.getDataNum();
									_this.getData();
								},0)
								
							}
						})
						
					}).catch(() => {
						rows[idx].value2 = !rows[idx].value2;
						// rows[idx].value2 = !rows[idx].value2;
						
					})
				}

			},
			equipment(num){    // 判断是什么设备
				var IDName = '';  // 设备名称
				switch(num){
					case 11:
						IDName = '展柜小型电子恒湿机';
						break;
					case 12:
						IDName = '展柜大型电子恒湿机';
						break;
					case 13:
						IDName = '加湿除湿净化一体机';
						break;
					case 14:
						IDName = '空气净化机';
						break;
					case 15:
						IDName = '汉唐恒湿机';
						break;
					case 16:
						IDName = '加湿除湿净化一体机v2';
						break;
				}
				return IDName;
			},
			equipmentState(state, int, logsTime, switchTime) {    // 判断设备状态
				var shebeiState = ''; // 设备状态
				var myDate = new Date(); //获取当前时间  时间戳
				var date1 = new Date(logsTime);
				var num = myDate.getTime() - date1.getTime(); // 计算出相差毫秒数
				var seconds = Math.round(num / 1000);
				if(state == 0){
					shebeiState = '停止';
				}else if(state == 1){
					console.log('seconds---'+seconds);
					console.log('int---'+int);
					if(seconds > int + 100){
						// shebeiState = '故障';
						shebeiState = '运行';
					}else{
						shebeiState = '运行';
					}
				}
				return shebeiState;
			},
			switchBtn(switchNum, switchState){
				if(switchNum == 0){
					if(switchState == 0){
						return false;
					}else{
						return false;
					}
				}else if(switchNum == 1){
					if(switchState == 0){
						return true;
					}else{
						return true;
					}
				}
			},
			isTrue(switchNum, switchState){
				var user = JSON.parse(sessionStorage.getItem('user'));
				// console.log(user);
				var name = user.name;
				if(name == 'admin'){
					if(switchNum == 0){
						if(switchState == 0){
							return false;
						}else{
							return true;  // 开机当中不可操作
						}
					}else if(switchNum == 1){
						if(switchState == 0){
							return false;
						}else{
							return true;   // 关机当中不可操作
						}
					}
				}else{  // 用户名不是admin 不可操作
					return true;
				}
				
			},
			levelImg(level) {
				var levelImage = '';
				if(level == '低'){
					levelImage = '../../../static/img/yeweidi.png';
				}else if(level == '中'){
					levelImage = '../../../static/img/yeweizhong.png';
				}else{
					levelImage = '../../../static/img/yeweigao.png'
				}
				return levelImage;
			},
			getDataNum() {
				var params = { GroupId: this.$store.state.zhantingID };
				ControlNum(params).then(res => {
					this.pageNum = null;
					if(res.length > 0){
						this.pageNum = res.length;
					}
					
				})
			},
			Wcolor(text){
				if(text == '高温' || text == '低温'){
					return 'red';
				}
			},
			buttonDisabled(num){  // 判断设置是否禁用
				var user = JSON.parse(sessionStorage.getItem('user'));
				var name = user.name;
				if(num == 14  || name != 'admin'){
					return true;
				}else{
					return false;
				}
			},
			subDotN(n, str){
				str = "" + str + "";
				if (str != null && str != '--') {
			        //str.indexOf(".") != "-1"满足条件，
			        if (str.indexOf('.') != -1) {
			            //获取小数点所在的index
			            var index = str.indexOf(".");
			            return str.substr(0, index + 1 + n);
			        } else {
			            //返回它本身  
			            return str + ".0";
			        }
			    }else{
			    	return '--';
			    }
			},
			getData() {

				this.loading = true;
				var _this = this;
				var params = { GroupId: this.$store.state.zhantingID, pageSize: this.pageSize, pageIndex: this.pageIndex - 1 };
				Controls(params).then(res => {
					_this.controlData = [];
					console.log(res);
					res = res.sort(function(a, b){  // 按名字排序							
						return (a.LOGGER_NAME).localeCompare(b.LOGGER_NAME, 'zh-Hans-CN', {sensitivity: 'accent'});
					});
					if(res.length > 0){
						for (var i = 0; i < res.length; i++) {	

							_this.controlData.push({
								'name': res[i].LOGGER_NAME,
								'device': this.equipment(res[i].VER_ID),
								'location': res[i].SPosition,	
								'temp': res[i].VER_ID == 13?'--':res[i].VER_ID == 17?'--':this.subDotN(1,res[i].LOGS_CHONE==null?'--':res[i].LOGS_CHONE),
								'humi': res[i].VER_ID == 13?this.subDotN(1,res[i].LOGS_CHONE==null?'--':res[i].LOGS_CHONE):this.subDotN(1,res[i].LOGS_CHTWO==null?'--':res[i].LOGS_CHTWO),
								'setTemp': this.subDotN(1,res[i].Temperature==null?'--':res[i].Temperature),                //设置温度
								'setHumi': res[i].VER_ID == 13?'--':res[i].VER_ID == 17?'--':this.subDotN(1,res[i].Humidity == null?'--':res[i].Humidity), // 设置湿度
								'state': this.equipmentState(res[i].LOGGER_STATE, res[i].SAMPLING_INT, res[i].LOGS_TIME),
								'stateColor':this.equipmentState(res[i].LOGGER_STATE, res[i].SAMPLING_INT, res[i].LOGS_TIME)=='故障'?'red':'#666', //状态颜色
								'conden': res[i].VER_ID==12?'--':res[i].MainBlower,                  // 冷凝片状态
								'condenColor':res[i].MainBlower == '结冰'?'red':'#666',  // 冷凝片颜色
								'waterTank': res[i].LoggerTemp,                 // 水箱温度
								'imgUrl': this.levelImg(res[i].CompressO),                      // 液位
								'value2': this.switchBtn(res[i].Switch, res[i].SwitchState), // 判断开关机
								'isTrue': this.isTrue(res[i].Switch, res[i].SwitchState),					  // 开关机
								'sn': res[i].LoggerSN,
								'Tcolor': res[i].Tcolour,         // 温度颜色
								'Hcolor': res[i].Hcolour,         // 湿度颜色
								'Wcolor': this.Wcolor(res[i].LoggerTemp), // 水箱温度颜色 
								'buttonDisabled': this.buttonDisabled(res[i].VER_ID),    // 设置按钮是否禁用    
								'HumiDevi':res[i].HumiDevi, // 湿度偏差
								'Dehumidifys':res[i].Dehumidifys, // 除湿上限
								'Dehumidifyx':res[i].Dehumidifyx, // 除湿下限
								'Difications':res[i].Difications,  // 加湿上限
								'Dificationx':res[i].Dificationx,   // 加湿下限
								'CompressH':res[i].CompressH,
								'CompressL':res[i].CompressL,
								'LoggerTemp':res[i].LoggerTemp,
								'CompressO':res[i].CompressO,
								'MainBlowerO':res[i].MainBlowerO,
								'MainBlower':res[i].MainBlower,
								'HWater':res[i].HWater,
								'LWater':res[i].LWater,
								'OWater':res[i].OWater,
								'Compresser':res[i].Compresser,
								'AddHumi':res[i].AddHumi,
								'IntoFlood':res[i].IntoFlood,
								'OutFlood':res[i].OutFlood,
								'AlarmState':res[i].AlarmState
	
							});

						}
						this.loading = false;
					}else{
						this.loading = false;
					}
				})
			},
			pageIndexChange(pageIndex) {
				this.pageIndex = pageIndex;
				this.getData();
			},
			sizeChange(pageSize) {
				this.pageSize = pageSize;
				this.getData();
			},
			windowResize(){
				var ww = $(document).width();
				var hh = $(document).height();
				$('.content-container').width(ww - 201 );
				$('.content-wrapper').css({'height': hh -90-32});
			}
		},
		mounted() {
			var _this = this;
			this.getDataNum();
			this.getData();
			this.$store.watch(
				function(state){
					return state.zhantingID;
				},function(){
					_this.getDataNum();
					_this.getData();
				},{
					deep:true
			});
			this.windowResize();
            window.onresize = function(){  
                _this.windowResize();
                
            }
            setInterval(function(){
            	_this.getDataNum();
				_this.getData();
            }, 30000);
		}

	}


 </script>

<style>
.deviceStateCont span{
	display: inline-block;
	height:40px;
	line-height: 40px;
}
.deviceStateCont .StateText{
	width: 120px;
}
.deviceStateCont .stateImg{
	width: 50px;
	color:#419700;
	text-align: center;
	
}
.deviceStateCont{
	padding-bottom: 20px;
	margin-bottom: 20px;
	border-bottom: 1px solid #ddd;
}
.deviceStateCont1{
	padding: 0 40px 20px 60px; 
}
.deviceStateCont1 .stateImg{
	width: 90px;
	color:#419700;
	text-align: center;
	
}
.deviceStateCont .stateImg img{
	vertical-align: middle;
}
.myDialog .el-dialog{
	width: 612px;
	top:8%;
}
.myMarginTop10{
	top:70px;
}
.myMarginTop20{
	top:120px;
}
.myMarginTop30{
	top:170px;
}
.myMarginTop40{
	top:220px;
}
.fl{
	float: left;
}
.fr{
	float: right;
}
.my_padding{
	padding:16px 10px;
}
.el-table__header thead th ,.el-table__header thead th .cell{
	background: #ececec;
}
	.el-table .cell, .el-table th>div{
		padding:0 5px;
	}
	.el-table__body td{
		text-align: center;
	}
	th.is-leaf{
		text-align: center;
	}
	.cell .el-button, .cell .el-switch{
		display: inline-block;
	}
	.el-button{
		padding:5px 17px;
		background: #6fb3e0;
		color:#fff;
	}
	.el-button:focus, .el-button:hover {
   	 	color: #fff;
    	border-color: #6fb3e0;
	}
	.el-message-box__input .el-input__inner{
		border:1px solid #ffb752;
		height:32px;
		border-radius: 10px;
		background: #fff;
	}
	.levelImg{
		width: 40px;
		height:12px;
	}
	.myPageination{
		margin: 20px 0 30px;
		height:32px;
		/*line-height: 62px;*/
		background: #eff3f8;
		padding:15px 0px 10px;
		display: block;
		float: left;
		width: 100%;
	}
	.myPageination .el-pagination__sizes{
		margin-left: 15px;
	}
	.myPageination .el-pagination__rightwrapper{
		padding-right: 20px;
	}
	.el-pagination__sizes .el-input input{
		background: #fff;
	}
	.myInput{
		border-radius: 8px;
		border:1px solid #ffb752;
		outline: none;
		padding:5px 5px;
		margin: 10px 0;
	}

	.myInput .el-input__inner:focus, .myInput .el-input__inner:hover{
		border:1px solid #ffb752;
	}
	input[type=number] {  
	    -moz-appearance:textfield;  
	}  
	input[type=number]::-webkit-inner-spin-button,  
	input[type=number]::-webkit-outer-spin-button {  
	    -webkit-appearance: none;  
	    margin: 0;  
	}
	.myInputWidth{
		width: 209px;
	}
	.myMessageBox{
		overflow:hidden;
	}
	.myMessageBox .myInputTitle{
		margin-bottom: 10px;
		height:20px;
	}
	.myHumidification{
		width: 30%;
		padding-right: 20px;
		display: inline-block;
	} 
	.myHumidification1{
		width: 46%
	}
	.myHumidification input{
		width: 91px;
	}
	.myResetWarningCont{
		margin-top: 30px;
		width: 20%;
	}
	.myResetWarning{
		width: 31px;
		height:46px;
		background: #428bca;
		border-radius: 10px;
		color:#fff;
		padding: 10px 17px;
		cursor: pointer;
		
	}
	.el-dialog--small{
		width: 515px;
	}
	.el-dialog--small .el-dialog__body{
		padding: 6px 35px;
		text-align: left;
	}
	.el-dialog .myTitle{
		height: 30px;
		line-height: 30px;
		border-bottom: 1px solid #ddd;
		margin-bottom: 20px;
	}
	.smallInput{
		width: 420px;
	}
	.laegeInput{
		width: 205px;
	}
	.realHumi{
		display: block;
	}
	.dialogContent{
		overflow:hidden;
	}
	.hengInput{
		width: 444px;
	}
	.jiaInput{
		width: 70px;
	}
</style>
<style scoped>

</style>
