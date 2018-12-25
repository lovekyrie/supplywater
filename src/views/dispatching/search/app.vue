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
      <FormItem label="泵房编号">
        <Input v-model="search.monEquipmentPk" placeholder></Input>
      </FormItem>
      <FormItem label="设备名称">
        <Input v-model="search.product" placeholder></Input>
      </FormItem>
      <FormItem label="泵站名称">
        <Input v-model="search.address"></Input>
      </FormItem>
       <FormItem label="申请单位">
        <Select v-model="search.area">
          <Option v-for="item in areas" :value="item.cd" :key="item.cd">{{item.nm}}</Option>
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
      title: "调度监控查询",
      areas: [], //区域数据
      search: {
          monEquipmentPk:'', //编号
          product:'', //设备名称
          address:'', //泵站名称
          area:'', //区域
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
      window.location.href = "list.html?search=" + JSON.stringify(this.search);
    },
    //获取选项数据
    getSelect() {
      //行政区域
      this.until.get("/general/cat/listByPrntCd?prntCd=70000").then(res => {
        this.areas = res.data.items;
      });
    }
  }
};
</script>


