<style lang="less" type="text/less">
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

.search {
  padding: 25px 0;
  flex: 1;
  width: 100% !important;
  overflow-y: auto;
  .ivu-form-item {
    width: 60%;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>

<template>
  <div id="container">
    <myHeader :title="title"></myHeader>
    <Form :label-width="80" class="search">
      <FormItem label="设备编号">
        <Input v-model="search.sbCd" placeholder></Input>
      </FormItem>
      <FormItem label="小区名称">
        <Input v-model="search.estateNm" placeholder></Input>
      </FormItem>
      <FormItem label="设备名称">
        <Input v-model="search.districtCd"></Input>
      </FormItem>
      <FormItem label="维修单号">
        <Input v-model="search.repairNo" placeholder></Input>
      </FormItem>
      <FormItem label="申请时间">
        <Row>
          <Col span="11">
            <DatePicker type="date" placeholder v-model="search.applyTimeSt"></DatePicker>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="11">
            <TimePicker type="time" placeholder v-model="search.applyTimeEnd"></TimePicker>
          </Col>
        </Row>
      </FormItem>
       <FormItem label="申请单位">
        <Select v-model="search.applyUnit">
          <Option v-for="item in districtNms" :value="item.cd" :key="item.cd">{{item.nm}}</Option>
        </Select>
      </FormItem>
       <FormItem label="处理状态">
        <Select v-model="search.treatState">
          <Option value="">全部</Option>
          <Option value="30020.170">已确认</Option>
          <Option value="30020.180">进行中</Option>
          <Option value="30020.190">已完成</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="toSearch()">搜索</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import Loading from "../../../hero/components/loading";
import myHeader from "../components/myHead";
export default {
  data() {
    return {
      title: "维修设备查询",
      districtNms: [], //行政区域数据
      search: {
        districtCd: "",
        estateNm: "", //小区名称
        sbCd: "", //设备编号
        applyTimeSt: "", //申请时间1
        applyTimeEnd: "", //申请时间2,
        applyUnit:'',//申请单位
        repairNo:"", //维修单号
        treatState:"",//处理状态
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
    toSearch() {
      if (this.search.applyTimeSt) {
        let myDate1 = this.until.formatDate(this.search.applyTimeSt);
        this.search.applyTimeSt =
          myDate1.year + "-" + myDate1.month + "-" + myDate1.day;
      }

      if (this.search.applyTimeEnd) {
        let myDate2 = this.until.formatDate(this.search.applyTimeEnd);
        this.search.applyTimeEnd =
          myDate2.year + "-" + myDate2.month + "-" + myDate2.day;
      }

      // console.log(this.search)
      window.location.href = "list.html?search=" + JSON.stringify(this.search);
    },
    //获取选项数据
    getSelect() {
      //行政区域
      this.until.get("/general/cat/listByPrntCdApp?prntCd=30010.400").then(res => {
        this.districtNms = res.data.items;
      });
    }
  }
};
</script>


