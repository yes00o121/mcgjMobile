import baseConfig from "../../../config/baseConfig";
import $ from "jquery";

export default {
  // 数据请求方法,携带用户token
  ajax(param){
    if(param == null){
      throw "参数异常";
    }
    //data默认添加用户token
    if(param.data == null){
        param.data = {};
    }
    //拼接域名
    param.url = baseConfig.localhost + param.url;
    // 请求类型为空,默认使用post
    if(!param.type){
      param.type = 'POST';
    }
    // 获取用户数据，如果获取不到用户数据不添加token参数
    if(this.user){
      param.data.token = this.user.getToken();
    }
    if(!param.success){
      param.success =(res)=>{
          console.log('请求成功');
      }
    }
    if(!param.error){
      param.error =(res)=>{
        this.$alert(baseConfig.defaultErrorMessage,'提示');
      }
    }
    $.ajax(param)
  },

}
