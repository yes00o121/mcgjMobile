//杨晨 2019-1-11 首页时时更新贴吧数据模板
<template>
  <div class="image-load">
    <scroll
      ref="listScroll"
      :probe-type="probeType"
      :data="discList"
      :click="true">
        <div style="padding-top:20px;" v-for="(disc,index) in discList" @click="pageJump(disc)" v-on:mousedown = "select" v-on:mouseup = "noSelect">
            <ul>
              <li class="item" style="position: relative; ">
                  <div>
                      <img style="border-radius: 20px;" width="40px" height="40px" v-lazy="baseConfig.localhost + baseConfig.imgUrl + disc.photo">
                  </div>
                  <div class="text" style="position: inherit;top: -10px;padding-left: 20px;">
                    {{disc.userName}}
                  </div>
                  <div class="text" style="position: absolute;padding-left: 60px;top: 20px;font-size:12px;color:rgb(154, 160, 167);" >
                      {{disc.conversationName}}吧 | {{common.date.formatDate(disc.lastTime)}}
                  </div>
              </li>
              <li>
                <div class="item" style="font-size: 16px;">
                    {{disc.title}}
                </div>
                <div style="display: -webkit-box;">
                    <div  v-for="(imgId,index) in common.element.getElementImageArr(disc.content)" style="max-height:150px;padding-bottom:20px;">
                        <img style="max-height:200px;max-width:100px;padding-left:20px" v-if="index < 3" v-lazy="baseConfig.localhost + baseConfig.imgUrl + imgId">
                    </div>
                </div>
                <div class="item">
                    <div title="收藏" style="margin-left:10px;background: url(../../../static/images/icon.png) no-repeat -30px -108px;width: 25px;height: 25px;">
                    </div>
                    <span style="padding-left:5px;">0</span>
                    <div title="点赞" @click.stop="fabulous" style="margin-left:50px;background: url(../../../static/images/icon.png) -65px -147px no-repeat;width: 25px;height: 25px;"></div>
                    <span style="padding-left:5px;">0</span>
                    <div title= "评论" @click.stop="reply" style="margin-left:50px;background: url(../../../static/images/icon.png) -143px -70px no-repeat;width: 25px;height: 25px;"></div>
                    <span style="padding-left:5px;">{{disc.replyNumber}}</span>
                    <div title = "转发" @click.stop="forward" style="margin-left:50px;background: url(../../../static/images/icon.png) -65px -32px no-repeat;width: 25px;height: 24px;"></div>
                    <span style="padding-left:5px;">0</span>
                </div>
                <div style="border-bottom:3px solid #f5f5f5">
                </div>
              </li>
            </ul>
        </div>
        <!--
        <h1 class="list-title">景点推荐</h1>
        <ul>
          <li v-for="item in discList" class="item">
            <div class="icon">
              <img width="60" height="60" v-lazy="item.imgurl">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.name"></h2>
              <p class="desc" v-html="item.desc"></p>
            </div>
          </li>
        </ul>
        -->
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import scroll from "base/scroll/scroll.vue";

export default {
  props: {
    discList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      probeType: 0
    };
  },
  methods : {
      pageJump(data){
          //this.$alert('功能开发中!',{title:'提示'})
          this.$parent.$refs.conversationChild.data = data;//将数据赋值给模板
          this.$parent.$refs.conversationChild.showFn(data.id);//显示贴子页面
      },
      //点赞
      fabulous(){
          this.$alert('功能开发中!',{title:'提示'})
      },
      //转发
      forward(){
          this.$alert('功能开发中!',{title:'提示'})
      },
      //评论
      reply(){
          this.$alert('功能开发中!',{title:'提示'})
      },
      //点击某条记录
      select(e){
          this.$(e.currentTarget).css('background-color','#eeeeef')
      },
      //取消点击某条记录
      noSelect(e){
        this.$(e.currentTarget).css('background-color','')
      }

  },
  created() {
    this.probeType = 3;
  },
  components: {
    scroll: scroll
  }
};
</script>
<style lang="scss">
.image-load{
  width: 100%;
  height: 100%;
  .list-title{
    height: 65px;
    line-height: 65px;
    text-align: center;
    font-size: 14px;
    color: #999;
  }
  .item{
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 20px 20px 20px;
    .icon{
      flex: 0 0 60px;
      width: 60px;
      padding-right: 20px;
    }
    .text{
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      font-size: 14px;
      .name{
        margin-bottom: 10px;
        color: #999;
      }
      .desc{
        color: #999;
      }
    }
  }
}
</style>
