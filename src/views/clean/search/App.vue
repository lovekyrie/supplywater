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
      <FormItem label>
        <Input v-model="keyword" placeholder="请输入水箱名称"></Input>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="toSearch()">搜索</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import Loading from "../../../hero/components/loading";
import myHeader from "@/components/myHead";
export default {
  data() {
    return {
      title: "水箱清洗查询",
      keyword: ""
    };
  },
  components: {
    Loading,
    myHeader
  },
  mounted() {},
  methods: {
    toSearch() {
      // console.log(this.search)
      if (this.type === true) {
        window.location.href = `list.html?search=${this.keyword}`;
      } else {
        window.location.href = `pendinglist.html?search=${this.keyword}`;
      }
    }
  }
};
</script>


