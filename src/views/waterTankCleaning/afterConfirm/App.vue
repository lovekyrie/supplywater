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
        &:last-child {
          text-align: right;
          /*padding-right: 20px;*/
          span {
            display: inline-block;
            width: 1rem;
            text-align: center;
            border: 1px solid #e2e2e2;
            margin-left: 0.05rem;
            line-height: 0.3rem;
            height: 0.3rem;
            border-radius: 5px;
          }
        }
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
    <Spin size="large" fix v-if="spinShow"></Spin>
    <myHeader :title="title" search="true"></myHeader>
    <p style="text-align: center; line-height: .3rem" v-show="total==0">暂无数据</p>

    <scroll class="main" :on-reach-bottom="handleReachBottom">
      <Card dis-hover v-for="(item, index) in list" class="list" :key="index">
        <div @click="toDetail(item.cleanoutjobPk)">
          <p>
            <span>泵房编号：</span>
            {{item.waterBoxCd}}
          </p>
          <p>
            <span>泵房名称：</span>
            {{item.waterBoxNm}}
          </p>
          <p>
            <span>计划计划时间：</span>
            {{item.frTm }}
          </p>
          <p>
            <span>计划完成时间：</span>
            {{item.toTm }}
          </p>
          <p>
            <span>水箱编号：</span>
            {{item.waterBoxCd}}
          </p>
          <p>
            <span>水箱容量：</span>
            {{item.volume}}
          </p>
          <img :src="toDetailPng">
        </div>
      </Card>
    </scroll>
    <p style="text-align: center; line-height: .3rem" v-show="noMore">数据已加载完</p>
  </div>
</template>

<script>
import Loading from "../../../hero/components/loading";
import myHeader from "@/components/myHead";
import toDetailPng from "@/components/img/toDetail.png";
export default {
  data() {
    return {
      title: "已确认清洗记录",
      spinShow: false,
      noMore: false,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      list: [],
      toDetailPng,
      //搜索字段
      searchKey: ""
    };
  },
  components: {
    Loading,
    myHeader
  },
  mounted() {
    this.getList();
  },
  filters: {},
  methods: {
    getList() {
      this.spinShow = true;
      let $q = new Promise((resolve, reject) => {
        this.searchKey = this.until.getQueryString("search");
        let param = {
          pageNum: this.pageNo,
          pageSize: this.pageSize,
          queryParam: {
            cleanState: 2
          }
        };
        console.log(JSON.stringify(param));
        this.until
          .postData(
            "/inspect-api/cleanout/pagelist",
            JSON.stringify(param),
            this.until.loGet("appToken")
          )
          .then(
            res => {
              if (res.code === 0) {
                this.spinShow = false;
                this.total = res.data.total;
                if (res.data.result) {
                  res.data.result.forEach(item => {
                    let bgTm = this.until.formatDate(item.frTm);
                    let enTm = this.until.formatDate(item.toTm);
                    item.frTm = `${bgTm.year}年${bgTm.month}月${bgTm.day}日`;
                    item.toTm =
                      enTm.year + "年" + enTm.month + "月" + enTm.day + "日";
                  });
                  this.list.push(...res.data.result);
                }
              } else if (res.code === 1000) {
                this.$hero.msg.show({
                  text: `${res.message}`,
                  times: 1500
                });
              }
              resolve("ok");
            },
            err => {}
          );
      });
      return $q;
    },

    toDetail(repPk) {
      let url = `../clean/detail.html?cleanoutjobPk=${repPk}&type=full`;
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
    }
  }
};
</script>


