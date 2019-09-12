<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <OrderForm :data="dataInfo"/>

            <!-- 侧边栏 -->
            <OrderAside :data="dataInfo"/>
        </el-row>
    </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm'
import OrderAside from '@/components/air/orderAside'
export default {
    data(){
        return {
            dataInfo:{
                seat_infos:{}
            }
        }
    },
    components:{
        OrderForm,
        OrderAside
    },
    mounted(){
        const {id,seat_xid} = this.$route.query
        this.$axios({
            url:'/airs/' + id,
            params:{seat_xid}
        }).then(res => {
            this.dataInfo = res.data
            console.log(this.dataInfo);
            
        })
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>