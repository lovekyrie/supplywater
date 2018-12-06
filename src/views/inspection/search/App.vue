<style lang="less">
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
            <FormItem label="巡检日期">
                <Row>
                    <Col span="11">
                        <DatePicker type="date" placeholder="" v-model="search.usageDate" @on-change="changeDate1" :options="options1"></DatePicker>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                        <DatePicker type="date" placeholder="" v-model="search.usageDate2" @on-change="changeDate2" :options="options2"></DatePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="泵房编号">
                <Input v-model="search.phCd" placeholder=""></Input>
            </FormItem>
            <FormItem label="巡检单位">
                <Select v-model="search.districtCd">
                    <Option v-for="item in districtNms" :value="item.cd" :key="item.cd">{{item.nm}}</Option>
                </Select>
            </FormItem>
            <FormItem label="供水模式">
                <Select v-model="search.districtCd">
                    <Option v-for="item in districtNms" :value="item.cd" :key="item.cd">{{item.nm}}</Option>
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
                title:'',
                type:'', //查询类型(巡检任务、巡检报表、过期巡检)
                districtNms:[],  //行政区域数据
                options1:{},
                options2:{},
                search:{
                    districtCd:'',
                    estateNm:'',//小区名称
                    phCd:'',  //泵房编号
                    usageDate:'',//启用时间
                    usageDate2:'',//启用时间
                },


            }
        },
        components:{
            Loading,myHeader
        },
        mounted() {
            this.title = this.until.getQueryString('title')+'查询'
            this.type = this.until.getQueryString('type')
            this.getSelect()
        },
        methods: {
            toSearch(){

                if(this.search.usageDate){
                    let myDate1 = this.until.formatDate(this.search.usageDate)
                    this.search.usageDate = myDate1.year+'-'+myDate1.month+'-'+myDate1.day
                }

                if(this.search.usageDate2){
                    let myDate2 = this.until.formatDate(this.search.usageDate2)
                    this.search.usageDate2 = myDate2.year+'-'+myDate2.month+'-'+myDate2.day
                }

                window.location.href = this.type+'.html?search='+JSON.stringify(this.search)
            },
            changeDate1:function(e){
                this.search.usageDate = e
                this.options2 = {
                    disabledDate:date=> {
                            return date && date.valueOf() < new Date(this.search.usageDate);
                    }
                }
            },
            changeDate2:function(e){
                this.search.usageDate2 = e
                this.options1 = {
                    disabledDate:date=> {
                            return date && date.valueOf() > new Date(this.search.usageDate2);
                    }
                }
            },
            //获取选项数据
            getSelect(){
                //行政区域
                this.until.get('/general/cat/listByPrntCd?prntCd=70000')
                    .then(res=>{
                        // this.districtNms = res.data.items
                    })
            }

        },

    }
</script>


