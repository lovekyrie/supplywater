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
    h3 {
      padding: 10px;
      background-color: #f3f3f3;
    }
    table {
      border: 1px solid #ddd;
      tr {
        display: flex;
        &:not(:nth-last-of-type(1)) {
          border-bottom: 1px solid #ddd;
        }
        .ivu-radio-group{
          width: 72%;
          display: flex;
          >label{
            flex:1;
            line-height: 2.6;
          }
        }
        td {
          line-height: 2.6;
          &:nth-of-type(1){
            width: 28%;
            text-align: center;
          }
          &:not(:nth-of-type(1)){
            width: 18%;
          }
          &:not(:nth-last-of-type(1)) {
            border-right: 1px solid #ddd;
          }
          input{
            padding: 10px;
            width: 100%;
            border: 0;
          }
        }
      }
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
  }
}
</style>

<template>
  <div id="container">
    <myHeader :title="title"></myHeader>
    <div class="main">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="小区名称" prop="estateNm">
          <Select v-model="formValidate.estateNm">
            <Option v-for="item in dispatchFromNm" :value="item.cd" :key="item.cd">{{item.nm}}</Option>
          </Select>
        </FormItem>
        <FormItem label="保养单位" prop="maintUnitNm">
          <Input v-model="formValidate.maintUnitNm"></Input>
        </FormItem>
        <FormItem label="保养日期">
          <FormItem prop="maintTm">
            <DatePicker type="date" v-model="formValidate.maintTm"></DatePicker>
          </FormItem>
        </FormItem>
        <h3>泵房设施</h3>
        <FormItem label="供水方式" prop="waterSupplyMode">
          <RadioGroup v-model="formValidate.waterSupplyMode">
            <Radio label="无负压"></Radio>
            <Radio label="箱式"></Radio>
            <Radio label="水箱+变频"></Radio>
            <Radio label="工频"></Radio>
          </RadioGroup>
        </FormItem>
        <table>
          <tr>
            <td>供水分区</td>
              <RadioGroup v-model="formValidate.waterSupplyMode">
                <Radio label="超高"></Radio>
                <Radio label="高区"></Radio>
                <Radio label="中区"></Radio>
                <Radio label="低区"></Radio>
              </RadioGroup>
          </tr>
          <tr>
            <td>水泵运行编号</td>
            <td>
              <input v-model="formValidate.pump3row1"></input>
            </td>
            <td>
              <input v-model="formValidate.pump3row2"></input>
            </td>
            <td>
              <input v-model="formValidate.pump3row3"></input>
            </td>
            <td>
              <input v-model="formValidate.pump3row4"></input>
            </td>
          </tr>
          <tr>
            <td>进水压力（mpa）</td>
            <td>
              <input v-model="formValidate.inPress4row1"></input>
            </td>
            <td>
              <input v-model="formValidate.inPress4row2"></input>
            </td>
            <td>
              <input v-model="formValidate.inPress4row3"></input>
            </td>
            <td>
              <input v-model="formValidate.inPress4row4"></input>
            </td>
          </tr>
          <tr>
            <td>出水压力（mpa）</td>
            <td>
              <input v-model="formValidate.outPress5row1"></input>
            </td>
            <td>
              <input v-model="formValidate.outPress5row2"></input>
            </td>
            <td>
              <input v-model="formValidate.outPress5row3"></input>
            </td>
            <td>
              <input v-model="formValidate.outPress5row4"></input>
            </td>
          </tr>
          <tr>
            <td>电流（a）</td>
            <td>
              <input v-model="formValidate.elec6row1"></input>
            </td>
            <td>
              <input v-model="formValidate.elec6row2"></input>
            </td>
            <td>
              <input v-model="formValidate.elec6row3"></input>
            </td>
            <td>
              <input v-model="formValidate.elec6row4"></input>
            </td>
          </tr>
          <tr>
            <td>变频器频率（hz）</td>
            <td>
              <input v-model="formValidate.freq7row1"></input>
            </td>
            <td>
              <input v-model="formValidate.freq7row2"></input>
            </td>
            <td>
              <input v-model="formValidate.freq7row3"></input>
            </td>
            <td>
              <input v-model="formValidate.freq7row4"></input>
            </td>
          </tr>
          <tr>
            <td>电度表读数（度）</td>
            <td style="text-align:center;">上期</td>
            <td>
              <input v-model="formValidate.elec8row1"></input>
            </td>
            <td style="text-align:center;">本期</td>
            <td>
              <input v-model="formValidate.elec8row2"></input>
            </td>
          </tr>
        </table>
        <h3>控制柜</h3>
        <FormItem label="柜体完好程度" prop="control9row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.control9row1">
                <Radio label="完好"></Radio>
                <Radio label="有破损"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.control9row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="排风扇" prop="control9row4">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.control9row3">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.control9row4"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="三相电压" prop="control_row4">
          <Row>
            <Col span="2" style="text-align:center;">ab</Col>
            <Col span="6">
              <FormItem>
                <Input v-model="formValidate.control9row5"></Input>
              </FormItem>
            </Col>
            <Col span="2" style="text-align:center;">bc</Col>
            <Col span="6">
              <FormItem>
                <Input v-model="formValidate.control9row6"></Input>
              </FormItem>
            </Col>
            <Col span="2" style="text-align:center;">ac</Col>
            <Col span="6">
              <FormItem>
                <Input v-model="formValidate.control9row7"></Input>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="电气元件运行状况" prop="control10row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.control10row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.control10row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="接地线连接情况" prop="control10row4">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.control10row3">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.control10row4"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="检查手自动切换运行情况" prop="control11row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.control11row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.control11row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="电度表" prop="control11row4">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.control11row3">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.control11row4"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="指示灯状态" prop="control12row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.control12row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.control12row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="远程通讯状态" prop="control12row4">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.control12row3">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.control12row4"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="数据远传参数" prop="control13row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.control13row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.control13row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="控制柜整体清灰" prop="control14row1">
          <RadioGroup v-model="formValidate.control14row1">
            <Radio label="必须完成项"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="检查主要元器件过热、烧损情况" prop="control14row3">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.control14row2">
                <Radio label="无需更换"></Radio>
                <Radio label="需更换"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.control14row3"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="测量柜内主电路绝缘电阻" prop="control_row4">
          <Row>
            <Col span="3" style="text-align:center;">相与相>=</Col>
            <Col span="8">
              <Input v-model="formValidate.control15row1"></Input>
            </Col>
            <Col span="1">mω、</Col>
            <Col span="3" style="text-align:center;">相与地>=</Col>
            <Col span="8">
              <Input v-model="formValidate.control15row2"></Input>
            </Col>
            <Col span="1">mω</Col>
          </Row>
        </FormItem>
        <FormItem label="测量二次回路绝缘电阻" prop="control15row3">
          <Row>
            <Col span="3" style="text-align:center;">>=</Col>
            <Col span="20">
              <Input v-model="formValidate.control15row3"></Input>
            </Col>
            <Col span="1">mω</Col>
          </Row>
        </FormItem>
        <FormItem label="空开校验" prop="control16row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.control16row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.control16row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="热继电器校验后整定电流" prop="control16row3">
          <Row>
            <Col span="22">
              <Input v-model="formValidate.control16row3"></Input>
            </Col>
            <Col span="2">a</Col>
          </Row>
        </FormItem>
        <FormItem label="变频器冷却风道清理" prop="control16row4">
          <RadioGroup v-model="formValidate.control16row4">
            <Radio label="清理"></Radio>
            <Radio label="未清理"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="中间继电器更换" prop="control17row1">
          <Row>
            <Col span="6">
              <CheckboxGroup v-model="formValidate.control17row1" @on-change="changeMidRelay">
                <Checkbox label="必须完成项"></Checkbox>
              </CheckboxGroup>
            </Col>
            <Col span="3" style="text-align:center;" v-show="showMidRelay">新配件品牌</Col>
            <Col span="3" v-show="showMidRelay">
              <Input v-model="formValidate.control17row3"></Input>
            </Col>
            <Col span="3" style="text-align:center;" v-show="showMidRelay">规格型号</Col>
            <Col span="3" v-show="showMidRelay">
              <Input v-model="formValidate.control17row4"></Input>
            </Col>
            <Col span="3" style="text-align:center;" v-show="showMidRelay">出厂编号</Col>
            <Col span="3" v-show="showMidRelay">
              <Input v-model="formValidate.control17row5"></Input>
            </Col>
          </Row>
        </FormItem>
        <h3>泵组</h3>
        <FormItem label="机泵外体清洗" prop="pump18row1">
          <CheckboxGroup v-model="formValidate.pump18row1">
            <Checkbox label="必须完成项"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="泵体杂物堵塞情况" prop="pump18row3">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.pump18row2">
                <Radio label="完成"></Radio>
                <Radio label="未完成"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.pump18row3"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="泵体温度" prop="pump19row1">
          <Row>
            <Col span="22">
              <Input v-model="formValidate.pump19row1"></Input>
            </Col>
            <Col span="2">℃</Col>
          </Row>
        </FormItem>
        <FormItem label="水泵震动" prop="pump19row2">
          <Row>
            <Col span="22">
              <Input v-model="formValidate.pump19row2"></Input>
            </Col>
            <Col span="2">mm/s</Col>
          </Row>
        </FormItem>
        <FormItem label="异声和异味" prop="pump19row4">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.pump19row3">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.pump19row4"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="电动机温度" prop="pump19row5">
          <Row>
            <Col span="22">
              <Input v-model="formValidate.pump19row5"></Input>
            </Col>
            <Col span="2">℃</Col>
          </Row>
        </FormItem>
        <FormItem label="水泵排气" prop="pump20row1">
          <RadioGroup v-model="formValidate.pump20row1">
            <Radio label="是"></Radio>
            <Radio label="否"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="机械密封" prop="pump20row3">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.pump20row2">
                <Radio label="不漏水"></Radio>
                <Radio label="漏水"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.pump20row3"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="水泵整体运行" prop="pump21row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.pump21row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.pump21row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="补充轴承润滑油" prop="pump22row1">
          <CheckboxGroup v-model="formValidate.pump22row1">
            <Checkbox label="必须完成项"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="检查引出线端烧伤程度" prop="pump22row3">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.pump22row2">
                <Radio label="完好"></Radio>
                <Radio label="有烧伤"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.pump22row3"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="测量电机绝缘电阻" prop="pump23row1">
          <Row>
            <Col span="3" style="text-align:center;">>=</Col>
            <Col span="20">
              <Input v-model="formValidate.pump23row1"></Input>
            </Col>
            <Col span="1">ω</Col>
          </Row>
        </FormItem>
        <FormItem label="检测电机外壳接地阻值" prop="pump23row2">
          <Row>
            <Col span="3" style="text-align:center;"><=</Col>
            <Col span="20">
              <Input v-model="formValidate.pump23row2"></Input>
            </Col>
            <Col span="1">ω</Col>
          </Row>
        </FormItem>
        <FormItem label="泵组牢固程度" prop="pump23row4">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.pump23row3">
                <Radio label="牢固"></Radio>
                <Radio label="不牢固"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.pump23row4"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="检查避震器（垫）避震效果" prop="pump24row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.pump24row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.pump24row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="泵组基础腐蚀情况" prop="pump24row4">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.pump24row3">
                <Radio label="完好"></Radio>
                <Radio label="有生锈"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.pump24row4"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="机械密封更换" prop="pump25row1">
          <Row>
            <Col span="6">
              <CheckboxGroup v-model="formValidate.pump25row1" @on-change="changePump">
                <Checkbox label="必须完成项"></Checkbox>
              </CheckboxGroup>
            </Col>
            <Col span="3" style="text-align:center;" v-show="showChangePump">新配件品牌</Col>
            <Col span="3" v-show="showChangePump">
              <Input v-model="formValidate.pump25row3"></Input>
            </Col>
            <Col span="3" style="text-align:center;" v-show="showChangePump">规格型号</Col>
            <Col span="3" v-show="showChangePump">
              <Input v-model="formValidate.pump25row4"></Input>
            </Col>
            <Col span="3" style="text-align:center;" v-show="showChangePump">出厂编号</Col>
            <Col span="3" v-show="showChangePump">
              <Input v-model="formValidate.pump25row5"></Input>
            </Col>
          </Row>
        </FormItem>
        <h3>控制仪表</h3>
        <FormItem label="机械压力表校对" prop="controlmeter26row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.controlmeter26row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.controlmeter26row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="压力变送器校对" prop="controlmeter26row4">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.controlmeter26row3">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.controlmeter26row4"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="机械压力表更换" prop="controlmeter27row1">
          <Row>
            <Col span="6">
              <CheckboxGroup v-model="formValidate.controlmeter27row1" @on-change="changeMeter">
                <Checkbox label="必须完成项"></Checkbox>
              </CheckboxGroup>
            </Col>
            <Col span="3" style="text-align:center;" v-show="showChangePump1">新配件品牌</Col>
            <Col span="3" v-show="showChangePump1">
              <Input v-model="formValidate.controlmeter27row3"></Input>
            </Col>
            <Col span="3" style="text-align:center;" v-show="showChangePump1">规格型号</Col>
            <Col span="3" v-show="showChangePump1">
              <Input v-model="formValidate.controlmeter27row4"></Input>
            </Col>
            <Col span="3" style="text-align:center;" v-show="showChangePump1">出厂编号</Col>
            <Col span="3" v-show="showChangePump1">
              <Input v-model="formValidate.controlmeter27row5"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="压力变送器更换" prop="controlmeter28row1">
          <Row>
            <Col span="6">
              <CheckboxGroup v-model="formValidate.controlmeter28row1" @on-change="changeMeterTwo">
                <Checkbox label="必须完成项"></Checkbox>
              </CheckboxGroup>
            </Col>
            <Col span="3" style="text-align:center;" v-show="showChangePump2">新配件品牌</Col>
            <Col span="3" v-show="showChangePump2">
              <Input v-model="formValidate.controlmeter28row3"></Input>
            </Col>
            <Col span="3" style="text-align:center;" v-show="showChangePump2">规格型号</Col>
            <Col span="3" v-show="showChangePump2">
              <Input v-model="formValidate.controlmeter28row4"></Input>
            </Col>
            <Col span="3" style="text-align:center;" v-show="showChangePump2">出厂编号</Col>
            <Col span="3" v-show="showChangePump2">
              <Input v-model="formValidate.controlmeter28row5"></Input>
            </Col>
          </Row>
        </FormItem>
        <h3>管道、阀门</h3>
        <FormItem label="水泵、管道、阀门、压力水容器等密封情况" prop="valve29row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.valve29row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.valve29row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="y过滤器拆洗" prop="valve29row3">
          <RadioGroup v-model="formValidate.valve29row3">
            <Radio label="完成"></Radio>
            <Radio label="未完成"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="无负压设备罐体排污" prop="valve30row1">
          <CheckboxGroup v-model="formValidate.valve30row1">
            <Checkbox label="必须完成项"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="阀门检修性操作、调整、更换漏水部件" prop="valve31row1">
          <CheckboxGroup v-model="formValidate.valve31row1">
            <Checkbox label="必须完成项"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="管道加固支（托）架" prop="valve31row2">
          <CheckboxGroup v-model="formValidate.valve31row2">
            <Checkbox label="必须完成项"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <h3>水箱（池）</h3>
        <FormItem label="1、水箱（池）与水泵联动系统运转情况" prop="waterbox32row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.waterbox32row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.waterbox32row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="2、电动蝶阀使用情况" prop="waterbox33row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.waterbox33row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.waterbox33row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="液位控制器使用情况" prop="waterbox33row4">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.waterbox33row2">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.waterbox33row4"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="浮球阀使用情况" prop="waterbox34row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.waterbox34row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.waterbox34row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="3、水箱（池）是否有泄漏现象" prop="waterbox35row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.waterbox35row1">
                <Radio label="无"></Radio>
                <Radio label="有"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.waterbox35row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="4、水箱（池）水位是否正常" prop="waterbox36row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.waterbox36row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="12">
              <Input v-model="formValidate.waterbox36row2"></Input>
            </Col>
            <Col span="2">水位显示</Col>
            <Col span="3">
              <Input v-model="formValidate.waterbox36row3"></Input>
            </Col>
            <Col span="1">米</Col>
          </Row>
        </FormItem>
        <FormItem label="5、水箱加盖上锁情况" prop="waterbox37row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.waterbox37row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.waterbox37row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="6、检查电动蝶阀远程启闭功能完好情况" prop="waterbox38row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.waterbox38row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.waterbox38row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <h3>安防系统</h3>
        <FormItem label="泵房噪音" prop="safefence39row1">
          <Row>
            <Col span="22">
              <Input v-model="formValidate.safefence39row1"></Input>
            </Col>
            <Col span="2">分贝</Col>
          </Row>
        </FormItem>
        <FormItem label="泵房温度" prop="safefence39row2">
          <Row>
            <Col span="22">
              <Input v-model="formValidate.safefence39row2"></Input>
            </Col>
            <Col span="2">℃</Col>
          </Row>
        </FormItem>
        <FormItem label="泵房湿度" prop="safefence39row3">
          <Row>
            <Col span="22">
              <Input v-model="formValidate.safefence39row3"></Input>
            </Col>
            <Col span="2">%rh</Col>
          </Row>
        </FormItem>
        <FormItem label="排污泵运行情况" prop="safefence39row5">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.safefence39row4">
                <Radio label="自动"></Radio>
                <Radio label="手动"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="16">
              <Input v-model="formValidate.safefence39row5"></Input>
            </Col>
            <Col span="2">（具体描述）</Col>
          </Row>
        </FormItem>
        <FormItem label="泵体温度传感器校准" prop="safefence40row1">
          <CheckboxGroup v-model="formValidate.safefence40row1">
            <Checkbox label="必须完成项"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="水泵振动传感器校准" prop="safefence40row2">
          <CheckboxGroup v-model="formValidate.safefence40row2">
            <Checkbox label="必须完成项"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="超声波液位仪校准" prop="safefence41row1">
          <CheckboxGroup v-model="formValidate.safefence41row1">
            <Checkbox label="必须完成项"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="门禁系统使用情况：刷卡开门" prop="safefence41row3">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.safefence41row2">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.safefence41row3"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="水位报警" prop="safefence42row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.safefence42row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.safefence42row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="视频系统使用情况：球体摄像头方向" prop="safefence43row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.safefence43row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.safefence43row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <h3>水质仪表</h3>
        <FormItem prop="watermeter44row1">
          <Row>
            <Col span="3">保养前余氯</Col>
            <Col span="8">
              <Input v-model="formValidate.watermeter44row1"></Input>
            </Col>
            <Col span="1">mg/l</Col>
            <Col span="3">浊度</Col>
            <Col span="8">
              <Input v-model="formValidate.watermeter44row2"></Input>
            </Col>
            <Col span="1">ntu</Col>
          </Row>
        </FormItem>
        <FormItem prop="watermeter44row3">
          <Row>
            <Col span="3">保养后余氯</Col>
            <Col span="8">
              <Input v-model="formValidate.watermeter44row3"></Input>
            </Col>
            <Col span="1">mg/l</Col>
            <Col span="3">浊度</Col>
            <Col span="8">
              <Input v-model="formValidate.watermeter44row4"></Input>
            </Col>
            <Col span="1">ntu</Col>
          </Row>
        </FormItem>
        <h3>附属设施</h3>
        <FormItem label="场地清扫" prop="accessory45row1">
          <CheckboxGroup v-model="formValidate.accessory45row1">
            <Checkbox label="必须完成项"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="室内照明" prop="accessory45row3">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.accessory45row2">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.accessory45row3"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="设备标示牌" prop="accessory45row5">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.accessory45row4">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.accessory45row5"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="通风设施" prop="accessory46row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.accessory46row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.accessory46row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="灭火器压力" prop="accessory46row3">
          <Row>
            <Col span="22">
              <Input v-model="formValidate.accessory46row3"></Input>
            </Col>
            <Col span="2">bar</Col>
          </Row>
        </FormItem>
        <FormItem label="防汛设施" prop="accessory47row2">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.accessory47row1">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.accessory47row2"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="通讯器材" prop="accessory47row4">
          <Row>
            <Col span="6">
              <RadioGroup v-model="formValidate.accessory47row3">
                <Radio label="正常"></Radio>
                <Radio label="不正常"></Radio>
              </RadioGroup>
            </Col>
            <Col span="18">
              <Input v-model="formValidate.accessory47row4"></Input>
            </Col>
          </Row>
        </FormItem>
        <h3>其他需要说明的问题</h3>
        <FormItem prop="else48row1">
          <Input
            v-model="formValidate.else48row1"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
          ></Input>
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
      showChangePump: false,
      showChangePump1: false,
      showChangePump2: false,
      showMidRelay: false,
      dispatchFromNm: [
        {
          cd: "gd120.01",
          nm: "96390清泉热线"
        },
        {
          cd: "gd120.02",
          nm: "安全检查（巡检）"
        },
        {
          cd: "gd120.03",
          nm: "物业社区"
        },
        {
          cd: "gd120.04",
          nm: "属地分公司"
        },
        {
          cd: "gd120.05",
          nm: "系统报警"
        }
      ], //工单来源
      proLvNm: [], //故障现象
      districtNm: [], //行政区域
      formValidate: {
        estateNm: "",
        maintUnitNm: "",
        maintTm: "" /* 时间戳*/,
        waterSupplyMode: "",
        waterSupplyArea: "",
        pump3row1: "",
        pump3row2: "",
        pump3row3: "",
        pump3row4: "",
        inPress4row1: "",
        inPress4row2: "",
        inPress4row3: "",
        inPress4row4: "",
        outPress5row1: "",
        outPress5row2: "",
        outPress5row3: "",
        outPress5row4: "",
        elec6row1: "",
        elec6row2: "",
        elec6row3: "",
        elec6row4: "",
        freq7row1: "",
        freq7row2: "",
        freq7row3: "",
        freq7row4: "",
        elec8row1: "",
        elec8row2: "",
        control9row1: "",
        control9row2: "",
        control9row3: "",
        control9row4: "",
        control9row5: "",
        control9row6: "",
        control9row7: "",
        control10row1: "",
        control10row2: "",
        control10row3: "",
        control10row4: "",
        control11row1: "",
        control11row2: "",
        control11row3: "",
        control11row4: "",
        control12row1: "",
        control12row2: "",
        control12row3: "",
        control12row4: "",
        control13row1: "",
        control13row2: "",
        control14row1: "",
        control14row2: "",
        control14row3: "",
        control15row1: "",
        control15row2: "",
        control15row3: "",
        control16row1: "",
        control16row2: "",
        control16row3: "",
        control17row1: [],
        control17row2: "",
        pump18row1: [],
        pump18row2: "",
        pump18row3: "",
        pump19row1: "",
        pump19row2: "",
        pump19row3: "",
        pump19row4: "",
        pump19row5: "",
        pump20row1: "",
        pump20row2: "",
        pump20row3: "",
        pump21row1: "",
        pump21row2: "",
        pump22row1: [],
        pump22row2: "",
        pump22row3: "",
        pump23row1: "",
        pump23row2: "",
        pump23row3: "",
        pump23row4: "",
        pump24row1: "",
        pump24row2: "",
        pump24row3: "",
        pump24row4: "",
        pump25row1: [],
        pump25row2: "",
        controlmeter26row1: "",
        controlmeter26row2: "",
        controlmeter26row3: "",
        controlmeter26row4: "",
        controlmeter27row1: [],
        controlmeter27row2: "",
        controlmeter28row1: [],
        controlmeter28row2: "",
        valve29row1: "",
        valve29row2: "",
        valve29row3: "",
        valve30row1: [],
        valve31row1: [],
        valve31row2: [],
        waterbox32row1: "",
        waterbox32row2: "",
        waterbox33row1: "",
        waterbox33row2: "",
        waterbox33row3: "",
        waterbox33row4: "",
        waterbox34row1: "",
        waterbox34row2: "",
        waterbox35row1: "",
        waterbox35row2: "",
        waterbox36row1: "",
        waterbox36row2: "",
        waterbox36row3: "",
        waterbox37row1: "",
        waterbox37row2: "",
        waterbox38row1: "",
        waterbox38row2: "",
        safefence39row1: "",
        safefence39row2: "",
        safefence39row3: "",
        safefence39row4: "",
        safefence39row5: "",
        safefence40row1: [],
        safefence40row2: [],
        safefence41row1: [],
        safefence41row2: "",
        safefence41row3: "",
        safefence42row1: "",
        safefence42row2: "",
        safefence43row1: "",
        safefence43row2: "",
        watermeter44row1: "",
        watermeter44row2: "",
        watermeter44row3: "",
        watermeter44row4: "",
        accessory45row1: [],
        accessory45row2: "",
        accessory45row3: "",
        accessory45row4: "",
        accessory45row5: "",
        accessory46row1: "",
        accessory46row2: "",
        accessory46row3: "",
        accessory47row1: "",
        accessory47row2: "",
        accessory47row3: "",
        accessory47row4: "",
        else48row1: ""
      },
      ruleValidate: {
        dispatchFromNm: [
          { required: true, message: "请选择工单来源", trigger: "change" }
        ],
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
    this.getSelect();
  },
  methods: {
    changeMidRelay(arr) {
      this.showMidRelay = arr.length > 0 ? true : false;
    },
    changePump(arr) {
      this.showChangePump = arr.length > 0 ? true : false;
    },
    changeMeter(arr) {
      this.showChangePump1 = arr.length > 0 ? true : false;
    },
    changeMeterTwo(arr) {
      this.showChangePump2 = arr.length > 0 ? true : false;
    },
    //提交
    handleSubmit(name) {
      alert(this.formValidate.control9row1);
      alert(this.formValidate.control9row2);
      // this.$refs[name].validate(valid => {
      //   if (valid) {
      //     let myDate = this.until.formatDate(this.formValidate.date);
      //     this.formValidate.sendTm =
      //       myDate.year +
      //       "-" +
      //       myDate.month +
      //       "-" +
      //       myDate.day +
      //       " " +
      //       this.formValidate.time;
      //     this.until
      //       .postData(
      //         "/ph/dispatchSend/edit",
      //         JSON.stringify(this.formValidate)
      //       )
      //       .then(res => {
      //         if (res.status == 200) {
      //           this.$Message.success("提交成功!");
      //           setTimeout(() => {
      //             window.location.href = "list.html";
      //           }, 1500);
      //         } else {
      //           this.$Message.error(res.message);
      //         }
      //       });
      //   } else {
      //     this.$Message.error("请填写完整信息！");
      //   }
      // });
    },
    //取消
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    //获取选项数据
    getSelect() {
      //工单来源
      this.until.get("/general/cat/listByPrntCd?prntCd=gz120").then(res => {
        if (res.data.items) {
          this.dispatchFromNm = res.data.items;
        }
      });
      //故障
      this.until.get("/general/cat/listByPrntCd?prntCd=gzxx140").then(res => {
        this.proLvNm = res.data.items;
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
<style lang="less" scoped>
.ivu-form-item {
  margin-bottom: 0.1rem;
}
</style>


