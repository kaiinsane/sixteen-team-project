<template>
  <div class="container">
    <el-row type="flex" justify="space-between">

      <!-- 左边栏--发表新攻略 -->
      <div class="left">
        <h2>发表新攻略</h2>
        <p>分享你的点点滴滴，让更多小姐姐关注你~~</p>

        <!-- 标题 -->
        <el-input 
          v-model="form.title" 
          placeholder="请输入标题" 
          class="input-title">
        </el-input>

        <!-- 富文本框 -->
        <div class="textbox" id="app">
          <VueEditor :config="config" :content="form.content" @change="onEditorChange($event)"/>
        </div>

        <!-- 选择城市 -->
        <div>
          <span>选择城市</span>
          <el-autocomplete
            class="input-city"
            v-model="form.city"
            :fetch-suggestions="querySearch"
            placeholder="请搜索游玩城市"
            :trigger-on-focus="false"
            @select="handleSelect">
          </el-autocomplete>
        </div>

        <!-- '发布'或者'保存到草稿' -->
        <el-button type="primary" @click="handleSubmit">发布</el-button>或者
        <el-button type="warning" @click="handleAddDraft">保存到草稿</el-button>
        <!-- 按钮结束 -->
      </div>

      <!-- 右边栏--草稿箱 -->
      <div class="right">
        <div class="draft-box">
          <h4>
            草稿箱({{draft.length}})
          </h4>
          <div 
            class="draftList" 
            v-for="(item,index) in draft" 
            :key="index">
            <div>
              <div class="draftEdit">
                <a href="#" @click="handeleDel(index)">删除</a>
                <div @click="handeleEdit(index)">
                  {{item.title}}
                  <i class="el-icon-edit"></i>
                </div>
              </div>
              <p>{{systemDate}}</p>
            </div>   
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css"
let VueEditor

if (process.browser) {
    VueEditor = require('vue-word-editor').default
}

export default {
  name: 'app',
  data () {
    return {
      restaurants: [],
      form: {
        title: '',
        content: '',
        city: ''
      },

      systemDate: '',

      draft:[{title: '',content: '',city: ''}],
    config: {
      modules: { 
        // 工具栏
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
          ['image', 'video'],

          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
        ]
      },
      // 主题
      theme: 'snow',
      uploadImage: {
        url: "http://localhost:1337/upload",
        name: "files",
        uploadBefore(file){
          return true
        },
        uploadProgress(res){

        },
        uploadSuccess(res, insert){
          insert("http://localhost:1337" + res.data[0].url)
        },
        uploadError(){},
        showProgress: false
      },

      uploadVideo: {
        //url: "http://157.122.54.189:9095/upload",
        url: "http://localhost:1337/upload",
        name: "files",
        uploadBefore(file){
          return true
        },
        uploadProgress(res){

        },
        uploadSuccess(res, insert){
          insert("http://localhost:1337" + res.data[0].url)
        },
        uploadError(){},
        }
     }
    }
  },

  mounted() {
    // console.log(this.$store.state.user.userInfo.token)
    this.draft = JSON.parse(localStorage.getItem('airs') || [])

    let nowDate = new Date();
    let date = {
      year: nowDate.getFullYear(),
      month: nowDate.getMonth() + 1,
      date: nowDate.getDate()
    }
    date.month = date.month < 10 ? '0' + date.month : date.month
    date.date = date.date < 10 ? 0 + date.date : date.date
    this.systemDate = date.year + '-' + date.month + '-' + date.date
  },

  components: {
    VueEditor
  },

  methods: {
    // 获取富文本框的数据
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.form.content = html;
    },
    querySearch(queryString,cb){
      var restaurants = this.restaurants

      this.$axios({
        url: '/cities',
        params: {name: queryString}
      }).then(res => {
        // console.log(res)
        if(res.status === 200) {
          const {data} = res.data
          // 调用callback返回建议列表数据
          data.forEach(e=>{
            e.value = e.name
          })
          cb(data)
          // 设置默认选中第一个
          this.city = data[0].id
        }
      })
    },

    handleSelect(item){
      // console.log(item)
      this.form.city = item.value
    },

    handleSubmit(){
      if(!this.$store.state.user.userInfo.token){
        this.$message.warning('请先登录')
        this.$router.push('/user/login')
      }

      if(!this.form.title){
        this.$message.warning('请输入标题')
        return
      }

      if(!this.form.city){
        this.$message.warning('请输入城市')
        return
      }

      const {title,content,city} = {...this.form}
      const data = {title,content,city}
      const {token} = this.$store.state.user.userInfo
      this.$axios({
        url:'/posts',
        method:'POST',
        data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        const {status,message} = res.data
        if(status===0){
          this.$message.success(message)
          this.$router.push('/post')
        }
        if(status===1){
          this.$message.warning(message)
        }
      })
    },

    handleAddDraft(){
      const obj = {...this.form}

      this.draft = JSON.parse(localStorage.getItem("airs") || [])
      this.draft.unshift(obj)
      localStorage.setItem('airs',JSON.stringify(this.draft))

      this.form.title = ''
      this.form.city = ''
      this.form.content = ''
    },

    handeleDel(index){
      const obj = {...this.form}
      this.draft = JSON.parse(localStorage.getItem('airs') || [])
      this.draft.splice(index,1)
      localStorage.setItem('airs', JSON.stringify(this.draft))
      this.$message.success('删除成功')
    },

    handeleEdit(index){
      this.form = {...this.draft[index]}
    },
    getCity(value,callback,select) {
      if(!value){
        return
      }

      this.$axios({
        url: '/airs/city?name' + value
      }).then(res => {
        const {data} = res.data
        const newData = data.map(v => {
          return{
            ...v,
            value: v.name
          }
        })

        switch(select) {
          case 'depart':
            this.form.city = newData[0].value
            break
          default:
            break
        }

        callback(newData)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
  .right {
    width: 200px;
    min-height: 100px;
    .draft-box {
      width: 200px;
      min-height: 100px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      h4 {
        font-size: 18px;
        font-weight: 350;
        margin: 10px;
        color: rgba(0, 0, 0, 0.5);
      }
      div {
        font-size: 16px;
        margin: 0 10px;
        color: #333333;
      }
      p {
        font-size: 14px;
        color: #ccc;
      }
      .draftEdit {
        margin-left: 0px;
        position: relative;
        div {
          &:hover {
            color: orange;
            cursor: pointer;
          }
        }

        a {
          cursor: pointer;
          position: absolute;
          top: 0px;
          right: -5px;
          &:hover {
            color: red;
          }
        }
      }
    }
  }
  .left {
    flex: 1;
    margin-right: 50px;

    h2 {
      font-size: 22px;
      font-weight: 400;
      margin-bottom: 10px;
      display: block;
    }
    p {
      margin-bottom: 10px;
      color: #999;
      font-size: 12px;
    }
    .input-title {
      margin-bottom: 16px;
    }
    .quill-editor {
      min-height: 200px;
      max-height: 200px;
      margin-bottom: 16px;
    }
    .input-city {
      width: 200px;
      margin-bottom: 16px;
    }
    .textbox {
      quill-editor {
        height: 500px;
      }
    }
    .textbox {
      margin-bottom: 30px;
      /deep/ .ql-container {
        height: 150px;
        overflow: hidden;
      }
    }
    .el-button--primary{
      margin-right: 10px;
    }
  }
}
</style>