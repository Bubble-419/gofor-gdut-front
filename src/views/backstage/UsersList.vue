<template>
  <search-box style="padding-bottom: 40px" @search="searchID"></search-box>
    <UserDetail v-show="show" :userDetail="userDetail" @close="closewindow()"></UserDetail>
  <el-table
      :data="userslist"
      style="width: 100%"
      @row-click="(row)=>rowdata(row)">
    <el-table-column
        label="权限ID"
        prop="roleId">
    </el-table-column>
    <el-table-column
        label="用户ID"
        prop="userId">
    </el-table-column>
    <el-table-column
        label="用户姓名"
        prop="name">
    </el-table-column>
    <el-table-column
        label="联系方式"
        prop="userContact">
    </el-table-column>
    <el-table-column
        label="地址"
        prop="userPosition">
    </el-table-column>
    <el-table-column
        label="详情">
      <template v-slot="scope">
      <el-link href="javascript:;" @click="detail(scope.$index)">个人详情<i class="el-icon-view el-icon--right"></i> </el-link>
        </template>
    </el-table-column>
    <el-table-column
        align="right"
        label="操作"
        >
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
            @confirm="changefreezing(scope.row)"
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
    let currentpage=ref();//当前页面
    let show =ref(false);
    //获取所有用户信息
    const userData =(currentpage,pagesize)=>{
      getUsersData(currentpage,pagesize).then(res =>{
        console.log(res.object.records)
        userslist.value=res.object.records;
        totalpage.value=res.object.total;
        console.log(totalpage.value)
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
      currentpage.value=data;
    }
    const changesize =(data)=>{
      userData(1,data);
      currentpage.value=1;
    }
    const searchID =(data)=>{
      if(data!=''){
        searchuser(data).then(res =>{
          userslist.value=[];
          userslist.value.push(res.object);
        }).catch(()=>{
          ElMessage.success({
            message: '输入有误或该用户不存在！',
            type: 'warning'
          });
        })
      }else{
        userData(1,20);
      }

    }
    //点击某一行即可获取该行数据
    const rowprop = ref();
    const rowdata =(row)=>{
      rowprop.value=row;
    }
    //修改冻结状态
    const changefreezing=(row)=>{
      freezing({username:row.username,userStatus:row.userStatus}).then(() =>{
        ElMessage.success({
          message: '冻结状态已修改成功！',
          type: 'success'
        });
        userData(currentpage.value,pagesize.value);
      }).catch(() =>{
        ElMessage.warning({
          message: '失败操作！',
          type: 'warning'
        });
      });
    }
    //修改权限
    const handleCommand=(command)=>{
      role({username:rowprop.value.username,rid:command}).then(() =>{
        ElMessage.success({
          message: '用户'+rowprop.value.userId+'权限修改成功！',
          type: 'success'
        });
        userData(currentpage.value,pagesize.value);
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
      changesize,
      totalpage
    }
  }
}
</script>

<style scoped>
.el-table-column{
  width: 100px;
}
</style>