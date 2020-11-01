<template lang="html">
    <div>
        <Bread :breadList="breadList"></Bread>
        <Sale-list></Sale-list>
    </div>
</template>

<script>
import SaleList from '@/components/SaleList'
import Bread from '@/components/Bread'
export default {
    components: {
        SaleList,
        Bread
    },
    data: function() {
        return {
            breadList: [{
                    id: '1',
                    name: '销售清单',
                    path: '/manage/sale'
                },
                {
                    id: '2',
                    name: '列表'
                }
            ]
        }
    }
}
</script>

<style lang="css">

</style>
