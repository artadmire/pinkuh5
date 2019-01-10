<template>
    <div id="markets-tabs" ref="marketsTabs">
        <ul >
            <li v-for='(item,index) in groups' :class="{active:index==activeIndex}" :key='index' @click='changeTabs(index,$event)'>{{item.name}}</li>
        </ul>
    </div>
   
</template>

<script>
export default {
    props:{
        groups:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{
           activeIndex:0,
        }
    },
    created(){
       
    },
    methods: {
        changeTabs(index,event){
            this.activeIndex = index;
            this.$emit('ListenFromMarketsTabs',index);
            let move = event.target.offsetLeft-(document.body.clientWidth/2);
            this.$refs.marketsTabs.scrollLeft = move>0?move:0;
        },
    },
    mounted () {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~@/common/css/var.scss";
#markets-tabs{
    width: 100%;
    overflow-x: scroll;
    overflow-y:hidden; 
    ul{
        display: flex;
        padding: 0 15px;
        height: 44px;
        display: flex;
        align-items: center;
        li{
            flex:none;
            padding: 0 5px;
            height: 25px;
            line-height: 25px;
            margin: 0 10px;
            color:#B2B2B2;
        }
        li.active{
            color: #FF3C3A;
            border-bottom: 4px solid red;
            font-size: 14px;
        }
    }
}
#markets-tabs::-webkit-scrollbar{
    display: none;
}
</style>
