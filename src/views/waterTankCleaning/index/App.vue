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
  mounted() {},
  methods: {
    toPlan() {
      let url = "planList.html";
      window.location.href = url;
    },
    toReport() {
      let url = "reportList.html";
      window.location.href = url;
    },
    back() {
      this.app.InterfaceName("h5_historyBack", {});
    }
  }
};
</script>


