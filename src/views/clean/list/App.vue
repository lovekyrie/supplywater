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

.menu {
  width: 100% !important;
  display: flex;
  display: -webkit-flex;
  border-bottom: 1px solid #e2e2e2;

  p {
    flex: 1;
    text-align: center;
    height: 0.55rem;
    line-height: 0.55rem;
    font-size: 0.25rem;
    &:nth-child(2) {
      border-left: 1px solid #e2e2e2;
      border-right: 1px solid #e2e2e2;
    }
  }
  .active {
    background: #3f51b5;
    color: #fff;
  }
}
.main {
  flex: 1;
  width: 100% !important;
  overflow-y: auto;
  .ivu-scroll-container {
    /*overflow-y:auto;*/
    height: 100% !important;
    .ivu-card-body {
      position: relative;
      p {
        line-height: 0.3rem;
      }
      img {
        position: absolute;
        right: 20px;
        top: 40%;
        width: 0.3rem;
        /*transform: rotate(180deg);*/
        /*-ms-transform: rotate(180deg);		!* IE 9 *!*/
        /*-webkit-transform: rotate(180deg);	!* Safari and Chrome *!*/
        /*-o-transform: rotate(180deg);		!* Opera *!*/
        /*-moz-transform: rotate(180deg);		!* Firefox *!*/
      }
      span.btn {
        position: absolute;
        right: 20px;
        bottom: 20px;
        display: block;
        padding: 0.05rem 0.2rem;
        border: 1px solid #e2e2e2;
        border-radius: 3px;
      }
    }
  }
}
</style>

<template>
  <div id="container">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <myHeader :title="title" newCreated="true" search="true"></myHeader>

    <scroll class="main" :on-reach-bottom="handleReachBottom">
      <Card dis-hover v-for="(item, index) in list" class="list" :key="index">
        <div @click="toDetail(item.cleanoutjobPk)">
          <p>
            <span>泵房编号：</span>
            {{item.waterBoxCd}}
          </p>
          <p>
            <span>泵房名称：</span>
            {{item.waterBoxNm}}
          </p>
          <p>
            <span>计划计划时间：</span>
            {{item.frTm }}
          </p>
          <p>
            <span>计划完成时间：</span>
            {{item.toTm }}
          </p>
          <p>
            <span>水箱编号：</span>
            {{item.waterBoxCd}}
          </p>
          <p>
            <span>水箱容量：</span>
            {{item.volume}}
          </p>
          <!-- <span v-show="type===3" class="btn" @click.stop="toDetail(item.maintTaskPk,'edit')">修改报表</span> -->
          <img :src="toDetailPng">
        </div>
      </Card>
    </scroll>
  </div>
</template>

<script>
import Loading from "../../../hero/components/loading";
import myHeader from "@/components/myHead";
import toDetailPng from "@/components/img/toDetail.png";
export default {
  data() {
    return {
      spinShow: false, //加载中
      title: "已完成清洗",
      type: 1, //tab类型
      list: [],
      listTotal: [],
      pageNo: 1,
      pageSize: 10,
      total: "",
      taskExeStatus: "",
      toDetailPng,
      token: "",
      //搜索字段
      searchKey: ""
    };
  },
  components: {
    Loading,
    myHeader
  },
  mounted() {
    this.token = this.until.loGet("appToken");
    this.type = this.until.getQueryString("type")
      ? this.until.getQueryString("type")
      : 1;
    this.getList();
  },
  methods: {
    getList() {
      let $q = new Promise((resolve, reject) => {
        this.searchKey = this.until.getQueryString("search");
        let param = {
          pageNum: this.pageNo,
          pageSize: this.pageSize,
          queryParam: {
            waterBoxNm: this.searchKey
          }
        };
        this.until
          .postData(
            "/inspect-api/cleanoutReport/getCleanOutReportList",
            JSON.stringify(param),
            this.token
          )
          .then(
            res => {
              this.spinShow = false;

              if (res.code === 0 && res.data.result) {
                res.data.result.forEach(item => {
                  let bgTm = this.until.formatDate(item.frTm);
                  let enTm = this.until.formatDate(item.toTm);
                  item.frTm =
                    bgTm.year + "年" + bgTm.month + "月" + bgTm.day + "日";
                  item.toTm =
                    enTm.year + "年" + enTm.month + "月" + enTm.day + "日";
                });
                this.list.push(...res.data.result);
                this.total = res.data.total;

                /** 当total>this.currentpage*showCount*/
                if (res.data.total > this.pageSize * this.showCount) {
                  this.currentPage++;
                  this.getList();
                }
              } else {
                this.$hero.msg.show({
                  text: `${res.message}`,
                  times: 1500
                });
              }
              resolve("ok");
            },
            err => {}
          );
      });
      return $q;
    },
    toDetail(ipPk) {
      let url = "detailpre.html?cleanoutjobPk=" + ipPk;
      window.location.href = url;
    },
    toEditDetail(ipPk) {
      let url = "edit.html?cleanoutjobPk=" + ipPk;
      window.location.href = url;
    },
    //到底部时触发
    handleReachBottom() {
      return new Promise(resolve => {
        setTimeout(() => {
          if (this.list.length < this.total) {
            this.spinShow = true;
            this.currentPage++;
            this.getList();
          }
          resolve();
        }, 2000);
      });
    },
    toEdit(ipPk, val) {
      let url = "edit.html?type=" + val + "&ipPk=" + ipPk;
      window.location.href = url;
    }
  },

  filters: {
    state(val) {
      if (val == 0) {
        val = "未确认";
      }
      if (val == 1) {
        val = "已确认";
      }
      if (val == 2) {
        val = "已接单";
      }
      if (val == 3) {
        val = "已处理";
      }
      if (val == 4) {
        val = "已回访";
      }
      if (val == 5) {
        val = "完成";
      }
      return val;
    },
    toDate(i) {
      return i.split(" ")[0];
    }
  }
};
</script>


