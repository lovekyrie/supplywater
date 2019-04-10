<template>
  <div id="container">
    <my-header :title="title"></my-header>
    <div class="main" ref="main">
      <!-- <iframe :src="src" style="width: 100%;height: 600px;"></iframe> -->
    </div>
  </div>
</template>

<script>
var echarts = require("echarts/lib/echarts");
/* 引入线形图 */
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
import myHeader from "../components/myHead";

export default {
  data() {
    return {
      title: "调度监控统计图",
      src: "",
      ipPk: "",
      type: "",
      themeName: ""
    };
  },
  mounted() {
    this.ipPk = this.until.getQueryString("ipPk");
    this.type = this.until.getQueryString("type");
    this.loadLineChart();
   
  },
  methods: {
    loadLineChart() {
      let myChart = echarts.init(this.$refs.main);
      let option = null;
      let param = {
        pk: this.ipPk,
        type: this.type
      };
      this.until.post("/ph/equipment/getEquimentChart", param).then(res => {
        let datas = res;
        var base = datas.startTm;
        var oneDay = 24 * 3600 * 1000;
        var date = datas.xAxis;
        var data = datas.yAxis;
        // console.log(data);
        switch (datas.title) {
          case "press1":
            this.themeName = "进水压力";
            break;
          case "press2":
            this.themeName = "出水压力";
            break;
          case "pressset":
            this.themeName = "出水设定压力";
            break;
          case "ntu":
            this.themeName = "浊度";
            break;
          case "cl":
            this.themeName = "余氯";
            break;
          case "dl1":
            this.themeName = "1#电流";
            break;
          case "dl2":
            this.themeName = "2#电流";
            break;
          case "dl3":
            this.themeName = "3#电流";
            break;
          case "dl4":
            this.themeName = "4#电流";
            break;
        }
        option = {
          tooltip: {
            trigger: "axis",
            position: function(pt) {
              return [pt[0], "10%"];
            }
          },
          title: {
            left: "center",
            text: this.themeName,
            textStyle: {
              color: "#01aef0"
            },
            top: "20"
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: "none"
              },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: date
          },
          yAxis: {
            type: "value",
            boundaryGap: [0, "100%"]
          },
          dataZoom: [
            {
              type: "inside",
              start: 0,
              end: 10
            },
            {
              start: 0,
              end: 10,
              handleIcon:
                "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
              handleSize: "80%",
              handleStyle: {
                color: "#fff",
                shadowBlur: 3,
                shadowColor: "rgba(0, 0, 0, 0.6)",
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            }
          ],
          series: [
            {
              name: "数据",
              type: "line",
              smooth: true,
              symbol: "none",
              sampling: "average",
              itemStyle: {
                normal: {
                  color: "#01aef0"
                }
              },
              data: data
            }
          ]
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      });
    }
  },
  components: {
    myHeader
  }
};
</script>

<style lang='less'>
html,
body {
  width: 100%;
  height: 100%;
  font-size: 0.1rem;
  background: #f2f2f2;
  #container {
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }
}

.main {
  flex: 1;
  width: 100%;
  overflow-y: auto;
}
</style>
