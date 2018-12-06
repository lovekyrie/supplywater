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
        width: 100%;
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
        <Form :model="search" :label-width="80" class="search">
            <FormItem label="行政区域">
                <Select v-model="search.districtCd">
                    <Option v-for="item in districtNms" :value="item.cd" :key="item.cd">{{item.nm}}</Option>
                </Select>
            </FormItem>
            <FormItem label="设备名称">
                <Input v-model="search.deviceNm" placeholder=""></Input>
            </FormItem>
            <FormItem label="小区名称">
                <Input v-model="search.estateNm" placeholder=""></Input>
            </FormItem>
            <FormItem label="供货单位">
                <Input v-model="search.supplyer" placeholder=""></Input>
            </FormItem>
            <FormItem label="设备大类">
                <Select v-model="search.deviceBcatCd">
                    <Option v-for="item in deviceBcatNms" :value="item.cd" :key="item.cd">{{item.nm}}</Option>
                </Select>
            </FormItem>
            <FormItem label="设备小类">
                <Select v-model="search.deviceScatCd">
                    <Option v-for="item in deviceScatNms" :value="item.cd" :key="item.cd">{{item.nm}}</Option>
                </Select>
            </FormItem>
            <FormItem label="区域">
                <Select v-model="search.waterSupplyAreaCd">
                    <Option v-for="item in waterSupplyAreas" :value="item.cd" :key="item.cd">{{item.nm}}</Option>
                </Select>
            </FormItem>
            <FormItem label="质保日期">
                <Row>
                    <Col span="11">
                        <DatePicker type="date" placeholder="" v-model="search.warrantyDate"></DatePicker>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                        <TimePicker type="time" placeholder="" v-model="search.warrantyTime"></TimePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="安装日期">
                <Row>
                    <Col span="11">
                        <DatePicker type="date" placeholder="" v-model="search.installDate"></DatePicker>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                        <TimePicker type="time" placeholder="" v-model="search.installTime"></TimePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="投用日期">
                <Row>
                    <Col span="11">
                        <DatePicker type="date" placeholder="" v-model="search.startUsingDate"></DatePicker>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                        <TimePicker type="time" placeholder="" v-model="search.startUsingTime"></TimePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="是否过保">
                <Select v-model="search.warrantyPassed">
                    <Option value="2">全部</Option>
                    <Option value="1">已过保</Option>
                    <Option value="0">未过保</Option>
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
                title:'设备信息查询',
                districtNms:[],  //行政区域
                deviceBcatNms:[], //大类
                deviceScatNms:[],//小类
                waterSupplyAreas:[{
                    cd:'500.9.S',
                    nm:'超高区',
                },{
                    cd:'500.9.H',
                    nm:'高区',
                },{
                    cd:'500.9.M',
                    nm:'中区',
                },{
                    cd:'500.9.L',
                    nm:'低区',
                },{
                    cd:'500.9.Z',
                    nm:'直供',
                }],//区域
                search:{
                    deviceNm:'', //设备名称
                    estateNm:'',//小区名称
                    supplyer:'', //供货单位
                    districtCd:'',//行政区域
                    deviceBcatCd:'', //大类
                    deviceScatCd:'',  //小类
                    warrantyDate:'',//质保
                    warrantyTime:'',//质保
                    installDate:'',//安装
                    installTime:'',//安装
                    startUsingDate:'',//投用
                    startUsingTime:'',//投用
                    waterSupplyAreaCd:'', //区域

                    warrantyPassed:'', //过保
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
                if(this.search.warrantyDate){
                    let myDate1 = this.until.formatDate(this.search.warrantyDate)
                    this.search.warrantyDate = myDate1.year+'-'+myDate1.month+'-'+myDate1.day
                }
                if(this.search.installDate){
                    let myDate1 = this.until.formatDate(this.search.installDate)
                    this.search.installDate = myDate1.year+'-'+myDate1.month+'-'+myDate1.day
                }
                if(this.search.startUsingDate){
                    let myDate1 = this.until.formatDate(this.search.startUsingDate)
                    this.search.startUsingDate = myDate1.year+'-'+myDate1.month+'-'+myDate1.day
                }
                console.log(this.search)
                window.location.href = 'list.html?search='+JSON.stringify(this.search)
            },
            //获取选项数据
            getSelect(){
                //行政区域
                this.until.get('/general/cat/listByPrntCd?prntCd=70000')
                    .then(res=>{
                        this.districtNms = res.data.items
                    })
                //大类
                this.until.get('/general/cat/listByPrntCd?prntCd=500.1')
                    .then(res=>{
                        this.deviceBcatNms = res.data.items
                    })
            }
        },
        watch:{
            'search.deviceBcatCd'(val){
                // console.log(val)
                //小类
                this.until.get('/general/cat/listByPrntCd?prntCd='+val)
                    .then(res=>{
                        this.deviceScatNms = res.data.items
                    })
             },
            // deep: true
        }

    }
</script>


