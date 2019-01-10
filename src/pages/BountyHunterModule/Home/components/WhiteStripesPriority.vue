<template>
    <div class='gold_coin_task'>
        <img  v-lazy="imgurl" alt="">
    </div>
</template>

<script>
export default {
    props:{
    },
    data(){
        return{
            imgurl:require('static@/img/rights_6_pic.png')
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
.gold_coin_task{
    width: 100%;
    box-sizing: border-box;
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    background: #f7f8fa;
    align-items: center;
    img{
        width: 90%;
        //height: 180px;
        object-fit: cover;
    }
}
</style>
