<style lang="less">
@import "~vux/src/styles/reset.less";
/* 地图容器必须设置宽和高属性 */
html,
body {
  width: 100%;
  height: 100%;
}
.dialog-demo {
  .weui-dialog {
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
.map {
  width: 100%;
  height: 100%;
}
.popup2 {
  padding-bottom: 15px;
  height: 400px;
}
</style>

<template>
  <baidu-map
    class="map"
    :center="center"
    :zoom="zoom"
    @ready="handler"
    :scroll-wheel-zoom="true"
    :dragging="true"
  >
    <bm-polyline :path="polylinePath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2"></bm-polyline>

    <bml-lushu :path="path" :icon="icon" :play="play" :rotation="true" :speed="2000"></bml-lushu>

    <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_WATERDROP" @click="clickHandler"></bm-point-collection>
    <bm-info-window :show="infoWindow.show" :position="pointInfo">
      <ul>
        <li>小区名称：{{infoWindow.estateNm}}</li>
        <li>行政区域：{{infoWindow.districtNm}}</li>
        <li>供水模式：{{infoWindow.waterSupplyModeNm}}</li>
        <li>负责人：{{infoWindow.principal}}</li>
        <li>具体地址：{{infoWindow.phAddr}}</li>
        <li>设备厂家：{{infoWindow.deviceSupplyerNm}}</li>
      </ul>
      <x-button
        @click.native="clickWaterSupplyAreaNm(value)"
        mini
        type="primary"
        v-for="(value,i) in infoWindow.waterSupplyAreaNm"
        :key="i"
      >{{value}}</x-button>
    </bm-info-window>
    <bm-control>
      <x-button @click.native="show5 = true" :gradients="['#1D62F0', '#19D5FD']">搜索站点</x-button>
      <x-button @click.native="show6 = true" :gradients="['#A644FF', '#FC5BC4']">巡检轨迹</x-button>
    </bm-control>
    <!-- 搜索站点 -->
    <div>
      <popup v-model="show5" :hide-on-blur="true" max-height="50%">
        <div class="popup2">
          <search
            @result-click="resultClick"
            @on-change="getResult"
            :results="results"
            v-model="value"
            position="absolute"
            auto-scroll-to-top
            ref="search"
          ></search>
        </div>
      </popup>
    </div>

    <!-- 巡检轨迹 -->
    <div>
      <popup v-model="show6" :hide-on-blur="true">
        <div class="popup2">
          <picker :data="year7" :columns="3" v-model="year7Value" @on-change="change" ref="picker1"></picker>
          <datetime v-model="startTime" format="YYYY-MM-DD HH:mm" title="开始时间"></datetime>
          <datetime v-model="endTime" format="YYYY-MM-DD HH:mm" title="结束时间"></datetime>
          <x-button @click.native="startGps()" :gradients="['#FF2719', '#FF61AD']">开始回放巡检轨迹</x-button>
        </div>
      </popup>
    </div>
  </baidu-map>
</template>
<script>
import Vue from "vue";
import Loading from "../../../hero/components/loading";
import { log } from "util";
import BaiduMap from "vue-baidu-map";
import { BmlLushu, BmlMarkerClusterer } from "vue-baidu-map";
import { XButton, Popup, Search, Picker, Datetime } from "vux";
Vue.use(BaiduMap, {
  ak: "hKosSsrAcdMkt2lcjYkwLrDA83qfoBvk"
});
export default {
  data() {
    return {
      name: "",
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
      show5: false,
      show6: false,
      value: "",
      popupVisible: false,
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
      year7: [],
      year7Value: []
    };
  },

  components: {
    Search,
    XButton,
    Popup,
    Picker,
    Datetime,
    BmlLushu,
    BmlMarkerClusterer
  },

  mounted() {
    this.addPois();

    //默认登陆管理员 用于解决原生登陆 H5没有登陆调用不了接口问题
    this.login();
    this.getUserInfo();
  },
  methods: {
    //点击供水区域
    clickWaterSupplyAreaNm(value) {
      var num = value.replace(/[^0-9]/gi, "");
      //let url = 'inspectionMissionDetail.html?ipPk='+ipPk
      window.location.href =
        "http://111.2.25.208:6081/view/ph/equipment/equipmentInfoApp.html?pk=" +
        num;
     
    },

    reset() {
      this.play = false;
    },
    //开始回放巡检轨迹
    startGps() {
      let query = new this.Query();
      query.buildWhereClause("sysUserNm", this.name, "EQ");
      query.buildWhereClause("crtTm", this.startTime, "GE");
      query.buildWhereClause("crtTm", this.endTime, "LE");
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

      this.show6 = false;
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
    //选择巡检人员
    change(value) {
      this.name = value[1];
    },
    //获取人员信息
    getUserInfo() {
      //获取单位信息
      this.until.get("/general/cat/listByPrntCd?prntCd=30010.400").then(res => {
        //循环获取单位信息
        for (var i = 0; i < res.data.items.length; i++) {
          var element = res.data.items[i];
          var obj = {
            name: element.nm,
            value: element.cd,
            parent: 0
          };
          this.year7.push(obj);
        }
      });
      this.until.get("/ph/userx/list").then(res => {
        //循环人员信息
        for (var i = 0; i < res.data.items.length; i++) {
          var element = res.data.items[i];
          var obj = {
            name: element.nkNm,
            value: element.nkNm,
            parent: element.deptPk
          };
          this.year7.push(obj);
        }
      });
    },
    //选择站点 地图跳转
    resultClick(item) {
      this.center.lng = item.lng;
      this.center.lat = item.lat;
      this.zoom = 21;
      this.show5 = false;
    },
    //站点模糊搜索
    getResult(val) {
      let rs = [];
      for (let i = 0; i < this.points.length; i++) {
        if (this.points[i].estateNm.indexOf(val) >= 0) {
          rs.push({
            title: `${this.points[i].estateNm} `,
            other: i,
            lng: this.points[i].lng,
            lat: this.points[i].lat
          });
        }
      }
      this.results = rs;
    },
    //点击海量点
    clickHandler(e) {
      this.pointInfo = new BMap.Point(e.point.lng, e.point.lat);
      this.infoWindow.estateNm = e.point.estateNm;
      this.infoWindow.districtNm = e.point.districtNm;
      this.infoWindow.waterSupplyModeNm = e.point.waterSupplyModeNm;
      this.infoWindow.principal = e.point.principal;
      this.infoWindow.pointsData = e.point.pointsData;
      this.infoWindow.deviceSupplyerNm = e.point.deviceSupplyerNm;
      //供水区域字符串转换成数组
      var waterSupplyAreaNmStr = e.point.waterSupplyAreaNm;
      this.infoWindow.waterSupplyAreaNm = waterSupplyAreaNmStr.split(",");
      console.log(waterSupplyAreaNmStr);
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
      });
    },
    login() {
      let param = {};
      this.until
        .post(
          "/general/access/appLogin?username=admin&password=1124&rememberMe=true",
          param
        )
        .then(
          res => {
            if (res.status == 200) {
              this.until.loSave("JS_token", JSON.stringify(res.data));
            }
          },
          err => {}
        );
    }
  }
};
</script>


