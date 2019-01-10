<template>
    <div class="right_contrast">
        <img src="~static@/img/2@3x_01.jpg" alt="">
        <img src="~static@/img/2@3x_02.jpg" alt="">
        <img src="~static@/img/2@3x_03.jpg" alt="">
        <img src="~static@/img/2@3x_04.jpg" alt="">
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
.right_contrast{
    width: 100%;
    display: flex;
    flex-direction: column;
    img{
        width: 100%;
    }
}
</style>
