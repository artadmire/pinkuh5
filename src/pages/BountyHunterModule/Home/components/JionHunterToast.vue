<template>
    <div class="jion_hunter_toast">
         <div class="content">
            <h5>
                <i @click="close">
                    <img src="@/assets/detail_order_delete_icon@3x.png" alt="">
                </i>
            </h5>
            <ul class="context">
                成为赏金猎人后，您即可享受以下权益
            </ul>
            <div class="iknow" @click="close_and_togo">
                加入赏金猎人
            </div>
         </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
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
        ...mapMutations(['changeJionHunterToastStatus']),
        close(){
            this.changeJionHunterToastStatus(false);
        },
        close_and_togo(){
             this.changeJionHunterToastStatus(false);
            this.$router.push({
                path: "./payhunter"
            });
        }
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
 @import "~@/common/css/var.scss";
    .jion_hunter_toast {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left:0;
        z-index: 99;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        .content {
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -150px;
            margin-top: -130px;
            width: 300px;
            height: 160px;
            background: white;
            border-radius: 6px;
            position: relative;
            z-index: 200;
            h5 {
                height: 44px;
                line-height: 44px;
                text-align: center;
                font-size: 18px;
                position: relative;
                i {
                    position: absolute;
                    height: 44px;
                    width: 44px;
                    right: 0;
                    top: 0;
                    img {
                        width: 16px;
                        height: 16px;
                    }
                }
            }
            .context {
                width: 260px;
                text-align: center;
                margin: 0 auto;
                font-size: 14px;
                line-height: 40px;
            }
            .iknow {
                width: 220px;
                height: 32px;
                background: linear-gradient(top,#FFD9B3,#FFC456);
                color: #98470C;
                font-size: 14px;
                position: absolute;
                left:40px;
                bottom: 20px;
                border-radius: 6px;
                line-height: 32px;
                text-align: center;
            }
        }
    }
</style>
