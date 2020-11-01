<template lang="html">
    <div class="dashboard">
        <div class="income-report">
            <el-row :gutter="20">
                <el-col :span="8">今日收入: <span class="income">{{ todayIncome }}</span>元</el-col>
                <el-col :span="8">今日支出: <span class="income">{{ todayOut }}</span>元</el-col>
            </el-row>
        </div>
        <div>
            <div>收入报告</div>
            <div id="inChart" :style="{width: '800px', height: '500px'}"></div>
        </div>
        <div>
            <div>支出报告</div>
            <div id="outChart" :style="{width: '800px', height: '500px'}"></div>
        </div>
    </div>
</template>

<script>
import { getPurchaseList } from '@/api/purchase'
import { forEach, keyBy } from 'lodash'
import moment from 'moment'

function rTime(date) {
    var rDate = new Date(date);
    // var rDate = new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    return [rDate.getFullYear(), rDate.getMonth(), rDate.getDate()].join('-');
}

export default {
    data() {
        return {
            todayIncome: 0,
            todayOut: 0,
            option: {
                xAxis: {
                    type: 'category',
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [],
                    type: 'line'
                }]
            }
            // dateArr: [],
            // incomeArr: [120, 200, 150, 80, 70, 110, 130],
            // outArr: []
        }
    },
    created: function() {
        let _this = this
        // getIncomeList().then(res => {
        //     let incomeArr = []
        //     let dateArr = []
        //     forEach(res.data, (item) => {
        //         dateArr.push(moment(item._id).format('l'))

        //         incomeArr.push(item.income)
        //     })
        //     _this.option = {
        //         xAxis: {
        //             type: 'category',
        //             data: dateArr
        //         },
        //         yAxis: {
        //             type: 'value'
        //         },
        //         series: [{
        //             data: incomeArr,
        //             type: 'line'
        //         }]
        //     }
        // })
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        getPurchaseList({}).then((res) => {
            res.data.forEach(item => {
                item.date = rTime(item.date);
            })
            // var incomeObj = keyBy(res.data, 'date');

            var outObj = {};
            // item.date  求和
            res.data.forEach(item => {
                if (!outObj[item.date]) {
                    outObj[item.date] = {
                        total: 0
                    };
                }
                outObj[item.date].total += item.total;
            })
            var dateArr = Object.keys(outObj);
            var outArr = [];
            dateArr.forEach(item => {
                outArr.push(outObj[item].total);
            })
            
            _this.dateArr = dateArr;
            _this.outArr = outArr;
            console.log(this.dateArr)
            console.log(this.outArr)
            this.drawLine()

        })

    },
    watch: {
        option: function(value) {
            if (this.chart) {
                this.chart.setOption(value)
            }
        }
    },
    mounted() {
        this.drawLine()
    },
    methods: {
        drawLine() {
            console.log(this.dateArr)
            // 基于准备好的dom，初始化echarts实例
            this.inChart = this.$echarts.init(document.getElementById('inChart'))
            // 绘制图表
            this.inChart.setOption({
                xAxis: {
                    type: 'category',
                    data: this.dateArr
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.incomeArr,
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(220, 220, 220, 0.8)'
                    }
                }]
            })


            // 基于准备好的dom，初始化echarts实例
            this.outChart = this.$echarts.init(document.getElementById('outChart'))
            // 绘制图表
            this.outChart.setOption({
                xAxis: {
                    type: 'category',
                    data: this.dateArr
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.outArr,
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(220, 220, 220, 0.8)'
                    }
                }]
            })
        }
    }
}
</script>

<style lang="css">
.dashboard {
    text-align: left;
    margin: 20px 10px;
}

.income-report {
    font-size: 16px;
    padding: 30px 10px;
    background: #F6F6F6;
    margin: 20px 0;
}

.income {
    color: #F9AD42;
    font-size: 20px;
}
</style>
