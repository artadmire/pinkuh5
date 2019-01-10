<template>
    <div class="pintuanContainer">
        稍息，立正，团长来晚了，立即去开团！
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
.pintuanContainer{
    width: 100%;
    height: 80px;
    border-bottom: 10px solid #f4f4f4;
    color: $lightGray;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
