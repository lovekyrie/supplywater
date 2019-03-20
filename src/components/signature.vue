<style lang="less">
#app {
  width: 600px;
  margin: 0 auto;
}

.row {
  width: 100%;
  .signMain {
    position: relative;
    height: 240px;
    > p {
      text-align: center;
      position: absolute;
      top: 0;
      z-index: 2;
      display: block;
      width: 100%;
      font-size: 0.2rem;
      line-height: 0.6rem;
    }
    #signature {
      top: 0;
      left: 0;
      position: absolute;
      background: #ffffff;
      /*border: double 3px transparent;*/
      /*border-radius: 5px;*/
      border-radius: 15px 15px 0 0;
      background-image: linear-gradient(white, white),
        radial-gradient(circle at top left, #4bc5e8, #9f6274);
      background-origin: border-box;
      background-clip: content-box, border-box;
    }
  }
  div {
    &:nth-of-type(2),
    &:nth-of-type(3) {
      width: 50%;
      float: left;
    }

    > button {
      width: 100%;
      padding: 15px 0;
      background-color: #ffffff;
      color: #333333;
      border: 0;
      border-top: 1px solid #dddddd;
      color: #659ddd;
    }
  }
  .leftBtn button {
    border-radius: 0 0 0 15px;
    box-sizing: border-box;
    border-right: 1px solid #dddddd;
  }
  .right button {
    border-radius: 0 0 15px 0;
  }
}
</style>

<template>
  <div id="app">
    <div class="row">
      <div class="signMain">
        <p>签名</p>
        <VueSignaturePad id="signature" ref="signaturePad" saveType="image/png"/>
      </div>
      <div class="leftBtn">
        <button class="btn btn-outline-secondary float-right" @click="undo">取消</button>
      </div>
      <div class="right">
        <button class="btn btn-outline-primary float-left" @click="save">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueSignature from "vue-signature-pad";

Vue.use(VueSignature);
Vue.config.productionTip = false;
export default {
  name: "App",
  mounted() {
    // this.abc();
    // this.setCanvas()
  },
  methods: {
    //重置画布，以清除上次的书写
    setCanvas() {
      let canvas = document.getElementsByTagName("canvas")[0];
      console.log("####重置画布####");
      const context = canvas.getContext("2d");
      canvas.setAttribute("width", 600);
      canvas.setAttribute("height", 240);
      context.clearRect(0, 0, canvas.width, canvas.height);
      // canvas.setAttribute('width',0);
      // canvas.setAttribute('height',0);
      // console.log('#######')
      // console.log(canvas.width)
      // console.log(canvas.height)
    },
    undo() {
      this.$refs.signaturePad.undoSignature();
      this.$emit("closeSign");
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      if (data) {
        this.$Message.success("签名成功！");
        this.$emit("closeSign", data);
      } else {
        this.$Message.warning("您还没有签名！");
      }
    }
  }
};
</script>

