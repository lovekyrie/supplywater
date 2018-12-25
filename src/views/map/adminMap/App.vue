<style lang="less">
@import "~vux/src/styles/reset.less";
/* 地图容器必须设置宽和高属性 */
html,body{
        width: 100%;
        height: 100%;
    }
  .el-select .el-input {
    width: 200px;
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
  margin-top: 20px
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
    <bml-lushu  :path="path"  :icon="icon"  :play="play"  :rotation="true" :speed="2000"  > </bml-lushu>
    <!-- 路书描线 -->
    <bm-polyline   :path="polylinePath"  stroke-color="blue"  :stroke-opacity="0.5"  :stroke-weight="2"   ></bm-polyline>
    
     <bml-marker-clusterer :averageCenter="true" :minClusterSize=3>
        <bm-marker v-for="(marker,i) of points" :key="i" :position="{lng: marker.lng, lat: marker.lat}" @click="clickHandler(marker)"></bm-marker>
       
    </bml-marker-clusterer>
    <!-- 自定义控件 -->
    <bm-control anchor='BMAP_ANCHOR_TOP_RIGHT' :offset='controlSize' >
                  <!-- 搜索小区控件 -->
                  <el-row>
                      <el-button  @click="dialogxq = true"  type="primary" icon="el-icon-search" circle ></el-button>
                       <el-dialog title="搜索小区"  :visible.sync="dialogxq" :center='true'  :modal='false'   width="30%">
                              <el-select   v-model="value" filterable placeholder="搜索小区" clearable  @change="resultClick" >
                                 <el-option  v-for="item in points"  :key="item.estateNm"  :label="item.estateNm"  :value="item"> </el-option>
                            </el-select>
                      </el-dialog>  
                  </el-row>
                 <!-- 巡检轨迹控件 -->
                  <el-row>
                    <el-button  @click="dialogxj = true" type="primary" icon="el-icon-share" circle ></el-button>
                     <el-dialog title="巡检轨迹"  :visible.sync="dialogxj" :center='true'  :modal='false'   width="30%">
                             <el-row>
                             <el-select   v-model="userVal" filterable placeholder="巡检人员" clearable  >
                                 <el-option  v-for="item in patrolUser"  :key="item.nkNm"  :label="item.nkNm"  :value="item.nkNm"> </el-option>
                            </el-select>
                            </el-row>
                            <el-row>
                                  <el-date-picker   value-format="yyyy-MM-dd"  v-model="startTime"  type="date" placeholder="开始时间"> </el-date-picker>
                             </el-row>
                             <el-row>
                                   <el-date-picker   value-format="yyyy-MM-dd" v-model="endTime"  type="date" placeholder="结束时间"> </el-date-picker>
                            </el-row>
                            <span slot="footer">
                             <el-button type="primary" @click="startGps">确 定</el-button>
                            </span>
                      </el-dialog> 
                  </el-row>
    </bm-control>
    <!-- 海量点 -->
   <!--  <bm-point-collection   :points="points"  color="#00CDCD"    shape="BMAP_POINT_SHAPE_RHOMBUS"   @click="clickHandler"   ></bm-point-collection> -->
    <!-- 点击点出现的信息框 -->
    <bm-info-window  :show="infoWindow.show" :position="pointInfo"  >
      <ul>
        <li>小区名称：{{infoWindow.estateNm}}</li>
        <li>行政区域：{{infoWindow.districtNm}}</li>
        <li>供水模式：{{infoWindow.waterSupplyModeNm}}</li>
        <li>负责人：{{infoWindow.principal}}</li>
        <li>具体地址：{{infoWindow.phAddr}}</li>
        <li>设备厂家：{{infoWindow.deviceSupplyerNm}}</li>
      </ul>
      <el-button  @click.native="clickWaterSupplyAreaNm(value)"  size="mini"  type="primary" v-for="(value,i) in infoWindow.waterSupplyAreaNm" :key="i"> {{value}} </el-button>
    </bm-info-window>
    
  
  </baidu-map>
</template>

<script>
import Vue from "vue";
import Loading from "../../../hero/components/loading";
import { log } from "util";
import BaiduMap from "vue-baidu-map";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { BmlLushu,BmlMarkerClusterer } from "vue-baidu-map";
// import { XButton, Popup, Search, Picker, Datetime} from "vux";
Vue.use(BaiduMap, {
  ak: "hKosSsrAcdMkt2lcjYkwLrDA83qfoBvk"
});
Vue.use(ElementUI);
export default {
  data() {
    return {
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
      userVal:"",
      popupVisible: false,
      spinShow: false, //加载中
      title: "巡检轨迹",
      pointInfo: [],
      points: [],
      infoWindow: {
        show: true,
        estateNm: "",
        districtNm: "",
        waterSupplyModeNm: "",
        principal: "",
        waterSupplyAreaNm: [],
        phAddr: "",
        deviceSupplyerNm: ""
      },
      patrolUser: [],
      patrolFirm:[]
     
    };
  },

  components: {
    BmlLushu,
    BmlMarkerClusterer
  },

  mounted() {
    //默认登陆管理员 用于解决原生登陆 H5没有登陆调用不了接口问题
    this.login();
    this.addPois();
    this.getUserInfo();
  
  },
  methods: {
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

    setFocus() {
      this.$refs.search.setFocus();
    },
  
    //选择站点 地图跳转
    resultClick(item) {
      console.log(item);
      
      this.center.lng = item.lng;
      this.center.lat = item.lat;
      this.zoom = 21;
      this.value = "";
    },
 

    //点击海量点
    clickHandler(e) {
      console.log(e);
      
      this.pointInfo = new BMap.Point(e.lng, e.lat);
      this.infoWindow.estateNm = e.estateNm;
      this.infoWindow.districtNm = e.districtNm;
      this.infoWindow.waterSupplyModeNm = e.waterSupplyModeNm;
      this.infoWindow.principal = e.principal;
      this.infoWindow.pointsData = e.pointsData;
      this.infoWindow.deviceSupplyerNm = e.deviceSupplyerNm;
      //供水区域字符串转换成数组
      var waterSupplyAreaNmStr = e.waterSupplyAreaNm;
      this.infoWindow.waterSupplyAreaNm = waterSupplyAreaNmStr.split(",");

      this.infoWindow.show = true;
      // alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat} , ${e.point.estateNm}`);
    },
    //添加海量点
    addPois() {
      this.until.get("/ph/pumph/list").then(res => {
        const points = [];
        for (var i = 0; i < res.data.items.length; i++) {
          var pointsData = res.data.items[i];
          var point = new BMap.Point(pointsData.lng, pointsData.lat);
         // this.markers.push(point)
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
        console.log(this.points);
        
        
      });
    },
    //获取人员信息
    getUserInfo() {
        //获取单位信息
       this.until.get('/ph/userx/list')
          .then(res=>{
            this.patrolUser = res.data.items;
      })
    },
    //开始回放巡检轨迹
    startGps() {
        
        
        let query = new this.Query();
        query.buildWhereClause('sysUserNm',this.userVal,'EQ');
        query.buildWhereClause('crtTm',this.startTime,'GE');
        query.buildWhereClause('crtTm',this.endTime,'LE');
        let param = query.getParam();
        this.until.get("/ph/inspGps/pageMap", param).then(res => {
        var pts = [];
        for (var i = 0; i < res.data[0].length; i++) {
          pts.push(
            new BMap.Point(
              res.data[0][i].inspGpsVo.longitude,
              res.data[0][i].inspGpsVo.latitude
            )
          );
        }
        this.center.lng = res.data[0][0].inspGpsVo.longitude;
        this.center.lat = res.data[0][0].inspGpsVo.latitude;
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


