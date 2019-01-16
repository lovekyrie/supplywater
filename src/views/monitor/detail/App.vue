<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  font-size: 0.2rem;
  background: #f2f2f2;
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
  width: 100%;
  overflow-y: auto;
  > div {
    color: #c3c3c3;
    background-color: #fff;
    &:nth-of-type(1) {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      padding-top: 0.4rem;
      > p {
        width: 100%;
        text-align: center;
        &:nth-of-type(1) {
          margin-bottom: 0.05rem;
          font-size: 0.25rem;
          color: #01aef0;
        }
      }
      div {
        padding: 0 20%;
        width: 100%;
        p {
          display: flex;
          flex-flow: row wrap;
          margin-bottom: 0.1rem;
          &:nth-last-of-type(1) {
            margin-bottom: 0.2rem;
          }
          span {
            width: 50%;
          }
        }
      }
      img {
        margin: 0.2rem 0;
        width: 60%;
        height: 60%;
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
      }
    }
    &:nth-last-of-type(1) {
      margin-top: 0.3rem;
      color: #333;
      padding: 0.3rem 20%;
      p {
        display: flex;
        flex-flow: row wrap;
        margin-bottom: 0.1rem;
        span {
          width: 50%;
        }
      }
    }
  }
}
</style>

<template>
  <div id="container">
    <myHeader :title="title"></myHeader>
    <div class="main">
      <div>
        <!-- <iframe :src="src" style="width: 100%;height: 600px;"></iframe> -->
        <!-- <img :src="info.dispatchFromNm"> -->
        <p>{{info.address}}</p>
        <p>{{info.datetimes}}</p>
        <img src="http://111.2.25.208:6081/img/emqumentImg/PS3.bmp" alt>
        <div>
          <p>
            <span>浊度:{{info.ntu}}</span>
            <span>出水压力:{{info.press2}}</span>
          </p>
          <p>
            <span>余氯:{{info.cl}}</span>
            <span>频率：{{info.hz}}</span>
          </p>
          <p>
            <span>进水压力：{{info.press1}}</span>
            <span>电压：{{info.dy}}</span>
          </p>
          <p>
            <span>1#电流：{{info.dl1}}</span>
            <span>电度：{{info.du}}</span>
          </p>
          <p>
            <span>2#电流：{{info.dl2}}</span>
            <span>状态：自动</span>
          </p>
          <p>
            <span>3#电流：{{info.dl3}}</span>
          </p>
        </div>
      </div>
      <div>
        <p>
          <span>生产厂家：{{info.product}}</span>
          <span>流量：{{info.ll}}</span>
        </p>
        <p>
          <span>品牌：{{info.pp}}</span>
          <span>扬程：{{info.yc }}</span>
        </p>
        <p>
          <span>型号：{{info.xh}}</span>
          <span>额定电流：{{info.dl}}</span>
        </p>
        <p>
          <span>功率：{{info.gl}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../../../hero/components/loading";
import myHeader from "../components/myHead";
export default {
  data() {
    return {
      title: "调度监控详情",
      ipPk: "",
      info: {},
      src: ""
    };
  },
  components: {
    Loading,
    myHeader
  },
  mounted() {
    this.ipPk = this.until.getQueryString("ipPk");
    this.src =
      "http://111.2.25.208:6081/view/ph/equipment/equipmentInfoApp.html?pk=" +
      this.ipPk;
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.until.get("/ph/equipment/info/" + this.ipPk).then(res => {
        this.info = res.data;
        console.log(this.info);
      });
    }
  }
};
</script>


