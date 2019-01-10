<template>
    <div class="confirm" >
        <div class="confirm_box">
            <p>{{title}}</p>
            <div>
                <span class="cancel_btn" @click='cancelFunc'>{{cancelTitle}}</span>
                <span class="confirm_btn" @click='confirmFunc'>{{confirmTitle}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        cancelTitle:{
            type:String,
            default:'取消'
        },
        confirmFunc:{},
        confirmTitle:{
            type:String,
            default:'确定'
        },
        confirmStatus:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return{
           
        }
    },
    created(){
       
    },
    methods: {
        cancelFunc(){
            this.$emit('ListenFromConfirm',false)
        }
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.confirm{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    .confirm_box{
        width: 300px;
        height: 114px;
        background: white;
        border-radius: 6px;
        box-sizing: border-box;
        padding: 20px;
        font-size: 14px;
        position: relative;
        >div{
            position: absolute;
            bottom: 0;
            right: 0px;
            height: 54px;
            line-height: 54px;
            color: #FF3C3A;
            display: flex;
            span{
                width: 80px;
                text-align: center;
            }
        }
    }
}
</style>
