<template>
    <div class='right_desc_box'>
        <div class="right_desc">
            <h5>
                {{itemInfo.title}}权益
                <i @click="close">
                        <img src="@/assets/detail_order_delete_icon@3x.png" alt="">
                    </i>
            </h5>
            <ul class="context">
                <li v-for='(item,index) in itemInfo.rightContext' :key='index'>
                    <span>·</span> {{item}}
                </li>
            </ul>
            <div class="iknow" @click="close">
                知道了
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapMutations, mapState
    } from 'vuex';
    export default {
        props: {
        },
        data() {
            return {
            }
        },
        created() {
            this.$emit('ListenFromRightDesc','fixed')
        },
        computed: {
            ...mapState(['hunterStore']),
            itemInfo(){
                return this.hunterStore.bountyRightsList[this.hunterStore.bountyRightsIndex]
            }
        },
        methods: {
            ...mapMutations(['changeBountyRightsState']),
            close() {
                this.changeBountyRightsState(false)
            }
        },
        destroyed(){
            this.$emit('ListenFromRightDesc','static')
        },
        mounted() {}
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
    @import "~@/common/css/var.scss";
    .right_desc_box {
        position: fixed;
        width: 100%;
        height: 110vh;
        top: 0;
        left:0;
        z-index: 3;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        .right_desc {
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -150px;
            margin-top: -140px;
            width: 300px;
            height: 260px;
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
                li {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0px 20px;
                    margin: 5px 0;
                    line-height: 18px;
                    font-size: 14px;
                    position: relative;
                    // overflow : hidden;
                    // text-overflow: ellipsis;
                    // display: -webkit-box;
                    // -webkit-line-clamp: 2;
                    // -webkit-box-orient: vertical;
                    span{
                        position: absolute;
                        left: 10px;
                        top: 0px;
                    }
                }
            }
            .iknow {
                width: 120px;
                height: 32px;
                background: linear-gradient(top,#FFD9B3,#FFC456);
                color: white;
                font-size: 14px;
                position: absolute;
                left: 90px;
                bottom: 20px;
                border-radius: 6px;
                line-height: 32px;
                text-align: center;
            }
        }
    }
</style>
