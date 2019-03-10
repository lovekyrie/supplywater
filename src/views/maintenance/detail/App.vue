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
  div {
    padding: 10px 15px;
    line-height: 0.3rem;
  }
}
</style>

<template>
  <div id="container">
    <myHeader :title="title"></myHeader>
    <div class="main">
      <div>
        <p>小区名称：{{info.estateNm}}</p>
        <p>保养单位：{{info.maintUnitNm}}</p>
        <p>保养日期：{{info.maintTm}}</p>
      </div>
      <h3>泵房设施</h3>
      <div>
       <p>供水方式：</p>
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
              {{info.pump3row1}}
            </td>
            <td>
              {{info.pump3row2}}
            </td>
            <td>
              {{info.pump3row3}}
            </td>
            <td>
              {{info.pump3row4}}
            </td>
          </tr>
          <tr>
            <td>进水压力（mpa）</td>
            <td>
              {{info.inPress4row1}}
            </td>
            <td>
              {{info.inPress4row2}}
            </td>
            <td>
              {{info.inPress4row3}}
            </td>
            <td>
              {{info.inPress4row4}}
            </td>
          </tr>
          <tr>
            <td>出水压力（mpa）</td>
            <td>
              {{info.outPress5row1}}
            </td>
            <td>
              {{info.outPress5row2}}
            </td>
            <td>
              {{info.outPress5row3}}
            </td>
            <td>
              {{info.outPress5row4}}
            </td>
          </tr>
          <tr>
            <td>电流（a）</td>
            <td>
              {{info.elec6row1}}
            </td>
            <td>
              {{info.elec6row2}}
            </td>
            <td>
              {{info.elec6row3}}
            </td>
            <td>
              {{info.elec6row4}}
            </td>
          </tr>
          <tr>
            <td>变频器频率（hz）</td>
            <td>
              {{info.freq7row1}}
              <input v-model="formValidate.freq7row1"></input>
            </td>
            <td>
              {{info.freq7row2}}
              <input v-model="formValidate.freq7row2"></input>
            </td>
            <td>
              {{info.freq7row3}}
              <input v-model="formValidate.freq7row3"></input>
            </td>
            <td>
              {{info.freq7row4}}
              <input v-model="formValidate.freq7row4"></input>
            </td>
          </tr>
          <tr>
            <td>电度表读数（度）</td>
            <td style="text-align:center;">上期</td>
            <td>
              {{info.elec8row1}}
            </td>
            <td style="text-align:center;">本期</td>
            <td>
              {{info.elec8row2}}
            </td>
          </tr>
        </table>
      </div>
     <h3>控制柜</h3>
     <div>
       <p>柜体完好程度：{{info.control9row1}}{{info.control9row2}}</p>
       <p>排风扇：{{info.control9row3}}{{info.control9row4}}</p>
       <p>三相电压：ab{{info.control9row5}}bc{{info.control9row6}}ac{{info.control9row7}}</p>
       <p>电气元件运行状况：{{info.control10row1}}{{info.control10row2}}</p>
       <p>接地线连接情况：{{info.control10row3}}{{info.control10row4}}</p>
       <p>检查手自动切换运行情况：{{info.control11row1}}{{info.control11row2}}</p>
       <p>电度表:{{info.control11row3}}{{info.control11row4}}</p>
       <p>指示灯状态:{{info.control12row1}}{{info.control12row2}}</p>
       <p>远程通讯状态:{{info.control12row3}}{{info.control12row4}}</p>
       <p>数据远传参数:{{info.control13row1}}{{info.control13row2}}</p>
       <p>控制柜整体清灰:{{info.control14row1}}</p>
       <p>检查主要元器件过热、烧损情况:{{info.control14row2}}{{info.control14row3}}</p>
       <p>测量柜内主电路绝缘电阻:相与相>={{info.control15row1}}相与地>={{info.control15row2}}</p>
       <p>测量二次回路绝缘电阻:{{info.control15row3}}</p>
       <p>空开校验:{{info.control16row1}}{{info.control16row2}}</p>
       <p>热继电器校验后整定电流:{{info.control16row3}}</p>
       <p>变频器冷却风道清理:{{info.control16row4}}</p>
       <p>中间继电器更换:{{info.control17row1}}{{info.control17row2}}</p>
     </div>
     <h3>泵组</h3>
     <div>
       <p>机泵外体清洗:{{info.pump18row1}}</p>
       <p>泵体杂物堵塞情况:{{info.pump18row2}}{{info.pump18row2}}</p>
       <p>泵体温度:{{info.pump19row1}}</p>
       <p>水泵震动:{{info.pump19row2}}</p>
       <p>异声和异味:{{info.pump19row3}}{{info.pump19row4}}</p>
       <p>电动机温度:{{info.pump19row5}}</p>
       <p>水泵排气:{{info.pump20row1}}</p>
       <p>机械密封:{{info.pump20row2}}{{info.pump20row3}}</p>
       <p>水泵整体运行:{{info.pump21row1}}{{info.pump21row2}}</p>
       <p>补充轴承润滑油:{{info.pump22row1}}</p>
       <p>检查引出线端烧伤程度:{{info.pump22row2}}{{info.pump22row3}}</p>
       <p>测量电机绝缘电阻:{{info.pump23row1}}</p>
       <p>检测电机外壳接地阻值:{{info.pump23row2}}</p>
       <p>泵组牢固程度:{{info.pump23row3}}{{info.pump23row4}}</p>
       <p>检查避震器（垫）避震效果:{{info.pump24row1}}{{info.pump24row2}}</p>
       <p>泵组基础腐蚀情况:{{info.pump24row3}}{{info.pump24row4}}</p>
       <p>机械密封更换:{{info.pump25row1}}{{info.pump25row2}}</p>
     </div>
     <h3>控制仪表</h3>
       <div>
          <p>机械压力表校对:{{info.controlmeter26row1}}{{info.controlmeter26row2}}</p>
          <p>压力变送器校对:{{info.controlmeter26row3}}{{info.controlmeter26row4}}</p>
          <p>机械压力表更换:{{info.controlmeter27row1}}{{info.controlmeter27row2}}</p>
          <p>压力变送器更换:{{info.controlmeter28row1}}{{info.controlmeter28row2}}</p>
       </div>
    </div>
    <h3>管道、阀门</h3>
      <div>
        <p>水泵、管道、阀门、压力水容器等密封情况:{{info.valve29row1}}{{info.valve29row2}}</p>
        <p>y过滤器拆洗:{{info.valve29row3}}</p>
        <p>无负压设备罐体排污:{{info.无负压设备罐体排污}}</p>
        <p>阀门检修性操作、调整、更换漏水部件:{{info.valve31row1}}</p>
        <p>管道加固支（托）架:{{info.valve31row2}}</p>
      </div>
    <h3>水箱（池）</h3>
    <div>
      <p>1、水箱（池）与水泵联动系统运转情况:{{info.waterbox32row1}}{{info.waterbox32row2}}</p>
      <p>2、电动蝶阀使用情况:{{info.waterbox33row1}}{{info.waterbox33row2}}</p>
      <p>液位控制器使用情况:{{info.waterbox33row2}}</p>
      <p>浮球阀使用情况:{{info.waterbox34row1}}{{info.waterbox34row2}}</p>
      <p>3、水箱（池）是否有泄漏现象:{{info.waterbox35row1}}{{info.waterbox35row2}}</p>
      <p>4、水箱（池）水位是否正常:{{info.waterbox36row1}}{{info.waterbox36row2}}水位显示{{info.waterbox36row3}}米</p>
      <p>5、水箱加盖上锁情况:{{info.waterbox37row1}}{{info.waterbox37row2}}</p>
      <p>6、检查电动蝶阀远程启闭功能完好情况:{{info.waterbox38row1}}{{info.waterbox38row2}}</p>
    </div>
    <h3>安防系统</h3>
    <div>
      <p>泵房噪音:{{info.safefence39row1}}分贝</p>
      <p>泵房温度:{{info.safefence39row2}}℃</p>
      <p>泵房湿度:{{info.safefence39row3}}%rh</p>
      <p>排污泵运行情况:{{info.safefence39row4}}{{info.safefence39row5}}（具体描述）</p>
      <p>泵体温度传感器校准:{{info.safefence40row1}}</p>
      <p>水泵振动传感器校准:{{info.safefence40row2}}</p>
      <p>超声波液位仪校准:{{info.safefence41row1}}</p>
      <p>门禁系统使用情况：刷卡开门:{{info.safefence41row2}}{{info.safefence41row3}}</p>
      <p>水位报警:{{info.safefence42row1}}{{info.safefence42row2}}</p>
      <p>视频系统使用情况：球体摄像头方向:{{info.safefence43row1}}{{info.safefence43row2}}</p>
    </div>
    <h3>水质仪表</h3>
    <div>
      <p>保养前余氯:{{info.watermeter44row1}}mg/l浊度:{{info.watermeter44row2}}ntu</p>
      <p>保养后余氯:{{info.watermeter44row3}}mg/l浊度:{{info.watermeter44row4}}ntu</p>
    </div>
    <h3>附属设施</h3>
    <div>
      <p>场地清扫:{{info.accessory45row1}}</p>
      <p>室内照明:{{info.accessory45row2}}{{info.accessory45row3}}</p>
      <p>设备标示牌:{{info.accessory45row4}}{{info.accessory45row5}}</p>
      <p>通风设施:{{info.accessory46row1}}{{info.accessory46row2}}</p>
      <p>灭火器压力:{{info.accessory46row3}}bar</p>
      <p>防汛设施:{{info.accessory47row1}}{{info.accessory47row2}}</p>
      <p>通讯器材:{{info.accessory47row3}}{{info.accessory47row4}}</p>
    </div>
    <h3>其他需要说明的问题</h3>
    <div>
      <p>{{info.else48row1}}</p>
    </div>
  </div>
</template>

<script>
import Loading from "../../../hero/components/loading";
import myHeader from "../components/myHead";
export default {
  data() {
    return {
      title: "工单指派详情",
      ipPk: "",
      info: {}
    };
  },
  components: {
    Loading,
    myHeader
  },
  mounted() {
    this.ipPk = this.until.getQueryString("ipPk");
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.until.get("/ph/dispatchSend/info/" + this.ipPk).then(res => {
        this.info = res.data;
      });
    }
  }
};
</script>


