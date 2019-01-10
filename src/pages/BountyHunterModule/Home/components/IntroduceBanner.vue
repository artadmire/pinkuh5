<template>
    <div class="introduce_banner">

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
    mounted () {
        
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
.introduce_banner{
    width: 100%;
    height: 250px;
    background: $HunterBgColor;
    background-image:url('~static@/img/hunter_page_bg_pic.png');
    background-size: contain;
}
</style>
