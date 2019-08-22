<template>
  <div id="container">
    <!-- title -->
    <div class="title">
      <!-- time -->
      <div>
        <span>
          <i>{{current.year}}</i>年
          <i>{{current.month}}</i>月
          <i>{{current.day}}</i>日 星期
          <i>{{current.week}}</i>
          <i>{{current.hour}}:{{current.minite}}:{{current.second}}</i>
        </span>
      </div>
      <!-- titleName -->
      <div>
        <span>富莱迪二次供水智慧管理平台</span>
        <span>FuLaiDe Water Supply Management Platform</span>
      </div>
      <!-- weather -->
      <div>
        <dl v-for="item in castsList" :key="item">
          <dt>{{item.dateName}}</dt>
          <dd>
            <div>
              <svg class="icon" aria-hidden="true">
                <use v-bind="{'xlink:href':'#'+item.iconSource}"></use>
                <!-- <use xlink:href="item.iconSource"></use> -->
              </svg>
            </div>
            <div>
              <span>{{item.dayweather}} {{item.nighttemp}}-{{item.daytemp}}°C</span>
              <span>{{item.daywind}} {{item.daypower}}</span>
            </div>
          </dd>
        </dl>
      </div>
    </div>

    <div class="content">
      <div id="left-cont">
        <!-- 任务派单 -->
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
                <b>{{sendOrder.endRate*100 | toFixed(2)}}%</b>
              </span>
              <span>完成率</span>
            </div>
          </div>
        </div>
        <!-- 水箱清洗&设备保养 -->
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
        <!-- 设备档案信息 -->
        <div class="equip">
          <div class="cont-title">
            <span>设备档案信息</span>
          </div>
          <div>
            <div>
              <span>
                <b>{{deviceData.lifeWaterPumpNum}}</b>
              </span>
              <span>生活水泵</span>
            </div>
            <div>
              <span>11kw以上：{{deviceData.geNum}}</span>
              <span>11kw以下：{{deviceData.ltNum}}</span>
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
              海曙
              <i>{{mapData.haishuNum}}</i>
            </span>
            <span>
              江北
              <i>{{mapData.jiangbeiNum}}</i>
            </span>
          </div>
          <div>
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
              <span id="quality"></span>
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
      current: "",
      inspectRateList: [],
      deviceData: {},
      phData: {},
      sendOrder: {},
      mapData: {},
      castsList: [],
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
    /* 系统时间 */
    this.timer = setInterval(() => {
      this.current = this.until.formatDate();
    }, 1000);

    let promise = this.getStatasList();
    promise
      .then(res => {
        this.getCircleChart();
      })
      .then(res => {
        this.getBarChart();
      });

    /**获取其他数据 */
    this.getOtherStatisData();
    this.getEquipMaintainChart();
    this.getCleanRateChart();
    this.getQualityDefendChart();
    /**调用高德地图天气API */
    this.getWeatherList();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    getWeatherList() {
      /* 330200是宁波市 */
      let param = {
        key: "c296aed4abfa59d995a87b99c3739b39",
        city: "330200",
        extensions: "all"
      };
      this.until
        .get("https://restapi.amap.com/v3/weather/weatherInfo", param)
        .then(
          res => {
            if (res.status == 1) {
              res.forecasts[0] &&
                res.forecasts[0].casts.forEach((item, index) => {
                  if (index === 0) {
                    item.dateName = "今天";
                    this.castsList.push(item);
                  } else if (index === 1) {
                    item.dateName = "明天";
                    this.castsList.push(item);
                  } else if (index === 2) {
                    item.dateName = "后天";
                    this.castsList.push(item);
                  }

                  switch (item.dayweather) {
                    case "晴":
                      item.iconSource = "icon-qingtian";
                      break;
                    case "晴间多云":
                      item.iconSource = "icon-qingzhuanduoyun";
                      break;
                    case "多云":
                      item.iconSource = "icon-duoyunzhuanqing";
                      break;
                    case "少云":
                    case "阴":
                      item.iconSource = "icon-yintian";
                      break;
                    case "有风":
                    case "平静":
                    case "微风":
                    case "和风":
                    case "清风":
                    case "强风/劲风":
                    case "疾风":
                    case "大风":
                    case "烈风":
                    case "风暴":
                    case "狂爆风":
                    case "飓风":
                    case "热带风暴":
                      item.iconSource = "icon-feng";
                      break;
                    case "阵雨":
                    case "强阵雨":
                      item.iconSource = "icon-zhenyu";
                      break;
                    case "雷阵雨":
                    case "强雷阵雨":
                    case "雷阵雨并伴有冰雹":
                      item.iconSource = "icon-leizhenyu";
                      break;
                    case "小雨":
                    case "毛毛雨/细雨":
                    case "雨":
                      item.iconSource = "icon-xiaoyu";
                      break;
                    case "小雨-中雨":
                    case "中雨":
                      item.iconSource = "icon-zhongyu";
                      break;
                    case "中雨-大雨":
                    case "大雨":
                      item.iconSource = "icon-dayu";
                      break;
                    case "大雨-暴雨":
                    case "暴雨-大暴雨":
                    case "暴雨":
                    case "大暴雨":
                    case "特大暴雨":
                    case "极端降雨":
                    case "大暴雨-特大暴雨":
                      item.iconSource = "icon-baoyu";
                      break;
                    case "雨雪天气":
                    case "雨夹雪":
                    case "阵雨夹雪":
                    case "冻雨":
                      item.iconSource = "icon-yujiaxue";
                      break;
                    case "雪":
                    case "小雪":
                      item.iconSource = "icon-xiaoxue";
                      break;
                    case "中雪":
                    case "小雪-中雪":
                      item.iconSource = "icon-zhongxue";
                      break;
                    case "大雪":
                    case "中雪-大雪":
                      item.iconSource = "icon-daxue";
                      break;
                    case "暴雪":
                    case "阵雪":
                    case "大雪-暴雪":
                      item.iconSource = "icon-baoxue";
                      break;
                    case "浮尘":
                    case "扬沙":
                    case "沙尘暴":
                      item.iconSource = "icon-shachengbao1";
                      break;
                    case "强沙尘暴":
                    case "龙卷风":
                      item.iconSource = "icon-shachengbao";
                      break;
                    case "雾":
                    case "浓雾":
                    case "强浓雾":
                    case "轻雾":
                    case "大雾":
                    case "特强浓雾":
                    case "霾":
                    case "中度霾":
                    case "重度霾":
                    case "严重霾":
                      item.iconSource = "icon-youwu";
                      break;
                    default:
                      item.iconSource = "icon-qingtian";
                      break;
                  }
                });
            }
          },
          err => {}
        );
    },
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
      var centerData = 0;
      if (Object.keys(arr[0]).length > 0) {
        var did = 0;
        if (arr[0].name.indexOf("已巡检") != -1) {
          did = arr[0].value;
        }
        centerData = (did / this.inspectTotal) * 100;
        centerData = centerData.toFixed(2);
      }
      var subtext = "巡检总数:" + this.inspectTotal + " ";
      for (let i = 0; i < arr.length; i++) {
        subtext = subtext + arr[i].name + " ";
        if (arr[i].name.indexOf("已巡检") != -1) {
          arr[i].name = centerData + "%";
        } else {
          arr[i].name = "";
        }
      }

      var circhart = echarts.init(document.getElementById("statis"));
      // 指定图表的配置项和数据
      var option = {
        color: ["#1e90ff", "#0e48d3"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}({d}%)"
        },
        series: [
          {
            name: "巡检率",
            type: "pie",
            radius: ["80%", "100%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                position: "center",
                textStyle: {
                  fontSize: "16",
                  fontWeight: "normal"
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "12",
                  fontWeight: "normal"
                },
                title: {
                  top: "50%"
                }
              }
            },
            data: this.inspectRateList,
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
        color: ["#1e90ff", "#0e48d3"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}({d}%)"
        },
        series: [
          {
            name: "巡检率",
            type: "pie",
            radius: ["80%", "100%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                position: "center",
                // formatter: "{b}({d}%)",
                // formatter: centerData + "%",
                textStyle: {
                  fontSize: "16",
                  fontWeight: "normal"
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "16",
                  fontWeight: "normal"
                }
              }
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
            show: false,
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
    height: 12%;
    min-height: 80px;
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
            font-size: 22px;
            letter-spacing: 4px;
          }
          &:nth-last-of-type(1) {
            font-size: 13px;
            color: #7a8187;
          }
        }
      }
      &:nth-last-of-type(1) {
        display: flex;
        flex-flow: row nowrap;
        > dl {
          flex: 1;
          text-align: left;
          dd {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-between;
            text-align: left;
            div {
              &:nth-of-type(1) {
                width: 20%;
                svg {
                  width: 40px;
                  height: 40px;
                }
              }
              &:nth-last-of-type(1) {
                width: 70%;
                display: flex;
                flex-flow: row wrap;
                span {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
  .content {
    height: 82%;
    width: 100%;
    min-height: 635px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: space-between;
    padding: 1% 0;
    > div {
      width: 32%;
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
              width: 20%;
            }
            &:nth-of-type(2) {
              margin-top: 3%;
              width: 40%;
            }
            &:nth-of-type(3),
            &:nth-last-of-type(1) {
              width: 20%;
            }
            &:nth-of-type(2),
            &:nth-of-type(3) {
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
            display: flex;
            flex-flow: column wrap;
            justify-content: space-between;
            padding: 2% 0;
            width: 25%;
            height: 120px;
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
        height: 300px;
      }
    }
    #mid-cont {
      position: relative;
      .map {
        border: 0;
        width: 100%;
        height: 36%;
        text-align: center;
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
          &:nth-of-type(1) {
            margin-bottom: 3%;
          }
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
