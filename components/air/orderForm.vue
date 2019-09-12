<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in userInfo.users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in data.insurances" :key="index">
          <el-checkbox :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`" border
          @change="handleChoose(item.id)"></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="userInfo.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="userInfo.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="userInfo.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <span v-show="false">{{allPrice}}</span>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      userInfo: {
        users: [
          {
          username: "",
          id: ''
        }
        ],
        insurances:[],
        contactName:'',
        contactPhone:'',
        captcha: "000000",
        invoice:false,
        seat_xid:'',
        air:''
      }
    };
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.userInfo.users.push(
          {
          username: "",
          id: ''
        }
      )
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.userInfo.users.splice(index,1)
    },

    // 保险的勾选和取消
    handleChoose(id){
      let index = this.userInfo.insurances.indexOf(id)
      if(index > -1){
        this.userInfo.insurances.splice(index,1)
      }else {
        this.userInfo.insurances.push(id)
      }
    },

    // 发送手机验证码
    handleSendCaptcha() {
      this.$axios({
        url: `/captchas`,
        method: "POST",
        data: {
            tel: this.userInfo.contactPhone
        }
    }).then(res => {
        const {code} = res.data;
        this.$confirm(`模拟手机验证码为：${code}`, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
        })
    })
    },

    // 提交订单
    handleSubmit() {
      const {id,seat_xid} = this.$route.query
      this.userInfo.air = id
      this.userInfo.seat_xid = seat_xid

      // 表单验证
      if(!this.userInfo.users[0].username || !this.userInfo.users[0].id){
        this.$message.error('乘机人不能为空')
        return;
      }

      if(!this.userInfo.contactName){
        this.$message.error('联系人不能为空')
        return;
      }

      if(!this.userInfo.contactPhone){
        this.$message.error('联系电话不能为空')
        return;
      }

      if(!this.userInfo.captcha){
        this.$message.error('验证码不能为空')
        return;
      }

      this.$axios({
        url:'/airorders',
        method:'POST',
        headers:{ Authorization: `Bearer ${this.$store.state.user.userInfo.token}`},
        data:this.userInfo
      }).then(res=>{
        if(res.status === 200){
          const {id} = res.data.data 
          
          this.$router.push({
            path:'/air/pay',
            query:{id}
            })
        }
        
      })
      
    }
  },
  computed:{
    allPrice(){
      let price = this.data.seat_infos.org_settle_price
      price += this.data.airport_tax_audlet
      price += this.userInfo.insurances.length * 30
      price *= this.userInfo.users.length
      this.$store.commit('air/setAllPrice',price)
      this.$store.commit('air/setUserNumber',this.userInfo.users.length)
      return price
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>