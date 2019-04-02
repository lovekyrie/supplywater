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
  padding: 15px 0;
  background: #f9f9f9;
  .ivu-form-item {
    width: 60%;
    margin: 0 auto;
    margin-bottom: 10px;
  }
}
.main {
  flex: 1;
  width: 100% !important;
  overflow-y: auto;
  .ivu-scroll-container {
    /*overflow-y:auto;*/
    height: 100% !important;
    .ivu-card-body {
      position: relative;
      p {
        line-height: 0.3rem;
      }
      img {
        position: absolute;
        right: 20px;
        top: 40%;
        width: 0.3rem;
        /*transform: rotate(180deg);*/
        /*-ms-transform: rotate(180deg);		!* IE 9 *!*/
        /*-webkit-transform: rotate(180deg);	!* Safari and Chrome *!*/
        /*-o-transform: rotate(180deg);		!* Opera *!*/
        /*-moz-transform: rotate(180deg);		!* Firefox *!*/
      }
      span.btn {
        position: absolute;
        right: 20px;
        bottom: 20px;
        display: block;
        padding: 0.05rem 0.2rem;
        border: 1px solid #e2e2e2;
        border-radius: 3px;
      }
    }
  }
}
</style>

<template>
  <div id="container">
    <myHeader :title="title"></myHeader>
    <Form :model="search" :label-width="80" class="search">
      <FormItem label="故障代码">
        <Select v-model="search.proLvNm">
          <Option v-for="item in proLvNm" :value="item.cd" :key="item.cd">{{item.nm}}</Option>
        </Select>
      </FormItem>
      <FormItem label="处理单位">
        <Select v-model="search.bmNm">
          <Option v-for="item in bmNm" :value="item.cd" :key="item.cd">{{item.nm}}</Option>
        </Select>
      </FormItem>
      <FormItem label="工单状态">
        <Select v-model="search.dealStatus">
          <Option v-for="item in status" :value="item.value" :key="item.value">{{item.label}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="toSearch()">搜索</Button>
      </FormItem>
    </Form>
    <scroll class="main" :on-reach-bottom="handleReachBottom">
      <Card dis-hover v-for="item in list" class="list" :key="item.dispatchSendPk">
        <div @click="toDetail(item.dispatchSendPk)">
          <p>
            <span>工单来源：</span>
            {{item.dispatchFromNm}}
          </p>
          <p>
            <span>部门名称：</span>
            {{item.bmNm}}
          </p>
          <p>
            <span>泵房名称：</span>
            {{item.address}}
          </p>
          <p>
            <span>处理状态：</span>
            {{item.dealStatus | state}}
          </p>
          <p>
            <span>故障现象：</span>
            {{item.proLvNm}}
          </p>
          <p>
            <span>派单时间：</span>
            {{item.sendTm}}
          </p>
          <img src="../components/img/toDetail.png">
        </div>
      </Card>
      <p style="text-align: center; line-height: .3rem" v-show="noData">暂无数据</p>
      <p style="text-align: center; line-height: .3rem" v-show="noMore">数据已加载完</p>
    </scroll>
  </div>
</template>

<script>
import Loading from "../../../hero/components/loading";
import myHeader from "../components/myHead";
export default {
  data() {
    return {
      title: "任务派单管理",
      noData: false,
      noMore: false,
      proLvNm: [], //故障代码
      bmNm: [], //部门
      pageNo: 1,
      pageSize: 10,
      total: "",
      status: [
        {
          //工作状态
          value: 0,
          label: "未确认"
        },
        {
          value: 1,
          label: "已确认"
        },
        {
          value: 2,
          label: "已接单"
        },
        {
          value: 3,
          label: "已处理"
        },
        {
          value: 4,
          label: "已回访"
        },
        {
          value: 5,
          label: "完成"
        }
      ],
      search: {
        dealStatus: "",
        proLvNm: "", //故障现象
        bmNm: "" //部门
      },
      list: []
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
      this.list = [];
      this.pageNo = 1;
      this.total = 0;
      this.noData = false;
      this.noMore = false;
      this.getList();
    },
    getList() {
      let $q = new Promise((resolve, reject) => {
        let query = new this.Query();
        query.buildWhereClause("dealStatus", this.search.dealStatus, "LK");
        query.buildWhereClause("proLvNm", this.search.proLvNm, "LK");
        query.buildWhereClause("bmNm", this.search.bmNm, "LK");
        query.buildPageClause(this.pageNo, this.pageSize);
        let param = query.getParam();
        this.until.get("/ph/dispatchSend/page", param).then(
          res => {
            if (res.status == 200) {
              this.total = res.page.total;
              if (this.total == 0) {
                this.noData = true;
              } else if (this.total <= this.pageSize) {
                this.noMore = true;
              }
              if (res.data.items) {
                this.list.push(...res.data.items);
              }
            }
            resolve("ok");
          },
          err => {}
        );
      });
      return $q;
    },
    toDetail(ipPk) {
      let url = "detail.html?ipPk=" + ipPk;
      console.log(url);
      window.location.href = url;
    },
    //到底部时触发
    handleReachBottom() {
      return new Promise(resolve => {
        setTimeout(() => {
          if (this.list.length < this.total) {
            this.pageNo++;
            this.getList();
          } else {
            this.noMore = true;
          }
          resolve();
        }, 2000);
      });
    },
    getSelect() {
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
    }
  },

  filters: {
    state(val) {
      if (val == 0) {
        val = "未确认";
      }
      if (val == 1) {
        val = "已确认";
      }
      if (val == 2) {
        val = "已接单";
      }
      if (val == 3) {
        val = "已处理";
      }
      if (val == 4) {
        val = "已回访";
      }
      if (val == 5) {
        val = "完成";
      }
      return val;
    }
  }
};
</script>


