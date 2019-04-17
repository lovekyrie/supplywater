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
  .content {
    padding-bottom: 0.15rem;
    p {
      padding-left: 15px;
      line-height: 0.3rem;
    }
  }
  .ivu-form {
    > .ivu-form-item {
      padding-left: 15px;
      padding-right: 30px;
      .ivu-date-picker {
        width: 100%;
      }
    }
    h3 {
      width: 100%;
      font-size: 0.15rem;
      text-indent: 15px;
      background: #f0f0f0;
      border-top: 1px solid #e1e1e1;
      border-bottom: 1px solid #e1e1e1;
      height: 0.4rem;
      line-height: 0.4rem;
      margin-bottom: 15px;
    }
  }
}
</style>

<template>
  <div id="container">
    <myHeader :title="title"></myHeader>
    <div class="main">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <h3>工单信息</h3>
        <div class="content">
          <p>工单来源名称：{{formValidate.dispatchFromNm}}</p>
          <p>部门名称：{{formValidate.bmNm}}</p>
          <p>派单时间：{{formValidate.sendTm}}</p>
          <p>处理时限：{{formValidate.dealLimit}}</p>
          <p>反映人：{{formValidate.reportMan}}</p>
          <p>反映人电话：{{formValidate.reportPhone }}</p>
          <p>故障现象分类：{{formValidate.proLvNm}}</p>
          <p>行政区域：{{formValidate.districtNm}}</p>
          <p>泵房名称：{{formValidate.estateNm}}</p>
          <p>问题详情：{{formValidate.proContent}}</p>
          <p>接单备注：{{formValidate.receiveMsg}}</p>
        </div>
        <h3 v-show="type2=='3'|| type=='visit'">回执信息</h3>
        <div v-show="type2=='3'|| type=='visit'" class="content">
          <p>确认初次时间：{{formValidate.arriveTm }}</p>
          <p>最终确认时间：{{formValidate.startTm }}</p>
        </div>
        <h3 v-show="type2=='3'|| type=='visit'">处理信息</h3>
        <div v-show="type2=='3'|| type=='visit'" class="content">
          <p>接单时间：{{formValidate.receiveTm }}</p>
          <p>工单完成时间：{{formValidate.endTm}}</p>
          <p>接单人员：{{formValidate.receiveMan}}</p>
          <p>接单人电话：{{formValidate.receivePhone}}</p>
          <p>故障类型：{{formValidate.proTypeNm}}</p>
          <p>故障原因：{{formValidate.proReason}}</p>
          <p>处理记录：{{formValidate.recordMsg}}</p>
        </div>

        <div v-show="type=='visit'">
          <h3>回访信息</h3>
          <FormItem label="回访时间">
            <Row>
              <Col span="11">
                <FormItem prop="date">
                  <DatePicker type="date" v-model="formValidate.date"></DatePicker>
                </FormItem>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
                <FormItem prop="time">
                  <TimePicker type="time" v-model="formValidate.time"></TimePicker>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="人员名称" prop="userNm">
            <Input v-model="formValidate.userNm"></Input>
          </FormItem>
          <FormItem label="回访情况" prop="returnContent">
            <Input v-model="formValidate.returnContent"></Input>
          </FormItem>
          <FormItem label="回访结果" prop="returnResult">
            <Input v-model="formValidate.returnResult"></Input>
          </FormItem>
          <FormItem label="客户满意度" prop="csi">
            <Select v-model="formValidate.csi">
              <Option v-for="item in csi" :value="item" :key="item">{{item}}</Option>
            </Select>
          </FormItem>
        </div>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')" v-if="type=='visit'">提交</Button>
          <Button type="primary" @click="handleSubmit2()" v-else>提交</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import Loading from "../../../hero/components/loading";
import myHeader from "../components/myHead";
export default {
  data() {
    return {
      title: "工单指派编辑",
      ipPk: "",
      type: "", //编辑类型，确认还是回访
      type2: "", //初次确认还是最终确认
      token: "",
      myDate: {
        date: "",
        time: ""
      },
      csi: ["满意", "一般", "不满意"],
      dispatchFromNm: [
        {
          value: "",
          label: ""
        }
      ],
      formValidate: {
        date: "",
        time: "",
        dispatchFromNm: "", //工单来源
        bmNm: "", //部门
        sendTm: "", //派单间日期
        dealLimit: "", //处理时限
        reportMan: "", //反映人
        reportPhone: "", //反映人电话号码
        proLvNm: "", //故障现象
        districtNm: "", //行政区域
        address: "", //泵房地址
        proContent: "", //问题详情
        receiveMsg: "", //接单备注

        //开始时间不确定
        //结束时间不确定
        proTypeNm: "", //故障类型
        proReason: "", //故障原因
        recordMsg: "", //处理记录

        userNm: "", //人员名称
        returnTm: "", //回访时间
        returnContent: "", //回访情况
        returnResult: "", //回访结果
        csi: "" //客户满意度
      },
      ruleValidate: {
        userNm: [
          { required: true, message: "请输入人员名称", trigger: "blur" }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "请选择回访日期",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "请选择回访时间",
            trigger: "change"
          }
        ],
        receiveMsg: [
          { required: true, message: "请输入联系电话", trigger: "blur" }
        ],
        returnContent: [
          { required: true, message: "请输入回访情况", trigger: "blur" }
        ],
        returnResult: [
          { required: true, message: "请输入回访结果", trigger: "blur" }
        ],
        csi: [
          { required: true, message: "请选择客户满意度", trigger: "change" }
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
    this.ipPk = this.until.getQueryString("ipPk");
    this.token = this.until.loGet("appToken");
    this.getInfo();
    console.log(this.until.getToken());
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.formValidate.dealStatus = 4;

          this.until
            .postData(
              "/ph/dispatchSend/edit",
              JSON.stringify(this.formValidate),
              this.token
            )
            .then(res => {
              if (res.status == 200) {
                this.$Message.success("提交成功!");
                setTimeout(() => {
                  window.location.href = "list.html";
                }, 1500);
              }
            });
        } else {
          this.$Message.error("请填写完整信息！");
        }
      });
    },
    handleSubmit2() {
      this.formValidate.dealStatus = this.formValidate.dealStatus == 0 ? 1 : 6;

      console.log(JSON.stringify(this.formValidate));
      this.until
        .postData("/ph/dispatchSend/edit", JSON.stringify(this.formValidate))
        .then(res => {
          if (res.status == 200) {
            this.$Message.success("提交成功!");
            setTimeout(() => {
              window.location.href = "list.html";
            }, 1500);
          }
        });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    getInfo() {
      this.until.get("/ph/dispatchSend/info/" + this.ipPk).then(res => {
        this.formValidate = res.data;
        this.type2 = this.formValidate.dealStatus;
      });
    }
  }
};
</script>


