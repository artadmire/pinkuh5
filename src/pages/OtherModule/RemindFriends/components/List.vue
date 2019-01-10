<template>
    <ul class="list">
        <Item v-for='(item,index) in buyerIncomeList' :key='index' v-if='index<=2' :item='item' :listIndex='index' />
    </ul>
</template>

<script>
import Item from './Item'
export default {
    props:{
        buyerIncomeList:{
            type:Array,
            default:[
                {
            "avatar": "https://img-daily.pinkumall.com/cfdcec8d_633b_4097_ab6d_2e29a5beccd6.jpeg",
            "nick": "陈霖",
            "income": "111127.59"
        }
            ]
        }
    },
    data(){
        return{
          
        }
    },
    computed:{
        avatarUrl(){
            
        }
    },
    created(){
       
    },
    components:{
        Item
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
.list{
    width: 300px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>
