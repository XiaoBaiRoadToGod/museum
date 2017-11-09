<template>
  <el-row class="pos_rea het_si" style='height:100%;overflow:hidden'>
    <el-col :span="21" class="pos_rea bor_ddd" style='height:100%;'>
      
      <section class="img_bg_up pos_rea bor_ddd addWidth" >
        
        <img v-bind:src="rela_img" alt="" v-if='!showList'>
        
        <section class="posiBlic" v-if='!showList' style='position: absolute; height:100%;overflow:visible'>
          <section v-for="item of items" class="inline_ck pos_abs" :style="{top:item.Top+'%',left:item.Left+'%'}">
            <img :src="item.UulIng" alt="" class="pos_abs img_size click_img_toggle" :class='{active: showDetailes}' :style='{width:item.isHengwen?"48px":"24px"}' @click="Toggle_img_Cc($event)">
            <section class="box_OF_tog" :class='{active: showDetailes}' @click="Toggle_box_tog($event)">
              <p v-if="item.Tmp != null" :style="{color:item.color1}"  >{{ item.Tmp + item.Tmp_Unit }}</p>
              <p v-if="item.Huid != null" :style="{color:item.color2}">{{ item.Huid + item.Huid_Unit   }}</p>
              <p v-if="item.Songd != null" :style="{color:item.color3}">{{ item.Songd + item.Songd_Unit }}</p>
              <p v-if="item.Uaug != null" :style="{color:item.color4}">{{ item.Uaug + item.Uaug_Unit }}</p>
            </section>
            <!-- 居中 -->
            <section class="pos_abs fixd_po toggle_child_click"  @click="event_toggle($event)" style="left:-90px;top:35px" v-if="20<item.Left && item.Left<80 && 20<item.Top && item.Top<80">
              <section class="title_img">
                <h4>{{ item.Name }}</h4><img :src="item.UingElecT" alt="">
              </section>
              <section class="cons_text">
                <section v-if="item.Tmp != null">{{ item.Tmp_Name }}<span :style="{color:item.color1}">{{ item.Tmp + item.Tmp_Unit }}</span></section>
                <section v-if="item.Huid != null">{{ item.Huid_Name }}<span :style="{color:item.color2}">{{ item.Huid + item.Huid_Unit }}</span></section>
                <section v-if="item.Songd != null">{{ item.Songd_Name }}<span :style="{color:item.color3}">{{ item.Songd + item.Songd_Unit }}</span></section>
                <section v-if="item.Uaug != null">{{ item.Uaug_Name }}<span class='overflowDisplay' :style="{color:item.color4}">{{ item.Uaug + item.Uaug_Unit }}</span></section>
              </section>
              <section class="right_fr"><span @click="Data_Router($event)" :name="item.yiId">查看统计图>></span></section>
              <i class='arrows_center arrows'></i>
            </section>
            <!-- 左中 -->
            <section class="pos_abs fixd_po toggle_child_click"  @click="event_toggle($event)" style="left:40px;top:-20px;" v-else-if="20>item.Left && 20<item.Top && item.Top<80">
              <section class="title_img">
                <h4>{{ item.Name }}</h4><img :src="item.UingElecT" alt="">
              </section>
              <section class="cons_text">
                <section v-if="item.Tmp != null">{{ item.Tmp_Name }}<span :style="{color:item.color1}">{{ item.Tmp + item.Tmp_Unit }}</span></section>
                <section v-if="item.Huid != null">{{ item.Huid_Name }}<span :style="{color:item.color2}">{{ item.Huid + item.Huid_Unit }}</span></section>
                <section v-if="item.Songd != null">{{ item.Songd_Name }}<span :style="{color:item.color3}">{{ item.Songd + item.Songd_Unit }}</span></section>
                <section v-if="item.Uaug != null">{{ item.Uaug_Name }}<span class='overflowDisplay' :style="{color:item.color4}">{{ item.Uaug + item.Uaug_Unit }}</span></section>
              </section>
              <section class="right_fr"><span @click="Data_Router($event)" :name="item.yiId">查看统计图>></span></section>
              <i class='arrows_left_center arrows'></i>
            </section>
            <!-- 右中 -->
            <section class="pos_abs fixd_po toggle_child_click"  @click="event_toggle($event)" style="left:-240px;top:-20px;" v-else-if="80<item.Left && 20<item.Top && item.Top<80">
              <section class="title_img">
                <h4>{{ item.Name }}</h4><img :src="item.UingElecT" alt="">
              </section>
              <section class="cons_text">
                <section v-if="item.Tmp != null">{{ item.Tmp_Name }}<span :style="{color:item.color1}">{{ item.Tmp + item.Tmp_Unit }}</span></section>
                <section v-if="item.Huid != null">{{ item.Huid_Name }}<span :style="{color:item.color2}">{{ item.Huid + item.Huid_Unit }}</span></section>
                <section v-if="item.Songd != null">{{ item.Songd_Name }}<span :style="{color:item.color3}">{{ item.Songd + item.Songd_Unit }}</span></section>
                <section v-if="item.Uaug != null">{{ item.Uaug_Name }}<span class='overflowDisplay' :style="{color:item.color4}">{{ item.Uaug + item.Uaug_Unit }}</span></section>
              </section>
              <section class="right_fr"><span @click="Data_Router($event)" :name="item.yiId">查看统计图>></span></section>
              <i class='arrows_right_center arrows'></i>
            </section>
            <!-- 上中 -->
            <section class="pos_abs fixd_po toggle_child_click"  @click="event_toggle($event)" style="left:-90px;top:35px" v-else-if="20<item.Left && item.Left<80 && item.Top<20">
              <section class="title_img">
                <h4>{{ item.Name }}</h4><img :src="item.UingElecT" alt="">
              </section>
              <section class="cons_text">
                <section v-if="item.Tmp != null">{{ item.Tmp_Name }}<span :style="{color:item.color1}">{{ item.Tmp + item.Tmp_Unit }}</span></section>
                <section v-if="item.Huid != null">{{ item.Huid_Name }}<span :style="{color:item.color2}">{{ item.Huid + item.Huid_Unit }}</span></section>
                <section v-if="item.Songd != null">{{ item.Songd_Name }}<span :style="{color:item.color3}">{{ item.Songd + item.Songd_Unit }}</span></section>
                <section v-if="item.Uaug != null">{{ item.Uaug_Name }}<span class='overflowDisplay' :style="{color:item.color4}">{{ item.Uaug + item.Uaug_Unit }}</span></section>
              </section>
              <section class="right_fr"><span @click="Data_Router($event)" :name="item.yiId">查看统计图>></span></section>
              <i class='arrows_top_center arrows'></i>
            </section>
            <!-- 下中 -->
            <section class="pos_abs fixd_po toggle_child_click"  @click="event_toggle($event)" style="left:40px;top:-40px" v-else-if="20<item.Left && item.Left<80 && 80<item.Top">
              <section class="title_img">
                <h4>{{ item.Name }}</h4><img :src="item.UingElecT" alt="">
              </section>
              <section class="cons_text">
                <section v-if="item.Tmp != null">{{ item.Tmp_Name }}<span :style="{color:item.color1}">{{ item.Tmp + item.Tmp_Unit }}</span></section>
                <section v-if="item.Huid != null">{{ item.Huid_Name }}<span :style="{color:item.color2}">{{ item.Huid + item.Huid_Unit }}</span></section>
                <section v-if="item.Songd != null">{{ item.Songd_Name }}<span :style="{color:item.color3}">{{ item.Songd + item.Songd_Unit }}</span></section>
                <section v-if="item.Uaug != null">{{ item.Uaug_Name }}<span class='overflowDisplay' :style="{color:item.color4}">{{ item.Uaug + item.Uaug_Unit }}</span></section>
              </section>
              <section class="right_fr"><span @click="Data_Router($event)" :name="item.yiId">查看统计图>></span></section>
              <i class='arrows_bottom_center arrows'></i>
            </section>
            <!-- 左上 -->
            <section class="pos_abs fixd_po toggle_child_click"  @click="event_toggle($event)" style="left:40px;top:0px" v-else-if="20>item.Left && 20>item.Top">
              <section class="title_img">
                <h4>{{ item.Name }}</h4><img :src="item.UingElecT" alt="">
              </section>
              <section class="cons_text">
                <section v-if="item.Tmp != null">{{ item.Tmp_Name }}<span :style="{color:item.color1}">{{ item.Tmp + item.Tmp_Unit }}</span></section>
                <section v-if="item.Huid != null">{{ item.Huid_Name }}<span :style="{color:item.color2}">{{ item.Huid + item.Huid_Unit }}</span></section>
                <section v-if="item.Songd != null">{{ item.Songd_Name }}<span :style="{color:item.color3}">{{ item.Songd + item.Songd_Unit }}</span></section>
                <section v-if="item.Uaug != null">{{ item.Uaug_Name }}<span class='overflowDisplay' :style="{color:item.color4}">{{ item.Uaug + item.Uaug_Unit }}</span></section>
              </section>
              <section class="right_fr"><span @click="Data_Router($event)" :name="item.yiId">查看统计图>></span></section>
              <i class='arrows_left_top arrows'></i>
            </section>
            <!-- 右上 -->
            <section class="pos_abs fixd_po toggle_child_click"  @click="event_toggle($event)" style="left:-240px;top:0px" v-else-if="80<item.Left && 20>item.Top">
              <section class="title_img">
                <h4>{{ item.Name }}</h4><img :src="item.UingElecT" alt="">
              </section>
              <section class="cons_text">
                <section v-if="item.Tmp != null">{{ item.Tmp_Name }}<span :style="{color:item.color1}">{{ item.Tmp + item.Tmp_Unit }}</span></section>
                <section v-if="item.Huid != null">{{ item.Huid_Name }}<span :style="{color:item.color2}">{{ item.Huid + item.Huid_Unit }}</span></section>
                <section v-if="item.Songd != null">{{ item.Songd_Name }}<span :style="{color:item.color3}">{{ item.Songd + item.Songd_Unit }}</span></section>
                <section v-if="item.Uaug != null">{{ item.Uaug_Name }}<span class='overflowDisplay' :style="{color:item.color4}">{{ item.Uaug + item.Uaug_Unit }}</span></section>
              </section>
              <section class="right_fr"><span @click="Data_Router($event)" :name="item.yiId">查看统计图>></span></section>
              <i class='arrows_right_top arrows'></i>
            </section>
            <!-- 左下 -->
            <section class="pos_abs fixd_po toggle_child_click"  @click="event_toggle($event)" style="left:40px;top:-80px" v-else-if="20>item.Left && 80<item.Top">
              <section class="title_img">
                <h4>{{ item.Name }}</h4><img :src="item.UingElecT" alt="">
              </section>
              <section class="cons_text">
                <section v-if="item.Tmp != null">{{ item.Tmp_Name }}<span :style="{color:item.color1}">{{ item.Tmp + item.Tmp_Unit }}</span></section>
                <section v-if="item.Huid != null">{{ item.Huid_Name }}<span :style="{color:item.color2}">{{ item.Huid + item.Huid_Unit }}</span></section>
                <section v-if="item.Songd != null">{{ item.Songd_Name }}<span :style="{color:item.color3}">{{ item.Songd + item.Songd_Unit }}</span></section>
                <section v-if="item.Uaug != null">{{ item.Uaug_Name }}<span class='overflowDisplay' :style="{color:item.color4}">{{ item.Uaug + item.Uaug_Unit }}</span></section>
              </section>
              <section class="right_fr"><span @click="Data_Router($event)" :name="item.yiId">查看统计图>></span></section>
              <i class='arrows_lift_bottom arrows'></i>
            </section>
            <!-- 右下 -->
            <section class="pos_abs fixd_po toggle_child_click"  @click="event_toggle($event)" style="left: -240px;top:-50px;" v-else-if="80<item.Left && 80<item.Top">
              <section class="title_img">
                <h4>{{ item.Name }}</h4><img :src="item.UingElecT" alt="">
              </section>
              <section class="cons_text">
                <section v-if="item.Tmp != null">{{ item.Tmp_Name }}<span :style="{color:item.color1}">{{ item.Tmp + item.Tmp_Unit }}</span></section>
                <section v-if="item.Huid != null">{{ item.Huid_Name }}<span :style="{color:item.color2}">{{ item.Huid + item.Huid_Unit }}</span></section>
                <section v-if="item.Songd != null">{{ item.Songd_Name }}<span :style="{color:item.color3}">{{ item.Songd + item.Songd_Unit }}</span></section>
                <section v-if="item.Uaug != null">{{ item.Uaug_Name }}<span class='overflowDisplay' :style="{color:item.color4}">{{ item.Uaug + item.Uaug_Unit }}</span></section>
              </section>
              <section class="right_fr"><span @click="Data_Router($event)" :name="item.yiId">查看统计图>></span></section>
              <i class='arrows_right_bottom arrows'></i>
            </section>
          </section>
        </section>
        <v-bar class="showListCont" v-if='showList'  wrapper='wrapper' >
          <div>
            <section v-for='item of items' class='showListBox'>
              <p class='title' >{{ item.Name }}</p>
              <div class='showListDetails' :class="{twoAisle: item.number <= 2, threeAisle: item.number >= 3 }">
                <p  v-if='item.Tem !== null' :style="{color:item.color1}">{{ item.Tmp + item.Tmp_Unit }}</p>
                <p v-if="item.Huid !== null" :style="{color:item.color2}">{{ item.Huid + item.Huid_Unit   }}</p>
                <p v-if="item.Songd !== null" :style="{color:item.color3}">{{ item.Songd + item.Songd_Unit }}</p>
                <p v-if="item.Uaug !== null" :style="{color:item.color4}">{{ item.Uaug + item.Uaug_Unit }}</p>
              </div>
              <div class='showListFooter'>
                <div>
                  <img :src="item.UingElecT" alt="">
                </div>
                <div class='date'>
                  {{ item.time}}
                </div>
              </div>
            </section>
          </div>
        </v-bar>
      </section>
    </el-col>
    <el-col :span="3" class="pos_rea realRight ">
      <section class="tic_hed" >
         <!--  <img  src='../../../static/img/ON.png' height="22" width="60" class="icon_On_off flt_r" :class='{active: showList}' @click="click_icon_OF($event)"> -->
           <!-- <img  src='../../../static/img/ON.png' height="22" width="60" class="icon_On_off flt_r"  @click="click_icon_OF($event)"> -->
           <el-switch v-model="showList" on-text="分布图" off-text='列表' :width='80' on-color='#58a7d2'>
          </el-switch>
      </section>
      <div class='relRightCont contHidden'>
        <section class='qualitEval'>
          <div class='realContent'>
            <p class='realTitle'>环境质量评估</p>
            <div class='scoreCont'>{{ evalQualityScore }}</div>
          </div>
          
        </section>
        <section class='qualitEval'>
          <div class='realContent ' >
            <p class='realTitle'>监测点统计：共{{ monitoringPointNum.PropInteger }}台</p>
            <v-bar class='monitor ' wrapper='wrapper'>
              <div>
                <div class='monitorCont' v-for='item in monitoringPoint'>
                  <img class='monitorImg' :src="item.PropPathURL" alt="">
                  <span class='montorSb'>{{ item.PropString }}</span>
                  <span class='montorNum'>:{{ item.PropInteger }}台</span>
                </div> 
              </div> 
            </v-bar>
          </div>
        </section>
        <section class='qualitEval'>
          <div class='realContent'>
            <p class='realTitle'>报警数量统计</p>
            <div monitor>
              <div class='monitorCont' >
                <img class='monitorImg' src="../../../static/img/正常运行.png" >
                <span class='montorSb'>正常运行</span>
                <span class='montorNum'>:{{ warningNumber[0] }}个</span>
              </div>
              <div class='monitorCont' >
                <img class='monitorImg' src="../../../static/img/一般预警.png" >
                <span class='montorSb'>一般预警</span>
                <span class='montorNum'>:{{ warningNumber[1] }}个</span>
              </div>
              <div class='monitorCont' >
                <img class='monitorImg' src="../../../static/img/严重预警.png" >
                <span class='montorSb'>严重预警</span>
                <span class='montorNum'>:{{ warningNumber[2] }}个</span>
              </div>
            </div>
          </div>
        </section>
        <div class='hiddenDiv' @click='myHiddenRight'></div>
      </div>
      
    </el-col>
    
  </el-row>
  
</template>
<script type="text/javascript">
import qs from 'qs'
import { DeviceInfo,Succscore,EarlyWarning,EqmtStatistics } from '../../api/api'
// DeviceInfo Succscore EarlyWarning EqmtStatistics
export default {
  data(){
    return{
      rela_img: '',
      items: [],
      evalQualityScore: null,    //  质量评估
      warningNumber: '',            // 报警数量统计
      monitoringPoint: '',         // 监测点统计
      monitoringPointNum: '',          //监测点统计共几台 
      click_this: '',
      hiddenRightOF: false,
      showDetailes:true,  // 显示详情
      showList: true     // 显示列表形式

    }
  },
  methods: {
    getDetaAll:function(){
      let zhantingID = this.$store.state.zhantingID;
      // 将id传到后台并获取仪器数据列表
      let potDateID_arry = {'GROUP_ID': zhantingID};
      DeviceInfo(potDateID_arry).then(data => {
        console.log(data);
        this.rela_img = '';
        this.items = [];
        data = data.sort(function(a, b){  // 按名字排序            
            return (a[0]).localeCompare(b[0], 'zh-Hans-CN', {sensitivity: 'accent'});
          });
        for (var i = 0; i < data.length; i++) {
          this.rela_img = data[i][23];
          // console.log(data[i][13])
          var shebeiNumber;
          if( data[i][1] !== null && data[i][2] !== null && data[i][3] !== null  && data[i][4]){
              shebeiNumber = 4;
          }else if (data[i][1] !== null && data[i][2] !== null && data[i][3] != null) {
              shebeiNumber = 3;
          } else if (data[i][1] !== null && data[i][2] !== null ) {
            shebeiNumber = 2;
          }else {
            shebeiNumber = 1;
          }
          var isHengwen = data[i][13].indexOf('恒温恒湿机') >= 0;
          // console.log(isHengwen);
          this.items.push({
            "Name":data[i][0],
            "UulIng":data[i][13],
            "UingElecT": data[i][22],
            "Top":(Number(data[i][11])+Number(data[i][12])) * 50,
            "Left":(Number(data[i][9])+Number(data[i][10])) * 50,
            "inx": "popover" + (i+1),
            "Tmp":data[i][1],
            "Huid":data[i][2],
            "Songd":data[i][3],
            "Uaug":data[i][4],
            "Tmp_Unit":data[i][5],
            "Huid_Unit":data[i][6],
            "Songd_Unit":data[i][7],
            "Uaug_Unit":data[i][8],
            "color1":data[i][14],
            "color2":data[i][15],
            "color3":data[i][16],
            "color4":data[i][17],
            "yiId": data[i][20] + '/' + data[i][19],
            "Tmp_Name":data[i][24],
            "Huid_Name":data[i][25],
            "Songd_Name":data[i][26],
            "Uaug_Name":data[i][27],
            "isHengwen": isHengwen,
            "number": shebeiNumber,
            'time': this.dateTimeFormater(data[i][21])
          })
        };
        console.log(this.items);
      }).then(() => {
        // this.watchZhantingOF();
      });
      // console.log(this.items);
    },
    watchID: (_this) => {// 监听窗口 ID 函数
      _this.$store.watch(
        function(state){
          return state.zhantingID;
          return state.Instrument_ID;
        },function(){
          _this.getDetaAll();
          _this.qualityScore();
          _this.monitoringStatis();
          _this.warningNum();

        },{
          deep:true
      })
    },
    dateTimeFormater(date){
      return date.replace('-', '/').replace(':', ':   ');
    },
    click_icon_OF(e){
      // console.log($(e.target));
      if(this.showList){
        $(e.target).attr('src','../../../static/img/OFF.png');
      }else {
        $(e.target).attr('src','../../../static/img/ON.png');
      }
      
      // this.showDetailes = !this.showDetailes;
      this.showList = !this.showList;
      // if( this.showDetailes ){
      //   console.log(this.showDetailes);
      //   $('.icon_On_off').removeClass('active');
      //   $('.box_OF_tog').removeClass('active');
      //   $('.click_img_toggle').removeClass('active');
      // }else{
      //   $('.icon_On_off').addClass('active');
      //   $('.box_OF_tog').addClass('active');
      //   $('.click_img_toggle').addClass('active');
      // }
    },
    watchZhantingOF(){
      // if( this.showDetailes ){
      //   console.log(this.showDetailes);
      //   $('.icon_On_off').removeClass('active');
      //   $('.box_OF_tog').removeClass('active');
      //   $('.click_img_toggle').removeClass('active');
      // }else{
      //   $('.icon_On_off').addClass('active');
      //   $('.box_OF_tog').addClass('active');
      //   $('.click_img_toggle').addClass('active');
      // }
    },
    qualityScore(){
      var params = { GROUP_ID:this.$store.state.zhantingID, flag: false };
      Succscore(params).then(res => {
        this.evalQualityScore = res;
      })
    },
    monitoringStatis(){
      var params = { GROUP_ID:this.$store.state.zhantingID, flag:true };
      EqmtStatistics(params).then(res => {
        // console.log(res);
        this.monitoringPointNum = res[res.length - 1];
        this.monitoringPoint = res.slice(0, res.length-1);
      })
    },
    warningNum(){
      var params = { GROUP_ID:this.$store.state.zhantingID, flag:false };
      EarlyWarning(params).then(res => {
        this.warningNumber = res;
      })
    },
    Toggle_box_tog:function(event){
      console.log(event)
      let elx = event.currentTarget;
      if( $(elx).nextAll('section.toggle_child_click').hasClass('active') == false){
          $(elx).nextAll('section.toggle_child_click').addClass('active').parent().siblings().find('section.toggle_child_click').removeClass('active');
          $(elx).removeClass('active').parent().siblings().find('.box_OF_tog').addClass('active');
          $(elx).prev('.click_img_toggle').removeClass('active').parent().siblings().find('.click_img_toggle').addClass('active');
        }else{
          $(elx).nextAll('section.toggle_child_click').removeClass('active');
        }
        this.stopPropagation(event);

    },
    Toggle_img_Cc: function(event){

      let elx = event.currentTarget;
      console.log(elx)
        if( $(elx).nextAll('section.toggle_child_click').hasClass('active') == false){
          $(elx).nextAll('section.toggle_child_click').addClass('active').parent().siblings().find('section.toggle_child_click').removeClass('active');
        }else{
          $(elx).nextAll('section.toggle_child_click').removeClass('active')
        };
        if( $('.icon_On_off').hasClass('active') == !true ){
          $(elx).addClass('active');
          $(elx).nextAll('.box_OF_tog').addClass('active');
        }
        this.stopPropagation(event);

    },
    event_toggle(event){
      this.stopPropagation(event);
    },
    Data_Router:function(event){  // 传递数据到数据分析页面
      let elx = event.currentTarget;
      this.$store.state.NewID = $(elx).attr('name');
      // console.log(this.$store.state.NewID);
      // this.$router.push('/historyData')
      this.$router.push('/multiDataQuery');
    },
    stopPropagation(e) {  // 阻止冒泡的方法
        var ev = e || window.event;
        if (ev.stopPropagation) {
            ev.stopPropagation();
        }
        else if (window.event) {
            window.event.cancelBubble = true;//兼容IE
        }
    },
    windowResize(){
      var ww = $(document).width();
      $('.content-container').width(ww - 201);
      var hh = $(document).height();
      var innerH = hh - 90 -32;  // 90指页面title部分，32指footer;
      // $('.realRight').height(innerH);
      $('.content-wrapper').height(innerH);
      $('.showListCont').height(innerH - 30);
      // $('.el-menu-vertical-demo').height(innerH);
    },
    myHiddenRight(){
      this.hiddenRightOF = !this.hiddenRightOF;
      if(this.hiddenRightOF){
        var offRight = $('.contHidden').width();
        $('.realRight').animate({right: -offRight - 24 + 'px'},'slow');
        var defalutWidth = $('.addWidth').width();
        $('.addWidth').animate({width:defalutWidth+offRight +24 +'px'}, 'slow');
        $('.hiddenDiv').css({'backgroundPosition':'-13px -1099px'});
      }else{
        var offRight = $('.contHidden').width();
        $('.realRight').animate({right:  '0px'},'slow');
        var defalutWidth = $('.addWidth').width();
        $('.addWidth').animate({width:defalutWidth-offRight -24 +'px'}, 'slow');
        $('.hiddenDiv').css({'backgroundPosition':'-13px -1171px'});
      }
      
    }
  },
  mounted:function(){
    this.getDetaAll();
    this.qualityScore();
    this.monitoringStatis();
    this.warningNum();
    this.watchID(this);
    var _this = this;
    setInterval(function(){
      _this.getDetaAll();
      _this.qualityScore();
      _this.monitoringStatis();
      _this.warningNum();
    },30000);
    $(document).bind('click', function () {
        $(".toggle_child_click").removeClass('active');
        if( $('.icon_On_off').hasClass('active') == false ){
          $('.click_img_toggle').addClass('active');
          $('.box_OF_tog').addClass('active');
        }
    });
    this.windowResize()
    window.onresize = function(){  
       _this.windowResize(); 
    }
  },
  updated:function(){

  },
  beforeCreate:function(){

  }
}

</script>
<style scoped lang="scss">
.bor_ddd{
  // border: 1px solid #fff;
  
  background: #efeeec;   // 深博放开，其他注释
}
.showListCont {
  padding-top: 25px;
  height:100%;
  
}
.showListCont .bar--wrapper > * {
  margin-bottom: 24px;
}
.showListBox {
  width: 230px;
  height: 130px;
  margin-left: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  display: inline-block;
  vertical-align: top;
  
}
.showListBox .title {
  background: #58a7d2;
  color:#fff;
  height:30px;
  line-height: 30px;
  text-align: center;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
.showListDetails {
  border-bottom: 1px solid #ccc;
}
.showListDetails p {
  width: 110px;
  // height: 50%;
  text-align: center;

  display: inline-block;
  font-size: 20px;
}
.twoAisle p{
  height: 74px;
  line-height: 74px;
}
.threeAisle p{
  height: 37px;
  line-height: 37px;
}
.showListFooter {
  padding: 0 10px;
}
.showListFooter div{
  width: 100px;
  height: 25px;
  line-height: 25px;
  display: inline-block;
  vertical-align: top;
}
.showListFooter div img{
  width: 24px;
  height: 12px;
  vertical-align: middle;
}
.showListFooter .date{
  color: #8f9092;
  text-align: center;
}

.contHidden{
  position: relative;
}
.hiddenDiv{
  width: 20px;
  height:70px;
  background: url('../../../static/img/icon.png') no-repeat;
  background-position: -13px -1171px; 
  position: absolute;
  top: 40%;
  left:-13px;
  cursor: pointer;
}
.overflowDisplay{
  display: inline-block;
  width: 42px;
  height: 20px;
  overflow: hidden;
}
.arrows_center{
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #fff;
    position: absolute;
    top:-10px;
    left: 100px;

}
.arrows_right_top{
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 10px solid #fff;
    border-bottom: 5px solid transparent;
    position: absolute;
    right: -10px;
    top:10px;
}
.arrows_left_top{
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-right: 10px solid #fff;
    border-bottom: 5px solid transparent;
    position: absolute;
    left:-10px;
    top:10px;
}
.arrows_top_center{
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #fff;
    position: absolute;
    top:-10px;
    left:100px;
}
.arrows_bottom_center{
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-right: 10px solid #fff;
    border-bottom: 5px solid transparent;
    position: absolute;
    top:50px;
    left: -10px;
}
.arrows_lift_bottom{
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-right: 10px solid #fff;
    border-bottom: 5px solid transparent;
    position: absolute;
    top:80px;
    left: -10px;
}

.arrows_right_bottom{
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 10px solid #fff;
    border-bottom: 5px solid transparent;
    position: absolute;
    top: 60px;
    right: -10px;
}
.arrows_right_center{
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 10px solid #fff;
    border-bottom: 5px solid transparent;
    position: absolute;
    top:28px;
    right:-10px;
}
.arrows_left_center{
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-right: 10px solid #fff;
    border-bottom: 5px solid transparent;
    position: absolute;
    top:30px;
    left: -10px;
}
.pos_abs{
  position: absolute;
}
.img_size{
  width: 24px;
  height: 24px;
}
.img_sizeHengwen{
  width:48px;
  height:24px;
}
.pos_rea{
  position: relative;
  // height: 100%;
}
.het_si{
  height: 100%;
}
.img_bg_up{
  width: 100%;
  height: 100%;
  position: relative;
  -moz-user-select: none; /*mozilar*/
  -webkit-user-select: none; /*webkit*/
  -ms-user-select: none; /*IE*/
  user-select: none;
  >img{
    width: 100%;
    height: 100%;
  }
}

  .inline_ck{
    display: inline-block;
  }
  .posiBlic{
    position: absolute;
    // display: inline-block;
    width: 100%;
    height: 100%;
    top: 0;
    -moz-user-select: none; /*mozilar*/
    -webkit-user-select: none; /*webkit*/
    -ms-user-select: none; /*IE*/
    user-select: none;
  }
  .qualitEval{
    // margin:0 auto;
    display: table;
  }
  .relRightCont{
    float: right;
    height: 100%;
    background: #f4f4f4;
    padding: 10px 12px;
    border-left: 1px solid #ddd;
  }
  .realContent {
    margin: 0 auto;
  }
  .realTitle{
    width: 165px;
    height: 36px;
    line-height: 36px;
    background: #88bfdf;
    color:#fff;
    text-align: center;
  }
  .scoreCont{
    width: 70px;
    height: 70px;
    border: 3px solid #88bfdf;
    margin:20px auto;
    border-radius: 50%;
    text-align: center;
    line-height: 70px;
    font-size: 36px;
    color:#8e8e8e;
  }
  .realRight{
    background: #f4f4f4;
    height: 100%;
  }
  .monitorCont{
    padding: 7px 0;
  }
  .monitor{
    height: 162px;
    overflow-y: auto;
  }
  .monitorImg{
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
  .montorSb{
    display: inline-block;
    width: 56px;
    overflow:hidden;
    text-align: right;
    white-space:nowrap;
    margin-left: 10px;
  }
  .montorNum{
    display: inline-block;
    width: 45px;
    overflow: hidden;
    text-align: left;
  }
  .fixd_po{
    display: inline-block;
    width: 213px;
    border: 1px solid #ddd;
    box-shadow: 1px 1px 6px 2px #ddd;
    border-radius: 6px;
    background: #fff;
    padding: 10px 6px;  
    .title_img{
      overflow: hidden;
      /* padding: 10px 6px; */
      font-weight: 500;
      h4{
        margin: 0;
        display: inline-block;
        float: left;
        font-weight: 500;
        /*margin:0;*/
      }
      img{
        float: right;
        margin-top: 3px;
      }
    }
    .cons_text{
      >section{
        display: inline-block;
        width: 49%;
        height: 30px;
        line-height: 30px;
        >span{
          padding-left: 10px;
          color: #d84a4a;
        }
      }
    }
  }
  .toggle_child_click{
    display: none;
    z-index: 99;
  }
  .toggle_child_click.active{
    display: block;
  }
  .right_fr{
    text-align: right;
    span{
      color: #67b6df;
      cursor: pointer;
    }
  }
  .tic_hed{
    height: 25px;
    width: 60px;
    position: fixed;
    right: 240px;
    top: 57px;
    // float: left;
    z-index: 99;
    .flt_r{
      float: right;
      padding-right: 10px;
      ms-zoom: 1;
    }
    .icon_On_off{
      width: 60px;
      height: 25px;
      // background: url(../../assets/img/icon_home_real.png);
      background-position: -92px 1px;
      cursor: pointer;
    }
  }
  .icon_On_off.active{
    background-position: -92px -45px;
  }
  .box_OF_tog{
    // padding: 5xp;
    background: #fff;
    box-shadow: 1px 1px 1px 1px #999;
    display: none;
    font-size: 12px;
    line-height: 14px;
    padding: 5px;
    border-radius: 3px;
    cursor: pointer;
  }
  .box_OF_tog.active{
    display: block;    
  }
  .click_img_toggle{
    display:block;
    cursor: pointer;
  }
  .click_img_toggle.active{
    display:none;
  }
</style>
