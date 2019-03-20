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

    .sign {
      background: rgba(0, 0, 0, 0.7);
      width: 100%;
      height: 100%;
      position: fixed;
      display: flex;
      display: -webkit-flex;
      z-index: 99;
      justify-items: center;
      align-items: center;
    }
  }
}

.main {
  flex: 1;
  width: 100%;
  overflow: auto;
  .ivu-form {
    padding: 20px 25px 0 15px;
    .ivu-date-picker {
      width: 100%;
    }
    .ivu-form-item {
      .signBtn {
        width: 100%;
        height: 0.2rem;
        line-height: 0.2rem;
      }
    }
  }
  h3 {
    margin-bottom: 20px;
    width: 100%;
    font-size: 0.15rem;
    text-indent: 35px;
    background: #f0f0f0;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    height: 0.4rem;
    line-height: 0.4rem;
  }
}

.ivu-modal {
  width: 70% !important;
  margin: auto;
}
</style>

<template>
  <div id="container">
    <div class="sign" v-show="signShow">
      <sign v-on:closeSign="signClose" :type="type" ref="child"></sign>
    </div>
    <myHeader :title="title"></myHeader>
    <div class="main">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="小区名称" prop="estateNm">
          <Input v-model="formValidate.estateNm" disabled></Input>
        </FormItem>
        <FormItem label="施工单位" prop="constructionCompanyName">
          <Select v-model="formValidate.constructionCompanyName" filterable>
            <Option v-for="item in applyUnitList" :value="item.cd" :key="item.sysCatPk">{{item.nm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="单位" prop="companyName">
          <Input v-model="formValidate.companyName" disabled></Input>
        </FormItem>
        <FormItem label="设施名称" prop="facilityName">
          <Input v-model="formValidate.facilityName" disabled></Input>
        </FormItem>
        <FormItem label="作业内容" prop="workContent">
          <Input v-model="formValidate.workContent" disabled></Input>
        </FormItem>
        <FormItem label="主要危险因素" prop="mainRiskFactors">
          <Input v-model="formValidate.mainRiskFactors" disabled></Input>
        </FormItem>
        <FormItem label="监护人" prop="keepPersonnel">
          <Select v-model="formValidate.keepPersonnel" filterable>
            <Option
              v-for="(item,index) in regionUserList"
              :value="item.nkNm"
              :key="index"
            >{{item.nkNm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="填写人" prop="writePersonnel">
          <Select v-model="formValidate.writePersonnel" filterable>
            <Option
              v-for="(item,index) in regionUserList"
              :value="item.nkNm"
              :key="index"
            >{{item.nkNm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="作业人" prop="workPersonnel">
          <Select multiple v-model="formValidate.workPersonnel" filterable>
            <Option
              v-for="(item,index) in regionUserList"
              :value="item.nkNm"
              :key="index"
            >{{item.nkNm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="开工时间">
          <Row>
            <Col span="6">
              <FormItem prop="workTime">
                <DatePicker type="date" v-model="formValidate.workTime1"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem prop="workTime">
                <TimePicker format="HH:mm" type="time" v-model="formValidate.workTime2"></TimePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <h3>主要安全措施</h3>
        <FormItem label="1" prop="safetyMeasure1">
          <Checkbox v-model="formValidate.safetyMeasure1">作业前对进入受限空间危险性进行分析，并进行操作前安全交底及培训。</Checkbox>
        </FormItem>
        <FormItem label="2" prop="safetyMeasure2">
          <Checkbox v-model="formValidate.safetyMeasure2">清洗人员确认受限空间内存在的其他危害因素，如内部附件、龙骨等。</Checkbox>
        </FormItem>
        <FormItem label="3" prop="safetyMeasure3">
          <Checkbox v-model="formValidate.safetyMeasure3">
            打开通分孔进行自然通风，必要时采用强制通风或佩戴空气呼吸器，如空间内缺氧时，严禁用通氧气
            的方法补充氧气
          </Checkbox>
        </FormItem>
        <FormItem label="4" prop="safetyMeasure4">
          <Checkbox v-model="formValidate.safetyMeasure4">检查受限空间内部是否具备作业条件：检测受限空间内空气质量，未经检测，严禁入内。</Checkbox>
        </FormItem>
        <FormItem label="5" prop="safetyMeasure5">
          <Checkbox v-model="formValidate.safetyMeasure5">检查高压水枪电源线，保证性能良好，线路无破损、无漏电。</Checkbox>
        </FormItem>
        <FormItem label="6" prop="safetyMeasure6">
          <Checkbox v-model="formValidate.safetyMeasure6">检查水箱进水阀是否在关闭状态，并挂“禁止开启”标志牌。</Checkbox>
        </FormItem>
        <FormItem label="7" prop="safetyMeasure7">
          <Checkbox v-model="formValidate.safetyMeasure7">负责清洗的班组至少3人以上，水箱内必须2人以上一起作业。</Checkbox>
        </FormItem>
        <FormItem label="8" prop="safetyMeasure8">
          <Checkbox v-model="formValidate.safetyMeasure8">
            清洗人员必须穿戴防护作用的口罩、眼镜、安全帽、防割手套、穿长袖长裤工作服、
            防滑雨靴、呆头灯。
          </Checkbox>
        </FormItem>
        <FormItem label="9" prop="safetyMeasure9">
          <Checkbox v-model="formValidate.safetyMeasure9">
            检查受限空间进出口，水箱人孔处需有1人监管，并与受限空间内人员
            保持通话。
          </Checkbox>
        </FormItem>
        <FormItem label="10" prop="safetyMeasure10">
          <Checkbox v-model="formValidate.safetyMeasure10">开启水箱进水阀之前须检查水箱内人员是否全部撤离。</Checkbox>
        </FormItem>
        <FormItem label="11" prop="safetyMeasure11">
          <Row>
            <Col span="2">
              <Checkbox v-model="formValidate.safetyMeasure11"></Checkbox>
            </Col>
            <Col span="11">
              <Checkbox v-model="formValidate.safetyFireEquipment">作业监护措施：效仿器材</Checkbox>
            </Col>
            <Col span="11">
              <Checkbox v-model="formValidate.safetyLifeLine">救生绳</Checkbox>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="12" prop="safetyMeasure12">
          <Row>
            <Col span="2">
              <Checkbox v-model="formValidate.safetyMeasure12"></Checkbox>
            </Col>
            <Col span="4">其他补救措施：</Col>
            <Col span="18">
              <Input v-model="formValidate.safetyMeasure12Content"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="危害识别" prop="harmIdentify">
          <Row>
            <Col span="2">
              <Checkbox v-model="formValidate.harmIdentify"></Checkbox>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.harmIdentifyContent"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="施工作业负责人签字：">
          <div>
            <img :src="formValidate.workPresonSign" v-if="formValidate.workPresonSign">
            <p @click="getSign('check')" v-else class="signBtn"></p>
          </div>
        </FormItem>
        <FormItem label="签字日期">
          <DatePicker
            type="date"
            placeholder
            format="yyyy年MM月dd日"
            v-model="formValidate.workPresonSignDate"
            :editable="false"
          ></DatePicker>
        </FormItem>
        <FormItem label="单位（部门）现场负责人：">
          <div>
            <img :src="formValidate.departmentPresonSign" v-if="formValidate.departmentPresonSign">
            <p @click="getSign('reCheck')" v-else class="signBtn"></p>
          </div>
        </FormItem>
        <FormItem label="签字日期">
          <DatePicker
            type="date"
            placeholder
            format="yyyy年MM月dd日"
            v-model="formValidate.departmentPresonSignDate"
            :editable="false"
          ></DatePicker>
        </FormItem>
        <FormItem label="完工确认">
          <Row>
            <Col span="6">
              <FormItem prop="finishWorkDate1">
                <DatePicker type="date" v-model="formValidate.finishWorkDate1"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem prop="finishWorkDate2">
                <TimePicker format="HH:mm" type="time" v-model="formValidate.finishWorkDate2"></TimePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="确认人签名：">
          <div>
            <img :src="formValidate.finishWorkSign" v-if="formValidate.finishWorkSign">
            <p @click="getSign('coCheck')" v-else class="signBtn"></p>
          </div>
        </FormItem>
        <FormItem>
          <!-- <Button  type="primary" f  @click="handleSubmit('formValidate')" >提交</Button> -->
          <Button type="primary" @click="add()">下一步</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Loading from "../../../hero/components/loading";
import myHeader from "@/components/myHead";
import sign from "@/components/signature";
export default {
  data() {
    return {
      title: "设备维修申请",
      signShow: false, // 签名显示与否
      imgName: "",
      visible: false,
      type: "",
      loading: false,
      loading1: false,
      regionUserList: [],
      phList: [],
      applyUnitList: [],
      cleanoutjobPk: "",
      cleanoutObj: {},
      formValidate: {
        estateNm: "", //泵房名称
        estateCd: "",
        constructionCompanyName: "",
        companyName: "二次供水分公司",
        facilityName: "不锈钢水箱",
        workContent: "水箱清洗维护",
        mainRiskFactors: "缺氧",
        keepPersonnel: "",
        writePersonnel: "",
        workPersonnel: "",
        workTime: "",
        safetyMeasure1: false,
        safetyMeasure2: false,
        safetyMeasure3: false,
        safetyMeasure4: false,
        safetyMeasure5: false,
        safetyMeasure6: false,
        safetyMeasure7: false,
        safetyMeasure8: false,
        safetyMeasure9: false,
        safetyMeasure10: false,
        safetyMeasure11: false,
        safetyMeasure12: false,
        safetyFireEquipment: false,
        safetyLifeLine: false,
        control14row1: false,
        workPresonSign: "",
        workPresonSignDate: "",
        departmentPresonSign: "",
        departmentPresonSignDate: "",
        finishWorkSign: ""
      },
      ruleValidate: {
        billCode: [
          { required: true, message: "请输入维修单号", trigger: "blur" }
        ],
        finishWorkDate: [
          {
            required: true,
            type: "date",
            message: "请选择申请时间",
            trigger: "change"
          }
        ],
        applicantUnitCd: [
          { required: true, message: "请选择申请单位", trigger: "change" }
        ],
        proposer: [
          { required: true, message: "请输入申请人", trigger: "blur" }
        ],
        mob: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        repairUnitCd: [
          { required: true, message: "请选择维修单位", trigger: "change" }
        ],
        estimatedCost: [
          { required: true, message: "请输入预算费用", trigger: "blur" }
        ],
        diagnosis: [
          { required: true, message: "请输入故障描述", trigger: "blur" }
        ],
        replaceFittingCd: [
          { required: true, message: "请选择是否更换配件", trigger: "change" }
        ]
      }
    };
  },
  components: {
    Loading,
    myHeader,
    sign
  },
  mounted() {
    this.cleanoutjobPk = this.until.getQueryString("cleanoutjobPk");
    this.getSelect();
    this.getCleanOutJob();
  },
  methods: {
    remotePhQuery(val) {
      if (val) {
        this.loading1 = true;
        let query = new this.Query();
        query.buildWhereClause("phNm", val, "LK");
        let param = query.getParam();
        setTimeout(() => {
          this.until.get("/ph/pumph/list", param).then(res => {
            if (res.status === "200") {
              this.phList = res.data.items;
            } else {
              this.phList = [];
            }
          });
        }, 200);
      } else {
        this.phList = [];
      }
    },
    //签名弹出
    getSign(type) {
      this.type = type;
      this.$refs.child.setCanvas();
      this.signShow = true;
    },
    //接收签名并关闭签名窗口
    signClose(img) {
      this.signShow = false;
      if (img) {
        if (this.type == "check") {
          this.formValidate.workPresonSign = img;
        } else if (this.type === "reCheck") {
          this.formValidate.departmentPresonSign = img;
        } else {
          this.formValidate.finishWorkSign = img;
        }
      }
    },
    //提交
    // handleSubmit(name) {
    //   this.$refs[name].validate(valid => {
    //     if (valid) {
    //       let myDate = this.until.formatDate(this.formValidate.applicationTm);
    //       this.formValidate.applicationTm =
    //         myDate.year + "-" + myDate.month + "-" + myDate.day;

    //       this.formValidate.repairStockRoList = this.repairStockRoList;
    //       //维修单号 后端生成
    //       this.until
    //         .postData(
    //           "/ph/deviceRepair/edit",
    //           JSON.stringify(this.formValidate)
    //         )
    //         .then(res => {
    //           if (res.status == 200) {
    //             this.$Message.success("提交成功!");
    //             setTimeout(() => {
    //               window.location.href = "list.html";
    //             }, 1500);
    //           } else {
    //             this.$Message.error(res.message);
    //           }
    //         });
    //     } else {
    //       this.$Message.error("请填写完整信息！");
    //     }
    //   });
    // },

    add() {
      var a = {
        applicantUnitCd: this.formValidate.applicantUnitCd, //申请单位
        finishWorkDate1: this.formValidate.finishWorkDate, //申请时间
        proposer: this.formValidate.proposer, //申请人
        mob: this.formValidate.mob, //联系电话
        repairUnitCd: this.formValidate.repairUnitCd, //维修单位
        phNm: this.formValidate.estateNm, //泵房
        deviceCd: this.formValidate.devicePk, //设备主键~
        deviceNm: this.deviceNm, //设备名称~
        diagnosis: this.formValidate.diagnosis, //故障描述
        estimatedCost: this.formValidate.estimatedCost, //预算费用
        replaceFittingCd: this.formValidate.replaceFittingCd, //是否更换配件
        stockId: this.part.stockManagePk, //配件id
        stockNm: this.part.deviceNm, //配件名称
        stockSpec: this.part.deviceSpec, //配件规格
        stockBrand: this.part.deviceBrand //配件品牌
      };
      this.listData.push(a);
      this.until
        .postData("/ph/deviceRepair/edit", JSON.stringify(this.listData))
        .then(res => {
          if (res.status == 200) {
            //this.$Message.success("提交成功!");
            this.$Modal.confirm({
              title: "提交成功",
              content: "是否继续添加维修申请？",
              onOk: () => {
                (this.listData = []),
                  (this.deviceBigPk = ""),
                  (this.deviceSmallPk = ""),
                  (this.deviceDPk = ""),
                  (this.deviceNm = ""),
                  (this.formValidate.devicePk = ""),
                  (this.formValidate.diagnosis = ""),
                  (this.formValidate.estimatedCost = ""),
                  (this.formValidate.replaceFittingCd = "10000.160"),
                  (this.part = []),
                  this.formValidate.deviceCd,
                  this.$Message.info("提交成功继续添加");
              },
              onCancel: () => {
                // this.$Message.info('Clicked cancel');
                window.location.href = "list.html";
              }
            });

            // setTimeout(() => {
            //   window.location.href = "list.html";
            // }, 1500);
          } else {
            this.$Message.error(res.message);
          }
        });
      console.log(this.listData);
    },

    //获取选项数据
    getSelect() {
      let param = {
        token: `eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmbGR5bGYiLCJpYXQiOjE1NTMwNjIxMjMsInN1YiI6IjZhZWQxNWEzY2MyYjQxMGZiZTNmODdlYmM4Y2M0MmNmIiwiZXhwIjoxNTUzMTQ4NTIzfQ.B1DbIWXk4GwRFqCcl0-Vc6LaMnJ6O1IkubPGVsoOf0g`
      };
      this.until.get("/inspect-api/user/getUsersByDept", param).then(res => {
        if (res.code === 0) {
          this.regionUserList = res.data;
        }
      });
    },
    selectOpt(e) {
      console.log(e);
      this.device = e;
    },

    //获取清洗信息
    getCleanOutJob() {
      let param = {
        cleanoutjobPk: this.cleanoutjobPk,
        token: `eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmbGR5bGYiLCJpYXQiOjE1NTMwNjIxMjMsInN1YiI6IjZhZWQxNWEzY2MyYjQxMGZiZTNmODdlYmM4Y2M0MmNmIiwiZXhwIjoxNTUzMTQ4NTIzfQ.B1DbIWXk4GwRFqCcl0-Vc6LaMnJ6O1IkubPGVsoOf0g`
      };
      this.until.get("/inspect-api/cleanout/getCleanJob", param).then(
        res => {
          if (res.status === 0) {
            this.cleanoutObj = res.data.items;
          }
        },
        err => {
          this.deviceBigList = {};
        }
      );
    },
    getRepairStock(e) {
      this.until.get("/ph/stockManage/info/" + e).then(res => {
        if (res.status === "200") {
          this.part = res.data;
        }
      });
      console.log(this.part);
    }
  }
};
</script>


