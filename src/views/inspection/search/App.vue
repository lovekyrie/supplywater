<style lang="less" scoped>
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
                        <DatePicker type="date" placeholder="" v-model="search.inspectPlanTimeBeg" @on-change="changeDate1" :options="options1"></DatePicker>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                        <DatePicker type="date" placeholder="" v-model="search.inspectPlanTimeEnd" @on-change="changeDate2" :options="options2"></DatePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="泵房编号">
                <Input v-model="search.estateNm" placeholder=""></Input>
            </FormItem>
            <FormItem label="巡检单位">
            <el-select  v-model="search.inspUnitCd" filterable placeholder="巡检单位" clearable >
            <el-option  v-for="item in inspUnitNms"  :key="item.nm"  :label="item.nm"  :value="item.cd"> </el-option>
             </el-select>
            </FormItem>
            <FormItem label="供水模式">
             
            <el-select  v-model="search.waterSupplyModeCd" filterable placeholder="供水模式" clearable >
            <el-option  v-for="item in waterSupplyModeNms"  :key="item.cd"  :label="item.nm"  :value="item.cd"> </el-option>
             </el-select>
           
            </FormItem>

            <FormItem>
                <Button type="primary" @click="toSearch()">搜索</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Loading from "../../../hero/components/loading";
    import myHeader from "../components/myHead";
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    Vue.use(ElementUI);
    export default {
        data() {
            return {
                title:'',
                type:'', //查询类型(巡检任务、巡检报表、过期巡检)
                //巡检单位
                inspUnitCd:[],
                //供水模式
                waterSupplyModeNms:[],
                options1:{},
                options2:{},
                inspUnitNms:[],
                search:{
                    estateNm:"",//泵房名称
                    //供水模式
                    waterSupplyModeCd:'',
                    //巡检单位
                    inspUnitNmCd:"",
                    estateNm:'',//小区名称
                    phCd:'',  //泵房编号
                    inspectPlanTimeBeg:'',//启用时间
                    inspectPlanTimeEnd:'',//结束时间
                },


            }
        },
        components:{
            Loading,myHeader
        },
        mounted() {
             this.getSelect()
            this.title = this.until.getQueryString('title')+'查询'
            this.type = this.until.getQueryString('type')
           
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
                //巡检单位
                 this.until.get('/general/cat/listByPrntCd?prntCd=30010.400')
                    .then(res=>{
                         this.inspUnitNms = res.data.items
                    }) 
                 //供水模式   
                 this.until.get('/general/cat/listByPrntCd?prntCd=6a')
                    .then(res=>{
                         this.waterSupplyModeNms = res.data.items
                    }) 


            }

        },

    }
</script>


