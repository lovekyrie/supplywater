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
        }
      }
      > img {
        margin-right: 40px;
        width: 0.3rem;
      }
    }
  }
}
</style>

<template>
  <div id="container">
    <header>
      <img :src="headBack">
      <p class="left">
        <img :src="backWhite" @click="back">
      </p>
    </header>
    <div @click="toAllMaintenance()">
      <p>
        <img src="./img/mission.png">
        全部清洗记录
      </p>
      <img :src="toDetail">
    </div>
    <div @click="toWaitMaintenance()">
      <p>
        <img src="./img/xunjianbaobiao.png">
        待清洗列表
      </p>
      <img :src="toDetail">
    </div>
  </div>
</template>

<script>
import Qs from "qs";
import { log } from "util";
import toDetail from "@/components/img/toDetail.png";
import headBack from "@/components/img/head_background.png";
import backWhite from "@/components/img/backWhite.png";

export default {
  data() {
    return {
      title: "保养模块",
      toDetail,
      headBack,
      backWhite
    };
  },
  components: {},
  created() {
    //通过Android原生返回一个登录的token，供我们本地存储
    var that = this;
    console.log("112");
    this.app.InterfaceName("h5_setTokenToHtml5", { test: 12 }).then(res => {
      console.log("测试@@@=====>" + res);
      this.until.loSave("appToken", res);
    });
  },
  mounted() {
    // this.login();
  },
  methods: {
    //全部保养
    toAllMaintenance() {
      let url = "list.html";
      window.location.href = url;
    },
    //待保养
    toWaitMaintenance() {
      let url = "pendinglist.html";
      window.location.href = url;
    },
    back() {
      this.app.InterfaceName("h5_historyBack", {});
    }
  }
};
</script>


