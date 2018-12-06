<style lang="less">
html,
body {
  width: 100%;
  height: 200%;
  font-size: 0.1rem;
  #container {
    width: 100%;
    height: 200%;
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
</style>

<template>
  <div id="container">
    <myHeader :title="title"></myHeader>
    <div class="main">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="设备编号" prop="devicePk">
          <Select v-model="formValidate.devicePk" filterable @on-change="selectOpt($event)">
            <Option
              v-for="item in equipmentList"
              :value="item.phDevicePk"
              :key="item.phDevicePk"
            >{{item.deviceCd}} {{item.estateNm}} {{item.deviceScatNm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="小区名称" prop="estateNm">
          <Input v-model="estateNm"></Input>
        </FormItem>
        <FormItem label="设备名称" prop="deviceScatNm">
          <Input v-model="deviceScatNm"></Input>
        </FormItem>
        <!-- <FormItem label="维修单号" prop="billCode">
          <Input v-model="formValidate.billCode"></Input>
        </FormItem> -->
        <FormItem label="申请时间">
          <Row>
            <Col span="11">
              <FormItem prop="applicationTm">
                <DatePicker type="date" v-model="formValidate.applicationTm"></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="申请单位" prop="applicantUnitCd">
          <Select v-model="formValidate.applicantUnitCd" filterable>
            <Option
              v-for="item in applyUnitList"
              :value="item.cd"
              :key="item.sysCatPk"
            >{{item.nm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="申请人" prop="proposer">
          <Input v-model="formValidate.proposer"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="mob">
          <Input v-model="formValidate.mob"></Input>
        </FormItem>
        <FormItem label="维修单位" prop="repairUnitCd">
          <Select v-model="formValidate.repairUnitCd" filterable>
            <Option
              v-for="item in applyUnitList"
              :value="item.cd"
              :key="item.sysCatPk"
            >{{item.nm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="预算费用" prop="estimatedCost">
          <Input v-model="formValidate.estimatedCost"></Input>
        </FormItem>
        <FormItem label="故障描述" prop="diagnosis">
          <Input
            v-model="formValidate.diagnosis"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
          ></Input>
        </FormItem>
        <h3>更换配件</h3>
        <FormItem label="是否更换配件" prop="replaceFittingCd">
          <RadioGroup v-model="formValidate.replaceFittingCd" @on-change="getFittingCd">
            <Radio label="是" value="10000.150"></Radio>
            <Radio label="否" value="10000.160"></Radio>
          </RadioGroup>
        </FormItem>
        <table>
          <thead>
            <tr>
              <th>配件编号</th>
              <th>配件名称</th>
              <th>规格型号</th>
              <th>品牌</th>
              <th>数量</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in repairStockRoList" :key="index">
              <td>
                <Select
                  v-model="item['deviceCd'+index]"
                  filterable
                  @on-change="getRepairStock($event,index)"
                >
                  <Option
                    v-for="itemCd in replaceList"
                    :value="itemCd.deviceCd"
                    :key="itemCd.stockManagePk"
                  >{{itemCd.deviceCd}}</Option>
                </Select>
              </td>
              <td>
                <Input v-model="item['deviceNm'+index]"></Input>
              </td>
              <td>
                <Input v-model="item['deviceSpec'+index]"></Input>
              </td>
              <td>
                <Input v-model="item['deviceBrand'+index]"></Input>
              </td>
              <td>
                <Input v-model="item['stockNum'+index]"></Input>
              </td>
              <td>删除</td>
            </tr>
            <tr>
              <td class="add-btn">
                <Button type="dashed" long @click="addEquipmentList">添加</Button>
              </td>
            </tr>
          </tbody>
        </table>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button> -->
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
      title: "设备维修申请",
      equipmentList: [],
      applyUnitList: [],
      replaceList: [],
      repairStockRoList: [],
      repairEntityList: [],
      estateNm: "",
      deviceScatNm: "",
      repairStockRo: {
        deviceCd:'',
        deviceNm:'',
        deviceSpec:'',
        deviceBrand:'',
        stockNum:'',
        stockManagePk:''
      },
      formValidate: {
        applicationTm: "", //申请时间
        applicantUnitCd: "", //申请单位
        repairUnitCd: "", //维修单位
        proposer: "", //申请人
        mob: "", //联系电话
        repairUnitCd: "", //维修单位
        estimatedCost: "", //预算费用
        diagnosis: "", //故障描述
        replaceFittingCd: "" //是否更换配件
      },
        ruleValidate: {
          // devicePk: [
          //   { required: true, message: "请选择设备编号", trigger: "change" }
          // ],
          billCode: [{ required: true, message: "请输入维修单号", trigger: "blur" }],
          applicationTm: [ {required: true, type: 'date', message: "请选择申请时间", trigger: "change" } ],
          applicantUnitCd: [
            { required: true, message: "请选择申请单位", trigger: "change" }
          ],
          proposer: [
            { required: true, message: "请输入申请人", trigger: "blur" }
          ],
          mob: [
            { required: true, message: "请输入联系电话", trigger: "blur" }
          ],
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
          ],
         
        }
    };
  },
  components: {
    Loading,
    myHeader
  },
  mounted() {
    this.getSelect();
  },
  methods: {
    //提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let myDate = this.until.formatDate(this.formValidate.applicationTm);
          this.formValidate.applicationTm = myDate.year + "-" + myDate.month + "-" + myDate.day;
          let stockObj

          this.repairStockRoList.forEach((item, index) => {
            stockObj={}
            stockObj.deviceCd = item["deviceCd" + index];
            stockObj.deviceNm = item["deviceNm" + index];
            stockObj.deviceSpec = item["deviceSpec" + index];
            stockObj.deviceBrand = item["deviceBrand" + index];
            stockObj.stockNum = item["stockNum" + index];
            stockObj.stockManagePk = item["stockManagePk" + index];
            
            this.repairEntityList.push(stockObj);
          });
          this.formValidate.repairStockRoList = this.repairEntityList;
          //维修单号 后端生成
          this.until
            .postData(
              "/ph/deviceRepair/edit",
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
    //获取选项数据
    getSelect() {
      //设备编号
      this.until.get("/ph/device/list").then(res => {
        if (res.status === "200") {
          this.equipmentList = res.data.items;
        }
      });
      //单位
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
    /**
     * e $event
     * name choose equipment
     */
    selectOpt(e) {
      let equipment = this.equipmentList.filter(item => {
        return item.phDevicePk === e;
      });

      this.estateNm = equipment[0]["estateNm"];
      this.deviceScatNm = equipment[0]["deviceScatNm"];
    },
    getRepairStock(e, i) {
      let repairStock = this.replaceList.filter(item => {
        return item.deviceCd === e;
      });

      // Object.assign(this.repairStockRoList[i],repairStock[0])
      this.repairStockRoList[i]["deviceCd" + i] = repairStock[0].deviceCd;
      this.repairStockRoList[i]["deviceNm" + i] = repairStock[0].deviceNm;
      this.repairStockRoList[i]["deviceSpec" + i] = repairStock[0].deviceSpec;
      this.repairStockRoList[i]["deviceBrand" + i] = repairStock[0].deviceBrand;
      this.repairStockRoList[i]["stockNum" + i] = repairStock[0].stockNum;
      this.repairStockRoList[i]["stockManagePk" + i] = repairStock[0].stockManagePk;
    },
    addEquipmentList() {
      //增加表格数据
      this.repairStockRoList.push(this.repairStockRo);
    },
    getFittingCd(e) {
      if (e === "是") {
        this.formValidate.replaceFittingCd = "10000.150";
      } else {
        this.formValidate.replaceFittingCd = "10000.160";
      }
    }
  }
};
</script>


