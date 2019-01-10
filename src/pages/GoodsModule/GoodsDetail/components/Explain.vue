<template>
    <div class="explain">
        <dl>
            <dt>权利声明:</dt>
            <dd>
                <p>爆好货上的所有商品信息、客户评价、商品咨询、网友讨论等内容，是爆好货重要的经营资源，未经许可，禁止非法转载使用。</p>
                <p>注：本站商品信息均来自于合作方，其真实性、准确性和合法性由信息拥有者（合作方）负责。本站不提供任何保证，并不承担任何法律责任。</p>
            </dd>
        </dl>
        <dl>
            <dt>价格说明:</dt>
            <dd>
                <p>
                    <span>划线价：</span>商品展示的划横线价格为参考价，<em>并非原价</em>，该价格可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或该商品在爆好货平台上曾经展示过的销售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致，该价格仅供您参考。
                </p>
                <p>
                    <span>未划线价：</span>指商品的<em>实时标价</em>，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用现金券、积分等发生变化最终以订单结算页价格为准。
                </p>
                <p>
                    <span>折扣：</span>如无特殊说明，折扣指销售商在原价、或划线价（如品牌专柜标价、商品吊牌价、厂商指导价、厂商建议零售价）等某一价格基础上计算出的优惠比例或优惠金额；如有疑问，您可在购买前联系销售商进行咨询。
                </p>
            </dd>
        </dl>
        <p>此说明仅当出现价格比较时有效，若商家单独划线价格进行说明的，以商家的表述为准。</p>
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
.explain {
  width: 100%;
  padding: 20px 20px 69px;
  margin: 20px auto 0;
  box-sizing: border-box;
  background: #f7f8fa;
  dl {
    dt {
      font-size: 16px;
      line-height: 25px;
      font-size: $fontColor;
      font-weight: bold;
    }
    dd {
      span,
      em {
        color: $fontColor;
      }
      font-size: 12px;
      line-height: 18px;
      color: $lightGray;
    }
    padding-bottom: 15px;
  }
  p {
    font-size: 12px;
    line-height: 18px;
    color: $lightGray;
  }
}
</style>
