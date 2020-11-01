<template lang="html">
    <div>
        <Bread :breadList="breadList"></Bread>
        <div class="add-purchase">
            <el-table :data="tableData" border stripe style="width: 100%;">
                <el-table-column prop="name" label="名称">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.edit" v-model="scope.row.medicine" placeholder="请选择" style="width: 200px;">
                            <el-option
                                v-for="item in medicines"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <span v-else>{{getMedicineName(scope.row.medicine)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="价格">
                    <template slot-scope="scope">
                        <el-input v-if="scope.row.edit" v-model="scope.row.price" style="width: 200px;"></el-input>
                        <span v-else>{{scope.row.price}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="number" label="数量">
                    <template slot-scope="scope">
                        <el-input-number v-if="scope.row.edit" v-model="scope.row.number" :min="0" :max="100000" label="数量"  style="width: 200px;"></el-input-number>
                        <span v-else>{{scope.row.number}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="total" label="总价">
                    <template slot-scope="scope">
                        <span>{{scope.row.total = scope.row.price * scope.row.number || 0}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.edit" type="text" size="medium" @click="confirmAdd(scope.row)">
                            <i class="el-icon-check" aria-hidden="true"></i>
                        </el-button>
                        <div v-else>
                            <el-button type="text" size="medium" @click="editData(scope.row)">
                                <i class="el-icon-edit" aria-hidden="true"></i>
                            </el-button>
                            <el-button type="text" size="medium" @click="deleteData(scope.row,scope.$index)">
                                <i class="el-icon-delete" aria-hidden="true"></i>
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="text" @click="addData">添加数据</el-button>
            <div>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="cancelSubmit">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import Bread from '@/components/Bread'
import { addPurchase, getPurchaseById } from '@/api/purchase'
import { getMedicineList } from '@/api/medicines'
export default {
    components: {
        Bread
    },
    data() {
        return {
            isEdit: false,
            breadList: [{
                    id: '1',
                    name: '进货管理',
                    path: '/manage/purchase'
                },
                {
                    id: '2',
                    name: '新增'
                }
            ],
            medicines: [],
            tableData: [
                {
                    edit: true
                }
            ]
        }
    },
    methods: {
        onSubmit() {
            this.tableData.forEach(item => {
                item.date = Date.now()
            })
            addPurchase({
                data: this.tableData,
                // ...this.form,
                // total: this.form.price * this.form.number,
                id: this.$route.params.id
            }).then((res) => {
                if (res.success) {
                    this.$router.push('/manage/purchase')
                }
            })
        },
        cancelSubmit() {
            this.$router.push('/manage/purchase')
        },
        editData(row) {
            row.edit = true;
        },
        deleteData(row, index) {
            this.tableData.splice(index, 1);
        },
        addData() {
            this.tableData.push({
                edit: true
            });
        },
        confirmAdd(row) {
            row.edit = false;
        },
        getMedicineName(id) {
            return this.medicines.find(item => item.id === id).name;
        }
    },
    created() {
        if (this.$route.params.id) {
            this.isEdit = true
            getPurchaseById({ id: this.$route.params.id }).then((res) => {
                this.form = res
            })
            this.breadList[1].name = '编辑'
        }
        getMedicineList().then((res) => {
            this.medicines = res.data
        })
    },
    watch: {
    }
}
</script>

<style lang="css">
.add-purchase {
    text-align: left;
}
.purchase-form {
    width: 500px;
}
.hide {
    display: none;
}
.show {
    display: block;
}
</style>
