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
          <Input v-model="formValidate.constructionCompanyName" disabled></Input>
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
        <FormItem label="开工时间" prop="workTime">
          <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="formValidate.workTime"></DatePicker>
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
        <FormItem label="完工确认" prop="finishWorkDate">
          <DatePicker
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            v-model="formValidate.finishWorkDate"
          ></DatePicker>
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
      title: "受限空间作业审批表",
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
      firstSave: true,
      token: `eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmbGR5bGYiLCJpYXQiOjE1NTMxNTYxNzUsInN1YiI6IjIwNTc4MWIxNTY0YzQxYzViNDIxY2YzZjI1ZWZkNGNmIiwiZXhwIjoxNTUzMjQyNTc1fQ.MfmXiw-g24mxEzrQHVtX5KVXWycj8nqX-Ik7Mf5fyCI`,
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
        workPresonSign: "",
        workPresonSignDate: "",
        departmentPresonSign: "",
        departmentPresonSignDate: "",
        finishWorkSign: "",
        finishWorkDate: ""
      },
      ruleValidate: {}
    };
  },
  components: {
    Loading,
    myHeader,
    sign
  },
  mounted() {
    this.cleanoutjobPk = this.until.getQueryString("cleanoutjobPk");
    //获取审批表信息
    this.getApproveInfo();
    //如果之前无踢球，是新增，提交过，是修改
    this.getSelect();
    this.getCleanOutJob();
  },
  methods: {
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
      //处理false
      Object.keys(this.formValidate).forEach(item => {
        let regex = /\d/g;
        if (item.match(regex)) {
          this.formValidate[item] = this.formValidate[item] ? 1 : 0;
        }
      });
      this.formValidate.safetyFireEquipment = this.formValidate
        .safetyFireEquipment
        ? 1
        : 0;
      this.formValidate.safetyLifeLine = this.formValidate.safetyLifeLine
        ? 1
        : 0;

      this.formValidate.workPersonnel =
        this.formValidate.workPersonnel &&
        this.formValidate.workPersonnel.join(",");

      //第一次提交处理
      if (this.firstSave) {
        this.formValidate.cleanoutjobPk = this.cleanoutjobPk;
        this.formValidate.id = null;
      }
      // this.formValidate.token = this.token;
      this.until
        .postData(
          "/inspect-api/cleanoutReport/saveApproval",
          JSON.stringify(this.formValidate),
          this.token
        )
        .then(res => {
          if (res.code === 0) {
            //this.$Message.success("提交成功!");
            this.$Modal.confirm({
              title: "提交成功",
              content: "是否继续填写水池（箱）清洗消毒记录表？",
              onOk: () => {
                // this.$Message.info("提交成功继续添加");
                window.location.href =
                  "edit.html?cleanoutjobPk=" +
                  this.cleanoutjobPk +
                  "&type=edit";
              },
              onCancel: () => {
                // this.$Message.info('Clicked cancel');
                window.location.href = "pendinglist.html";
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
        token: this.token
      };
      this.until.get("/inspect-api/user/getUsersByDept", param).then(res => {
        if (res.code === 0) {
          this.regionUserList = res.data;
        }
      });
    },

    //获取清洗信息
    getCleanOutJob() {
      let param = {
        cleanoutjobPk: this.cleanoutjobPk,
        token: this.token
      };
      this.until.get("/inspect-api/cleanout/getCleanJob", param).then(
        res => {
          if (res.code === 0) {
            // this.cleanoutObj = res.data;
            this.formValidate.estateNm = res.data.estateNm;
            this.formValidate.constructionCompanyName = res.data.cleanoutUnit;
            this.formValidate.keepPersonnel = res.data.loginUser;
            this.formValidate.writePersonnel = res.data.loginUser;
          }
        },
        err => {
          this.deviceBigList = {};
        }
      );
    },
    getApproveInfo() {
      let param = {
        cleanoutjobPk: this.cleanoutjobPk,
        token: this.token
      };
      this.until
        .get("/inspect-api/cleanoutReport/getCleanOutApproval", param)
        .then(res => {
          if (res.code === 0) {
            //如果有数据，则赋值给this.formValidate
            if (res.data.id) {
              this.firstSave = false;
              Object.assign(this.formValidate, res.data);
              //保存的值操作
              this.formValidate.workPersonnel = this.formValidate.workPersonnel.split(
                ","
              );
              //处理false
              Object.keys(this.formValidate).forEach(item => {
                let regex = /\d/g;
                if (item.match(regex)) {
                  this.formValidate[item] =
                    this.formValidate[item] === 1 ? true : false;
                }
              });
              this.formValidate.safetyFireEquipment =
                this.formValidate.safetyFireEquipment === 1 ? true : false;
              this.formValidate.safetyLifeLine =
                this.formValidate.safetyLifeLine === 1 ? true : false;
              //时间戳处理
              this.formValidate.workTime = this.until.formatDay(
                "yyyy-MM-dd hh:mm",
                this.formValidate.workTime
              );
              this.formValidate.finishWorkDate = this.until.formatDay(
                "yyyy-MM-dd hh:mm",
                this.formValidate.finishWorkDate
              );
              this.formValidate.workPresonSignDate = this.until.formatDay(
                "yyyy-MM-dd",
                this.formValidate.workPresonSignDate
              );
              this.formValidate.departmentPresonSignDate = this.until.formatDay(
                "yyyy-MM-dd",
                this.formValidate.departmentPresonSignDate
              );
            } else {
              this.firstSave = true;
            }
          } else {
            //第一次提交
            this.firstSave = true;
          }
        });
    }
  }
};
</script>


