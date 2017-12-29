<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="2" class='logoCont'>
                
            </el-col>
            <el-col :span="18" class="logo logo-collapse logoCont">
                <i class='huatoLogo'></i>
                <p> {{sysName}} </p>
                <!-- <div class="tools" @click.prevent="collapse">
                    <i class="fa fa-align-justify"></i>  //可添加按钮或者文字简介
                </div> -->
            </el-col>
            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /><div class="text_head_name"><span class="text_but_01">{{sysUserName}}</span></div>
                    </span>
                    <el-dropdown-menu slot="dropdown" class="menu_home_r">
                        <el-dropdown-item @click.native="home"><i class="fa icon_img_lt_06"></i>主页</el-dropdown-item>
                        <el-dropdown-item @click.native="dialogHelpBtn"><i class="fa icon_img_lt_07"></i>帮助</el-dropdown-item>
                        <el-dropdown-item @click.native='openScanCode' v-if='qrcode'><i class="fa icon_img_sao" ></i>扫码接口</el-dropdown-item>
                        <el-dropdown-item @click.native="relic"><i class="fa icon_img_lt_08"></i>设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout"><i class="fa icon_img_lt_09"></i>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside class="home_nav_pag_b menu-expanded" :class="{ active: isActive }">
                <!-- 选择器 -->
                <section class="home_input">
                    <i class="icon_home_select"></i>
                    <span>展厅区域分类</span>
                </section>
                <!--导航菜单-->
                <v-bar class="zhantingListMenu"   wrapper='wrapper' >
                    <div>
                        <el-menu class='el-menu-vertical-demo ' v-if='options' @select='chooseZhantingID' :default-active="JSON.stringify(options == [] ? '100' : this.defaultActive)" @open='openMenu' :default-openeds='openedArray'>
                            <el-submenu index='1' v-if='options[0].length !== 0'>
                                <template slot="title"><i class='fenqu_icon zhantingIcon'></i>展厅</template>
                                <el-menu-item v-for='(item, idx) in options[0]' :key='idx' :index='JSON.stringify(item.GROUP_ID)'>{{ item.GROUP_NAME }}<i class="sanjiao_zt"></i></el-menu-item>
                            </el-submenu>
                            <el-submenu index='2' v-if='options[1].length !== 0 '>
                                
                                <template slot="title"><i class='fenqu_icon wenwuKuFang'></i>文物库房</template>
                                <el-menu-item v-for='(item, idx) in options[1]' :key='idx' :index='JSON.stringify(item.GROUP_ID)'>{{ item.GROUP_NAME }}<i class="sanjiao_zt"></i></el-menu-item>
                            </el-submenu>
                            <el-submenu index='3' v-if='options[2].length !== 0 '>
                                <template slot="title"><i class='fenqu_icon guanwaiHuanjing'></i>馆外环境</template>
                                <el-menu-item v-for='(item, idx) in options[2]' :key='idx' :index='JSON.stringify(item.GROUP_ID)'>{{ item.GROUP_NAME }}<i class="sanjiao_zt"></i></el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </div>
                </v-bar>
            </aside>
            <aside class="home_nav_pag_b menu-expanded" :class="{ active: !isActive }">
                <!--导航菜单-->
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo iscollapsed" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router  >
                    <template v-for="(item,index) in $router.options.routes" v-if="item.hidden&&item.rel_set">
                        <el-submenu :index="index+''" v-if="!item.leaf">
                            <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden"><i class="icon_img_lt_10"></i>{{child.name}}<i class="sanjiao_zt_min"></i></el-menu-item>
                        </el-submenu>
                        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
                    </template>
                   
                </el-menu>

            </aside>
            <section class="content-container" :style="{ width: containerWidth }">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
                        <!-- <el-breadcrumb separator="/" class="breadcrumb-inner">
                            <el-breadcrumb-item :to='{ path: "/overview"}'><i class="icon_img_lt_12"></i>首页</el-breadcrumb-item>
                            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to='item.path'>
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </el-breadcrumb> -->
                        <el-menu :default-active="$route.path" class="el-menu-demo " @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router v-show="!collapsed" mode="horizontal">
                            <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                                <el-submenu :index="index+''" v-if="!item.leaf" >
                                    <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</i>
                                    </template>
                                    <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden" ><!-- <i class="icon_img_lt_10"></i> -->{{child.name}}<!-- <i class="sanjiao_zt_min"></i> --></el-menu-item>
                                </el-submenu>
                                <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}<!-- <i class="sanjiao_zt"></i> --></el-menu-item>
                            </template>

                        </el-menu>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                              <keep-alive><!-- 如添加了这个，则下面对子组件的传值和方法都无效了，暂不知道为什么，先注释掉  -->
                                <router-view :collapsed="collapsed" @hidemenu="collapse_true" @showmenu="collapse_false" @inSetting="inSetting" @outSetting="outSetting" :dateType='dateType'>
                                    
                                </router-view>
                            </keep-alive>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
        <el-col :span="24" class="footer_fixd">
            <p>CopyRight&copy;2008-2016,深圳市华图测控系统有限公司,粤ICP备08032186号</p>
        </el-col>
        <el-col :span="24" class="HelpC active">
            <section class="Help_vsb">
                <section class="hid_tic">
                    <h1>文物预防性保护环境监控系统</h1>
                    <i class="el-icon-close icon_clos_fas" @click="cols_Click"></i>
                </section>
                <section class="cont_tlp">
                    <a href="http://www.huato.com" target="view_window"><img class='HuatoLogoImg' src="../assets/img/LOGO1.png" alt="HUATO"></a>
                    <p>WWWRC V3.5.2.1 B001</p>
                    <p>Copyright 2016 版权所有</p>
                    <p>深圳华图测控系统有限公司</p>
                    <p>电话：+86-755-23012549</p>
                    <p>传真：+86-755-29748856</p>
                    <p>Email：sales@huato.com</p>
                    <p>网址：<a href="http://www.huato.com" target="view_window">http://www.huato.com</a></p>
                    <p>地址：深圳市宝安西乡桃花源科技创新园四分园4楼</p>
                </section>
            </section>
        </el-col>
        <section class='ChooseZhantingCont'>

            <div class='zhantingList'>
                <div>
                   <h3 class='chooseTit'>请选择展厅：</h3> 
                   <span class='ChooseClose' @click='closeChooseZhan'></span>
                </div>
                <span class='Gallery' v-for='item in options' :data='item.value' @click='guoChooseZhan($event.currentTarget)'>{{ item.label }}</span>
            </div>
        </section>
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
    </el-row>
</template>
<script>

import $ from 'jquery'  // 全局JQ
// import commot from '../common/commot.js' // 全局函数
//coonsole.log($router.options.routes);
import {
    zhantingList
} from '../api/api'
import qs from 'qs'
import phto from '../assets/img/iconfont-guanlianlianxiren.png'
export default {
    data() {
            return {
                // sysName: '文物预防性保护环境监控系统',
                sysName: '文物预防性保护环境监控系统',
                collapsed: false,
                sysUserName: '',
                sysUserAvatar: phto,
                iconCls: 'el-icon-menu',
                hi_Show: true,
                environmentState: [],
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                ids: '',
                options: [[{'GROUP_ID': 100}],[],[]],
                // options1: [],
                // options2: [],
                defaultActive: '100',
                dropdownVal: '',
                openedArray: ['1', '2', '3'],  //默认打开的导航条
                gobackOptions: false,
                isActive: true,
                containerWidth: null,
                menuWidth: '200px',
                guoboChooseZhanting: true,  // 国博设置为true，其他为false
                scanCode: false,
                qrcode: true,   // 二维码开关, true为显示
                codeVal: 'http://172.16.50.245:8082',              // 二维码文字  深博
                // codeVal: 'http://192.168.90.156:8082',              // 二维码文字  南博
                // codeVal: 'http://huato.net:8022',                     // 国博
                // codeVal: 'http://huato.net:8013',                 // 展会
                QrLogoSrc: '../../static/img/LOGO182.png',    //  logo 
                dateType: 'date'           // 日期控件 的显示格式 国博 date   、其他 datetime
            }
        },
        methods: {
            openScanCode(){
                this.scanCode=true;
            },
            clodeScanCode(){
                this.scanCode = false;
            },
            openChooose(){
                $('.ChooseZhantingCont').show();

            },
            closeChooseZhan(){
               $('.ChooseZhantingCont').hide(); 
            },
            guoChooseZhan(_this){
                // console.log(_this);
                // console.log($(_this).attr('data'));
                $(_this).css({'color':'#6fb3e0'});
                $(_this).siblings().css({'color':'#666'});
                this.dropdownVal = $(_this).text();
                var ChooseZhantingID = $(_this).attr('data');
                this.$store.commit('SETZHANTINGID', ChooseZhantingID);
                $('.ChooseZhantingCont').hide();
            },
            closeOtherMenu(index){
                // console.log(index);
            },
            onSubmit() {
                //console.log('submit!');
            },
            handleopen() {
                //console.log('handleopen');
            },
            handleclose() {
                //console.log('handleclose');
            },
            dialogHelpBtn() {
                // console.log("00000")
                $('.HelpC').removeClass('active')
            },
            cols_Click() {
                $('.HelpC').addClass('active')
            },
            handleselect: function(a, b) {
                // console.log(a ,b)
            },
            //退出登录
            logout: function() {
                var _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    localStorage.removeItem('user');
                    _this.$router.push('/login');
                }).catch(() => {

                });
            },
            //返回主页
            home: function() {
                this.$router.push('/real');
                this.isActive = true;
                // $('.home_nav_pag_b').eq(1).removeClass('active');
                // $('.home_nav_pag_b').eq(0).addClass('active');
            },
            relic: function() {
                //console.log($('.home_nav_pag_b'));  使用jq操作dom
                // $('.home_nav_pag_b').eq(0).removeClass('active');
                // $('.home_nav_pag_b').eq(1).addClass('active');
                this.$router.push('/changePassWord');
                this.isActive = false;
                //this.$refs.hid_show_1.getElementsByClassName('home_nav_pag_b').setAttribute('class','active');
            },
            // 进入设置页面后，左侧菜单相应改变
            inSetting() {
                this.isActive = false;
                
                //console.log('----'+this.collapsed)
                if(this.collapsed){
                    $('.home_nav_pag_b.active.menu-expanded').removeClass('menu-expanded');
                    $('.container .main aside').width(50);
                    this.windowResize();
                }
            },
            // 离开设置页面后，左侧菜单相应改变
            outSetting() {
                //console.log('likai');
                let URL = location.href, //使用 url 判断
                    set = URL.includes('changePassWord'),
                    relic_info = URL.includes('dR_Relic'),
                    setHide = URL.includes('setLoggerHide'),
                    relic_img = URL.includes('pto_Relic');
                // console.log('当前：' + URL);
                if (set || relic_info || relic_img || setHide) {
                    console.log('---set');
                    this.isActive = false;
                } else {
                    console.log('----'+this.collapsed);
                    this.isActive = true;
                    this.collapsed = false;
                    $('.container .main aside').width(200);
                    $('.iscollapsed').width(200);
                     var ww = $(document).width();
                    // console.log(ww);
                    $('.content-container').width(ww - 201);
                    $('.secl_seca').css({'opacity':1});
                    $('.home_input>i').css({'z-index': '9','margin':'11px 0 11px 20px'}); 
                }
                

            },
            //折叠导航栏
            collapse_false: function() {
                
               
            },
            collapse_true: function() {
               
            },
            showMenu(i, status) {
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            },
            changeZhanting() {
                var dropdownV = this.options[0].value;
                if (this.dropdownVal == this.options[0].label) {
                    this.$store.commit('SETZHANTINGID', dropdownV);
                } else {
                    this.$store.commit('SETZHANTINGID', this.dropdownVal);
                }
            },
            chooseZhantingID(idx){
                // console.log(idx);
                
                this.$store.commit('SETZHANTINGID', Number(idx));
                
                // console.log(this.$store.state.zhantingID)
            },
            openMenu(idx){
                // console.log('open---'+idx);
            },
            showMenu_1(i, status) {
                this.$refs.menuCollapsed_1.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            },
            windowResize(){
                   var ww = document.documentElement.clientWidth || document.body.clientWidth;
                    if(ww < 1360){
                        this.containerWidth = 1360 - 201;
                        ww = 1360;
                    }
                    this.containerWidth = ww - 201;
                    if(this.collapsed){
                        $('.content-container').width(ww - 51);
                        this.containerWidth = ww - 51;
                    }else{
                        $('.content-container').width(ww - 201);
                        this.containerWidth = ww - 201;
                    }
                    var hh = $(document).height();
                      // console.log(hh);
                      $('.content-wrapper').css({'height':hh - 90 - 32});
                    $('.showListCont').height(hh - 90 - 32 - 30);
                    $('.zhantingListMenu').height(hh - 90 - 32 - 10);
            },
            scanCodeEvent(){
                if(this.scanCode){
                    $('.scanCode').height($(document).height());
                }
            }

        },
        updated(){
            
        },
        watch: {
            "$route": 'outSetting'
        },
        mounted() {
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.name || '';
                this.ids = user.ids;
            };
            var ids = qs.stringify({
                "": this.ids
            });

            zhantingList(ids).then(data => {
                console.log(data);
                let overViewName = [];
                // 遍历对象
                this.options=[];
                let _this = this;
                Object.keys(data).forEach(function (key) {
                    // console.log(key , data[key]);
                    _this.options.push(data[key]);
                    for(var i = 0; i< data[key].length; i++ ) {                     
                        overViewName.push(data[key][i]);
                    }
                    // 
                })
                console.log(this.options);
                // console.log(overViewName);
                if(this.options[0].length !== 0) {
                    this.defaultActive = JSON.stringify(this.options[0][0].GROUP_ID);
                } else if(this.options[1].length !== 0) {
                    this.defaultActive = JSON.stringify(this.options[1][0].GROUP_ID);
                }else if(this.options[2].length !== 0) {
                    this.defaultActive = JSON.stringify(this.options[2][0].GROUP_ID);
                }
                this.$store.commit('OVERVIEWNAME', overViewName);
                this.$store.commit('SETZHANTINGID', this.defaultActive);
                // this.defaultActive = JSON.stringify(data[0][0].GROUP_ID);

                // this.options = data;
                console.log(this.options);

                // this.dropdownVal = data[0][0].GROUP_NAME;
                this.dropdownVal = this.defaultActive;
                this.$store.state.zhantingID = this.defaultActive;
            });
            // console.log(sessionStorage.getItem('user'))
            this.windowResize();
            window.addEventListener('scroll',this.scanCodeEvent);
            var _this= this;
            window.onresize = function(){
                _this.windowResize();
            }
        }
}
</script>


<style scoped lang="scss">
@import '~scss_vars';
// $LOGO:'../assets/img/NanBoLogo.png';         // 南博LOGO
$LOGO:'../../static/img/ShenBoLogo.png';        // 深博LOGO
// $LOGO:'../../static/img/guoboLogo.png';      // 国博LOGO
// $LOGO:'../../static/img/zhenYuanLogo.png';   // 镇原Logo
// $LOGO:'../../static/img/tianshuiLogo.png';   // 天水Logo
// $LOGO:'../../static/img/anhuiLogo.png';      // 安徽LOGO
.huatoLogo {
    display: inline-block;
    width: 50px;  //  其他博物馆位置
    // width:175px;  // 国博的logo宽度
    height: 50px;
    // background: url(../../static/img/logo.png) no-repeat; 
    // background: url($LOGO);  // 崇信、庄浪 、陇西、鄂尔多斯、绵阳  没logo，直接注释
    background-position: 0px 4px;  //其他
    // background-position: 0 0;         // 安徽
    // background-position: -4px 0px;      // 镇原
    // background-position: 0px 10px;   // 国博的位置
    background-repeat: no-repeat;
    background-size: 100%;
    transform: scale(0.8);
    // transition: transform 1s ease;
    // animation: Mis 1s ease infinite;
}
ul.el-menu--horizontal li {
    width: 150px;
}
.zhantingListMenu {
    padding-top: 10px;
}
.bar--wrapper > * {
    padding-right: 7px !important; 
}
@keyframes Mis{
    0%{
        transform: rotate3d(0,0,0,0deg) scale(0.8);
    }
    100%{
        transform: rotate3d(100,100,100,360deg) scale(0.8);
    }
} 
//
//
.home_nav_pag_b.active>.el-menu.el-menu-vertical-demo {
    background: #f4f4f4;
    padding-top: 10px;
}
 // .el-menu-vertical-demo:not(.el-menu--collapse) {
 //    width: 200px;
    
 //  }
.icon_home_select{
    position: absolute;
    margin: 11px 0 11px 20px;
    display: inline-block;
    width: 20px;
    height: 17px;
    z-index: 9;
}
.colspased_show {
    display: inline-block;
    height: 30px;
    width: 100%;
    background: url('../assets/img/clsp.png');
    background-position: 15px -75px;
    cursor:pointer;
}

.colspased_show_hid {
    display: inline-block;
    height: 30px;
    width: 100%;
    background: url('../assets/img/clsp.png');
    background-position: 1px -122px;
    cursor: pointer;
}

//设置下拉框样式
.menu_home_r {
    width: 130px;
}

.home_nav_pag_b {
    display: none;
    border-right: 1px solid #ddd;
}

.home_nav_pag_b.active {
    display: block;
}
.home_input{
    height: 40px;
    line-height: 40px;
    background: #8dc2e1;
}
.home_input span {
    color:#fff;
    margin-left: 50px;
}
//sanjiao.
.is-active>.sanjiao_zt {
    position: absolute;
    /* float: right; */
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-right: 7px solid #438eb9;
    border-bottom: 15px solid transparent;
    margin-top: 5px;
    right: 0;
}

.is-active>.sanjiao_zt_min {
    position: absolute;
    /* float: right; */
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-right: 7px solid #438eb9;
    border-bottom: 15px solid transparent;
    margin-top: 5px;
    right: 0;
}

//选择器
.secl_seca {
    height: 40px;
    background-color: #8dc2e0;
    line-height: 40px;
    .size_h {
        background: #8dc2e0;
    }
}

.container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    min-width:1360px;
    .header {
        height: 50px;
        line-height: 50px;
        background: $color-primary;
        color: #fff;
        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;
            height: 50px;
            line-height: 0;
            .userinfo-inner {
                cursor: pointer;
                color: #fff;
                background: rgba(255, 255, 255, .2);
                display: inline-block;
                img {
                    width: 35px;
                    height: 35px;
                    border-radius: 20px;
                    margin: 7.5px;
                    ;
                    float: left;
                }
                .text_head_name {
                    display: inline-block;
                    height: 50px;
                    width: 100px;
                    text-align: center;
                    overflow: hidden;
                    float: right;
                    line-height: 50px;
                    .text_up_01 {
                        // display: inline-block;
                        height: 25px;
                        line-height: 40px;
                        // float: left;
                    }
                    .text_but_01 {
                        // display: inline-block;
                        height: 25px;
                        padding-right: 5px;
                        white-space:nowrap;
                        overflow: hidden;
                        // line-height: 15px;
                        // float: left;
                    }
                }
            }
        }
        .logo {
            //width:230px;
            height: 50px;
            font-size: 22px;
            // padding-left: 20px;
            // padding-right: 20px;
            // border-color: rgba(238,241,146,0.3);
            // border-right-width: 1px;
            // border-right-style: solid;
            img {
                width: 40px;
                float: left;
                margin: 10px 10px 10px 18px;
            }
            .txt {
                color: #fff;
            }
        }
        .logo-width {
            width: 200px;
        }
        .tools {
            padding: 0px 23px;
            width: 14px;
            height: 50px;
            line-height: 50px;
            cursor: pointer;
        }
    }
    .main {
        // display: flex;
        // background: #324057;
        position: absolute;
        top: 50px;
        bottom: 0px;
        overflow: hidden;
        aside {
            // flex: 0 0 200px;
            float: left;
            width: 200px;
            height:100%;
            background: #f4f4f4;
            // position: absolute;
            // top: 0px;
            // bottom: 0px;
            .el-menu {
                height: 100%;
            }
            .collapsed {
                width: 50px;
                .item {
                    position: relative;
                }
                .submenu {
                    position: absolute;
                    top: 0px;
                    left: 50px;
                    z-index: 99999;
                    height: auto;
                    display: none;
                }
            }
        }
        .menu-collapsed {
            flex: 0 0 50px;
            width: 50px;
        }
        .menu-expanded {
            flex: 0 0 200px;
            width: 200px;
        }
        .content-container {
            // background: #f1f2f7;
            flex: 1;
            float: left;
            height:100%;
            // overflow-y: scroll;
            // padding: 20px;
            .breadcrumb-container {
                height: 40px;
                line-height: 40px;
                background: #eef1f6;
                padding-left: 100px;   // 以前的
                padding-left: 20px;    // 加上空调调控的
                // .title {
                //  width: 200px;
                //  float: left;
                //  color: #475669;
                // }
                .breadcrumb-inner {
                    // float: right;
                }
            }
            .content-wrapper {
                background-color: #fff;
                box-sizing: border-box;
                // padding: 16px 0 11px 11px;
                position: relative;
                height: auto;
                overflow-x: hidden; 
                // min-height:95%;
                overflow-y:auto;
            }
            .grid-content {
                height: 100%;
            }
        }
    }
}

.footer_fixd {
    min-width: 1360px;
    height: 32px;
    background: #1d1e24;
    text-align: center;
    line-height: 32px;
    position: fixed;
    bottom: 0;
    cursor: pointer;
    >p {
        color: #999;
        font-size: 14px;
        font-family: Microsoft YaHei;
    }
}

.HelpC {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: rgba(0, 0, 0, .5);
    visibility: visible;
    .Help_vsb {
        min-width: 35%;
        // height
        border: 1px solid #ddd;
        box-shadow: 1px 1px 1px 1px #ddd;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -15%;
        margin-top: -15%;
        .hid_tic {
            height: 40px;
            background: #eff3f8;
            font-size: 20px;
            text-align: center;
            line-height: 40px;
            border-bottom: 1px solid #ddd;
            margin: 0;
            padding: 0 5px 0 10px;
            h1 {
                margin: 0;
                font-size: 20px;
                font-weight: 500;
                display: inline-block;
                cursor: pointer;
            }
            .icon_clos_fas {
                float: right;
                padding: 12px 10px;
                font-size: 16px;
                color: #999;
                cursor: pointer;
            }
        }
        .cont_tlp {
            background: #fff;
            text-align: center;
            line-height: 25px;
            font-size: 14px;
            color: #999;
            padding: 20px 0;
            p {
                line-height: 35px;
                cursor: pointer;
            }
        }
    }
}

.HelpC.active {
    visibility: hidden;
}
</style>

<style media="screen">
.el-menu-item .icon_img_lt_air {
    display: inline-block;
    width: 18px;
    height: 18px;
    background: url(../../static/img/airTitle.png) no-repeat;
    vertical-align: middle;
}
.el-loading-mask {
    top: 200px;
}
.el-menu--horizontal .el-menu-item {
    height:40px;
    line-height: 40px;
}
.el-menu--horizontal .el-submenu .el-submenu__title {
    height:40px;
    line-height: 40px;
}
.el-menu--horizontal .el-submenu>.el-menu {
    top: 45px;
}
.text .sao{
  background: url(../../static/img/sao.png) no-repeat;
  display: inline-block;
  width: 18px;
  height: 18px;
  vertical-align: middle;
}
.icon_img_sao{
    background: url(../../static/img/saoIcon.png) no-repeat;
    background-position: -4px;
    width: 18px;
    height: 18px;
    display: inline-block;
    vertical-align: middle;
}
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
  height: 40px;
  line-height: 40px;
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

.ChooseZhantingCont{
    display: none;
    width: 100%;
    height:100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.3)
}
.ChooseZhantingCont .zhantingList{
    width:620px;
    height:400px;
    position: absolute;
    padding:0 10px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin:auto;
    background: #fff;
    z-index: 999;
}
.zhantingList .Gallery{
    display: inline-block;
    width: 150px;
    height:40px;
    line-height: 40px;
    text-align: center;
    color:#666;
    cursor: pointer;
}
.chooseTit{
    display: inline-block;
}
.ChooseClose{
    display: inline-block;
    float: right;
    width: 25px;
    height:25px;
    background: url(../../static/img/icon.png) no-repeat;
    background-position: -120px -450px;
    margin: 16px 10px 10px 0;
    cursor: pointer;
}
.home_input .el-button{
    width:200px;
    border-radius: 0px;
    padding: 2px 17px;
}
.el-select-dropdown__wrap{
    max-height: none;
}
p {
    margin: 0;
}
.el-select-dropdown{
    background-color: #fff;
}
.HuatoLogoImg{
    border-style: none;
}
.logoCont {
    /*width: 200px;*/
    text-align: center;
    height:50px;
}
.logoCont>i{
    /*margin-left: 15%;*/
    vertical-align: middle;
}
.logoCont>p{
    display: inline-block;
}


.home_input .el-input input {
    background-color: #8dc2e0;
    color: #fff;
}
.el-input input{
    border: none;
    padding-left: 20px;
    border-bottom: 1px solid #ddd;
    /*border-right: 1px solid #ddd;*/
    border-radius: 0;
    text-indent: 2em;
    height: 40px;
    font-family: 黑体;
}

.home_input .el-select .el-input .el-input__icon{
    color: #fff;
}
.el-input__inner:hover {
    border-color: #ddd;
}

.el-select:hover .el-input__inner {
    border-color: #ddd;
}
.fenqu_icon {
    display: inline-block;
    width:20px;
    height:20px;
    vertical-align: middle;
    margin-right: 10px;
    background: url(../../static/img/icon.png) no-repeat;
}
.zhantingIcon{
    background-position: -15px -529px ;
}
.wenwuKuFang {
    background-position: -15px -572px ;
}
.guanwaiHuanjing {
    background-position: -15px -600px ;
}
.el-menu-item,
.el-submenu__title {
    height: 55px;
    line-height: 55px;
    font-size: 16px;
}

.el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;
}

.el-submenu__title>.el-submenu__icon-arrow.el-icon-arrow-down {
    color: #999;
}
.el-menu.el-menu-vertical-demo>.el-submenu .el-submenu__title{
    background: #8dc2e1;
    color: #fff;
}
.el-menu.el-menu-vertical-demo .el-submenu__title>.el-submenu__icon-arrow.el-icon-arrow-down {
    color: #fff;
}
.el-menu.el-menu-vertical-demo>.el-submenu.is-active.is-opened {
    /*border-right: 2px solid #438eb9;*/
    color: #666;
    background: #f4f4f4;
}
.el-menu.el-menu-vertical-demo>.el-menu-item.is-active {
    /*border-right: 2px solid #438eb9;*/
    color: #666;
    background: #d9d9d9;
}
.el-menu.el-menu-vertical-demo>.el-menu-item, .el-submenu__title {
    height:40px;
    line-height: 40px;
}
.el-menu.el-menu-vertical-demo>.el-submenu.is-opened {
    border-bottom: none;
}
.el-menu.el-menu-vertical-demo>.el-submenu.is-opened .el-menu-item.is-active {
    color: #666;
    background: #fff;
}
.el-submenu .el-menu {
    background-color: #f4f4f4;
}
.el-menu.el-menu-vertical-demo>.el-submenu.is-opened>.el-submenu__title {
    border-bottom: 1px solid #ddd;
}
.el-menu.el-menu-vertical-demo>.el-submenu{
    border-bottom: 1px solid #ddd;
}
.el-menu.el-menu-vertical-demo>.el-submenu.is-opened .el-menu-item {
    border-bottom: 1px solid #ddd;
}
.el-menu--horizontal .el-menu-item.is-active {
    /*border-right: 2px solid #438eb9;*/
    color: #666;
    background: #d9d9d9;
}

/*.grid-content.bg-purple-light>.breadcrumb-container.el-col.el-col-24 {
    border-bottom: 1px solid #ddd;
}*/

.grid-content.bg-purple-light>.breadcrumb-container.el-col.el-col-24>.el-breadcrumb.breadcrumb-inner {
    height: 40px;
    line-height: 40px;
    /*background: #f4f4f4;*/
    /*text-indent: 2em;*/
}

.secl_seca .el-input__icon+.el-input__inner {
    font-size: 16px;
}
.el-menu--horizontal>.el-menu-item:hover, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title, .el-menu--horizontal>.el-submenu:hover .el-submenu__title {
    border-bottom: none;
}
.el-menu--horizontal .el-menu-item {
    border-bottom:none;
}
.el-menu-item, .el-submenu__title {
    transition: none;
}
.el-menu--horizontal .el-submenu.is-active {
    background-color: #d9d9d9;
}
ul.el-menu--horizontal li {
    width: 160px;
}
</style>
<!-- 滚动条样式 -->
<style>
    .vb > .vb-dragger {
    z-index: 5;
    width: 12px;
    right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    background-color: rgba(48, 121, 244,.1);
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
}
</style>
