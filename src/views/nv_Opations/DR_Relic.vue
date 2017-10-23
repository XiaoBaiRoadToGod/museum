<template>
    <section class='uploadFileCont'>
        <form  >
	        <a href="javascript:;" class='a-upload'>
	        	选择文物信息<input id='fileUploadBtn' type='file'/>
	        </a>
            <span class='uploadInfo'></span>
            <div class='el-upload_tip'>选择要导入的文物文件：（工作表名为“Sheet1”,文件后缀名为xlsx格式）<span class='uploadTemplate' @click='uploadTemp'>点击下载模板</span><span style="color:red">文物名称不能为数字</span></div>
            <el-button type='primary' @click='submitUpload'>保存</el-button>
        </form>
    </section>
</template>
<script>
import { uploadPostFile,uploadFileTemplate } from '../../api/api'
import qs from 'qs'
	export default {
		data(){
			return {
				fileList: new FormData()
			}
		},
		methods:{
			uploadTemp(){
				uploadFileTemplate().then(res => {
					console.log(res);
					// res= 'http://huato2008.eicp.net:8020/Edition/app-debug.apk';
					window.open(res);
				})
				// window.open('http://192.168.10.68:8021/Template/上传文物模板.xlsx');
			},
			submitUpload(){
				var file = document.querySelector('#fileUploadBtn').files[0];
				this.fileList.append('myFile',file);
				uploadPostFile(this.fileList,qs.stringify({'headers':{'Content-Type':'multipart/form-data'}})).then(res => {
					console.log(res);
					if(res == '200'){
						this.$message({
							type:'success',
							message:'上传文物信息成功！'
						});
						this.fileList = new FormData();
						$('.uploadInfo').html('');
						$('#fileUploadBtn').val('');
						// $('.a-upload').children('#fileUploadBtn').remove();
						// $('.a-upload').append("<input id='fileUploadBtn' type='file' style='position: absolute;font-size: 0px;width: 100%;height: 100%;right: 0;top: 0;opacity: 0;filter: alpha(opacity=0);cursor: pointer;'/>");
					}else if(res == '201'){
						this.$message({
							type:'error',
							message:'上传文物信息失败！'
						})
					}else if(res == '202'){
						this.$message({
							type:'warning',
							message:'文物名称不能为数字！'
						})
					}
					
				});
			},
			fileChange(){
				var file = document.querySelector('#fileUploadBtn').files[0];
				console.log(file);
				$('.uploadInfo').html(file.name);
			},
			windowResize(){
		      var ww = $(document).width();
		      $('.content-container').width(ww - 201);
		      var hh = $(document).height();
		      // console.log(hh);
		      $('.content-wrapper').height(hh - 90 - 32);
		    }
		},
		mounted(){
			this.windowResize();
			var _this = this;
			$('#fileUploadBtn').change(function(){
				console.log('-----');
				_this.fileChange();
			})
			window.onresize = function(){  
               _this.windowResize();
                
            }
            this.$emit('inSetting'); // 进入设置页面后改变左侧菜单显示
		},
		beforeDestroy(){
			this.$emit('outSetting'); // 离开设置页面后改变左侧菜单显示
		},
		deactivated(){
			this.$destroy(true);
		}
	}



</script>
<style scoped lang="scss">
.uploadTemplate{
	color:#6fb3e0;
	cursor: pointer;
}
.uploadInfo{
	display: block;
	width: 100%;
	height: 20px;
	font-size: 14px;
	color:#666;
	margin: 10px 0 0  0;
	padding-left: 15px;
}
.a-upload {
    padding: 4px 10px;
    width: 138px;
    height: 20px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #fff;
    background: #6fb3e0;
    border: 1px solid #20a0ff;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    *display: inline;
    *zoom: 1
}
.a-upload  #fileUploadBtn {
    position: absolute;
    font-size: 0px;
    width: 100%;
    height: 100%;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
}
.a-upload:hover {
    color: #fff;
    background: #20a0ff;
    border-color: #20a0ff;
    text-decoration: none
}
.uploadFileCont {
    width: 400px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .el-upload {
        margin: 0 auto;
    }
    .el-button {
        width: 160px;
        font-size: 16px;
    }
}

.el-upload_tip {
    color: #666;
    ;
    font-size: 16px;
    margin: 13px 0 20px -210px;
}
</style>
