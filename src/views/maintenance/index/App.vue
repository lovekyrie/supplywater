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
      <img src="./img/head_background.png">
      <p class="left">
        <img src="./img/backWhite.png" @click="back">
      </p>
    </header>
    <div @click="toAllMaintenance()">
      <p>
        <img src="./img/mission.png">
        全部保养记录
      </p>
      <img src="../components/img/toDetail.png">
    </div>
    <div @click="toWaitMaintenance()">
      <p>
        <img src="./img/xunjianbaobiao.png">
        待保养列表
      </p>
      <img src="../components/img/toDetail.png">
    </div>
  </div>
</template>

<script>
import Qs from "qs";
import { log } from "util";
export default {
  data() {
    return {};
  },
  components: {},
  mounted() {
    this.login();
  },
  methods: {
    login() {
      let param = {};
      const query = Qs.parse(location.hash.substring(3));
      var user = query.user;
      var pwd = query.pwd;
      this.until
        .post(
          "/general/access/appLogin?username=" +
            user +
            "&password=" +
            pwd +
            "&rememberMe=true",
          param
        )
        .then(
          res => {
            if (res.status == 200) {
              this.until.loSave("JS_token", JSON.stringify(res.data));
            } else {
              this.Toast(res.message);
            }
          },
          err => {}
        );
    },

    //全部保养
    toAllMaintenance() {
      let url = "../clientrepair/list.html";
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


