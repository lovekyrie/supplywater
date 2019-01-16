<style lang="less">
#header {
  width: 100%;
  padding: 0;
  height: 0.8rem;
  background: #01aef0;
  border-bottom: 1px solid #e2e2e2;
  position: relative;
  p {
    height: 0.8rem;
    overflow: hidden;
    position: absolute;
    width: 100%;
  }
  img {
    width: 0.35rem;
    margin-left: 0.1rem;
  }
  .left {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    font-size: 0.3rem;
    color: #333333;
    width: 2rem;
    z-index: 2;
  }
  .center {
    text-align: center;
    font-size: 0.3rem;
    color: #fff;
    line-height: 0.8rem;
  }
  .right {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.1rem;
    span {
      padding: 0.05rem 0.1rem;
      border: 1px solid #e2e2e2;
      border-radius: 3px;
      font-size: 0.2rem;
    }
    img {
      width: 0.3rem;
      margin: 0 0.2rem;
    }
  }
}
</style>

<template>
  <div id="header">
    <p class="left">
      <img src="./img/backWhite.png" @click="back()">
    </p>
    <p class="center">{{title}}</p>
    <p class="right">
      <span v-if="newCreated" @click="goCreate()">新建</span>
      <img src="./img/searchWhite.png" v-if="search" @click="goSearch(search)">
    </p>
  </div>
</template>

<script>
export default {
  name: "App",
  props: ["title", "newCreated", "search", "indexBack", "appBack"],
  mounted() {
    // this.abc();
  },
  methods: {
    back() {
      if (this.appBack) {
        this.app.InterfaceName("h5_historyBack", {});
        // window.location.href = 'index.html'
      } else {
        window.history.go(-1);
      }
    },
    goCreate() {
      let url = "add.html";
      window.location.href = url;
    },
    goSearch(val) {
      let url = "search.html";
      window.location.href = url;
    }
  }
};
</script>

