<template>
    <h5 >
        赏金猎人
        <router-link to='/'>常见问题</router-link>
    </h5>
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
h5{
    width: 100%;
    height: 44px;
    text-align: center;
    line-height: 44px;
    position: fixed;
    top: 0;
    left:0;
    z-index: 9;
    font-size: 16px;
    color: white;
    a{
        position: absolute;
        right: 20px;
        font-size: 12px;
        color: white;
    }
}
</style>
