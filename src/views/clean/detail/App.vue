<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  font-size: 0.12rem;
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
      <div>
        <p>泵房名称：{{info.waterBoxNm}}</p>
        <p>泵房编号：{{info.waterBoxCd}}</p>
        <p>清洗容积(吨)：{{info.volume}}</p>
        <p>清洗时间：{{info.cleanoutTm}}</p>
        <p>清洗人员：{{info.cleanoutOperator}}</p>
        <p>水箱排水时间：{{info.drainOffFromTm}}-{{info.drainOffToTm}},共计：{{info.drainOffAmtTm}}</p>
        <p>水箱消毒时间：{{info.cleanoutFormTm}}-{{info.cleanoutToTm}},共计：{{info.cleanoutAmtTm}}</p>
        <p>消毒剂：{{info.liquidName}}</p>
        <p>配置浓度：{{info.liquorStrength}}</p>
        <p>配置人员：{{info.preparationer}}</p>
        <p>监督人员：{{info.supervisor}}</p>
        <p>浊度（NTU）：{{info.turbidity}}</p>
        <p>余氯（mg/l）：{{info.residualChlorine}}</p>
        <p>水箱注水时间：{{info.waterInjectionFromTm}}-{{info.waterInjectionToTm}},共计：{{info.waterInjectionAmtTm}}</p>
        <p>完成时间：{{info.checkTime}}</p>
        <p>清洗前照片：
          <div v-for="(item, index) in info.clearImgPre" :key="index">
            <img :src="item" alt="">
          </div>
        </p>
        <p> 清洗前照片：
            <div v-for="(item, index) in info.clearImgPost" :key="index">
            <img :src="item" alt="">
          </div>
        </p>
      </div>

      <h3>水箱清洗工作建议与评估</h3>
      <div>
        <p>{{info.adviseAssess}}</p>
        <p>记录人：{{info.recorder}}</p>
        <p>项目负责人：{{info.principal}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../../../hero/components/loading";
import myHeader from "@/components/myHead";
export default {
  data() {
    return {
      title: "水池（箱）清洗消毒记录表",
      cleanoutjobPk: "",
      info: {},
      token: `eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmbGR5bGYiLCJpYXQiOjE1NTMxNTYxNzUsInN1YiI6IjIwNTc4MWIxNTY0YzQxYzViNDIxY2YzZjI1ZWZkNGNmIiwiZXhwIjoxNTUzMjQyNTc1fQ.MfmXiw-g24mxEzrQHVtX5KVXWycj8nqX-Ik7Mf5fyCI`
    };
  },
  components: {
    Loading,
    myHeader
  },
  mounted() {
    this.cleanoutjobPk = this.until.getQueryString("cleanoutjobPk");
    this.getCleanOutReport();
  },
  methods: {
    getCleanOutReport() {
      let param = {
        cleanoutjobPk: this.cleanoutjobPk,
        token: this.token
      };

      this.until
        .get("/inspect-api/cleanoutReport/getCleanOutReport", param)
        .then(res => {
          if (res.code === 0) {
            if (res.data.cleanoutReportPk) {
              this.info = res.data;
              //时间戳处理
              this.info.drainOffFromTm = this.until.formatDay(
                "hh:mm",
                this.info.drainOffFromTm
              );
              this.info.drainOffToTm = this.until.formatDay(
                "hh:mm",
                this.info.drainOffToTm
              );
              this.info.cleanoutFormTm = this.until.formatDay(
                "hh:mm",
                this.info.cleanoutFormTm
              );
              this.info.cleanoutToTm = this.until.formatDay(
                "hh:mm",
                this.info.cleanoutToTm
              );
              this.info.waterInjectionFromTm = this.until.formatDay(
                "hh:mm",
                this.info.waterInjectionFromTm
              );
              this.info.waterInjectionToTm = this.until.formatDay(
                "hh:mm",
                this.info.waterInjectionToTm
              );

              this.info.clearImgPost=this.info.clearImgPost.split(',')
              this.info.clearImgPre=this.info.clearImgPre.split(',')
            }
          } else {
            this.$Message.info(res.message);
          }
        });
    }
  }
};
</script>


