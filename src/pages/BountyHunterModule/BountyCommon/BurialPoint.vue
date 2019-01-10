<template>
    <div class="buriailPoint" v-show='false'>
    </div>
</template>

<script>
import pk from '@/util/pk.js'
export default {
    props:{
    },
    data(){
        return{
        }
    },
    created(){
       pk.getWebContainerStatus(
            (response)=>{
                console.log(response);
                if(response.data.isContainerAppear){
                    pk.addLisenter('onShow',()=>{
                        this.commitCustomEvent();
                    })
                }
            }
        )
        pk.addLisenter('onShow',(responese)=>{
           this.commitCustomEvent();
       })
    },
    methods: {
        commitCustomEvent(){
            pk.commitCustomEvent(
                {
                    'eventName':'enter_hunter_home_nonpurchased_page'
                },
                (response)=>{
                }
            )
        },
    },
    mounted () {
        
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
</style>
