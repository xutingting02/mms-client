<template lang="html">
    <div>
        <Bread :breadList="breadList"></Bread>
        <Purchase-list></Purchase-list>
    </div>
</template>

<script>
import PurchaseList from '@/components/PurchaseList'
import Bread from '@/components/Bread'
export default {
    components: {
        PurchaseList,
        Bread
    },
    data: function() {
        return {
            breadList: [{
                    id: '1',
                    name: '进货清单',
                    path: '/manage/purchase'
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
