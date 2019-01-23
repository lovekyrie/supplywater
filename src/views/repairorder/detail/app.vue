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
    .ivu-form-item {
      label {
        text-align: left;
      }
    }
    .ivu-date-picker {
      width: 100%;
    }
    h3{
      margin-bottom: 20px;
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
  }
  > div {
    padding: 10px 15px;
    line-height: 0.3rem;
    font-size: 12px;
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
  }
}
</style>

<template>
  <div id="container">
    <myHeader :title="title"></myHeader>
    <div class="main">
      <div>
        <p>设备编号：{{repInfo.deviceCd}}</p>
        <p>小区名称：{{repInfo.phNm}}</p>
        <p>设备名称：{{repInfo.deviceNm}}</p>
      </div>
      <h3>维修申请</h3>
      <div>
        <p>维修单号：{{repInfo.billCode}}</p>
        <p>申请时间：{{repInfo.applicationTm}}</p>
        <p>申请单位：{{repInfo.applicantUnitNm}}</p>
        <p>申请人：{{repInfo.proposer}}</p>
        <p>联系电话：{{repInfo.mob }}</p>
        <p>维修单位：{{repInfo.repairUnitNm}}</p>
        <p>预算费用：{{repInfo.estimatedCost}}</p>
        <p>故障描述：{{repInfo.diagnosis}}</p>
      </div>

      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <h3>维修过程</h3>
        <FormItem label="维修级别：" prop="repairLevel"  >
          <Input v-model="formValidate.repairLevel" :disabled="isOver"></Input>
        </FormItem>
        <FormItem label="故障类型：" prop="faultType">
          <Input v-model="formValidate.faultType" :disabled="isOver"></Input>
        </FormItem>
        <FormItem label="维修人员：" prop="serviceman">
          <Input v-model="formValidate.serviceman" :disabled="isOver"></Input>
        </FormItem>
        <FormItem label="维修状态：" prop="statCd">
          <Select v-model="formValidate.statCd" :disabled="isOver">
            <Option v-for="item in treatStateList" :value="item.cd" :key="item.cd">{{item.nm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="完成时间："  prop="complateTm">
          <Row>
            <Col span="11">
              <FormItem>
                <DatePicker type="date" v-model="formValidate.complateTm" :disabled="isOver"></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="维修用时（小时）：" prop="repairUsedTm">
          <Input type="number" v-model="formValidate.repairUsedTm" :disabled="isOver"></Input>
        </FormItem>
        <FormItem label="维修费用（元）：" prop="repairCost">
          <Input v-model="formValidate.repairCost" :disabled="isOver"></Input>
        </FormItem>
        <FormItem label="故障分析及工作明细：" prop="report">
          <Input v-model="formValidate.report" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :disabled="isOver"></Input>
        </FormItem>
        <h3>更换配件</h3>
        <FormItem label="是否更换配件" prop="replaceFittingCd">
          <RadioGroup v-model="formValidate.replaceFittingCd" disabled>
            <Radio label="10000.150">
              <span>是</span>
            </Radio>
            <Radio label="10000.160">
              <span>否</span>
            </Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="配件名称:" prop="stockNm">
          <Input  v-model="repInfo.stockNm" disabled></Input>
        </FormItem>

        <FormItem label="规格型号:" prop="stockSpec">
          <Input  v-model="repInfo.stockSpec" disabled></Input>
        </FormItem>

        <FormItem label="品牌:" prop="stockBrand">
          <Input  v-model="repInfo.stockBrand" disabled></Input>
        </FormItem>



        <!-- <FormItem  v-if="formValidate.replaceFittingCd=='10000.150'"  label="配件名称"  prop="deviceCd" >
          <Select placeholder="请输入关键字"   v-model="formValidate.deviceCd"  filterable  @on-change="">
            <Option  v-for="item in replaceList"  :value="item.stockManagePk"  >
              {{item.deviceNm}},{{item.deviceSpec}},【{{item.deviceBrand}}】
            </Option>
          </Select>
        </FormItem> -->

        <!-- <table>
          <thead>
            <tr>
              <th>配件名称</th>
              <th>规格型号</th>
              <th>品牌</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in repairStockRoList" :key="index">
              <td>{{item.deviceNm}}</td>
              <td>{{item.deviceSpec}}</td>
              <td>{{item.deviceBrand}}</td>
            </tr>
           <tr>
           </tr>
          </tbody>
        </table> -->

        <h3>反馈信息</h3>
        <FormItem label="客户评价：" prop="clientEvel">
          <Input v-model="formValidate.clientEvel"></Input>
        </FormItem>
        <FormItem label="详细意见：" prop="option">
          <Input v-model="formValidate.option" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')" :disabled="isOver">提交</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px" :disabled="isOver">重置</Button>
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
      title: "设备维修详情",
      isOver:false,
      ipPk: "",
      repInfo: {},
      replaceList:[],
      treatStateList: [],
      repairStockRoList: [],
      formValidate: {
        replaceFittingCd:'',
        deviceCd:'',
        repairLevel: "",
        faultType: "",
        serviceman: "",
        statCd: "",
        complateTm: "",
        repairUsedTm: 0,
        repairCost: 0,
        report: "",
        replaceFittingNm: "",
        clientEvel: "",
        option: ""
      },
       modalValidate:{
        deviceCd: "",
        deviceNm: "",
        deviceSpec: "",
        deviceBrand: "",
        stockNum: "",
        stockManagePk: ""
      },
      ruleValidate: {
        repairLevel: [ { required: true, message: "请输入维修级别", trigger: "blur" } ],
        faultType: [ {required: true, message: "请输入故障类型", trigger: "blur" }   ],
        serviceman: [{ required: true, message: "请输入维修人员", trigger: "blur" } ],
        statCd: [{ required: true, message: "请选择维修状态", trigger: "change" }],
        complateTm:[ { required: true ,type:"date",message:"请输入维修用时（小时）",trigger:"blur"}],
        //repairUsedTm:[ { required: true ,type:"number",message:"请输入维修用时（小时）",trigger:"blur"}],
        //repairCost:[ { required: true ,type:"number",message:"请输入维修费用（元）",trigger:"blur"}],
        report: [
          {
            required: true,
            message: "请输入故障分析及工作明细",
            trigger: "blur"
          }
        ],
        replaceFittingNm: [
          { required: true, message: "请选择是否更换配件", trigger: "change" }
        ],
        clientEvel: [
          { required: true, message: "请输入客户评价", trigger: "blur" }
        ],
        option: [
          { required: true, message: "请输入详细意见", trigger: "blur" }
        ]
      },
       ruleModalValidate:{
        deviceCd: [{ required: true, message: "请选择配件编号", trigger: "change" }],
        deviceNm: [{ required: true, message: "请输入配件名称", trigger: "blur" }],
        deviceSpec: [{ required: true, message: "请输入规格型号", trigger: "blur" }],
        deviceBrand: [{ required: true, message: "请输入品牌", trigger: "blur" }],
        stockNum: [{ required: true, message: "请输入数量", trigger: "blur" }],
      }
    };
  },
  components: {
    Loading,
    myHeader
  },
  mounted() {
    this.ipPk = this.until.getQueryString("ipPk");
    this.getInfo();
    this.getTreatStateList();
    this.getDeviceCdList()
  },
  methods: {
    getInfo() {
      this.until.get("/ph/deviceRepair/info/" + this.ipPk).then(res => {
        this.repInfo = res.data;
        console.log(this.repInfo);
       // this.formValidate.deviceCd = this.repInfo.stockId;
       this.formValidate.replaceFittingCd = this.repInfo.replaceFittingCd;
        var a = {
            deviceNm:this.repInfo.stockNm,
            deviceSpec:this.repInfo.stockSpec,
            deviceBrand:this.repInfo.stockBrand,
            stockManagePk:this.repInfo.stockId,
            stockNum:1,
        }
        this.repairStockRoList.push(a)
        
        if (this.repInfo.statNm === '已完成' || this.repInfo.statNm === '已结束' ) {
          let query = new this.Query();
          query.buildWhereClause("deviceRepairPk",this.repInfo.deviceRepairPk,"EQ");
          let param = query.getParam();
           this.until.get("/ph/repairProcess/list",param).then(res => {
            console.log(res.data); 
            this.formValidate = res.data.items[0]
            this.formValidate.replaceFittingCd = this.repInfo.replaceFittingCd;
            this.formValidate.statCd = this.repInfo.statCd;
            this.isOver=true


      });
    }



      });
      
      
    
    
  


    },
    getTreatStateList() {
      this.until.get("/general/cat/listByPrntCd?prntCd=30020").then(res => {
        if (res.status === "200") {
          this.treatStateList = res.data.items;
          this.treatStateList=this.treatStateList.filter(item=>{
            return item.cd==='30020.180' || item.cd==='30020.190'
          })
        }
      });
    },
    //配件编号
    getDeviceCdList(){
      this.until.get("/ph/stockManage/list").then(res => {
        if (res.status === "200") {
          this.replaceList = res.data.items;
        }
      });
    },

    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let myDate = this.until.formatDate(this.formValidate.applicationTm);
          this.formValidate.applicationTm = myDate.year + "-" + myDate.month + "-" + myDate.day;
    
           this.repInfo.repairStockRoList=this.repairStockRoList;
          //维修单号 后端生成
          Object.assign(this.repInfo, this.formValidate);
          this.until
            .postData("/ph/repairProcess/edit", JSON.stringify(this.repInfo))
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
    }
  }
};
</script>


