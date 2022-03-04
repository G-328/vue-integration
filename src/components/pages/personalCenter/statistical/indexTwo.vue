<template>
    <div>
        <el-pagination
            :total="total"
            :page-size="pageSize"
            :page-sizes="pageSizes"
            :current-page="pageNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: "indexTwo",
    props: {
        pageSize: {
            type: Number,
            default: 20,
        },
        pageNum: {
            type: Number,
            default: 1,
        },
        total: {
            type: Number,
            default: 0,
        },
        pageSizes: {
            type: Array,
            default: () => {
                return [10, 20, 40, 60];
            },
        },
    },
    data() {
        return {};
    },
    methods: {
        handleSizeChange(val) {
            console.log("handleSizeChange", val)
            this.$emit("handleSizeOrNum", val, "pageSize");
        },
        handleCurrentChange(val) {
            console.log("handleCurrentChange", val)

            clearTimeout(this.currenChangeTime);
            this.currenChangeTime = setTimeout(() => {
                this.$emit("handleSizeOrNum", val, "pageNum");
            }, 300);
        },
    },
};
</script>

<style lang="less" scoped></style>
