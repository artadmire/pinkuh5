<template>
    <h5 >
        <i @click='goBack'></i> {{title}}
    </h5>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:''
        }
    },
    data(){
        return{
        }
    },
    created(){
       
    },
    methods: {
        goBack(){
            history.go(-1);
        }
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
h5{
    width: 100%;
    height: 44px;
    text-align: center;
    background: white;
    line-height: 44px;
    position: fixed;
    top: 0;
    left:0;
    font-size: 14px;
    border-bottom: 1px solid #f7f8fa;/*no*/
    i{
        width: 20px;
        height: 20px;
        position: absolute;
        left: 20px;
        top: 11px;
        background: url('~@/assets/order_navbar_arrow_back_icon@3x.png');
        background-size: 100% 100%;
    }
}
</style>
