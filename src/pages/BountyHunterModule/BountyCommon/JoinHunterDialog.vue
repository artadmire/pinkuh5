<template>
    <div class="join_hunter_dialog_box">
        <div class="join_hunter_dialog">
            <h5>
                <i>
                    <img src="@/assets/detail_order_delete_icon@3x.png" alt="">
                </i>
            </h5>
            <div class="context">
                <p>成为赏金猎人后</p>
                <p>即可享受以下权益</p>
            </div>
            <div class="join_hunter">加入赏金猎人</div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
    },
    data(){
        return{
        }
    },
    created(){
       
    },
    methods: {
        
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.join_hunter_dialog_box{
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .join_hunter_dialog{
        width: 263px;
        height: 232px;
        background: white;
        border-radius: 8px;
        h5{
            width: 100%;
            height: 44px;
            display: flex;
            justify-content: flex-end;
            i{
                width: 44px;
                height: 44px;
                box-sizing: border-box;
                padding: 14px;
                img{
                    width: 16px;
                    height: 16px;
                }
            }
        }
        .context{
            height: 120px;
            box-sizing: border-box;
            padding: 10px 20px;
            font-size: 18px;
            text-align: center;
            line-height: 25px;
        }
        .join_hunter{
            width: 233px;
            height: 53px;
            // background: #F1A826;
            background: linear-gradient(top,#FFD9B3,#FFC456);
            margin: 0 auto;
            font-size: 18px;
            text-align: center;
            line-height: 53px; 
            border: 1px solid #979797;/*no*/
            border-radius: 8px;
            color: #98470C;
        }
    }
}
</style>
