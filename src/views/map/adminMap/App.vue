<style lang="less">
@import "~vux/src/styles/reset.less";
/* 地图容器必须设置宽和高属性 */
html,body{
        width: 100%;
        height: 100%;
    }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }    

  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
.map {
  width: 100%;
  height: 100%;
}
.el-row{
  margin-top: 10px
}
.popup2 {
  padding-bottom: 15px;
  height: 400px;
}

</style>
<template>
  <baidu-map  class="map" :center="center"  :zoom="zoom"   @ready="handler" :scroll-wheel-zoom="true" :dragging="true" >
    <!-- 地图类型 -->
    <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
    <!-- 缩放控件 -->
    <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
    <!-- 路书 巡检回放 -->
    <bml-lushu  :path="path"  :icon="icon"  :play="play"  :rotation="true" :speed="2000"> </bml-lushu>
    <!-- 路书 描线 -->
    <bm-polyline :path="polylinePath"  stroke-color="blue"  :stroke-opacity="0.5"  :stroke-weight="5"></bm-polyline>
    
    <!-- 海量点 用于巡检回放显示时间 -->
    <bm-point-collection  @mouseover="polyMouseover" :points="polylinePath" shape="BMAP_POINT_SHAPE_CIRCLE" color="red" size="BMAP_POINT_SIZE_SMALL"></bm-point-collection>
      <!-- 泵房点 -->
     <bml-marker-clusterer :averageCenter="true" :minClusterSize=3>
        <bm-marker  v-for="(marker,i) of points" :key="i" :position="{lng: marker.lng, lat: marker.lat}" @click="clickHandler(marker)"></bm-marker>
    </bml-marker-clusterer>
    <!-- 人员点 -->
   <bm-marker :icon="{url: 'http://www.mypng.cn/thumb/380294?size=32x32', size: {width: 32, height: 32}}"  v-for="(marker2,i) of userPoints" @click="clickHandler2(marker2)" :key="i" :position="{lng: marker2.lng, lat: marker2.lat}"></bm-marker>
    <!-- 自定义控件 -->
    <bm-control anchor='BMAP_ANCHOR_TOP_RIGHT' :offset='controlSize' v-show="controlShow" >
                  <!-- 搜索小区控件 -->
                  <el-row>
                     <el-tooltip effect="dark" content="搜索" placement="left">
                       <img  src="./img/搜索.png" @click="dialogxq = true">
                      </el-tooltip>
                       <el-dialog title="搜索小区"  :visible.sync="dialogxq" :center='true'  :modal='false'   width="20%">
                              <el-select  style="width:100%"  v-model="value" filterable placeholder="搜索小区" clearable  @change="resultClick" >
                                 <el-option  v-for="item in points"  :key="item.estateNm"  :label="item.estateNm"  :value="item"> </el-option>
                              </el-select>
                      </el-dialog>  
                  </el-row>
                 <!-- 巡检轨迹控件 -->
                  <el-row>
                    <el-tooltip effect="dark" content="回放巡检轨迹" placement="left">
                     <img  src="./img/回放巡检轨迹.png" @click="dialogxj = true">
                      </el-tooltip>
                     <el-dialog title="巡检轨迹"  :visible.sync="dialogxj" :center='true'  :modal='false'   width="30%">
                             <el-row>
                                  <el-select style="width:100%" v-model="userUnit" filterable placeholder="巡检单位" clearable  @change="getUserInfo()" >
                                    <el-option  v-for="item in userUnits"  :key="item.cd"  :label="item.nm" :value="item.cd"> </el-option>
                                </el-select>
                            </el-row>
                             
                             <el-row >
                                <el-select style="width:100%"  v-model="userVal" filterable placeholder="巡检人员" clearable>
                                    <el-option v-for="item in patrolUser"  :key="item.sysUserPk"  :label="item.nkNm"  :value="item.nkNm"> </el-option>
                                </el-select>  
                            </el-row>
                            <el-row>
                                  <el-date-picker style="width:100%"  value-format="yyyy-MM-dd"  v-model="startTime"  type="date" placeholder="开始时间"> </el-date-picker>
                             </el-row>
                             <el-row>
                                   <el-date-picker style="width:100%" value-format="yyyy-MM-dd" v-model="endTime"  type="date" placeholder="结束时间"> </el-date-picker>
                            </el-row>
                            <span slot="footer">
                             <el-button type="primary" @click="startGps()">确 定</el-button>
                            </span>
                      </el-dialog> 
                  </el-row>
                <el-row>
                   <el-tooltip effect="dark" content="显示泵站" placement="left">
                    <img  v-if="checked === true"  src="./img/显示泵站.png" @click="chEd(true)">
                    <img  v-if="checked === false"  src="./img/显示泵站-选中.png" @click="chEd(false)">
                  
                  </el-tooltip>
                 
               </el-row>
                <el-row>
                  <el-tooltip effect="dark" content="显示巡检人员" placement="left">
                    <img  v-if="checkUser === true"  src="./img/显示巡检人员.png" @click="chUs(true)">
                    <img  v-if="checkUser === false"  src="./img/显示巡检人员-选中.png" @click="chUs(false)">
                  </el-tooltip>
               </el-row>
               <el-row>
                  <el-tooltip  effect="dark" content="初始化巡检回放" placement="left">
                  <img src="./img/初始化巡检回放.png" @click="resetXJ()">
                  </el-tooltip>
               </el-row>


    </bm-control>
    <!-- 点击点出现的信息框 -->
    <bm-info-window  :show="infoWindow.show" :position="pointInfo"  >
      <ul>
        <li>小区名称：{{infoWindow.estateNm}}</li>
        <li>行政区域：{{infoWindow.districtNm}}</li>
        <li>泵房编号：{{infoWindow.phCd}}</li>
        <li>供水模式：{{infoWindow.waterSupplyModeNm}}</li>
        <li>负责人：{{infoWindow.principal}}</li>
        <li>具体地址：{{infoWindow.phAddr}}</li>
        <li>设备厂家：{{infoWindow.deviceSupplyerNm}}</li>
        <li>供水区域：<el-button  @click.native="clickWaterSupplyAreaNm(value)"  type="text" size="mini"  v-for="(value,i) in infoWindow.waterSupplyAreaNm" :key="i"> {{value}} </el-button></li>
      </ul>
      <hr />
      <el-row :gutter="10">
      <el-col :span="6"><img src="./img/视频监控.png" weight='35' height="35" ></el-col>
      <el-col :span="6"><img src="./img/保养管理.png" weight='35' height="35"></el-col>
      <el-col :span="6"><img src="./img/门禁监控.png" weight='35' height="35"></el-col>
      <el-col :span="6"><img src="./img/sbda.png"  weight='35' height="35" @click="lookDevice(infoWindow.phCd)"></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"><img src="./img/维修管理.png"   @click="lookWX(infoWindow.estateNm)"  weight='35' height="35" ></el-col>
      <el-col :span="6"><img src="./img/巡检管理.png"   @click="lookXJ(infoWindow.estateNm)"  weight='35' height="35"></el-col>
    </el-row>
    </bm-info-window>
   <!-- 点击人员点出现的信息框 -->
    <bm-info-window  :show="infoWindow2.show" :position="pointInfo2"  >
      <ul>
        <li>姓名：{{infoWindow2.sysUserNm}}</li>
        <li>单位：{{infoWindow2.deptNm}}</li>
        <li>更新时间：{{infoWindow2.crtTm}}</li>
      </ul>
    </bm-info-window>
  
 <!-- 点击回放点出现的信息框 -->
    <bm-info-window  :show="infoWindow3.show" :position="pointInfo3"  >
      <ul>
        <li>时间：{{infoWindow3.crtTm}}</li>
      </ul>
    </bm-info-window>


<el-dialog title="泵房设备" :visible.sync="dialogTableVisible" center >
  <el-table :data="gridData" stripe border height="300" size='mini'>
    <el-table-column property="deviceNm" label="设备名称" width="150" sortable ></el-table-column>
    <el-table-column property="deviceCd" label="设备编号" width="200" sortable></el-table-column>
    <el-table-column property="deviceModel" label="型号规格" sortable></el-table-column>
  </el-table>
</el-dialog>
  
  </baidu-map>
</template>

<script>
import Vue from "vue";
import Loading from "../../../hero/components/loading";
import { log } from "util";
import BaiduMap from "vue-baidu-map";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { BmlLushu,BmlMarkerClusterer,BmlCurveLine } from "vue-baidu-map";
// import { XButton, Popup, Search, Picker, Datetime} from "vux";
Vue.use(BaiduMap, {
  ak: "hKosSsrAcdMkt2lcjYkwLrDA83qfoBvk"
});
Vue.use(ElementUI);
export default {
  data() {
    return {
      visible:false,
      controlShow: true, //控件是否显示
      checked: true,
      checkUser: true,
      dialogTableVisible:false,
      gridData: [],
      markers:[],
      controlSize:{
          width: 20,
          height: 100
      },
      controlSize2:{
          width: 80,
          height: 120
      },
      dialogxq: false,
      dialogxj:false,
      landmarkPois: [],
      play: true,
      path: [],
      polylinePath: [],
      icon: {
        url: "http://api.map.baidu.com/library/LuShu/1.2/examples/car.png",
        size: { width: 52, height: 26 },
        opts: { anchor: { width: 27, height: 13 } }
      },
      endTime: "",
      startTime: "",
      center: { lng: 0, lat: 0 },
      zoom: 3,
      results: [],
      value: "",
      userVal:"", //巡检人员
      userUnit:'',//巡检单位
      userUnits:'',
      popupVisible: false,
      spinShow: false, //加载中
      title: "巡检轨迹",
      pointInfo: [],
      pointInfo2: [],
      pointInfo3: [],
      points: [],
      userPoints: [],
      userPointsCopy: [],
      infoWindow: {
        show: false,
        estateNm: "",
        districtNm: "",
        waterSupplyModeNm: "",
        principal: "",
        waterSupplyAreaNm: [],
        phAddr: "",
        deviceSupplyerNm: "",
        phCd:""
      },
      infoWindow2: {
        show: false,
        crtTm: "",
        deptNm: "",
        sysUserNm: "",
      },
      infoWindow3: {
        show: false,
        crtTm: "",
      },

      patrolUser: [],
      patrolFirm:[],
      poCopy:[]
    };
  },

  components: {
    BmlCurveLine,
    BmlLushu,
    BmlMarkerClusterer
  },

  mounted() {
    //默认登陆管理员 用于解决原生登陆 H5没有登陆调用不了接口问题
    this.login();
    this.addPois(); //添加泵房点 
    this.getUserNewTm();
    this.getUserInfo();

    this.getUnitList();//获取巡检单位信息
    
   
   
  
  },
  methods: {
    //巡检回放初始化
    resetXJ(){
      this.path = [];
      this.polylinePath = [];
      this.center.lng = 121.57900597;
      this.center.lat = 29.88525897;
      this.zoom = 12;
    },


    // 轨迹回放显示时间
  polyMouseover(val){
     this.pointInfo3 = new BMap.Point(val.point.lng, val.point.lat);
     this.infoWindow3.crtTm = val.point.crtTm
     this.infoWindow3.show = true
  },

    //调度监控地图传编号
    getSn(){
      var Request = this.getUrlVal();
      var sn = Request['sn'];
      if(sn!=null){
        let query = new this.Query();
         query.buildWhereClause('demo6',sn,'LK');
        let param = query.getParam();
         this.until.get("/ph/pumph/list",param).then(res => {
          this.center.lng = res.data.items[0].lng;
          this.center.lat = res.data.items[0].lat;
          this.zoom = 21;
          this.controlShow = false;
        
      }); 
      
   }


    },
    //获取url的参数
    getUrlVal(){
      var url = location.search; //获取url中"?"符后的字串
                var theRequest = {};
                var strs;
                if (url.indexOf("?") !== -1) {
                    var str = url.substr(1);
                    strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
         }
      return theRequest;
    },
    //跳转维修管理
    lookWX(val){
      window.open("http://111.2.25.208:6081/view/ph/deviceRepair/deviceRepairComplate.html?estateNm="+val)
    },
    //跳转巡检报表
    lookXJ(val){
       window.open("http://111.2.25.208:6081/view/ph/insptaskAll/insptask.html?estateNm="+val)
    },
    //地图分层 泵房
    chEd(val){
      if(val == true){
          this.poCopy = this.points;
          this.points = [];
          this.checked = false;
      }else{
        this.points = this.poCopy;
        this.checked = true;
      }
    },
    //地图分层 人员
    chUs(val){
      if(val == true){
          this.userPointsCopy = this.userPoints;
          this.userPoints = [];
          this.checkUser = false;
      }else{
        this.userPoints = this.userPointsCopy;
        this.checkUser = true;
      }

      // if(this.checkUser == false){
      //     this.userPointsCopy = this.userPoints;
      //     this.userPoints = [];
      // }else{
      //   this.userPoints = this.userPointsCopy;
      // }
    },


    //查看设备
    lookDevice(val){
      let query = new this.Query();
      query.buildWhereClause('phCd',val,'EQ');
      let param = query.getParam();
      this.until.get("/ph/device/list", param).then(res => {
        this.gridData = res.data.items;
      });
      this.dialogTableVisible = true;
    },
    //点击供水区域
    clickWaterSupplyAreaNm(value) {
       var num= value.replace(/[^0-9]/ig,"");
        window.open("http://111.2.25.208:6081/view/ph/equipment/equipmentInfoApp.html?pk="+num)
    },
    reset() {
      this.play = false;
    },
    //初始化地图信息
    handler({ BMap, map }) {
      this.center.lng = 121.57900597;
      this.center.lat = 29.88525897;
      this.zoom = 12;
    },
    //选择站点 地图跳转
    resultClick(item) { 
      this.center.lng = item.lng;
      this.center.lat = item.lat;
      this.zoom = 21;
      this.value = "";
    },
    //点击泵站点
    clickHandler(e) {
      this.pointInfo = new BMap.Point(e.lng, e.lat);
      this.infoWindow.estateNm = e.estateNm;
      this.infoWindow.districtNm = e.districtNm;
      this.infoWindow.waterSupplyModeNm = e.waterSupplyModeNm;
      this.infoWindow.principal = e.principal;
      this.infoWindow.pointsData = e.pointsData;
      this.infoWindow.deviceSupplyerNm = e.deviceSupplyerNm;
       this.infoWindow.phCd = e.phCd;
      //供水区域字符串转换成数组
      var waterSupplyAreaNmStr = e.waterSupplyAreaNm;
      this.infoWindow.waterSupplyAreaNm = waterSupplyAreaNmStr.split(",");
      this.infoWindow.show = true;
    },
    //点击人员点
    clickHandler2(e) {
      this.pointInfo2 = new BMap.Point(e.lng, e.lat);
      this.infoWindow2.crtTm = e.crtTm;
      this.infoWindow2.deptNm = e.deptNm;
      this.infoWindow2.sysUserNm = e.sysUserNm;
      this.infoWindow2.show = true;
    },

    //添加地图点
    addPois() {
      this.until.get("/ph/pumph/list").then(res => {
        const points = [];
        for (var i = 0; i < res.data.items.length; i++) {
          var pointsData = res.data.items[i];
          var point = new BMap.Point(pointsData.lng, pointsData.lat);
        
         point.phCd = pointsData.phCd;
          //小区名
          point.estateNm = pointsData.estateNm;
          //行政区域
          point.districtNm = pointsData.districtNm;
          //供水模式
          point.waterSupplyModeNm = pointsData.waterSupplyModeNm;
          //负责人
          point.principal = pointsData.principal;
          //供水区域
          if (pointsData.demo6 === null || pointsData.demo6 === "") {
            point.waterSupplyAreaNm = pointsData.waterSupplyAreaNm;
          } else {
            point.waterSupplyAreaNm = pointsData.demo6;
          }
          //具体地址
          point.phAddr = pointsData.phAddr;
          //设备厂家
          point.deviceSupplyerNm = pointsData.deviceSupplyerNm;
          points.push(point);
        }
        this.points = points;
        this.getSn();
      });
    },
    //获取人员信息
    getUserInfo() {
        let query = new this.Query();
        query.buildWhereClause("deptPk", this.userUnit, "EQ");
        let param = query.getParam();
       this.until.get('/ph/userx/list',param)
          .then(res=>{
            this.patrolUser = res.data.items;
            const points = [];
          })
    },
    //获取单位信息
    getUnitList(){
        this.until.get("/general/cat/listByPrntCd", { prntCd: "30010.400" })
        .then(res => {
          if (res.status === "200") {
            this.userUnits = res.data.items;
          }
        });
    },


    //获取人员
    getUserNewTm(){
      this.until.get("/ph/inspGps/listOrdTm").then(res => {
               const points = [];
              for (let i = 0; i < res.length; i++) {
                  const element = res[i];
                  var userPoint = new BMap.Point(element.LONGITUDE,element.LATITUDE);
                  userPoint.sysUserNm = element.SYS_USER_NM;
                  userPoint.crtTm = element.CRT_TM;
                  userPoint.deptNm = element.DEPT_NM;
                  //显示最近2小时在线人员
                  //当前时间时间戳
                  var s1 = Math.round(new Date() / 1000);
                  //人员最后在线时间戳
                  var s2 = Date.parse(new Date(element.CRT_TM))/1000;
                  var s3 = Math.floor(parseInt(s1-s2) / 3600);
                  if(s3<=2){
                    points.push(userPoint);
                  }
              }
              this.userPoints = points;
            });
    },
    //开始回放巡检轨迹
    startGps() {

        let query = new this.Query();
        query.buildWhereClause('sysUserNm',this.userVal,'EQ');
        query.buildWhereClause('crtTm',this.startTime,'GE');
        query.buildWhereClause('crtTm',this.endTime,'LE');
        query.buildOrderClause("crtTm","asc");
        let param = query.getParam();
        this.until.get("/ph/inspGps/page", param).then(res => {
        var pts = [];
       
        for (var i = 0; i < res.data.items.length; i++) {
         // console.log(res.data[0][i].inspGpsVo.crtTm);
          //pts.push(
         var pt  =   new BMap.Point(
              res.data.items[i].longitude,
              res.data.items[i].latitude,
            )
            pt.crtTm = res.data.items[i].crtTm
          pts.push(pt)
        // );
        }
        this.center.lng = res.data.items[0].longitude;
        this.center.lat = res.data.items[0].latitude;
        this.zoom = 15;
        this.path = pts;
        this.polylinePath = pts;
         
      });

      this.dialogxj = false;
    },
   login(){
        let param = {
        }
        this.until.post('/general/access/appLogin?username=admin&password=1124&rememberMe=true',param)
          .then(res=>{
            if(res.status == 200){
              this.until.loSave('DD_token',JSON.stringify(res.data));
            }
          },err=>{});
      },
 }
};
</script>


