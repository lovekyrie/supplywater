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
  .ivu-form {
    padding: 20px 25px 0 15px;
    .ivu-date-picker {
      width: 100%;
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
  table {
    margin-bottom: 30px;
    width: 100%;
    background: #ffffff;
    border: 1px solid #e1e1e1;
    thead {
      tr {
        display: flex;
        flex-flow: row nowrap;
        th {
          padding: 10px 0;
          color: #666666;
          font-weight: normal;
          text-align: center;
          &:nth-of-type(1),
          &:nth-of-type(5) {
            width: 20%;
          }
          &:nth-of-type(3) {
            width: 30%;
          }
          &:nth-of-type(2n) {
            width: 10%;
          }
          &:not(:nth-last-of-type(1)) {
            border-right: 1px solid #e1e1e1;
            border-bottom: 1px solid #e1e1e1;
          }
          &:nth-last-of-type(1) {
            border-bottom: 1px solid #e1e1e1;
          }
        }
      }
    }
    tbody {
      tr {
        display: flex;
        flex-flow: row nowrap;
        &:nth-last-of-type(1) {
          margin-left: 50%;
          .add-btn {
            width: auto;
            border-bottom: 0;
            button {
              padding: 0 15px;
            }
          }
        }
        td {
          padding: 10px 0;
          color: #666666;
          font-weight: normal;
          text-align: center;
          line-height: 3;
          &:nth-of-type(1),
          &:nth-of-type(5) {
            width: 20%;
          }
          &:nth-of-type(3) {
            width: 30%;
          }
          &:nth-of-type(2n) {
            width: 10%;
          }
          &:not(:nth-last-of-type(1)) {
            border-right: 1px solid #e1e1e1;
            border-bottom: 1px solid #e1e1e1;
          }
          &:nth-last-of-type(1) {
            border-bottom: 1px solid #e1e1e1;
          }
          > div {
            input {
              border: 0;
              text-align: center;
            }
            > div {
              border: 0;
            }
          }
        }
      }
    }
  }
}

.ivu-modal {
  width: 70% !important;
  margin: auto;
}

.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>

<template>
  <div id="container">
    <myHeader :title="title"></myHeader>
    <div class="main">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="泵房名称" prop="waterBoxNm">
          <Select
            placeholder="请输入关键字"
            v-model="formValidate.waterBoxNm"
            filterable
            remote
            :remote-method="remotePhQuery"
            @on-change="remoteQuery()"
          >
            <Option v-for="item in phList" :value="item.estateNm" :key="item.phCd">{{item.estateNm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="泵房编号" prop="waterBoxCd">
          <Input v-model="formValidate.waterBoxCd"></Input>
        </FormItem>
        <FormItem label="清洗容积(吨)" prop="volume">
          <Input v-model="formValidate.volume"></Input>
        </FormItem>
        <FormItem label="清洗时间">
          <Row>
            <Col span="6">
              <FormItem prop="cleanoutTm1">
                <DatePicker type="date" v-model="formValidate.cleanoutTm1"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem prop="cleanoutTm2">
                <TimePicker format="HH:mm" type="time" v-model="formValidate.cleanoutTm2"></TimePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="清洗人员" prop="cleanoutOperator">
          <Select v-model="formValidate.cleanoutOperator" filterable>
            <Option v-for="item in applyUnitList" :value="item.cd" :key="item.sysCatPk">{{item.nm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="水箱排水时间">
          <Row>
            <Col span="6">
              <FormItem prop="drainOffFromTm">
                <TimePicker type="time" v-model="formValidate.drainOffFromTm"></TimePicker>
              </FormItem>
            </Col>
            <Col span="3" style="text-align:center;">起，到</Col>
            <Col span="6">
              <FormItem prop="drainOffToTm">
                <TimePicker type="time" v-model="formValidate.drainOffToTm"></TimePicker>
              </FormItem>
            </Col>
            <Col span="3" style="text-align:center;">止，共</Col>
            <Col span="6">
              <FormItem prop="drainOffAmtTm">
                <Input v-model="formValidate.drainOffAmtTm"></Input>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="水箱消毒时间">
          <Row>
            <Col span="6">
              <FormItem prop="cleanoutFormTm">
                <TimePicker type="time" v-model="formValidate.cleanoutFormTm"></TimePicker>
              </FormItem>
            </Col>
            <Col span="3" style="text-align:center;">起，到</Col>
            <Col span="6">
              <FormItem prop="cleanoutToTm">
                <TimePicker type="time" v-model="formValidate.cleanoutToTm"></TimePicker>
              </FormItem>
            </Col>
            <Col span="3" style="text-align:center;">止，共</Col>
            <Col span="6">
              <FormItem prop="cleanoutAmtTm">
                <Input v-model="formValidate.cleanoutAmtTm"></Input>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="消毒剂" prop="liquidName">
          <Input v-model="formValidate.liquidName"></Input>
        </FormItem>
        <FormItem label="配置浓度" prop="liquorStrength">
          <Input v-model="formValidate.liquorStrength"></Input>
        </FormItem>
        <FormItem label="配置人员" prop="preparationer">
          <Select v-model="formValidate.preparationer" filterable>
            <Option v-for="item in applyUnitList" :value="item.cd" :key="item.sysCatPk">{{item.nm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="监督人员" prop="supervisor">
          <Select v-model="formValidate.supervisor" filterable>
            <Option v-for="item in applyUnitList" :value="item.cd" :key="item.sysCatPk">{{item.nm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="浊度（NTU）" prop="turbidity">
          <Input v-model="formValidate.turbidity"></Input>
        </FormItem>
        <FormItem label="余氯（mg/l）" prop="residualChlorine">
          <Input v-model="formValidate.residualChlorine"></Input>
        </FormItem>
        <FormItem label="水箱注水时间">
          <Row>
            <Col span="6">
              <FormItem prop="waterInjectionFromTm">
                <TimePicker type="time" v-model="formValidate.waterInjectionFromTm"></TimePicker>
              </FormItem>
            </Col>
            <Col span="3" style="text-align:center;">起，到</Col>
            <Col span="6">
              <FormItem prop="waterInjectionToTm">
                <TimePicker type="time" v-model="formValidate.waterInjectionToTm"></TimePicker>
              </FormItem>
            </Col>
            <Col span="3" style="text-align:center;">止，共</Col>
            <Col span="6">
              <FormItem prop="waterInjectionAmtTm">
                <Input v-model="formValidate.waterInjectionAmtTm"></Input>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="完成时间">
          <Row>
            <Col span="6">
              <FormItem prop="checkTime1">
                <DatePicker type="date" v-model="formValidate.checkTime1"></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem prop="checkTime2">
                <TimePicker type="time" v-model="formValidate.checkTime2"></TimePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem label="清洗前照片">
          <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/"
            style="display: inline-block;width:58px;"
          >
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="清洗后照片">
          <div class="demo-upload-list" v-for="item in afterUploadList">
            <template v-if="item.status === 'finished'">
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/"
            style="display: inline-block;width:58px;"
          >
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </FormItem>
        <h3>水箱清洗工作建议与评估</h3>
        <FormItem prop="adviseAssess">
          <Input
            v-model="formValidate.adviseAssess"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
          ></Input>
        </FormItem>
        <FormItem label="记录人" prop="recorder">
          <Select v-model="formValidate.recorder" filterable>
            <Option v-for="item in applyUnitList" :value="item.cd" :key="item.sysCatPk">{{item.nm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="项目负责人" prop="principal">
          <Input v-model="formValidate.principal"></Input>
        </FormItem>
        <FormItem v-show="type==='edit'">
          <!-- <Button  type="primary" f  @click="handleSubmit('formValidate')" >提交</Button> -->
          <Button type="primary" @click="add()">提交</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { XButton, Popup, Search, Picker, Datetime } from "vux";
import Loading from "../../../hero/components/loading";
import myHeader from "@/components/myHead";
export default {
  data() {
    return {
      title: "水池（箱）清洗消毒记录表",
      imgName: "",
      visible: false,
      uploadList: [],
      afterUploadList: [],
      type: "",
      loading: false,
      loading1: false,
      phList: [],
      applyUnitList: [],
      formValidate: {
        waterBoxCd: "", //泵房名称
        waterBoxNm: "",
        volume: "",
        cleanoutTm: "",
        cleanoutOperator: "",
        drainOffFromTm: "",
        drainOffToTm: "",
        drainOffAmtTm: "",
        cleanoutFormTm: "",
        cleanoutToTm: "",
        cleanoutAmtTm: "",
        liquidName: "",
        liquorStrength: "",
        preparationer: "",
        supervisor: "",
        turbidity: "",
        residualChlorine: "",
        waterInjectionFromTm: "",
        waterInjectionToTm: "",
        waterInjectionAmtTm: "",
        checkTime: "",
        clearImgPre: "",
        clearImgPost: "",
        adviseAssess: "",
        recorder: "",
        principal: ""
      },
      ruleValidate: {
        billCode: [
          { required: true, message: "请输入维修单号", trigger: "blur" }
        ],
        applicationTm: [
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
    myHeader
  },
  mounted() {
    this.type = this.until.getQueryString("type");
    this.uploadList = this.$refs.upload.fileList;
    this.getSelect();
    this.getDeviceBigList();
  },
  methods: {
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      file.url =
        "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      file.name = "7eb99afb9d5f317c912f08b5212fd69a";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    },
    addRow() {},

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
    remoteQuery(val) {
      this.loading1 = true;
      let query = new this.Query();
      if (val) {
        query.buildWhereClause("deviceCd", val, "LK");
      } else {
        if (this.formValidate.estateNm) {
          query.buildWhereClause("estateNm", this.formValidate.estateNm, "EQ");
        }
        if (this.deviceBigPk) {
          query.buildWhereClause("deviceBcatCd", this.deviceBigPk, "EQ");
        }
        if (this.deviceSmallPk) {
          query.buildWhereClause("deviceScatCd", this.deviceSmallPk, "EQ");
        }
        if (this.deviceDPk) {
          query.buildWhereClause("deviceDcatCd", this.deviceDPk, "EQ");
        }
        if (this.deviceNm) {
          query.buildWhereClause("deviceNm", this.deviceNm, "EQ");
        }
      }
      let param = query.getParam();
      setTimeout(() => {
        this.until.get("/ph/device/list", param).then(res => {
          if (res.status === "200") {
            this.equipmentList = res.data.items;
          } else {
            this.equipmentList = [];
          }
        });
      }, 200);
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
        applicationTm: this.formValidate.applicationTm, //申请时间
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
      this.until
        .get("/general/cat/listByPrntCd", { prntCd: "30010.400" })
        .then(res => {
          if (res.status === "200") {
            this.applyUnitList = res.data.items;
          }
        });
      //配件编号
      this.until.get("/ph/stockManage/list").then(res => {
        if (res.status === "200") {
          this.replaceList = res.data.items;
        }
      });
    },
    selectOpt(e) {
      console.log(e);
      this.device = e;
    },
    selectPh(e) {
      this.remoteQuery();
    },
    selectBig(e) {
      this.until.get("/general/cat/listByPrntCd", { prntCd: e }).then(res => {
        if (res.status === "200") {
          this.deviceSmallList = res.data.items;
        }
      });
      this.remoteQuery();
    },
    //选择设备小类 赋值设备子类
    selectSamll(e) {
      this.until.get("/general/cat/listByPrntCd", { prntCd: e }).then(res => {
        if (res.status === "200") {
          this.deviceDList = res.data.items;
        }
      });
      this.remoteQuery();
    },
    //选择设备子类 赋值设备名称
    selectDcat(e) {
      this.until.get("/general/cat/listByPrntCd", { prntCd: e }).then(res => {
        if (res.status === "200") {
          this.deviceNms = res.data.items;
        }
      });
      this.remoteQuery();
    },
    //获取设备大类
    getDeviceBigList() {
      this.until.get("/general/cat/listByPrntCd", { prntCd: 500.1 }).then(
        res => {
          if (res.status === "200") {
            this.deviceBigList = res.data.items;
          } else {
            this.deviceBigList = [];
          }
        },
        err => {
          this.deviceBigList = [];
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


