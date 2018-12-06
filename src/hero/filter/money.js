export default (Vue,options = {})=>{
  Vue.filter('money',(val)=>{
    return Number(val).toFixed(2);
  });
}