<template>
<el-col :span='24' class='loginContainer'>
  <el-col :span='24' class='loginTopBg'>
    
  </el-col>
  <el-col :span='18' class='loginForm'>
    <el-col :span='24' class='loginBgFont'>
      <img class='loginBgImg' :src="loginMuseumImg" >
    </el-col>
    <el-col :span='13' class='loginCont'>
      <img class='nanboLoginLogo' :src="loginImg" >
    </el-col>
    <el-col :span='5' class='myForm'>
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container" >
        <h3 class="title">用户登录</h3>
        <el-form-item prop="account">
          <el-input class='loginInput uaerName' type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="用户名" @focus='hiddenError'></el-input>
          <div class='errorInfo' v-show='userError'>用户名或密码错误</div>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input class='loginInput userPwd' type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码" @focus='hiddenError'></el-input>
          <div class='errorInfo' v-show='userError'>用户名或密码错误</div>
        </el-form-item>
        <el-form-item v-if='hideCode'> 
        </el-form-item>
        <el-form-item prop='verifyCode' v-if='!hideCode'>
          <el-col :span='8'>
            <el-input class='loginInput verCode' v-model='ruleForm2.verifyCode' auto-complete="off" placeholder="验证码" @focus='hiddenError'></el-input>
          </el-col>
          <el-col :span='8'><div id="verifyCode"></div></el-col>
          <el-col :span='7' class="myCodeTitle"><span>看不清</span><span id='refresh' @click='refresh'>换一张</span></el-col>
          <div class='errorInfo' v-show='verCodeError'>验证码错误</div>  
        </el-form-item> 
        <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
        <el-form-item class='formItem'>
          <el-button type="primary" class='LoginBtn' style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining" >登录</el-button>
          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
        <el-form-item class='serviceItem formItem'  v-if='qrcode'>
          <a href="javascript:;" class='appAction' @click='openScanCode'><i class='serviceText'>手机APP服务器接口地址</i><i class='myIcon'></i></a>
        </el-form-item>
      </el-form>
    </el-col>
  </el-col>
  <el-col :span='24' class='scanCode' v-if='scanCode'>
    <el-col :span='24' class='scanCodeClose'>
      <span  @click='clodeScanCode'></span>
      <div class='QrCode' id='myQrCode'>
        <vue-qr :text='codeVal' :logoSrc='QrLogoSrc' dotScale='0.5' logoMargin='5' width='230' height='230' size='230'></vue-qr>
        
      </div>
    </el-col>
    <el-col :span='24'  class='picTitle'>
      <span>
        <span class='step'>
          <span class='codeLeft'>
            <i class='circle'>第一步</i>
          </span>
          <span class='codeRight'>
            <i class='text'>打开手机APP</i>
            <i class='text bottomText'>点击登录按钮下方“服务器设置”</i>
          </span>
        </span>
        <img src="../../static/img/iPhone-1.png" >
      </span>
      <span  class='step'>
          <span class='codeLeft'>
            <i class='circle'>第二步</i>
          </span>
          <span class='codeRight'>
            <i class='text'>点击弹窗左上方图标" <i class='sao'></i> "</i>
          </span>
        <img src="../../static/img/iPhone-2.png" >
      </span>
      <span  class='step'>
          <span class='codeLeft'>
            <i class='circle'>第三步</i>
          </span>
          <span class='codeRight'>
            <i class='text'>扫描上方二维码</i>
            <i class='text bottomText'>读取当前APP服务端地址点击“确定”</i>
          </span>
        <img src="../../static/img/iPhone-3.png" >
      </span>
    </el-col>
  </el-col>
  <el-col :span='24' class='loginFooter'>
    <div>CopyRight&copy;2008-1016,深圳华图测控系统有限公司,粤ICP备08032186号</div>
  </el-col>

</el-col>
</template>

<script>
  import { userLogin } from '../api/api'
  import qs from 'qs'
  import GVerify from '../common/verify'



  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: '',
          verifyCode:''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          verifyCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },
        verify:'',
       
        verCodeError:false,
        userError: false,
        scanCode:false,
        loginMuseumImg:'../../static/img/LoginLogo.png',  //  公共的文字图片
        loginImg: '../../static/img/huato.JPG',    // 公司logo
        // loginImg: '../../static/img/nanboLoginLogo.png',   // 南博的登录页背景
        // loginImg: '../../static/img/shenboLoginLogo.png',   // 深博的登录页背景
        // loginImg: '../../static/img/guoboLoginLogo.png',   // 国博的登录页背景
        // loginImg: '../../static/img/chongxinLoginLogo.jpg',   // 崇信的登录页背景
        // loginImg: '../../static/img/zhuanglangLogin.png',   // 庄浪的登录页背景
        // loginImg: '../../static/img/longxiLoginLogo.jpg',   // 陇西的登录页背景
        // loginImg: '../../static/img/eerLoginLogo.jpg',   // 鄂尔多斯的登录页背景
        // loginImg: '../../static/img/zhenyuanLogin.jpg',   // 镇原的登录页背景
        // loginImg: '../../static/img/jinchang.jpg',   // 金昌的登录页背景
        // loginImg: '../../static/img/tianshui.jpg',   // 天水的登录页背景
        qrcode: true,     // 二维码开关 ， true为显示
        hideCode: false,    // 隐藏验证码，true隐藏
        // codeVal: 'http://172.16.50.245:8082',              // 二维码文字  深博
        // codeVal: 'http://192.168.90.156:8082',              // 二维码文字  南博
        // codeVal: 'http://10.10.120.65:8082',              // 二维码文字  国博
        // codeVal: 'http://huato.net:8022',               // 国博
        codeVal: 'http://huato.net:8013',                 // 展会
        QrLogoSrc: '../../static/img/LOGO182.png'    //  logo 
      };
    },

    methods: {
      openScanCode(){
        this.scanCode=true;
        
      },
      clodeScanCode(){
        this.scanCode = false;
      },
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      hiddenError(){
        this.verCodeError = false;
        this.userError = false;
      },
      handleSubmit2(ev) {
        var _this = this;
        // this.$router.push({ path: '/real' });
        this.$refs.ruleForm2.validate((valid) => {
          if(this.hideCode){
            if (valid) {
                //_this.$router.replace('/table');
               this.logining = true;
                //NProgress.start();
                var loginParams = qs.stringify({ name: this.ruleForm2.account, pwd: this.ruleForm2.checkPass });
                // this.$router.push({ path: '/real' });
                userLogin(loginParams).then(data => {
                  this.logining = false;
                  console.log(data);
                  //NProgress.done();
                  // let code = data.data;
                  if (!data.data.ok) {
                    this.userError = true;
                  } else {
                    let user = {
                      name:data.data.ok[0].USER_NAME,
                      ids:data.data.ok[0].USER_GROUP_IDS
                    }
                      sessionStorage.setItem('user', JSON.stringify(user));
                      this.$router.push({ path: '/real' });
                      console.log(sessionStorage.getItem('user'))
                  }
                });
              } else {
                console.log('error submit!!');
                // this.refresh();
                // this.ruleForm2.verifyCode = '';
                return false;
              }
            }else{
              if( this.ruleForm2.verifyCode != '' ){// 判断验证码是否输入
                if( this.verify.validate(this.ruleForm2.verifyCode)){  // 判断验证码是否正确
                  if (valid) {
                    //_this.$router.replace('/table');
                   this.logining = true;
                    //NProgress.start();
                    var loginParams = qs.stringify({ name: this.ruleForm2.account, pwd: this.ruleForm2.checkPass });
                    userLogin(loginParams).then(data => {
                      this.logining = false;
                      console.log(data.data);
                      //NProgress.done();
                      // let code = data.data;
                      if (!data.data.ok) {
                        this.userError = true;
                      } else {
                        let user = {
                          name:data.data.ok[0].USER_NAME,
                          ids:data.data.ok[0].USER_GROUP_IDS
                        }
                          sessionStorage.setItem('user', JSON.stringify(user));
                          this.$router.push({ path: '/real' });
                          console.log(sessionStorage.getItem('user'))
                      }
                    });
                  } else {
                    console.log('error submit!!');
                    // this.refresh();
                    // this.ruleForm2.verifyCode = '';
                    return false;
                  }
                }else{
                  this.verCodeError = true;
                   // console.log(this.ruleForm2.verifyCode)
                  this.ruleForm2.verifyCode = '';
                }
              }
            }
          

        });
      },
      refresh() {  // 点击换一张 刷新验证码
        this.verify.refresh();
      },
      scanScroll(){
        // console.log('--1---');
        if(this.scanCode){
            // console.log('--1---');
            // console.log($(window).scrollTop());
            // var scrollTop = $(window).scrollTop();
            // var hh = $('.scanCode').height();
            // console.log($(document).height());
            $('.scanCode').height($(document).height());
            // setTimeout(function(){
            //     $('.scanCode').height(hh + scrollTop);
            // },1000)
            
            
        }
      }
    },
    mounted(){
      var _this = this;
      this.verify = new GVerify('verifyCode'); // 初始化验证码
      window.addEventListener('scroll',this.scanScroll);
      $(window).keyup(function(ev){
        // console.log(ev);
         if(ev.keyCode == 13){
           _this.handleSubmit2();
        }
      })
    }
  }

</script>

<style>

.scanCode .picTitle span{
  display: inline-block;
  width: 300px;
}
.step{
  display: inline-block;
  width: 250px;
}
.step span.codeLeft{
  display: inline-block;
  float: left;
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
.step span.codeRight{
  display: inline-block;
  float: right;
  width: 230px;
  height: 70px;
  margin-bottom: 10px;
  /*line-height: 70px;*/
  
}
.step .codeLeft .circle{
  display: inline-block;
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 30px;
  background: #fff;
  color:#333;
  font-style: normal;
}
.step  .text{
  color: #fff;
  display: inline-block;
  width: 230px;
  text-align: left;
  margin-top: 20px;
  font-style: normal;
}
.text .sao{
  background: url(../../static/img/sao.png) no-repeat;
  display: inline-block;
  width: 18px;
  height: 18px;
  vertical-align: middle;
}
.step .bottomText{
  margin-top: 7px;
}
.scanCode{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left:0;
  background: rgba(0,0,0,.95);
  z-index: 99;
}
.scanCode .scanCodeClose{
  margin-top: 30px;
  text-align: center;
  padding-right: 30px;
  height: 50%;
}
.scanCode .scanCodeClose span{
    display: block;
    float: right;
    width: 65px;
    height: 65px;
    background: url(/static/img/icon.ad0330f.png) no-repeat;
    background-position: -13px -1476px;
    cursor: pointer;
}
.scanCode .scanCodeClose .QrCode{
  width: 230px;
  height: 230px;
  display: inline-block;
  position: relative;
  margin-top: 60px;
  border-radius: 10px;
  border:10px solid #4db3ff;

}
#myQrCode .codeLogo{
  width: 50px;
  height: 50px;
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.scanCode .picTitle{
  text-align: center;
}

.formItem{
  margin-bottom: 0px;
  width: 100%;
  text-align: center;
}
.serviceItem{
  margin-top: 10px;
  height: 25px;
  line-height: 25px;
}
.serviceItem .serviceText{
  font-style: normal;
  border-bottom: 1px solid #333;
}
.serviceItem .myIcon{
  display: inline-block;
  vertical-align: middle;
  width: 25px;
  height:25px;
  background: url(../../static/img/icon.png) no-repeat;
  background-position: -10px -1575px;
}
.errorInfo{
    color: #ff4949;
    line-height: 1;
    font-size: 12px;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
}
.LoginBtn{
  height: 32px;
}
.loginFooter{
  position: absolute;
  bottom:70px;
  text-align: center;
  color:#666;
}
.loginContainer{
  height: 100%;
  min-height: 630px;
  position: relative;
}
.loginTopBg{
  height: 43%;
  background: #438eb9;
}
.loginBgImg{
  position: absolute;
  top: -100px;
  left: 0;
  /*margin-top: 4%;
  margin-left: 3%;*/
}
.loginForm{
  width: 1024px;
  height: 400px;
  padding: 45px;
  position: absolute;
  top: 0;
  left:0;
  bottom: 0;
  right: 0;
  margin:auto;
  background: #fff;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  -moz-border-radius: 10px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginCont{
  height: 100%;

}
.nanboLoginLogo{
  width: 100%;
  height: 100%;
  margin:auto;
  vertical-align: middle;
}
.myForm{
  height: 100%;
  margin-left: 40px;
}
.el-form-item__content .loginInput input{
  background: #fff no-repeat;
  background-image: url(../../static/img/icon.png);
  border: 1px solid #ddd;
}
.el-form-item__content .uaerName input{
  
  background-position: 0px -935px;
}
.el-form-item__content .userPwd input {
  background-position: 0px -984px;
}
.el-form-item__content .verCode input{
  background-position: 0px -1033px;
}

  #verifyCode{
    margin: 0 10px;
  }
  .el-form-item__content{
    line-height: 0;
  }
  .myCodeTitle span{
    display: block;
    text-align: center;
    line-height: 21px;
  }
  #refresh{
    color:red;
    cursor: pointer;
  }
</style>
<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 10px;
    border-radius: 10px;
    -moz-border-radius: 10px;
    background-clip: padding-box;
    // margin: 180px auto;
    width: 350px;
    height:100%;
    padding: 0px 20px 0px 20px;
    background: #fff;
    border: 1px solid #cfcfcf;
    .title {
      margin: 10px auto 10px auto;
      padding-bottom: 10px;
      border-bottom: 1px solid #333;
      text-align: left;
      padding-left: 20px;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
