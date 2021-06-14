<template>
  <search-box style="padding-bottom: 40px" @search="searchID"></search-box>
    <UserDetail v-show="show" :userDetail="userDetail" @close="closewindow()"></UserDetail>
  <el-table
      :data="userslist.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      @row-click="(row)=>rowdata(row)">
    <el-table-column
        width="200%"
        label="权限ID"
        prop="roleId">
    </el-table-column>
    <el-table-column
        width="250%"
        label="用户ID"
        prop="useId">
    </el-table-column>
    <el-table-column
        width="200%"
        label="用户姓名"
        prop="name">
    </el-table-column>
    <el-table-column
        width="250%"
        label="联系方式"
        prop="userContact">
    </el-table-column>
    <el-table-column
        width="350%"
        label="地址"
        prop="userPosition">
    </el-table-column>
    <el-table-column
        width="200%"
        label="详情">
      <template v-slot="scope">
      <el-link href="javascript:;" @click="detail(scope.$index)">个人详情<i class="el-icon-view el-icon--right"></i> </el-link>
        </template>
    </el-table-column>
    <el-table-column
        width="200%"
        align="right"
        prop="userStatus">
      <template #header>
        <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
      </template>
      <template v-slot="scope">
        <el-dropdown style="margin-right: 10px" trigger="click" @command="handleCommand" v-if="$store.state.user.roleId < scope.row.roleId">
          <el-button size="small">
            权限<i class="el-icon-user el-icon--right"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="3">普通用户</el-dropdown-item>
              <el-dropdown-item command="2">管理员</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-popconfirm
            confirmButtonText='是'
            cancelButtonText='否'
            icon="el-icon-info"
            iconColor="red"
            title="是否要更改用户账号状态？"
            @confirm="changefreezing"
        >
          <template #reference>
            <el-button type="danger" size="small" v-if="scope.row.userStatus==0">
              <span>冻结</span>
            </el-button>
            <el-button type="info" size="small" v-else>
              <span>解除</span>
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <PaginationBox :totalpage="totalpage" @page="changepage" @size="changesize"></PaginationBox>
</template>

<script>
import SearchBox from '@/components/content/SearchBox';
import { ref,onMounted } from 'vue';
import {getUsersData,searchuser,freezing ,role } from 'network/Userlist.js';
import PaginationBox from '@/components/content/PaginationBox';
import UserDetail from '@/components/content/UserDetail';
import { ElMessage } from 'element-plus';
export default {
  name: "UsersList",
  components:{
    SearchBox,
    PaginationBox,
    UserDetail
  },
  setup(){
    let userslist =ref([]);
    let userDetail =ref();
    let totalpage =ref();       //总页数
    let pagesize =ref(20); //每一页数量
    let show =ref(false);
    //获取所有用户信息
    const userData =(currentpage,pagesize)=>{
      getUsersData(currentpage,pagesize).then(res =>{
        const userdatafilter=res.object.records.filter((item)=>{
          item.createTime=new Date(item?.createTime);
        })
        userslist.value=userdatafilter.value;
        totalpage.value=res.total;
      });
    }
    onMounted(()=>{
      userData(1,20);
    })
    //查看详情
    const detail= index =>{
      userDetail.value =userslist.value[index];
          show.value=true;
      }
      //关闭详情页面
    const closewindow = ()=>{
      show.value=false;
    }
    //切换页数和单页数量
    const changepage =(data)=>{
      userData(data,pagesize.value);
    }
    const changesize =(data)=>{
      userData(1,data);
    }
    const searchID =(data)=>{
      searchuser(data).then(res =>{
        userslist.value=res.object.records;
      }).catch(()=>{
        ElMessage.success({
          message: '输入有误或该用户不存在！',
          type: 'warning'
        });
      })
    }
    //点击某一行即可获取该行数据
    const rowprop = ref();
    const rowdata =(row)=>{
      rowprop.value=row;
    }
    const changefreezing=()=>{
      freezing(rowprop.value.username,rowprop.value.userStatus==0?1:0).then(() =>{
        ElMessage.success({
          message: '冻结状态已修改成功！',
          type: 'success'
        });
      }).catch(() =>{
        ElMessage.warning({
          message: '失败操作！',
          type: 'warning'
        });
      });
    }
    //修改权限
    const handleCommand=(command)=>{
      role(rowprop.value.userId,command).then(res =>{
        console.log(res);
        ElMessage.success({
          message: '用户'+rowprop.value.userId+'权限修改成功！',
          type: 'success'
        });
      }).catch(() =>{
        ElMessage.warning({
          message: '失败操作！',
          type: 'warning'
        });
      });
    }

    return {
      userslist,
      detail,
      closewindow,
      show,
      userDetail,
      searchuser,
      searchID,
      changefreezing,
      handleCommand,
      rowdata,
      changepage,
      changesize
    }
  }
}
</script>

<style scoped>
.el-table-column{
  width: 100px;
}
</style>