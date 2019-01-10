<template>
    <div class="hunter_rights">
        <h2>猎人9大权益</h2>
        <ul>
            <li v-for='(item,index) in 8' :key='index'>
                权益
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {},
        data() {
            return {}
        },
        created() {},
        methods: {},
        mounted() {}
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
    @import "~@/common/css/var.scss";
    .hunter_rights {
        background: white;
        margin-top: 20px;
        padding: 0 20px;
        h2 {
            font-size: 18px;
            font-weight: bold;
            line-height: 60px;
        }
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            padding: 0 7px;
            li {
                width: 60px;
                height: 60px;
                background: red;
                margin: 0 10px 35px;
                border-radius: 50%;
                border: 1px solid $lightGray;
                /*no*/
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }
        }
    }
</style>
