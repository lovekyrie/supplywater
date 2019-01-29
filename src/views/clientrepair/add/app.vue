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
</style>

<template>
  <div id="container">
    <myHeader :title="title"></myHeader>
    <div class="main">
      <Form  ref="formValidate"   :model="formValidate"  :rules="ruleValidate" :label-width="100"  >
        
        <FormItem  label="申请单位"  prop="applicantUnitCd">
          <Select  v-model="formValidate.applicantUnitCd"   filterable >
            <Option   v-for="item in applyUnitList"  :value="item.cd"  :key="item.sysCatPk">{{item.nm}}</Option>
          </Select>
        </FormItem>

        <FormItem label="申请时间">
          <FormItem prop="applicationTm">
            <DatePicker   type="date"  v-model="formValidate.applicationTm"   ></DatePicker>
          </FormItem>
        </FormItem>

        <FormItem   label="申请人"   prop="proposer" >
         <Input v-model="formValidate.proposer"></Input>
        </FormItem>
        
        <FormItem  label="联系电话"   prop="mob" >
          <Input v-model="formValidate.mob"></Input>
         </FormItem>
       
        <FormItem  label="维修单位"  prop="repairUnitCd" > 
          <Select  v-model="formValidate.repairUnitCd"  filterable >
            <Option  v-for="item in applyUnitList"  :value="item.cd"  :key="item.sysCatPk" >{{item.nm}}</Option>
          </Select>
        </FormItem>

        <FormItem  label="泵房名称"   prop="estateNm">
          <Select placeholder="请输入关键字"  v-model="formValidate.estateNm"   filterable  remote
            :remote-method="remotePhQuery"  @on-change="remoteQuery()" >
            <Option
              v-for="item in phList"
              :value="item.estateNm"
              :key="item.phCd"
            >{{item.estateNm}}</Option>
          </Select>
        </FormItem>

        <FormItem  label="设备大类" prop="deviceBigPk">
          <Select  v-model="deviceBigPk"  @on-change="selectBig($event)" >
            <Option  v-for="item in deviceBigList"  :value="item.cd" :key="item.sysCatPk">{{item.nm}}</Option>
          </Select>
        </FormItem>

        <FormItem  label="设备小类"  prop="deviceSmallPk">
          <Select  v-model="deviceSmallPk"   @on-change="selectSamll($event)" >
            <Option  v-for="item in deviceSmallList"  :value="item.cd"  :key="item.sysCatPk">{{item.nm}}</Option>
          </Select>
        </FormItem>

        <FormItem  label="设备子类"  prop="deviceDPk">
          <Select  v-model="deviceDPk"  @on-change="selectDcat($event)" >
            <Option v-for="item in deviceDList" :value="item.cd"  :key="item.sysCatPk">{{item.nm}}</Option>
          </Select>
        </FormItem>

        <FormItem  label="设备名称" prop="deviceNm"  >
          <Select  v-model="deviceNm"  @on-change="remoteQuery()">
            <Option  v-for="item in deviceNms"  :value="item.nm"  :key="item.sysCatPk">{{item.nm}}</Option>
          </Select>
        </FormItem>

        <FormItem  label="设备编号"   prop="devicePk" >
          <Select  v-model="formValidate.devicePk"  filterable remote :remote-method="remoteQuery" @on-change="selectOpt($event)">
            <Option   v-for="item in equipmentList"  :value="item.deviceCd"  :key="item.phDevicePk" >{{item.deviceCd}}</Option>
          </Select>
        </FormItem>
     
        <FormItem label="故障描述"  prop="diagnosis"  >
          <Input  v-model="formValidate.diagnosis"  type="textarea"  :autosize="{minRows: 2,maxRows: 5}"></Input>
        </FormItem>

        <FormItem  label="预算费用"  prop="estimatedCost"  >
          <Input v-model="formValidate.estimatedCost"></Input>
        </FormItem>

        <!-- <h3>更换配件</h3> -->
        <FormItem label="是否更换配件"  prop="replaceFittingCd" >
          <RadioGroup v-model="formValidate.replaceFittingCd">
            <Radio label="10000.150">
              <span>是</span>
            </Radio>
            <Radio label="10000.160">
              <span>否</span>
            </Radio>
          </RadioGroup>
        </FormItem>

        <FormItem  v-if="formValidate.replaceFittingCd=='10000.150'"  label="配件名称"  prop="deviceCd" >
          <Select placeholder="请输入关键字"   v-model="formValidate.deviceCd"  filterable  @on-change="getRepairStock($event)">
            <Option  v-for="item in replaceList"  :value="item.stockManagePk"  >
              {{item.deviceNm}},{{item.deviceSpec}},【{{item.deviceBrand}}】
            </Option>
          </Select>
        </FormItem>
        <!-- <i-table  border   :content="self"  :columns="columns7"  :data="listData"></i-table> -->
  
        <FormItem>
          <!-- <Button  type="primary"   @click="handleSubmit('formValidate')" >提交</Button> -->
          <Button  type="primary"   @click="add()" >提交</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { XButton, Popup, Search, Picker, Datetime } from "vux";
import Loading from "../../../hero/components/loading";
import myHeader from "../components/myHead";
export default {
  data() {
    return {
      title: "设备维修申请",
      loading: false,
      loading1: false,
      equipmentList: [],
      phList: [],
      deviceSmallList: [],
      deviceDList: [],
      deviceBigList: [],
      deviceNms: [],
      applyUnitList: [],
      replaceList: [],
      repairStockRoList: [],
      deviceScatNm: "",
      deviceNm: "",
      deviceBigPk: "",
      deviceSmallPk: "",
      deviceDPk: "",
      part:[],  //配件
      device:[],//设备
      listData:[],//向后台传数据
      formValidate: {
        devicePk:"",
        applicationTm: "", //申请时间
        applicantUnitCd: "", //申请单位
        repairUnitCd: "", //维修单位
        proposer: "", //申请人
        mob: "", //联系电话
        repairUnitCd: "", //维修单位
        estimatedCost: "", //预算费用
        diagnosis: "", //故障描述
        replaceFittingCd: "" ,//是否更换配件
        estateNm:""//泵房名称
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
      },
    };
  },
  components: {
    Loading,
    myHeader
  },
  mounted() {
    this.getSelect();
    this.getDeviceBigList();
  },
  methods: {
    addRow() {
     
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
   
  add(){
     var a = {
        applicantUnitCd: this.formValidate.applicantUnitCd, //申请单位
        applicationTm: this.formValidate.applicationTm, //申请时间
        proposer: this.formValidate.proposer, //申请人
        mob:this.formValidate.mob, //联系电话
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
            .postData(
              "/ph/deviceRepair/edit",
              JSON.stringify(this.listData)
            )
            .then(res => {
              if (res.status == 200) {
                //this.$Message.success("提交成功!");
                this.$Modal.confirm({
                    title: '提交成功',
                    content: '是否继续添加维修申请？',
                    onOk: () => {
                        this.listData = [],
                        this.deviceBigPk='',
                        this.deviceSmallPk='',
                        this.deviceDPk='',
                        this.deviceNm='',
                        this.formValidate.devicePk='',
                        this.formValidate.diagnosis='',
                        this.formValidate.estimatedCost='',
                        this.formValidate.replaceFittingCd='10000.160',
                        this.part=[],
                        this.formValidate.deviceCd,
                        this.$Message.info('提交成功继续添加');
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
      //设备编号
      // let query = new this.Query();
      // query.buildPageClause(this.pageNo, this.pageSize);
      // let param = query.getParam();
      // this.until.get("/ph/device/list", param).then(res => {
      //   if (res.status === "200") {
      //     this.equipmentList = res.data.items;
      //   }
      // });
      //单位
      this.until.get("/general/cat/listByPrntCd", { prntCd: "30010.400" })
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
       this.until.get("/ph/stockManage/info/"+e).then(res => {
        if (res.status === "200") {
          this.part = res.data;
        }
      });
      console.log(this.part);
    },
  }
};
</script>


