<template lang="html">
    <div>
        <Bread :breadList="breadList"></Bread>
        <Medicine-list></Medicine-list>
    </div>
</template>

<script>
import MedicineList from '@/components/MedicineList'
import Bread from '@/components/Bread'
export default {
    components: {
        MedicineList,
        Bread
    },
    data: function() {
        return {
            breadList: [{
                    id: '1',
                    name: '药品清单',
                    path: '/manage/medicines'
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
