<template>
  <div id="tz">
      <div class="close" @click="handleclick">
        <a href="javascript:;" class="el-icon-close"></a>
      </div>
    <div class="demo-image">
      <div class="block">
        <el-image
            :src=" userDetail.userIcon "
        ></el-image>
      </div>
    </div>
      <span id="username" style="font-size: 24px">{{ userDetail.name }}</span>
      <span style="font-size: 15px">
        <div  v-if="userDetail.sex==0">
          <i class="iconfont" style="font-size: 25px;color: #1296db">&#xe631;</i>|  男
        </div>
        <div v-else>
          <i class="iconfont" style="font-size: 25px;color: #d4237a">&#xe642;</i>|  女
        </div>
        </span>
      <table>
        <tr><td><label for="userid">用户 ID:</label><span id="userid">{{ userDetail.userId }}</span></td></tr>
        <tr><td><label for="Stunums">用户学号 :</label><span id="Stunums">{{ userDetail.username }}</span></td></tr>
        <tr><td><label for="contact">联系方式:</label><span id="contact">{{ userDetail.userContact }}</span></td></tr>
        <tr><td><label for="address">用户位置:</label><span id="address">{{ userDetail.userPosition }}</span></td></tr>
      </table>
      <div>
        <div id="img1"></div>
        <div id="img2"></div>
      </div>
  </div>

</template>

<script>
import {reactive, toRefs, onMounted } from "vue";
import useMove from "utils/UserMove.js";

export default {
  name: "UserDetail",
  props:{
    userDetail:{
      type:Array,
      default:function (){
        return [];
      }
    }
  },
  emits:['close'],
  setup(props,context){
    const { userDetail } = toRefs(props);
    const data = reactive({});
    onMounted(() => {
      const el = document.getElementById("tz");
      useMove(el);
      console.log(userDetail)
    });
    const datas = toRefs(data);
    const handleclick =()=>{
      context.emit('close');
    }
    return {
      ...datas,
      handleclick,
      ...toRefs(props)
    };
  }
}
</script>

<style scoped >
@import "~@/assets/font_2480508_aj02sl1l2qj/iconfont.css";
#tz {
  width: 500px;
  height: 600px;
  background: #ffffff;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 8px 8px 5px #888888;
  position: relative;
  overflow: hidden;
  z-index: 2;
}
#img1{
  position: absolute;
  left: -40px;
  top: -10px;
  width: 250px;
  height: 250px;
  background: url("~@/assets/images/Jellyfish-pana.png") no-repeat;
  background-size:100% 100%;
  z-index: 1;
  transform: rotateZ(15deg);
  opacity:0.5;
}
#img2{
  position: absolute;
  right: -52px;
  bottom: -69px;
  width: 350px;
  height: 350px;
  background: url("~@/assets/images/Lighthouse-bro.jpg") no-repeat;
  background-size:100% 100%;
  z-index: -1;
  opacity:0.5;
}
.el-image{
  height: 140px;
  width: 140px;
  border-radius: 50%;
  margin: 30px auto;
  letter-spacing: 2px;
}
table,tr,td{
  text-align: left;
  width: 200px;
  height: 50px;
  margin: auto;
  font-size: 17px;
}
.close{
  font-size: 24px;
  text-align: right;
  margin: 5px;
}
</style>