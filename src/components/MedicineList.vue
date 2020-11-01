<template>
    <div>
        <el-row class="row-group">
            <el-col :span="6">
                药物搜索：
                <el-input placeholder="名称搜索" v-model="keyword" class="keyword-wrapper">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
                </el-input>
            </el-col>
        </el-row>
        <el-row class="row-group">
            <el-col :span="3">
                <el-button type="primary" icon="el-icon-plus" @click="addMedicine">新增药品</el-button>
            </el-col>
            <el-col :span="21" class="batch-group">
                <el-button size="mini" @click="batchDelete">删除</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" stripe ref="list" style="width: 100%" @selection-change="selectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column align="left" prop="name" label="名称" width="180">
            </el-table-column>
            <el-table-column align="left" prop="number" label="数量">
            </el-table-column>
            <el-table-column label="操作" align="left" width="200">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row class="row-group">
            <el-pagination
                background
                :current-page.sync="page"
                @current-change="pageChange"
                layout="prev, pager, next"
                :total="totalSize">
            </el-pagination>
        </el-row>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <span>删除后无法恢复记录，确认删除？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteMedicineOk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<style lang="css" scoped>
.row-group {
    margin: 20px 0;
    font-size: 14px;
}

.el-col {
    text-align: left;
}

.batch-group {
    background: #f5f7fa;
    padding: 5px 10px;
    height: 40px;
}

.keyword-wrapper {
    width: 250px;
    display: inline-block;
}
</style>

<script type="text/javascript">
import { getMedicineList, deleteMedicine } from '@/api/medicines'
import { forEach } from 'lodash'
export default {
    data() {
        return {
            tableData: [],
            dialogVisible: false,
            selectedId: [],
            totalSize: 0,
            page: 1,
            keyword: ""
        }
    },
    methods: {
        handleSearch: function() {
            this.renderList()
        },
        handleEdit: function(index, row) {
            this.$router.push('/manage/addMedicine/' + row.id)
        },
        handleDelete: function(index, row) {
            // 弹窗确认是否删除
            this.dialogVisible = true
            this.selectedId = [row.id]
        },
        deleteMedicineOk: function() {
            this.dialogVisible = false
            deleteMedicine({
                id: this.selectedId.join('|')
            }).then(res => {
                this.renderList()
            })
        },
        addMedicine: function() {
            this.$router.push('/manage/addMedicine')
        },
        // 渲染列表
        renderList: function() {
            let params = {
                name: this.name,
                page: this.page,
                keyword: this.keyword
            }
            getMedicineList(params).then((res) => {
                this.tableData = res.data
                this.totalSize = res.totalSize
            })
        },
        selectionChange: function(selection) {
            // selection为对象数组
            let selectedIds = []
            forEach(selection, function(item) {
                selectedIds.push(item.id)
            })
            this.selectedId = selectedIds
        },
        // 批量删除
        batchDelete: function() {
            this.dialogVisible = true
            this.selectionChange(this.$refs.list.selection)
        },
        pageChange: function() {
            // 刷新table
            this.renderList()
        }
    },
    watch: {
        keyword: function() {
            this.renderList()
        }
    },
    created() {
        this.renderList()
    }
}
</script>
