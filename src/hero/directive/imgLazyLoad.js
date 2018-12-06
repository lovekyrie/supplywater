export default (Vue , options = {})=>{
  if(!Array.prototype.remove){
    Array.prototype.remove = function(item){
      if(!this.length) return
      var index = this.indexOf(item);
      if( index > -1){
        this.splice(index,1);
        return this
      }
    }
  }
  let init = {
    default: '',
    selector:'window',
    offsetTop:30,
    other:[]
  };
  Object.assign(init,options);
  //需要进行监听的图片列表，还没有加载过
  let listenList = [];
  //已经加载过得图片缓存列表
  let imageCatcheList = [];
  let imageErrList = [];


  const isAlredyLoad = (src) => {
    if(imageCatcheList.indexOf(src) > -1){
      return 'success';
    }else if(imageErrList.indexOf(src) > -1){
      return 'err';
    }else {
      return 'no';
    }
  };
  //检测图片是否可以加载，如果可以则进行加载
  const isCanShow = (item) =>{
    let ele = item.ele;
    let src = item.src;
    //图片距离页面顶部的距离
    let top = ele.getBoundingClientRect().top;
    let all = init.other.reduce((p,obj)=>{
      return p + document.querySelector(obj).offsetHeight;
    },0);
    //页面可视区域的高度
    let windowHeight = window.innerHight;
    //top + offsetTop 已经进入了可视区域
    if(top - init.offsetTop < window.innerHeight - all){
      let image = new Image();
      image.src = src;
      image.onload = function(){
        ele.src = src;
        imageCatcheList.push(src);
        listenList.remove(item);
      }
      //图片加载失败显示默认图片,将图片路径push到缓存中,从等待加载数组中移除
      image.onerror = function () {
        imageErrList.push(src);
        listenList.remove(item);
      }
      return true;
    }else{
      return false;
    }
  };
  const onListenScroll = () =>{
    if(init.selector == 'window'){
      window.addEventListener('scroll',function(){
        let length = listenList.length;
        for(let i = 0;i<length;i++ ){
          isCanShow(listenList[i]);
        }
      })
    }else {
      document.getElementById(init.selector).addEventListener('scroll',function () {
        let length = listenList.length;
        for(let i = 0;i<length;i++ ){
          isCanShow(listenList[i]);
        }
      })
    }
  }
  //Vue 指令最终的方法
  const addListener = (ele,binding) =>{
    //绑定的图片地址
    let imageSrc = binding.value;
    //如果已经加载过，则无需重新加载，直接将src赋值,加载失败显示默认图片,未加载进行加载
    switch (isAlredyLoad(imageSrc)){
      case 'success':
        ele.src = imageSrc;
        return;
      case 'err':
        return;
      case 'no':
        break;
    }
    let item = {
      ele:ele,
      src:imageSrc
    }

    //图片显示默认的图片
    //ele.src = init.default;
    //再看看是否可以显示此图片
    if(isCanShow(item)){
      return
    }
    //否则将图片地址和元素均放入监听的lisenList里
    listenList.push(item);

    //然后开始监听页面scroll事件
    onListenScroll();
  }


  Vue.directive('lazyload',{
    inserted:addListener,
    updated:addListener
  })
}
/**
 * @premise Vue.use(lazyLoad)
 * @param   {selector:滚动层id,offsetTop:距离可视区域像素,other:可视区域宽度减去指定元素高度}
 * @mode    v-lazyLoad="obj.imgSrc"
 */
