<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="225px">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
                :uniqueOpened="true"
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color=var(--font-title-color)
                text-color="#fff"
                router=true
                active-text-color="#ffd04b">
              <div class="iconfont el-logo" style="font-size: 30px; color: var(--theme-light-green);">&#xe844;
                <p style="display: inline-block; margin-left: 13px; font-size: 21px;">校园跑腿</p>
              </div>
              <el-submenu index="4">
                <template #title>
                  <i class="iconfont icon">&#xe66c;</i>
                  <span class="word">数据展示</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/show-echart">
                    <i class="iconfont" style="margin-right: 5px">&#xf1e5;</i>
                    <template #title>订单数额</template>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="/UsersList">
                <i class="iconfont icon">&#xe693;</i>
                <template #title>用户管理</template>
              </el-menu-item>
              <el-menu-item index="/OrderList">
                <i class="iconfont icon">&#xe627;</i>
                <template #title>订单管理</template>
              </el-menu-item>
              <el-menu-item index="/ComplainCase">
                <i class="iconfont icon">&#xe649;</i>
                <template #title>投诉反馈</template>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header style="height: 50px;">
          <div>
            <i class="iconfont" style="font-size: 35px;float: left;margin-top: 5px;color: var(--theme-light-green)">&#xe651;
              <span style="font-size: 20px">后台管理</span>
            </i>
          </div>
          <div class="demo-image">
            <div style="float: right;line-height: 42px;color: var(--theme-light-green);margin-right: 10px">{{ $store.state.user.name }}</div>
            <div class="block">
              <el-image
                  style="width: 42px; height: 42px;border-radius: 50%;float: right;margin:4px 20px 0 0;"
                  :src="$store.state.user.userIcon"
              ></el-image>
            </div>
          </div>
        </el-header>
        <el-main>
          <div id="showcontainer" style="background-color: #ffffff">
            <router-view></router-view>
          </div>
          <div class="footer">
            <div class="iconfont" style="font-size: 30px;margin-top: 20px;">&#xe844;</div>
            <div>Copyright©2021 龙王轰趴体验技术部出品</div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'bsIndex',
  components: {
  },
  setup(){
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
@import "~@/assets/font_2480508_aj02sl1l2qj/iconfont.css";
.common-layout{
  height: 100vh!important;
}
.el-header{
  background-color: var(--theme-dark-green);
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  height: 100%;
}

.el-main {
  background-color: var(--bg-color);;
  color: #333;
  text-align: center;
  display: flex!important;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
#showcontainer{
  flex: 1;
}
.el-container {
  height: 100%;
}
.el-container .el-aside,.el-row,.el-col,.el-menu{
  height: 100%;
  width: 224px;
}
.el-menu>.el-menu-item ,.word{
  letter-spacing: 4px;
  font-size: 16px !important;
}
.icon{
  margin-right: 10px;
  font-size: 25px;
  color: var(--font-color)!important;
}
.el-logo{
  margin: 25px 0;
}
.footer{
  height: 100px;
  color: rgb(132,133,170);
  text-align: center;
  user-select: none;
  flex-shrink: 0;
}
.footer>div{
  height: 40px;
  font-size: 14px;
}
</style>