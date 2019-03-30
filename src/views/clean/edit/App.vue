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
  width: 100px;
  height: 100px;
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
      <Form ref="formValidate" :model="formValidate" :label-width="100">
        <FormItem label="泵房名称" prop="waterBoxNm">
          <Input v-model="formValidate.waterBoxNm"></Input>
        </FormItem>
        <FormItem label="泵房编号" prop="waterBoxCd">
          <Input v-model="formValidate.waterBoxCd"></Input>
        </FormItem>
        <FormItem label="清洗容积(吨)" prop="volume">
          <Input v-model="formValidate.volume"></Input>
        </FormItem>
        <FormItem label="清洗时间" prop="cleanoutTm">
          <datetime v-model="formValidate.cleanoutTm" format="YYYY-MM-DD HH:mm"></datetime>
        </FormItem>
        <FormItem label="清洗人员" prop="cleanoutOperator">
          <Select v-model="formValidate.cleanoutOperator" filterable>
            <Option
              v-for="(item,index) in regionUserList"
              :value="item.nkNm"
              :key="index"
            >{{item.nkNm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="水箱排水时间">
          <Row>
            <Col span="6">
              <FormItem prop="drainOffFromTm">
                <datetime v-model="formValidate.drainOffFromTm" format="YYYY-MM-DD HH:mm"></datetime>
              </FormItem>
            </Col>
            <Col span="3" style="text-align:center;">起，到</Col>
            <Col span="6">
              <FormItem prop="drainOffToTm">
                <datetime
                  @on-confirm="confirmDrainOffToTm"
                  v-model="formValidate.drainOffToTm"
                  format="YYYY-MM-DD HH:mm"
                ></datetime>
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
                <datetime v-model="formValidate.cleanoutFormTm" format="YYYY-MM-DD HH:mm"></datetime>
              </FormItem>
            </Col>
            <Col span="3" style="text-align:center;">起，到</Col>
            <Col span="6">
              <FormItem prop="cleanoutToTm">
                <datetime
                  @on-confirm="confirmCleanoutToTm"
                  v-model="formValidate.cleanoutToTm"
                  format="YYYY-MM-DD HH:mm"
                ></datetime>
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
            <Option
              v-for="(item,index) in regionUserList"
              :value="item.nkNm"
              :key="index"
            >{{item.nkNm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="监督人员" prop="supervisor">
          <Select v-model="formValidate.supervisor" filterable>
            <Option
              v-for="(item,index) in regionUserList"
              :value="item.nkNm"
              :key="index"
            >{{item.nkNm}}</Option>
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
                <datetime v-model="formValidate.waterInjectionFromTm" format="YYYY-MM-DD HH:mm"></datetime>
              </FormItem>
            </Col>
            <Col span="3" style="text-align:center;">起，到</Col>
            <Col span="6">
              <FormItem prop="waterInjectionToTm">
                <datetime
                  @on-confirm="confirmWaterInjectionToTm"
                  v-model="formValidate.cleanoutToTm"
                  format="YYYY-MM-DD HH:mm"
                ></datetime>
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
        <FormItem label="完成时间" prop="checkTime">
          <datetime v-model="formValidate.checkTime" format="YYYY-MM-DD HH:mm"></datetime>
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
            :max-size="10240"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            action="/general/file/uploadLocal"
            style="display: inline-block;width:95px;"
          >
            <div style="width: 95px;height:95px;line-height: 95px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="清洗后照片">
          <div class="demo-upload-list" v-for="item in afterUploadList">
            <template v-if="item.status === 'finished'">
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="afterRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
            ref="afterupload"
            :show-upload-list="false"
            :on-success="afterSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="10240"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            action="/general/file/uploadLocal"
            style="display: inline-block;width:95px;"
          >
            <div style="width: 95px;height:95px;line-height: 95px;">
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
            <Option
              v-for="(item,index) in regionUserList"
              :value="item.nkNm"
              :key="index"
            >{{item.nkNm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="项目负责人" prop="principal">
          <Input v-model="formValidate.principal"></Input>
        </FormItem>
        <FormItem>
          <!-- <Button  type="primary" f  @click="handleSubmit('formValidate')" >提交</Button> -->
          <Button type="primary" @click="add()">提交</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Datetime } from "vux";
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
      cleanoutjobPk: "",
      loading: false,
      loading1: false,
      phList: [],
      regionUserList: [],
      firstSave: true,
      clearImgPreList: [],
      clearImgPostList: [],
      token: "",
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
      }
    };
  },
  components: {
    Loading,
    myHeader,
    Datetime
  },
  mounted() {
    this.token = this.until.loGet("appToken");
    this.cleanoutjobPk = this.until.getQueryString("cleanoutjobPk");
    this.uploadList = this.$refs.upload.fileList;
    this.afterUploadList = this.$refs.afterupload.fileList;
    this.getSelect();
    //得到审核表数据信息
    this.getCleanOutJob();
    //得到清洗报表数据
    this.getCleanOutReport();
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
    afterRemove(file) {
      const fileList = this.$refs.afterupload.fileList;
      this.$refs.afterupload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      file.url = res.data;
      file.name = "1223";
    },
    afterSuccess(res, file) {
      file.url = res.data;
      file.name = "1223";
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

    add() {
      if (this.firstSave) {
        this.formValidate.cleanoutReportPk = null;
        this.formValidate.cleanoutjobPk = this.cleanoutjobPk;
      }

      //deal with datetime
      let timeArr = [
        "cleanoutTm",
        "drainOffFromTm",
        "drainOffToTm",
        "cleanoutFormTm",
        "cleanoutToTm",
        "waterInjectionFromTm",
        "waterInjectionToTm",
        "checkTime"
      ];

      time.timeArr.forEach(item => {
        this.formValidate[item] =
          this.formValidate[item] && new Date(this.formValidate[item]);
      });
      this.clearImgPreList = [];
      this.uploadList.forEach(item => {
        this.clearImgPreList.push(item.url);
      });

      this.clearImgPostList = [];
      this.afterUploadList.forEach(item => {
        this.clearImgPostList.push(item.url);
      });
      this.formValidate.clearImgPre = this.clearImgPreList.join(",");
      this.formValidate.clearImgPost = this.clearImgPostList.join(",");
      console.log(this.formValidate.drainOffFromTm);
      this.until
        .postData(
          "/inspect-api/cleanoutReport/submit",
          JSON.stringify(this.formValidate),
          this.token
        )
        .then(res => {
          if (res.code === 0) {
            this.$Modal.confirm({
              title: "提交成功",
              onOk: () => {
                this.$Message.info("提交成功");
                window.location.href = "list.html";
              },
              onCancel: () => {
                window.location.href = "pendinglist.html";
              }
            });
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
    getCleanOutJob() {
      let param = {
        cleanoutjobPk: this.cleanoutjobPk,
        token: this.token
      };

      this.until.get("/inspect-api/cleanout/getCleanJob", param).then(res => {
        if (res.code === 0) {
          this.formValidate.waterBoxNm = res.data.waterBoxNm;
          this.formValidate.waterBoxCd = res.data.waterBoxCd;
          this.formValidate.volume = res.data.volume;
        }
      });
    },
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
              this.firstSave = false;
              Object.assign(this.formValidate, res.data);
            } else {
              this.firstSave = true;
            }
          } else {
            this.firstSave = true;
          }
        });
    },
    confirmCleanoutToTm() {
      this.formValidate.cleanoutAmtTm = this.calDistanceTime(
        this.formValidate.cleanoutFormTm,
        this.formValidate.cleanoutToTm
      );
    },
    confirmDrainOffToTm() {
      this.formValidate.drainOffAmtTm = this.calDistanceTime(
        this.formValidate.drainOffFromTm,
        this.formValidate.drainOffToTm
      );
    },
    confirmWaterInjectionToTm() {
      this.formValidate.waterInjectionAmtTm = this.calDistanceTime(
        this.formValidate.waterInjectionFromTm,
        this.formValidate.waterInjectionToTm
      );
    },
    calDistanceTime(fr, to) {
      let offset = new Date(to).getTime() - new Date(fr).getTime();
      //算时间
      let hour = Math.floor(offset / 1000 / 60 / 60);
      let timeRemain = offset % (1000 * 60 * 60);
      let mint = Math.floor(timeRemain / 1000 / 60);
      return `${hour}时${mint}分`;
    }
  }
};
</script>


