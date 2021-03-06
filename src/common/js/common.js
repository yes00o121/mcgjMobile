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
  //用户相关方法
  user : {
      //将user的值写入localStorage中
      setUser(user){
          localStorage.setItem("user",JSON.stringify(user));
      },
      //获取localStorage中的conversation数据
      getConversation(){
          return localStorage.currentConversation == null ? null : JSON.parse(localStorage.currentConversation);
      },
      //清空localStorage的用户数据,并且刷新页面
      reset(){
          localStorage.clear();
          location.reload();
      },
      //获取当前用户的token
      getToken(){
          return localStorage.user == null ? null : JSON.parse(localStorage.user).token;
      },
      //获取localStorage中的user数据
      getUser(){
          return localStorage.user == null ? null : JSON.parse(localStorage.user);
      },
      /*
      isLogin(){//全局方法，判断用户是否登录
        var user = localStorage.user;
        if(user != null && user != '' && user.substring(0,1)=='{' && user.substring(user.length,user.length-1) == '}'){
          //localStorage.user数据正常没有被用户修改过
          return true;
        }else{
          //用户没有登录,打开登录窗口
           this.$alert('请先登录!','提示');
           localStorage.clear();//重置用户
           //this.$refs.login.dialogVisible = true;
           //login.dialogVisible = true;
           return false;
        }
      }
      */
  },
  date : {
      //格式化时间
      formatDate(date){
          if(date == null || isNaN(date)){
              //return "数据异常";
              return null;
          }
          var time = new Date(date);
          //判断时间是否在今天内
          if(new Date().getYear() == time.getYear() && new Date().getMonth() == time.getMonth() && new Date().getDate() == time.getDate()){
              //获取时间进行小时和分钟的判断
              if(new Date().getTime()-time.getTime()<3600000){
                //在一小时内,计算出分钟数后返回
                return parseInt((new Date().getTime()-time.getTime())/1000/60)+"分钟前";
              }
              //不是一小时内的时间，获取小时候返回
              return parseInt((new Date().getTime()-time.getTime())/1000/60/60)+"小时前";
          }else{
            //时间不在今天,获取日期后返回
            if((new Date().getYear()+1900) == (time.getYear()+1900)){
              //同一年
              return (time.getMonth() + 1) + '-'+time.getDate();
            }else{
              //不是同一年
              return (time.getYear()+1900) + '-' + (time.getMonth()+1)+'-'+time.getDate();
            }
          }
      }
  },
  //元素处理方法
  element : {
      //获取指定标签内的img图片id
      getElementImageArr(element){
          if(element == null){
              return [];
          }
          var imgIdArr = [];
          var imgElementArr = $(element).find('img');
          for(let i = 0; i < imgElementArr.length; i++){
              if(imgElementArr[i].src.indexOf('http') != -1){
                imgIdArr.push(imgElementArr[i].src.split('imgId=')[1]);
              }else{
                imgIdArr.push(imgElementArr[i].src);
              }
          }
          return imgIdArr;
      },
      //设置图片的宽度,参数图片占比(0%-100%),不传参默认100%
      setElementImageWidth(element,percentage){
          var curPercentage = '100%';
          if(percentage != null){
              curPercentage = percentage;
          }
          if(element == null){
              return "";
          }
          //替换图片的地址为系统地址
          element = element.replace(/src=.*?(\"|').*?imgId=/g,'src=\"'+baseConfig.localhost + baseConfig.imgUrl+'')
          //给所有图片添加宽度
          return element.replace(/<img/g,'<img style="padding-bottom: 10px;max-width:'+curPercentage+'"');

      }
  }
}
