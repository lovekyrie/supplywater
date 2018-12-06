<template>
    <div id="container">
        <div class="box">
            <div class="b-input">
                <p>手机号码：</p>
                <input type="text" placeholder="请输入手机号码" v-model="phone">
            </div>
            <div class="b-input">
                <p>登陆密码：</p>
                <input type="password" placeholder="请输入登录密码" v-model="psd">
            </div>
            <p class="b-btn" @click="submit">登陆</p>
            <p class="b-rs"><a href="./register.html">注册</a></p>
        </div>
        <div class="isWxbox">
            <p class="wxIcon"><img src="../img/l-wx.png" alt=""></p>
            <p class="wxNm">授权登陆</p>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        phone:'',
        psd:''
      }
    },
    mounted() {
    },
    methods: {
      submit(){
        /*let phone = this.reg.checkPhone(this.phone);
        if (phone != "ok") {
          return this.Toast(phone);
        }*/
        // let psd = this.reg.checkLoginPwd(this.psd);
        // if(psd !='ok'){
        //   return this.Toast(psd);
        // }
        let param = {

        }
        this.until.post('/general/access/appLogin?username=admin&password=1124&rememberMe=true',param)
          .then(res=>{
            if(res.status == 200){
              this.until.loSave('DD_token',JSON.stringify(res.data));
            }else {
              this.Toast(res.message)
            }
          },err=>{});

      },
      Toast(val){
        this.$hero.confirm.show({
          msg:val,
        });
      }
    },
    components: {}
  }
</script>