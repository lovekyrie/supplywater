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
  > div {
    padding: 10px 15px;
    line-height: 0.3rem;
    > div {
      display: flex;
      width: 30%;
      height: 2rem;
      justify-content: space-between;
      &:nth-of-type(n + 4) {
        margin-top: 0.3rem;
      }
      > img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        vertical-align: middle;
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
        <p>小区名称：{{info.estateNm}}</p>
        <p>施工单位：{{info.constructionCompanyName}}</p>
        <p>单位：{{info.companyName}}</p>
        <p>设施名称：{{info.facilityName}}</p>
        <p>作业内容：{{info.workContent}}</p>
        <p>主要危险因素：{{info.mainRiskFactors}}</p>
        <p>监护人：{{info.keepPersonnel}}</p>
        <p>填写人：{{info.writePersonnel}}</p>
        <p>作业人：{{info.workPersonnel}}</p>
        <p>开工时间：{{info.workTime}}</p>
      </div>
      <h3>主要安全措施</h3>
      <div>
        <p>
          <Checkbox v-model="info.safetyMeasure1">1.作业前对进入受限空间危险性进行分析，并进行操作前安全交底及培训。</Checkbox>
        </p>
        <p>
          <Checkbox v-model="info.safetyMeasure2">2.清洗人员确认受限空间内存在的其他危害因素，如内部附件、龙骨等。</Checkbox>
        </p>
        <p>
          <Checkbox v-model="info.safetyMeasure3">
            3.打开通分孔进行自然通风，必要时采用强制通风或佩戴空气呼吸器，如空间内缺氧时，严禁用通氧气
            的方法补充氧气
          </Checkbox>
        </p>
        <p>
          <Checkbox v-model="info.safetyMeasure4">4.检查受限空间内部是否具备作业条件：检测受限空间内空气质量，未经检测，严禁入内。</Checkbox>
        </p>
        <p>
          <Checkbox v-model="info.safetyMeasure5">5.检查高压水枪电源线，保证性能良好，线路无破损、无漏电。</Checkbox>
        </p>
        <p>
          <Checkbox v-model="info.safetyMeasure6">6.检查水箱进水阀是否在关闭状态，并挂“禁止开启”标志牌。</Checkbox>
        </p>
        <p>
          <Checkbox v-model="info.safetyMeasure7">7.负责清洗的班组至少3人以上，水箱内必须2人以上一起作业。</Checkbox>
        </p>
        <p>
          <Checkbox v-model="info.safetyMeasure8">
            8.清洗人员必须穿戴防护作用的口罩、眼镜、安全帽、防割手套、穿长袖长裤工作服、
            防滑雨靴、呆头灯。
          </Checkbox>
        </p>
        <p>
          <Checkbox v-model="info.safetyMeasure9">
            9.检查受限空间进出口，水箱人孔处需有1人监管，并与受限空间内人员
            保持通话。
          </Checkbox>
        </p>
        <p>
          <Checkbox v-model="info.safetyMeasure10">10.开启水箱进水阀之前须检查水箱内人员是否全部撤离。</Checkbox>
        </p>
        <p>
          <Row>
            <Col span="2">
              <Checkbox v-model="info.safetyMeasure11">11.</Checkbox>
            </Col>
            <Col span="11">
              <Checkbox v-model="info.safetyFireEquipment">作业监护措施：效仿器材</Checkbox>
            </Col>
            <Col span="11">
              <Checkbox v-model="info.safetyLifeLine">救生绳</Checkbox>
            </Col>
          </Row>
        </p>
        <p>
          <Row>
            <Col span="2">
              <Checkbox v-model="info.safetyMeasure12">12.</Checkbox>
            </Col>
            <Col span="4">其他补救措施：</Col>
            <Col span="18">{{info.safetyMeasure12Content}}</Col>
          </Row>
        </p>
        <p>
          <Row>
            <Col span="4">
              <Checkbox v-model="info.harmIdentify">危害识别</Checkbox>
            </Col>
            <Col span="20">{{info.harmIdentifyContent}}</Col>
          </Row>
        </p>
      </div>
      <div>
        <p>施工作业负责人签字：</p>
        <img :src="info.workPresonSign">
      </div>
      <div>
        <p>签名日期：{{info.workPresonSignDate}}</p>
      </div>
      <div>
        <p>单位（部门）现场负责人：</p>
        <img :src="info.departmentPresonSign">
      </div>
      <div>
        <p>签名日期：{{info.departmentPresonSignDate}}</p>
      </div>
      <div>
        <p>签名日期：{{info.finishWorkDate}}</p>
      </div>
      <div>
        <p>确认人签名：</p>
        <img :src="info.finishWorkSign">
      </div>
      <div>
        <p>
          <Button type="primary" @click="toDetail()">下一步</Button>
        </p>
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
      title: "受限空间作业审批表",
      cleanoutjobPk: "",
      info: {},
      token: ``
    };
  },
  components: {
    Loading,
    myHeader
  },
  mounted() {
    this.token = this.until.loGet("appToken");
    this.cleanoutjobPk = this.until.getQueryString("cleanoutjobPk");
    this.getCleanOutApprove();
  },
  methods: {
    toDetail() {
      window.location.href = "detail.html?cleanoutjobPk=" + this.cleanoutjobPk;
    },
    getCleanOutApprove() {
      let param = {
        cleanoutjobPk: this.cleanoutjobPk,
        token: this.token
      };

      this.until
        .get("/inspect-api/cleanoutReport/getCleanOutApproval", param)
        .then(res => {
          if (res.code === 0) {
            if (res.data.id) {
              this.info = res.data;
              //保存的值操作
              this.info.workPersonnel =
                this.info.workPersonnel && this.info.workPersonnel.split(",");
              //处理false
              Object.keys(this.info).forEach(item => {
                let regex = /\d/g;
                if (item.match(regex)) {
                  this.info[item] = this.info[item] === 1 ? true : false;
                }
              });
              this.info.safetyFireEquipment =
                this.info.safetyFireEquipment === 1 ? true : false;
              this.info.safetyLifeLine =
                this.info.safetyLifeLine === 1 ? true : false;
              this.info.harmIdentify =
                this.info.harmIdentify === 1 ? true : false;
              //时间戳处理
              this.info.workTime = this.until.formatDay(
                "yyyy-MM-dd hh:mm",
                this.info.workTime
              );
              this.info.finishWorkDate = this.until.formatDay(
                "yyyy-MM-dd hh:mm",
                this.info.finishWorkDate
              );
              this.info.workPresonSignDate = this.until.formatDay(
                "yyyy-MM-dd",
                this.info.workPresonSignDate
              );
              this.info.departmentPresonSignDate = this.until.formatDay(
                "yyyy-MM-dd",
                this.info.departmentPresonSignDate
              );
            }
          } else {
            this.$Message.info(res.message);
          }
        });
    }
  }
};
</script>


