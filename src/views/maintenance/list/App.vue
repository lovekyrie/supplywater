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
    <myHeader :title="title" newCreated="true" search="true" appBack="true"></myHeader>
    <div class="menu">
      <p @click="change(1)" :class="{active:type==1}">已保养</p>
      <p @click="change(2)" :class="{active:type==2}">未保养</p>
      <p @click="change(3)" :class="{active:type==3}">已过期</p>
    </div>
    <scroll class="main" :on-reach-bottom="handleReachBottom">
      <Card dis-hover v-for="(item, index) in list" class="list" :key="index">
        <div @click="toDetail(item.dispatchSendPk)">
          <p>
            <span>区域：</span>
            {{item.deviceCd}}
          </p>
          <p>
            <span>泵房名称：</span>
            {{item.estateNm}}
          </p>
          <p>
            <span>保养计划时间：</span>
            {{item.applicationTm | toDate}}
          </p>
          <p>
            <span>计划完成时间：</span>
            {{item.applicationTm | toDate}}
          </p>
          <p>
            <span>保养类型：</span>
            {{item.statNm}}
          </p>
          <img src="../components/img/toDetail.png">
        </div>
      </Card>
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
      title: "任务派单管理",
      type: 1, //tab类型
      list: [],
      listTotal: [],
      pageNo: 1,
      pageSize: 10,
      total: ""
    };
  },
  components: {
    Loading,
    myHeader
  },
  filters: {
    toDate(i) {
      return i.split(" ")[0];
    }
  },
  mounted() {
    this.type = this.until.getQueryString("type")
      ? this.until.getQueryString("type")
      : 1;
    this.getList();
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
        this.until.get("/ph/dispatchSend/page", param).then(
          res => {
            this.spinShow = false;

            if (res.status == 200 && res.data.items) {
              this.listTotal.push(...res.data.items);
              this.total = res.page.total;
              if (this.type == 1) {
                res.data.items.forEach(item => {
                  if (
                    item.dealStatus == 0 ||
                    item.dealStatus == 1 ||
                    item.dealStatus == 2 ||
                    item.dealStatus == 3
                  ) {
                    this.list.push(item);
                  }
                });
              }
              if (this.type == 2) {
                res.data.items.forEach(item => {
                  if (item.dealStatus == "0" || item.dealStatus == "3") {
                    this.list.push(item);
                  }
                });
              }
              if (this.type == 3) {
                res.data.items.forEach((item, index) => {
                  if (item.dealStatus == 4 || item.dealStatus == 5) {
                    console.log(index);
                    this.list.push(item);
                  }
                });
              }
              if (
                this.list.length < this.pageSize &&
                this.listTotal.length < this.total
              ) {
                this.pageNo++;
                this.getList();
              }
            }
            resolve("ok");
          },
          err => {}
        );
      });
      return $q;
    },
    toDetail(ipPk) {
      //根据type选择的类型，跳转到不同的明细
      let url = "detail.html?ipPk=" + ipPk;
      window.location.href = url;
      // this.app.InterfaceName('h5_Jump',url)
    },
    change(val) {
      this.type = val;
      this.list = [];
      this.listTotal = [];
      this.pageNo = 1;
      this.spinShow = true;
      this.getList();
    },
    //到底部时触发
    handleReachBottom() {
      return new Promise(resolve => {
        setTimeout(() => {
          if (this.listTotal.length < this.total) {
            this.spinShow = true;
            this.pageNo++;
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
    }
  }
};
</script>


