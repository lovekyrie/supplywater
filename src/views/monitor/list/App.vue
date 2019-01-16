<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  font-size: 0.1rem;
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
  width: 100% !important;
  overflow-y: auto;
  .ivu-scroll-container {
    height: 100% !important;
    .ivu-table-body {
      .ivu-table-tbody {
        .ivu-table-row {
          td {
            a {
              color: #01afec;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div id="container">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <myHeader :title="title" search="searchPlan" appBack="true"></myHeader>
    <scroll class="main" :on-reach-bottom="handleReachBottom">
      <template>
        <Table width="100%" height="auto" border :columns="columns2" :data="list"></Table>
      </template>
    </scroll>
  </div>
</template>

<script>
import Loading from "../../../hero/components/loading";
import myHeader from "../components/myHead";
export default {
  data() {
    return {
      spinShow: false, //加载中
      title: "调度监控",
      list: [],
      pageNo: 1,
      pageSize: 15,
      total: "",
      columns2: [
        {
          title: "编号/名称",
          key: "name",
          width: 150,
          fixed: "left",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row.monEquipmentPk);
                    }
                  }
                },
                params.row.name
              )
            ]);
          }
        },
        {
          title: "通讯状态",
          key: "datetimes",
          width: 100,
          fixed: "top"
        },
        {
          title: "进水压力",
          key: "press1",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "A",
                {
                  on: {
                    click: () => {
                      this.toChart(params.row.monEquipmentPk, "press1");
                    }
                  }
                },
                params.row.press1
              )
            ]);
          }
        },
        {
          title: "出水压力",
          key: "press2",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "A",
                {
                  on: {
                    click: () => {
                      this.toChart(params.row.monEquipmentPk, "press2");
                    }
                  }
                },
                params.row.press2
              )
            ]);
          }
        },
        {
          title: "出水设定压力",
          key: "pressset",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "A",
                {
                  on: {
                    click: () => {
                      this.toChart(params.row.monEquipmentPk, "pressset");
                    }
                  }
                },
                params.row.pressset
              )
            ]);
          }
        },
        {
          title: "浊度",
          key: "ntu",
          width: 80,
          render: (h, params) => {
            return h("div", [
              h(
                "A",
                {
                  on: {
                    click: () => {
                      this.toChart(params.row.monEquipmentPk, "ntu");
                    }
                  }
                },
                params.row.ntu
              )
            ]);
          }
        },
        {
          title: "余氯",
          key: "cl",
          width: 80,
          render: (h, params) => {
            return h("div", [
              h(
                "A",
                {
                  on: {
                    click: () => {
                      this.toChart(params.row.monEquipmentPk, "cl");
                    }
                  }
                },
                params.row.cl
              )
            ]);
          }
        },
        {
          title: "1#电流",
          key: "dl1",
          width: 80,
          render: (h, params) => {
            return h("div", [
              h(
                "A",
                {
                  on: {
                    click: () => {
                      this.toChart(params.row.monEquipmentPk, "dl1");
                    }
                  }
                },
                params.row.dl1
              )
            ]);
          }
        },
        {
          title: "2#电流",
          key: "dl2",
          width: 80,
          render: (h, params) => {
            return h("div", [
              h(
                "A",
                {
                  on: {
                    click: () => {
                      this.toChart(params.row.monEquipmentPk, "dl2");
                    }
                  }
                },
                params.row.dl2
              )
            ]);
          }
        },
        {
          title: "3#电流",
          key: "dl3",
          width: 80,
          render: (h, params) => {
            return h("div", [
              h(
                "A",
                {
                  on: {
                    click: () => {
                      this.toChart(params.row.monEquipmentPk, "dl3");
                    }
                  }
                },
                params.row.dl3
              )
            ]);
          }
        },
        {
          title: "4#电流",
          key: "dl4",
          width: 80,
          render: (h, params) => {
            return h("div", [
              h(
                "A",
                {
                  on: {
                    click: () => {
                      this.toChart(params.row.monEquipmentPk, "dl4");
                    }
                  }
                },
                params.row.dl4
              )
            ]);
          }
        },
        {
          title: "1#泵",
          key: "pump1bp",
          width: 80
        },
        {
          title: "2#泵",
          key: "pump2bp",
          width: 80
        },
        {
          title: "3#泵",
          key: "pump3bp",
          width: 80
        },
        {
          title: "4#泵",
          key: "pump4bp",
          width: 80
        }
      ]
    };
  },
  components: {
    Loading,
    myHeader
  },
  mounted() {
    let myData = JSON.parse(this.until.getQueryString("search"));
    if (myData) {
      this.usageTm = myData.usageDate + " " + myData.usageTime;
      this.handOverTm = myData.handOverDate + " " + myData.handOverTime;

      this.districtCd = myData.districtCd;
      this.estateNm = myData.estateNm;
      this.phCd = myData.phCd;
    }

    if (!this.until.isLogined()) {
      let promise = this.until.login();
      promise.then(res => {
        this.getList();
      });
    } else {
      this.getList();
    }
  },
  methods: {
    getList() {
      let $q = new Promise((resolve, reject) => {
        let query = new this.Query();
        // query.buildWhereClause('dealStatus',this.search.dealStatus,'LK');
        // query.buildWhereClause('proLvNm',this.search.proLvNm,'LK');
        // query.buildWhereClause('bmNm',this.search.bmNm,'LK');
        query.buildPageClause(this.pageNo, this.pageSize);
        let param = query.getParam();
        //this.until.get('/ph/dispatchSend/page',param)
        this.until.get("/ph/equipment/pagex", param).then(
          res => {
            this.spinShow = false;

            if (res.status == 200 && res.data.items) {
              res.data.items.forEach(element => {
                element["name"] = `${element.monEquipmentPk}${element.address}`;
                element.pump1bp = element.pump1bp == 0 ? "停止" : "变频";
                element.pump2bp = element.pump2bp == 0 ? "停止" : "变频";
                element.pump3bp = element.pump3bp == 0 ? "停止" : "变频";
                element.pump4bp = element.pump4bp == 0 ? "停止" : "变频";
                //处理通讯状态
                let currentTm = new Date();
                let lastTm = new Date(element.datetimes.replace("-", "/"));
                if (currentTm - lastTm > 300000) {
                  element.datetimes = "✕";
                } else {
                  element.datetimes = "✓";
                }
              });
              this.list.push(...res.data.items);
              console.log(this.list);

              this.total = res.page.total;
            }
            resolve("ok");
          },
          err => {}
        );
      });
      return $q;
    },
    toDetail(ipPk) {
      let url = "detail.html?ipPk=" + ipPk;
      window.location.href = url;
      // this.app.InterfaceName('h5_Jump',url)
    },
    toChart(ipPk, type) {
      window.location.href = "statis.html?ipPk=" + ipPk + "&type=" + type;
    },
    change(val) {
      this.type = val;
      this.list = [];
      this.pageNo = 1;
      this.spinShow = true;
      this.getList();
    },
    //到底部时触发
    handleReachBottom() {
      return new Promise(resolve => {
        setTimeout(() => {
          if (this.list.length < this.total) {
            this.spinShow = true;
            this.pageNo++;
            this.getList();
          }
          resolve();
        }, 2000);
      });
    }
  }
};
</script>


