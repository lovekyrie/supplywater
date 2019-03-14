<style lang="less" type="text/less">
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
    /*overflow-y:auto;*/
    height: 100% !important;
    .ivu-card-body {
      position: relative;
      p {
        line-height: 0.3rem;
        &:last-child {
          text-align: right;
          /*padding-right: 20px;*/
          span {
            display: inline-block;
            width: 1rem;
            text-align: center;
            border: 1px solid #e2e2e2;
            margin-left: 0.05rem;
            line-height: 0.3rem;
            height: 0.3rem;
            border-radius: 5px;
          }
        }
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
    <myHeader :title="title" search="true"></myHeader>
    <p style="text-align: center; line-height: .3rem" v-show="total==0">暂无数据</p>

    <scroll class="main" :on-reach-bottom="handleReachBottom">
      <Card dis-hover v-for="(item, index) in list" class="list" :key="index">
        <div @click="toDetail(item.maintTaskPk)">
          <p>
            <span>区域：</span>
            {{item.districtNm}}
          </p>
          <p>
            <span>泵房名称：</span>
            {{item.phNm}}
          </p>
          <p>
            <span>保养计划时间：</span>
            {{item.maintPlanTime | toDate}}
          </p>
          <p>
            <span>计划完成时间：</span>
            {{item.maintPlanDoneTime | toDate}}
          </p>
          <img src="../components/img/toDetail.png">
        </div>
      </Card>
    </scroll>
    <p style="text-align: center; line-height: .3rem" v-show="noMore">数据已加载完</p>
  </div>
</template>

<script>
import Loading from "../../../hero/components/loading";
import myHeader from "../components/myHead";
export default {
  data() {
    return {
      title: "待执行保养",
      spinShow: false,
      noMore: false,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      list: [],

      //搜索字段
      sbCd: "", //设备编号
      districtCd: "", //设备名称
      estateNm: "", //小区名称
      billCode: "", //维修单号
      applyTime: "", //申请时间
      applyUnit: "", //申请单位
      treatState: "" //处理状态
    };
  },
  components: {
    Loading,
    myHeader
  },
  mounted() {
    this.getList();
  },
  filters: {
    toDate(i) {
      return i.split(" ")[0];
    }
  },
  methods: {
    getList() {
      this.spinShow = true;
      let $q = new Promise((resolve, reject) => {
        let param = {
          taskExeStatus: "待保养",
          currentPage: 1,
          showCount: 10,
          token: this.until.loGet("appToken")
        };
        this.until.get("/inspect-api/maintTask/list", param).then(
          res => {
            if (res.code === 0) {
              this.spinShow = false;
              this.total = res.data.total;
              if (res.data.list) {
                this.list.push(...res.data.list);
              }
            } else if (res.code === 1000) {
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

    toDetail(repPk) {
      let url = "edit.html?maintTaskPk=" + repPk;
      window.location.href = url;
    },
    //到底部时触发
    handleReachBottom() {
      return new Promise(resolve => {
        setTimeout(() => {
          if (this.list.length < this.total) {
            this.pageNo++;
            this.getList();
          } else {
            this.noMore = true;
          }
          resolve();
        }, 2000);
      });
    }
  }
};
</script>


