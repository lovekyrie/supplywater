<template>
  <div id="container">
    <!-- title -->
    <div class="title">
      <!-- time -->
      <div>
        <span>
          <i>2019</i>年
          <i>01</i>月
          <i>16</i>日 星期
          <i>三</i>
          <i>09:01:06</i>
        </span>
      </div>
      <!-- titleName -->
      <div>
        <span>宁波城市二次供水智慧管理平台</span>
        <span>Ningbo Wisdom Water Supply Management Platform</span>
      </div>
      <!-- weather -->
      <div>天气预报模块</div>
    </div>

    <div class="content">
      <!-- 扇形图 -->
      <div id="left-cont">
        <div class="order">
          <div class="cont-title">
            <span>任务派单信息</span>
          </div>
          <div>
            <div>
              <span>
                <b>{{sendOrder.nowOrderNum}}</b>
              </span>
              <span>当前工单</span>
            </div>
            <div>
              <span>
                <b>{{sendOrder.affirmOrderNum}}</b>
              </span>
              <span>确认工单</span>
            </div>
            <div>
              <span>
                <b>{{sendOrder.endOrderNum}}</b>
              </span>
              <span>完成工单</span>
            </div>
            <div>
              <span>
                <b>{{sendOrder.endRate*100}}%</b>
              </span>
              <span>完成率</span>
            </div>
          </div>
        </div>
        <div class="equip-maintain">
          <div class="cont-title">
            <span>水箱清洗</span>
          </div>
          <div>
            <div>
              <span>
                <b>6</b>
              </span>
              <span>本月清洗（吨）</span>
            </div>
            <div>
              <span>
                <b>20</b>
              </span>
              <span>累计（吨）</span>
            </div>
            <div>
              <span id="clean"></span>
              <span>水箱清洗率</span>
            </div>
          </div>
          <div class="cont-title">
            <span>设备保养</span>
          </div>
          <div>
            <div>
              <span>
                <b>6</b>
              </span>
              <span>本月保养（套）</span>
            </div>
            <div>
              <span>
                <b>20</b>
              </span>
              <span>累计（套）</span>
            </div>
            <div>
              <span id="equip"></span>
              <span>设备保养率</span>
            </div>
          </div>
        </div>
        <div class="equip">
          <div class="cont-title">
            <span>设备档案信息</span>
          </div>
          <div>
            <div>
              <span>
                <b>{{deviceData.lifeWaterPumpNum}}</b>
                &nbsp;&nbsp;&nbsp;&nbsp;11kw及以上：{{deviceData.geNum}}
              </span>
              <span>生活水泵&nbsp;&nbsp;&nbsp;11kw以下：{{deviceData.ltNum}}</span>
            </div>
            <div>
              <span>
                <b>{{deviceData.waterBoxNum}}</b>
              </span>
              <span>水箱个数</span>
            </div>
            <div>
              <span>
                <b>{{deviceData.valveNum}}</b>
              </span>
              <span>电动阀</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 折线图 -->
      <div id="mid-cont">
        <div class="map">
          <img src="./img/map.png" alt>
        </div>
        <div class="map-data">
          <div>
            <span>
              鄞州
              <i>{{mapData.yinzhouNum}}</i>
            </span>
            <span>
              （江东）
              <i>{{mapData.jiangdongNum}}</i>
            </span>
            <span>
              海曙
              <i>{{mapData.haishuNum}}</i>
            </span>
          </div>
          <div>
            <span>
              江北
              <i>{{mapData.jiangbeiNum}}</i>
            </span>
            <span>
              北仑
              <i>{{mapData.beilunNum}}</i>
            </span>
            <span>
              镇海
              <i>{{mapData.zhenhaiNum}}</i>
            </span>
          </div>
        </div>
        <div class="pump">
          <div class="cont-title">
            <span>泵房档案信息</span>
          </div>
          <div>
            <div>
              <span>
                <b>{{phData.phNowNum}}</b>
              </span>
              <span>当前验收</span>
            </div>
            <div>
              <span>
                <b>{{phData.phTotalNum}}</b>
              </span>
              <span>泵房总数</span>
            </div>
            <div>
              <span>
                <b>{{phData.phVolumeTotalNum}}</b>
              </span>
              <span>水箱总容积</span>
            </div>
            <div>
              <span>
                <b>{{phData.onlineRate*100 | toFixed(2)}}%</b>
              </span>
              <span>设备监控上线率</span>
            </div>
          </div>
          <div>
            <div>
              <span>
                <b>{{phData.phDeviceTotalNum}}</b>
              </span>
              <span>设备总套数</span>
            </div>
            <div>
              <span>无负压：{{phData.phNegativeNum}}</span>
              <span>工频：{{phData.phPowerFrequencyNum}}</span>
            </div>
            <div>
              <span>水箱+变频：{{phData.phWaterBoxAConversionNum}}</span>
              <span>箱式：{{phData.phBoxTypeNum}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 柱状图 -->
      <div id="right-cont">
        <div class="clean">
          <div class="cont-title">
            <span>巡检清洗分析</span>
          </div>
          <div>
            <div>
              <span id="statis"></span>
              <span>巡检统计</span>
            </div>
            <div>
              <span id="quality">50%</span>
              <span>水质维护</span>
            </div>
          </div>
        </div>
        <div class="complete-rate">
          <div class="cont-title">
            <span>巡检厂商完成统计</span>
          </div>
          <!-- 统计报表 -->
          <div id="vendor"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var echarts = require("echarts/lib/echarts");
/* 引入线形图 */
require("echarts/lib/chart/pie");
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
export default {
  filters: {
    toFixed(input, param1) {
      return input.toFixed(param1);
    }
  },
  data() {
    return {
      inspectRateList: [],
      deviceData: {},
      phData: {},
      sendOrder: {},
      mapData: {},
      pieChartList: [],
      barChartList: [],
      barSDataList: [],
      barXDataList: [],
      inspectTotal: 0,
      equipMaintainList: [{ name: "100%", value: 1101 }],
      cleanRateList: [{ name: "100%", value: 1101 }],
      qualityDefendList: [{ name: "100%", value: 1101 }]
    };
  },
  mounted() {
    let cookieVal = this.until.getCookie("yui2-token");
    if (!this.until.isLogined() || !cookieVal) {
      let promise = this.until.login();
      promise
        .then(res => {
          this.getStatasList();
        })
        .then(res => {
          this.getCircleChart();
        })
        .then(res => {
          this.getBarChart();
        });
    } else {
      let promise = this.getStatasList();
      promise
        .then(res => {
          this.getCircleChart();
        })
        .then(res => {
          this.getBarChart();
        });
    }

    /**获取其他数据 */
    this.getOtherStatisData();
    this.getEquipMaintainChart();
    this.getCleanRateChart();
    this.getQualityDefendChart();
  },
  methods: {
    getOtherStatisData() {
      this.until.get("/ph/stat/indexPhDeviceOrderData").then(
        res => {
          if (res.status == 200) {
            this.deviceData = res.data.deviceData;
            this.phData = res.data.phData;
            this.sendOrder = res.data.sendOrderData;
            this.mapData = res.data.mapData;
          }
        },
        err => {}
      );
    },
    getStatasList() {
      return new Promise((resolve, reject) => {
        this.until.get("/ph/stat/insp").then(res => {
          if (res.status == 200) {
            this.inspectRateList = res.data.cirSdata;
            this.pieChartList = res.data.pieSdata;
            this.barChartList = res.data.inspRates;
            this.barSDataList = res.data.barSdata;
            this.barXDataList = res.data.barXdata;
            this.inspectTotal = res.data.total;
            resolve(this.inspectRateList);
          }
        });
      });
    },
    getCircleChart() {
      // param.cirLdata.add("巡检总数:" + param.total);
      var arr = this.inspectRateList;
      var subtext = "";
      for (var i = 0; i < arr.length; i++) {
        subtext = subtext + arr[i].name + " ";
      }
      var piechart = echarts.init(document.getElementById("statis"));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}({d}%)"
        },
        color: ["#1e90ff", "#0e48d3"],
        grid: {
          top: "20%"
        },
        series: [
          {
            name: "巡检率",
            type: "pie",
            radius: "100%",
            center: ["50%", "50%"],
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              show: false
            },
            data: this.pieChartList,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      piechart.setOption(option);
    },
    getEquipMaintainChart() {
      var circhart = echarts.init(document.getElementById("equip"));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}({d}%)"
        },
        color: ["#1e90ff", "#0e48d3"],
        grid: {
          top: "20%"
        },
        series: [
          {
            name: "保养率",
            type: "pie",
            radius: "100%",
            center: ["50%", "50%"],
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              show: false
            },
            data: this.equipMaintainList,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      circhart.setOption(option);
    },
    getCleanRateChart() {
      var circhart = echarts.init(document.getElementById("clean"));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}({d}%)"
        },
        color: ["#1e90ff", "#0e48d3"],
        grid: {
          top: "20%"
        },
        series: [
          {
            name: "清洗率",
            type: "pie",
            radius: "100%",
            center: ["50%", "50%"],
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              show: false
            },
            data: this.cleanRateList,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      circhart.setOption(option);
    },
    getQualityDefendChart() {
      var circhart = echarts.init(document.getElementById("quality"));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}({d}%)"
        },
        color: ["#1e90ff", "#0e48d3"],
        grid: {
          top: "20%"
        },
        series: [
          {
            name: "维护率",
            type: "pie",
            radius: "100%",
            center: ["50%", "50%"],
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              show: false
            },
            data: this.qualityDefendList,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      circhart.setOption(option);
    },
    getBarChart() {
      var arr = this.barChartList;
      var labalArr = new Array();
      for (let i = 0; i < arr.length; i++) {
        var total = arr[i].total;
        var done = arr[i].done;
        var value = arr[i].value;
        var str = done + "/" + total + "\n" + value + "%";
        labalArr.push(str);
      }
      var barchart = echarts.init(document.getElementById("vendor"));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          // formatter: "{b}<br />{a} : {c}%"
          formatter: function(params) {
            // console.log(params)
            return (
              params[0].name +
              "<br>" +
              params[0].marker +
              params[0].seriesName +
              " : " +
              params[0].value +
              "%"
            );
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.barXDataList,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#a7b0b9"
              }
            }
          }
        ],
        yAxis: [
          { show: false, name: "完成情况(%)", type: "value", nameGap: 35 }
        ],
        series: [
          {
            name: "完成比例",
            type: "bar",
            barWidth: "60%",
            itemStyle: {
              normal: {
                // 随机显示
                //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}

                // 定制显示（按顺序）
                color: function(params) {
                  var colorList = [
                    "#C33531",
                    "#EFE42A",
                    "#64BD3D",
                    "#EE9201",
                    "#29AAE3",
                    "#B74AE5",
                    "#0AAF9F",
                    "#E89589",
                    "#16A085",
                    "#4A235A",
                    "#C39BD3 ",
                    "#F9E79F",
                    "#BA4A00",
                    "#ECF0F1",
                    "#616A6B",
                    "#EAF2F8",
                    "#4A235A",
                    "#3498DB"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            },
            data: this.barSDataList,
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function(params) {
                  return labalArr[params.dataIndex];
                }
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      barchart.setOption(option);
    }
  }
};
</script>

<style lang='less'>
body,
html {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

#container {
  width: 100%;
  height: 100%;
  background: url("./img/bg.png") no-repeat;
  background-size: cover;
  .title {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 10%;
    padding: 1.5% 0;
    border-bottom: 1px dashed #687681;
    > div {
      flex: 1;
      text-align: center;
      color: #fff;
      &:nth-of-type(1) {
        font-size: 18px;
        i {
          font-style: normal;
          color: #3ab2e7;
        }
      }
      &:nth-of-type(2) {
        display: flex;
        flex-flow: row wrap;
        > span {
          width: 100%;
          text-align: center;
          line-height: 2;
          &:nth-of-type(1) {
            font-size: 24px;
            letter-spacing: 4px;
          }
          &:nth-last-of-type(1) {
            font-size: 14px;
            color: #7a8187;
          }
        }
      }
    }
  }
  .content {
    height: 90%;
    width: 100%;
    min-height: 645px;
    min-width: 1192px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: space-between;
    padding: 2% 0;
    > div {
      width: 30%;
    }
    #left-cont,
    #right-cont,
    #mid-cont {
      display: flex;
      /* 这个时候的主轴是纵向的 */
      flex-flow: column wrap;
      justify-content: space-between;
      > div {
        border: 19px solid #24364a;
        border-image: url("./img/border.png") 19 19 19 19 repeat;
        font-size: 14px;
        color: #fff;
        background-color: #24364a;
        .cont-title {
          padding-left: 5%;
          font-size: 18px;
          color: #09aaf2;
        }
      }
    }

    .equip {
      > div {
        &:nth-last-of-type(1) {
          padding: 4% 0;
          display: flex;
          flex-flow: row nowrap;
          > div {
            display: flex;
            flex-flow: row wrap;
            &:nth-of-type(1) {
              width: 50%;
            }
            &:nth-of-type(2),
            &:nth-of-type(3) {
              width: 25%;
            }
            &:not(:nth-last-of-type(1)) {
              border-right: 1px solid #2c5575;
            }
            span {
              width: 100%;
              text-align: center;
              line-height: 2;
              b {
                font-size: 20px;
                font-weight: 400;
              }
            }
          }
        }
      }
    }
    .equip-maintain {
      > div {
        &:nth-of-type(3) {
          margin-top: 2%;
        }
        &:nth-of-type(2),
        &:nth-last-of-type(1) {
          display: flex;
          flex-flow: row nowrap;
          > div {
            padding: 2% 0;
            width: 33%;
            display: flex;
            flex-flow: row wrap;
            &:nth-of-type(1) {
              border-right: 1px solid #2c5575;
            }
            &:nth-last-of-type(1) {
              padding-top: 0;
              padding-bottom: 0;
              > span {
                &:nth-of-type(1) {
                  display: block;
                  height: 70px;
                }
              }
            }
            > span {
              width: 100%;
              text-align: center;
              line-height: 2;
              b {
                font-size: 20px;
                font-weight: 400;
              }
            }
          }
        }
      }
    }
    .order {
      > div {
        &:nth-last-of-type(1) {
          display: flex;
          flex-flow: row nowrap;
          border: 0;
          padding: 2% 0;
          > div {
            display: flex;
            flex-flow: row wrap;
            width: 25%;
            span {
              width: 100%;
              text-align: center;
              line-height: 2;
              b {
                font-size: 20px;
                font-weight: normal;
              }
            }
          }
        }
      }
    }
    .clean {
      > div {
        &:nth-last-of-type(1) {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-around;
          margin: 3% 0;
          > div {
            padding: 2% 0;
            width: 25%;
            text-align: center;
            span {
              &:nth-of-type(1) {
                display: block;
                height: 70px;
              }
            }
          }
        }
      }
    }
    .complete-rate {
      #vendor {
        height: 350px;
      }
    }
    #mid-cont {
      position: relative;
      .map {
        border: 0;
        height: 48%;
        background-color: rgba(0, 0, 0, 0);
        img {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
          vertical-align: middle;
        }
      }
      .map-data {
        display: flex;
        flex-flow: row wrap;
        border: 0;
        width: 100%;
        color: #fff;
        background-color: rgba(0, 0, 0, 0);
        > div {
          width: 100%;
          display: flex;
          flex-flow: row nowrap;
          span {
            width: 33%;
            text-align: center;
            line-height: 2;
            i {
              font-style: normal;
              color: #fde61a;
            }
          }
        }
      }
      .pump {
        > div {
          &:nth-of-type(2) {
            padding: 2% 0;
            display: flex;
            flex-flow: row nowrap;
            > div {
              display: flex;
              flex-flow: row wrap;
              &:nth-of-type(1),
              &:nth-of-type(2) {
                width: 20%;
              }
              &:nth-of-type(3) {
                width: 25%;
              }
              &:nth-last-of-type(1) {
                width: 35%;
              }
              &:not(:nth-last-of-type(1)) {
                border-right: 1px solid #2c5575;
              }
              > span {
                width: 100%;
                text-align: center;
                line-height: 2;
                b {
                  font-size: 20px;
                  font-weight: 400;
                }
              }
            }
          }
          &:nth-last-of-type(1) {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            margin: 0 7%;
            border: 1px solid #2c5575;
            padding: 2% 0;
            > div {
              width: 30%;
              display: flex;
              flex-flow: row wrap;
              > span {
                width: 100%;
                text-align: center;
                line-height: 2;
              }
            }
          }
        }
      }
    }
  }
}
</style>
