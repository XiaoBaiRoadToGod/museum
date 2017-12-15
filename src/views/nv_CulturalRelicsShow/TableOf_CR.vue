<template>
<el-row class='my_padding'>
	<el-col :span='24'>
		<el-form :inline='true' class='wenwuListForm' onsubmit='return false'>
			<el-form-item label='文物名称' >
				<el-input v-model='wenwuName' placeholder='文物名称' class='wenwuInput'></el-input>
			</el-form-item>
			<el-form-item >
				<el-button type='primary' @click='queryData' v-model='queryName'>查询</el-button>
			</el-form-item>
		</el-form>
	</el-col>
	<el-col :span='24' class='wenwuTitle'>
		<i class='wenwuIcon'></i><span>文物陈列</span>
	</el-col>
	<el-col :span='24' class='listContainer' >	
		<div class='block'>
			<el-col :span='6' class='wenwuListCont' v-for='(item,index ) in wenwuInfoList' :key="index">
				<div @click="$router.push({name: '文物详情', params:{id: item.RELIC_ID}})">
					<div class='listCont'>
						<p class='wenwuName'>{{item.RELIC_NAME}}</p>
						<el-col :span='14'>
							<div class='wenwuImgCont'>
								<img :src="item.RELICIM_PATH" >
							</div>
						</el-col>
						<el-col :span='10' class='wenwuControl'>
							<span class='controlName'>{{item.Ch1Name}}</span>
							<span :style='{color:item.Ch1Color}'>{{item.Ch1}}{{item.Ch1Unit}}</span>
							<span class='controlName'>{{item.Ch2Name}}</span>
							<span :style='{color:item.Ch2Color}'>{{item.Ch2}}{{item.Ch2Unit}}</span>
							<span class='controlName'>{{item.Ch3Name}}</span>
							<span :style='{color:item.Ch3Color}'>{{item.Ch3}}{{item.Ch3Unit}}</span>
							<span class='controlName'>{{item.Ch4Name}}</span>
							<span :style='{color:item.Ch4Color}'>{{item.Ch4}}{{item.Ch4Unit}}</span>
							<div v-if='item.State == "异常"' class='state'>
								<i class="stateYichang"></i>
							</div>
						</el-col>
					</div>
				</div>
			</el-col>
			<el-pagination class='myPageination' 
					layout=' ->, prev, pager, next' 
					:page-size='pageSize' 
					:current-page='pageIndex' 
					@current-change='pageIndexChange' 
					:total='pageNum' 
					>
			</el-pagination>
		</div>
	</el-col>
</el-row>
</template>
<script>
import { wenwuList, wenwuListPage } from '../../api/api'
	export default {
		data(){
			return {
				wenwuName:'',
				wenwuInfoList: [],
				queryName:'',
				pageSize:8,
				pageIndex:1,
				pageNum: null

			}
		},
		methods: {
			queryData() {
				var _this = this;
				// console.log(this.wenwuName == '');
				if(this.wenwuName == ''){
					this.getPageData();
				}else{
					// function Trim(str,is_global){
			  //           var result;
			  //           result = str.replace(/(^\s+)|(\s+$)/g,"");
			  //           if(is_global.toLowerCase()=="g"){
			  //           	result = result.replace(/\s/g,"");
			  //           } 
			  //           return result;
					// }
					String.prototype.trim = function() {
					  var str = this,
					  whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
					  for (var i = 0,len = str.length; i < len; i++) {
					    if (whitespace.indexOf(str.charAt(i)) === -1) {
					      str = str.substring(i);
					      break;
					    }
					  }
					  for (i = str.length - 1; i >= 0; i--) {
					    if (whitespace.indexOf(str.charAt(i)) === -1) {
					      str = str.substring(0, i + 1);
					      break;
					    }
					  }
					  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
					};
					// this.pageIndex = 1;
					this.wenwuName = this.wenwuName.trim();
					// console.log(this.wenwuName)
					var params = { Name: this.wenwuName, type:'', pageSize: this.pageSize, pageIndex: 0};
					wenwuList(params).then(res => {
						console.log(res)
						for(var i in res){
						this.pageNum = Number(i);
						this.wenwuInfoList = res[i];
					}
					})
				}
				
			},
			getPageData(){
				
				var params = { Name: '', Type: '', pageSize: this.pageSize, pageIndex: this.pageIndex - 1 };
				wenwuList(params).then(res => {
					console.log(res);
					for(var i in res){
						this.pageNum = Number(i);
						this.wenwuInfoList = res[i];
					}
					
				})
			},
			pageIndexChange(pageIndex){
				this.pageIndex = pageIndex;
				// this.getPageData();
				if(this.wenwuName == ''){
					this.getPageData();
				}else{
					this.queryData();
				}
			},
			windowResize(){
				var ww = $(document).width();
				if(ww < 1280){
					ww == 1208;
				}else{
					ww == ww;
				}
				var hh = $(document).height();
				$('.content-container').width(ww - 201);
			}

		},
		mounted(){
			this.getPageData();
			var _this = this;
			this.windowResize();
            window.onresize = function(){  
                _this.windowResize();
                
            };
            $(window).keyup(function(ev){
		        // console.log(ev);
		         if(ev.keyCode == 13){
		         	// console.log(1)
		           _this.queryData();
		        }
		      })
		}
	}

</script>
<style>
	a{
		color:#333;
		text-decoration-line: none;
	}
	.my_padding{
		padding:16px 11px;
	}
	.wenwuInput input{
		height:30px;
		border-radius: 4px;
		border:1px solid #6faed9;
		background: #fff;
		text-indent: 0;
	}
	.wenwuListForm .el-form-item label{
		padding:8px 12px 8px 15px;
	}
	.wenwuListForm .el-form-item{
		margin-bottom: 10px;
	}
	.wenwuListCont{	
		padding:10px 4px 0px;
		display: inline-block;
		margin:0 auto;

	}
	.wenwuTitle{
		height: 38px;
		line-height: 38px;
		background: #f4f4f4;
		border:1px solid #ccc;
		border-bottom: none;
	}
	.wenwuTitle .wenwuIcon{
		display: inline-block;
		width: 23px;
		height: 23px;
		background: url(../../../static/img/icon.png);
		background-position: -19px -675px;
		vertical-align: middle;
		margin: 0 10px 0 54px;
	}

	.listCont{
		height: 100%;
		border:1px solid #ddd;
		overflow:hidden;
		cursor: pointer;
	}
	.listCont .wenwuName{
		height:24px;
		line-height: 24px;
		background: #e9f6ff;
		padding-left: 10px;
	}
	.wenwuImgCont{
		width: 85%;
		padding:10px;
	}
	.wenwuImgCont img{
		width: 90%;
		height:90%;
	}
	.wenwuControl{
		padding:2px 0 0px;
	}
	.wenwuControl span{
		display: inline-block;
		width: 45%;
		min-width: 60px;
		height:18px;
	}
	.wenwuControl .controlName{
		width: 27%;
		min-width: 32px;
	}
	.state .stateYichang{
		display: inline-block;
		width: 73px;
		height: 51px;
		background: url(../../../static/img/icon.png);
		background-position: 13px -707px;
		float: right;
		margin: 0 12px 0 0;
	}
	.block:after{
		display: block;
		clear: both;
		content:'';
		visibility: hidden;
		height:0;
	}
</style>
