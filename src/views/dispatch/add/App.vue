<style lang="less" scoped>
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
    .ivu-date-picker,
    .el-select {
      width: 100%;
    }
  }
}
</style>

<template>
  <div id="container">
    <myHeader :title="title"></myHeader>
    <div class="main">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="工单来源" prop="dispatchFromCd">
          <el-select v-model="formValidate.dispatchFromCd" placeholder="请选择">
            <el-option
              v-for="item in dispatchFromNm"
              :value="item.cd"
              :key="item.cd"
              :label="item.nm"
            ></el-option>
          </el-select>
        </FormItem>
        <FormItem label="部门" prop="bmCd">
          <el-select v-model="formValidate.bmCd" placeholder="请选择">
            <el-option v-for="item in bmNm" :value="item.cd" :key="item.cd" :label="item.nm"></el-option>
          </el-select>
        </FormItem>
        <FormItem label="派单时间">
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
        <FormItem label="处理时限" prop="dealLimit">
          <Input v-model="formValidate.dealLimit"></Input>
        </FormItem>
        <FormItem label="反映人" prop="reportMan">
          <Input v-model="formValidate.reportMan"></Input>
        </FormItem>
        <FormItem label="反映电话" prop="reportPhone">
          <Input v-model="formValidate.reportPhone"></Input>
        </FormItem>
        <FormItem label="故障现象分类" prop="proLvCd">
          <Select v-model="formValidate.proLvCd">
            <Option v-for="item in proLvNm" :value="item.cd" :key="item.cd">{{item.nm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="行政区域" prop="districtCd">
          <Select v-model="formValidate.districtCd">
            <Option v-for="item in districtNm" :value="item.cd" :key="item.cd">{{item.nm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="泵房名称" prop="estatePk">
          <Select
            placeholder="请输入关键字"
            v-model="formValidate.estatePk"
            filterable
            remote
            :remote-method="remotePhQuery"
            @on-change="remoteQuery()"
          >
            <Option v-for="item in phList" :value="item.estatePk" :key="item.phCd">{{item.estateNm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="问题详情" prop="proContent">
          <Input
            v-model="formValidate.proContent"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
          ></Input>
        </FormItem>
        <FormItem label="接单备注" prop="receiveMsg">
          <Input v-model="formValidate.receiveMsg"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
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
      title: "新建工单",
      token: "",
      loading1: false,
      phList: [],
      equipmentList: [],
      dispatchFromNm: [], //工单来源
      proLvNm: [], //故障现象
      bmNm: [], //部门
      districtNm: [], //行政区域
      formValidate: {
        date: "",
        time: "",
        dispatchFromCd: "", //工单来源
        bmCd: "", //部门
        sendTm: "", //派单间日期
        dealLimit: "", //处理时限
        reportMan: "", //反映人
        reportPhone: "", //反映人电话号码
        proLvCd: "", //故障现象
        districtCd: "", //行政区域
        estateCd: "", //泵房地址
        proContent: "", //问题详情
        receiveMsg: "" //接单备注
      },
      ruleValidate: {
        dispatchFromNm: [
          { required: true, message: "请选择工单来源", trigger: "change" }
        ],
        bmNm: [{ required: true, message: "请选择部门", trigger: "change" }],
        date: [
          {
            required: true,
            type: "date",
            message: "请选择派单间日期",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "请选择派单时间",
            trigger: "change"
          }
        ],
        dealLimit: [
          { required: true, message: "请输入处理时限", trigger: "blur" }
        ],
        reportMan: [
          { required: true, message: "请输入反映人", trigger: "blur" }
        ],
        reportPhone: [
          { required: true, message: "请输入反映人电话号码", trigger: "blur" }
        ],
        proLvNm: [
          { required: true, message: "请选择故障现象", trigger: "change" }
        ],
        districtNm: [
          { required: true, message: "请选择行政区域", trigger: "change" }
        ],
        address: [
          { required: true, message: "请输入泵房地址", trigger: "blur" }
        ],
        proContent: [
          { required: true, message: "请输入问题详情", trigger: "blur" }
          // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ],
        receiveMsg: [
          { required: true, message: "请输入接单备注", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    Loading,
    myHeader
  },
  mounted() {
    let promise = this.until.login();
    promise.then(res => {
      this.getSelect();
    });
  },
  methods: {
    //提交
    handleSubmit(name) {
      console.log(this.formValidate.date);
      this.$refs[name].validate(valid => {
        if (valid) {
          let myDate = this.until.formatDate(this.formValidate.date);
          this.formValidate.sendTm =
            myDate.year +
            "-" +
            myDate.month +
            "-" +
            myDate.day +
            " " +
            this.formValidate.time;
          this.until
            .postData(
              "/ph/dispatchSend/edit",
              JSON.stringify(this.formValidate)
            )
            .then(res => {
              if (res.status == 200) {
                this.$Message.success("提交成功!");
                setTimeout(() => {
                  window.location.href = "list.html";
                }, 1500);
              } else {
                this.$Message.error(res.message);
              }
            });
        } else {
          this.$Message.error("请填写完整信息！");
        }
      });
    },
    //取消
    handleReset(name) {
      this.$refs[name].resetFields();
    },
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
    //获取选项数据
    getSelect() {
      //工单来源
      this.until.get("/general/cat/listByPrntCd?prntCd=gd120").then(res => {
        if (res.data.items) {
          this.dispatchFromNm = res.data.items;
        }
      });
      //故障
      this.until.get("/general/cat/listByPrntCd?prntCd=gzxx140").then(res => {
        this.proLvNm = res.data.items;
      });
      //部门
      this.until.get("/general/cat/listByPrntCd?prntCd=30010.400").then(res => {
        this.bmNm = res.data.items;
      });
      this.until
        .get("/general/cat/listByPrntCd?prntCd=30010.200.110")
        .then(res => {
          this.bmNm.push(...res.data.items);
        });
      //行政区域
      this.until.get("/general/cat/listByPrntCd?prntCd=70000").then(res => {
        this.districtNm = res.data.items;
      });
    }
  }
};
</script>


