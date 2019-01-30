<!-- 贴吧贴子模板 -->
<template>
  <transition name="move">
    <div class="update-password" v-show="showFlag">
    <div class="title">
        <div class="back" @click="hideFn">
          <i class="icon-arrow_liftF9"></i>
        </div>
        <!--
        <h4>修改密码</h4>
        -->
      </div>
    <scroll
      ref="listScroll"
      :probe-type="probeType"
      :data="currentData"
      :pullUpLoad = "true"
      @pullingUp = "pullingDown"
      :click="true">
      <!-- 楼主数据 -->
      <div class="item" style="padding: 20px 20px 20px 20px;">
          <h4 style="font-size: 20px;font-weight: 600;">{{data.title}}</h4>
          <div style="padding-top:20px;width:100%">
              <ul>
                  <!-- 楼主数据 -->
                  <!--
                  <li class="item" style="position: relative; ">
                      <div>
                          <img style="border-radius: 20px;" width="40px" height="40px" :src="baseConfig.localhost + baseConfig.imgUrl + data.photo">
                      </div>
                      <div class="text" style="padding-left: 60px;top: -38px;position: inherit;font-size: 16px;">
                        {{data.userName}}
                      </div>
                      <div class="text" style="position: absolute;padding-left: 60px;top: 26px;font-size:12px;color:rgb(154, 160, 167);" >
                          {{data.conversationName}}吧 | {{common.date.formatDate(data.lastTime)}}
                      </div>
                  </li>
                  <li style="font-size:18px" v-html="common.element.setElementImageWidth(data.content)"></li>
                  -->
                  <!-- 楼层数据 -->
                  <li v-for="(item,index) in currentData" style="position: relative;margin-top:20px;">
                      <div>
                          <img style="border-radius: 20px;" width="40px" height="40px" :src="baseConfig.localhost + baseConfig.imgUrl + item.photo">
                      </div>
                      <div class="text" style="padding-left: 60px;top: -38px;position: inherit;font-size: 16px;">
                        {{item.userName}}
                      </div>
                      <div class="text" style="position: absolute;padding-left: 60px;top: 26px;font-size:12px;color:rgb(154, 160, 167);" >
                          第{{index+1}}楼 | {{item.createDate}}
                      </div>
                      <div style="font-size:18px;margin-bottom:20px;" v-html="common.element.setElementImageWidth(item.content)"></div>
                      <div style="border-bottom: 2px solid rgb(245, 245, 245);"></div>
                  </li>
              </ul>
          </div>
      </div>
      <!-- 楼层数据 -->
      <div class="item">

      </div>
      </scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import vButton from "base/vButton/vButton";
import scroll from "base/scroll/scroll.vue";
export default {
  data() {
    return {
      listenScroll : {type : Boolean, default: true},
      msg : '没有更多的数据了',
      showFlag: false,
      probeType : 3,
      currentPage : 1,//当前的页数,默认为第一页,后续追加
      limit : 3,//一页要现实的数量
      currentSize : 0,//当前贴子的楼层总数,用于判断是否还能获取新的数据
      url : '/conversationChildChild/selectCCCByCCId',
      data : {},//接收的贴子数据
      currentData :[],//楼层数据
      currentDataId : ""//记录当前用户的id,用于和第二次显示窗口的页面进行比较,判断是否同一个页面,进行不同的操作
    };
  },
  methods: {
    //用户拖到最后触发,只会执行一次
    pullingDown(){
        window.aa = this;
        //判断是否还有新的数据
        if(this.currentSize >= (this.currentPage * this.limit)){
            //小于总数,获取新一页的数据后追加到页面
            this.currentPage += 1;
            //加载延迟1秒
            setTimeout(()=>{
              this.getConversationChild();//获取新数据
            },1000)
        }
    },
    showFn(id) {
      this.data = this.$parent.$refs.conversationChild.data;
      if(this.currentDataId != this.data.id){
          //将页面定位到最上面
          this.$children[0].scroll.scrollTo(0,0);
          //和上一个点击的页面不同,将数据全部初始化
          this.currentDataId = id;
          this.currentPage = 1;//初始化页数
          this.getConversationChild();
      }
      this.showFlag = true;
    },
    //获取贴子数据
    getConversationChild(){
        this.common.ajax({
            url : this.url,
            data : {
                conversationChildId : this.data.conversation_child_id,
                start : this.currentPage,
                limit : this.limit,
                singleFloor : false//默认不是只看楼主
            },
            success : (res)=>{
                this.currentSize = res.result.size;
                //判断是否第一页,如果不是进行数据的追加
                if(this.currentPage > 1){
                    //如果当前的数量和拼接后的数量一致说明已经拼接过,不在进行拼接
                    if(this.currentData.concat(res.result.conversationChildChilds).length != this.currentData.length){
                        this.currentData = this.currentData.concat(res.result.conversationChildChilds)
                    }
                }else{
                    //进入页面数据初始化
                    this.currentData = res.result.conversationChildChilds;
                }

            }
        })
    },
    hideFn() {
      this.showFlag = false;
    }
  },
  components: {
    vButton: vButton,
    scroll : scroll
  }
};
</script>

<style lang="scss" scoped type="text/css">
.update-password{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0px;
  z-index: 30;
  width: 100%;
  color: #333;
  background: #fff;
  &.move-enter-active,
  &.move-leave-active {
    transition: all 0.2s linear;
  }
  &.move-enter,
  &.move-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .title{
    height: 56px;
    line-height: 56px;
    @include border-1px(#e6e6e6);
    .back{
      position: absolute;
      top: 10px;
      left: 0;
      .icon-arrow_liftF9{
        display: block;
        padding: 10px;
        font-size: 20px;
      }
    }
    h4{
      text-align: center;
      font-size: 15px;
      font-weight: bold;
    }
  }
  .update-wrapper{
    padding: 30px 20px 0px 20px;
    font-size: 14px;
    line-height: 30px;
    color: #333;
    margin-bottom: 15px;
    .input{
      margin-bottom: 15px;
      input{
        display: block;
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        padding: 12px 12px;
        font-size: 14px;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        &:focus{
          border-color: #66afe9;
          outline: 0;
          box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
        }
      }
    }
    .note{
      margin-bottom: 15px;
    }
    .verify{
      .input{
        display: flex;
        input{
          flex: 1;
        }
        .verify-code{
          display: inline-block;
          vertical-align: top;
          width: 125px;
          height: 34px;
          background-repeat: no-repeat;
          /*background-image: url('getCode.png');*/
        }
      }
    }
  }
}
</style>
