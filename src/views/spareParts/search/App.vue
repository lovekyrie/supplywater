<style lang="less" type="text/less">
    html,body{
        width: 100%;
        height: 100%;
        font-size: .1rem;
        #container{
            width: 100%;
            height: 100%;
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
        }
    }

    .search{
        padding: 25px 0;
        flex: 1;
        width: 100%!important;
        overflow-y: auto;
        .ivu-form-item{
            width: 60%;
            margin: 0 auto;
            margin-top:10px;
            margin-bottom: 10px;
        }
    }
</style>

<template>
    <div id="container">
        <myHeader :title="title"></myHeader>
        <Form :label-width="80" class="search">
            <FormItem label="仓库名称">
                <Select v-model="search.warehouseCd">
                    <Option v-for="item in districtNms" :value="item.cd" :key="item.cd">{{item.nm}}</Option>
                </Select>
            </FormItem>
            <FormItem label="备品名称">
                <Input v-model="search.deviceNm" placeholder=""></Input>
            </FormItem>

            <FormItem label="备品规格">
                <Input v-model="search.deviceSpec" placeholder=""></Input>
            </FormItem>
            <FormItem label="负责人">
                <Input v-model="search.responUser" placeholder=""></Input>
            </FormItem>
            <FormItem label="品牌名称">
                <Input v-model="search.deviceBrand" placeholder=""></Input>
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
                title:'库存报表查询',
                districtNms:[],  //行政区域数据
                search:{
                    warehouseCd:'', //仓库名称
                    deviceNm:'',
                    responUser:'', //品牌名称
                    deviceSpec:'',//备品规格
                    deviceBrand:'', //品牌名称
                },


            }
        },
        components:{
            Loading,myHeader
        },
        mounted() {
            this.getSelect()
        },
        methods: {
            toSearch(){

                window.location.href ='list.html?search='+JSON.stringify(this.search)
            },
            //获取选项数据
            getSelect(){
                //行政区域
                this.until.get('/general/cat/listByPrntCd?prntCd=ck110')
                    .then(res=>{
                        this.districtNms = res.data.items
                    })
            }

        },

    }
</script>


