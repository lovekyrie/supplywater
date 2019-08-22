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
  width: 100%;
  overflow: auto;
  h3 {
    width: 100%;
    font-size: 0.15rem;
    text-indent: 15px;
    background: #f0f0f0;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    height: 0.4rem;
    line-height: 0.4rem;
  }
  div {
    padding: 10px 15px;
    line-height: 0.3rem;
  }
}
</style>

<template>
  <div id="container">
    <myHeader :title="title"></myHeader>
    <div class="main">
      <h3>工单信息</h3>
      <div>
        <p>工单来源名称：{{info.dispatchFromNm}}</p>
        <p>部门名称：{{info.bmNm}}</p>
        <p>派单时间：{{info.sendTm}}</p>
        <p>处理时限：{{info.dealLimit}}</p>
        <p>反映人：{{info.reportMan}}</p>
        <p>反映人电话：{{info.reportPhone }}</p>
        <p>故障现象分类：{{info.proLvNm}}</p>
        <p>行政区域：{{info.districtNm}}</p>
        <p>泵房名称：{{info.estateNm}}</p>
        <p>问题详情：{{info.proContent}}</p>
        <p>接单备注：{{info.receiveMsg}}</p>
      </div>
      <h3>回执信息</h3>
      <div>
        <p>初次确认时间：{{info.arriveTm }}</p>
        <p>初次确认人员：{{info.conNm }}</p>
        <p>最终确认时间：{{info.startTm }}</p>
        <p>最终确认人员：{{info.con2Nm }}</p>
      </div>
      <h3>处理信息</h3>
      <div>
        <p>接单时间：{{info.receiveTm }}</p>
        <p>工单完成时间：{{info.endTm}}</p>
        <p>接单人员：{{info.receiveMan}}</p>
        <p>接单人电话：{{info.receivePhone}}</p>
        <p>故障类型：{{info.proTypeNm}}</p>
        <p>故障原因：{{info.proReason}}</p>
        <p>处理记录：{{info.recordMsg}}</p>
        <!--  <p>处理前照片：</p>
        <div v-for="item in info.preImgs" :key="item">
          <img :src="item" alt>
        </div>
        <p>处理后照片：</p>
        <div v-for="item in info.postImgs" :key="item">
          <img :src="item" alt>
        </div>-->
      </div>
      <h3>回访信息</h3>
      <div>
        <p>回访时间：{{info.returnTm}}</p>
        <p>人员名称：{{info.userNm}}</p>
        <p>回访情况：{{info.returnContent}}</p>
        <p>回访结果：{{info.returnResult}}</p>
        <p>客户满意度：{{info.csi}}</p>
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
      title: "工单指派详情",
      ipPk: "",
      info: {}
    };
  },
  components: {
    Loading,
    myHeader
  },
  mounted() {
    this.ipPk = this.until.getQueryString("ipPk");
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.until.get("/ph/dispatchSend/info/" + this.ipPk).then(res => {
        this.info = res.data;
      });
    }
  }
};
</script>


