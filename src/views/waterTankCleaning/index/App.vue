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
    header {
      width: 100%;
      position: relative;
      padding: 0;
      > img {
        width: 100%;
        float: left;
        margin: 0 !important;
      }
      p {
        width: 100%;
        position: absolute;
        bottom: 0;
        background: rgba(255, 255, 255, 0.7);
        height: 0.4rem;
        line-height: 0.4rem;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        img {
          width: 0.25rem;
          margin-left: 0.1rem;
        }
      }
    }
    > div {
      display: flex;
      display: -webkit-flex;
      height: 1.5rem;
      align-items: center;
      border-bottom: 1px solid #d2d2d2;
      p {
        color: #333333;
        flex: 1;
        font-size: 0.3rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        img {
          margin-left: 40px;
          margin-right: 30px;
          width: 45px;
        }
      }
      > img {
        margin-right: 40px;
        width: 10px;
      }
    }
  }
}
</style>

<template>
  <div id="container">
    <myHeader appBack="true"></myHeader>
    <div @click="toPlan()">
      <p>
        <img src="./img/plan.png">
        清洗计划
      </p>
      <img src="../components/img/toDetail.png">
    </div>
    <div @click="toReport()">
      <p>
        <img src="./img/reprot.png">
        清洗报表
      </p>
      <img src="../components/img/toDetail.png">
    </div>
    <div @click="toWaitConfirm()">
      <p>
        <img src="./img/reprot.png">
        待确认清洗报表
      </p>
      <img src="../components/img/toDetail.png">
    </div>
    <div @click="toAfterConfirm()">
      <p>
        <img src="./img/reprot.png">
        已确认清洗报表
      </p>
      <img src="../components/img/toDetail.png">
    </div>
  </div>
</template>

<script>
import myHeader from "../components/myHead";
export default {
  data() {
    return {};
  },
  components: {
    myHeader
  },
  mounted() {
    this.app.InterfaceName("h5_setTokenToHtml5", { test: 12 }).then(res => {
      console.log("测试@@@=====>" + res);
      this.until.loSave("appToken", res);
    });
    /* this.until.loSave(
      "appToken",
      `eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmbGR5bGYiLCJpYXQiOjE1NTQ5NjIyNDIsInN1YiI6ImFlYjc1ZTI1NzM4YTQ2MDQ5NTA1NGZmNzI4MWJhNjNhIiwiZXhwIjoxNTU1MDQ4NjQyfQ.a2rbIt1oTgIBnmLGkdbFdZ33sVZsUJr-8y7JSDoHTp8`
    ); */
  },
  methods: {
    toPlan() {
      let url = "planList.html";
      window.location.href = url;
    },
    toReport() {
      let url = "reportList.html";
      window.location.href = url;
    },
    toWaitConfirm() {
      window.location.href = "waitConfirm.html";
    },
    toAfterConfirm() {
      window.location.href = "afterConfirm.html";
    },
    back() {
      this.app.InterfaceName("h5_historyBack", {});
    }
  }
};
</script>


