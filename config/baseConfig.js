//一些基础数据的配置
﻿module.exports =  {
  port : 8090,//服务器端口
  localhost : "http://127.0.0.1:8090/mcgj/",//服务器地址
  websocket : "ws://127.0.0.1:8090/mcgj/websocket?token=",//websocket地址
  imgUrl : "/common/image?imgId=",//获取图片地址
  systemConfig : "/systemConfig/selectSystemConfigByKey",//获取系统配置的请求
  defaultErrorMessage : "服务宕机啦,请稍后再试"//发送请求错误消息
}
