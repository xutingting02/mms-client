<template>
    <div>
        <el-row class="row-group">
            <el-col :span="24">
                药物搜索：
                <el-input v-model="keyword" class="keyword-wrapper" placeholder="名称搜索"></el-input>

                日期：
                <el-date-picker
                    class="keyword-wrapper"
                    v-model="daterange"
                    type="daterange"
                    align="left"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                </el-date-picker>

                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-col>

            
        </el-row>
        <el-row class="row-group">
            <el-col :span="3">
                <el-button type="primary" icon="el-icon-plus" @click="addSale">售出</el-button>
            </el-col>
            <el-col :span="21" class="batch-group">
                <el-button size="mini" @click="batchDelete">删除</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" stripe ref="list" style="width: 100%" @selection-change="selectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column
                align="left"
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column align="left" prop="name" label="名称" width="180">
            </el-table-column>
            <el-table-column align="left" prop="number" label="数量">
            </el-table-column>
            <el-table-column align="left" prop="price" label="单价">
            </el-table-column>
            <el-table-column align="left" prop="total" label="总价">
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
                <el-button type="primary" @click="deleteSaleOk">确 定</el-button>
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
    margin-right: 20px;
}
</style>

<script type="text/javascript">
import { getSaleList, deleteSale } from '@/api/sale'
import { forEach } from 'lodash'

function rTime(date) {
    var json_date = new Date(date).toJSON();
    return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
}

export default {
    data() {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        return {
            tableData: [],
            dialogVisible: false,
            selectedId: [],
            totalSize: 0,
            page: 1,
            keyword: "",
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            daterange: [start, end]
        }
    },
    methods: {
        handleSearch: function() {
            this.renderList()
        },
        handleDelete: function(index, row) {
            // 弹窗确认是否删除
            this.dialogVisible = true
            this.selectedId = [row.id]
        },
        deleteSaleOk: function() {
            this.dialogVisible = false
            deleteSale({
                id: this.selectedId.join('|')
            }).then(res => {
                this.renderList()
            })
        },
        addSale: function() {
            this.$router.push('/manage/addSale')
        },
        // 渲染列表
        renderList: function() {
            let params = {
                page: this.page,
                keyword: this.keyword,
                start: this.daterange && this.daterange[0],
                end: this.daterange && this.daterange[1]
            }
            getSaleList(params).then((res) => {
                res.data.forEach(item => {
                    item.name = item.medicines_model && item.medicines_model.name
                    item.date = rTime(item.date);
                })
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
    },
    created() {
        this.renderList()
    }
}
</script>
