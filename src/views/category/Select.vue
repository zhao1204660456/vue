<template>
    <div>
        <!--<el-form :inline="true" :model="selectform" class="demo-form-inline">-->
            <!--<el-form-item label="内容">-->
                <!--<el-col :span="11">-->
                    <!--<el-input type="text" placeholder="请输入搜索内容" v-model="selectform.dailydcontent"-->
                              <!--style="width: 200px;"></el-input>-->
                <!--</el-col>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="日期">-->
                <!--<el-col :span="11">-->
                    <!--<el-date-picker type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期"-->
                                    <!--v-model="selectform.dailydate" style="width: 200px;"></el-date-picker>-->
                <!--</el-col>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
                <!--<el-button type="primary" @click="onSubmit">查询</el-button>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <el-table :data="cateAll" border style="width: 100%">
            <el-table-column fixed prop="id" label="ID" width="100">
            </el-table-column>
            <el-table-column prop="cname" label="分类名" width="100">
            </el-table-column>
            <el-table-column prop="sort" label="排序" width="120">
            </el-table-column>
            <el-table-column prop="thumb" label="缩略图" width="120">
                <template slot-scope="scope">
                    <img :src="imgurl+scope.row.thumb" alt="scope.row.cname" :title="scope.row.cname">
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="添加时间" width="160">
            </el-table-column>
            <el-table-column prop="update_time" label="修改时间" width="160">
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <router-link :to="{name:'cateupdata',params:{id:scope.row.id}}">
                        <el-button type="primary" icon="el-icon-edit" circle>
                        </el-button>
                    </router-link>
                    <el-button @click="deletecate(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="10"
                :page-sizes="[10,20,30]" layout="total, sizes, prev, pager, next, jumper" :total=count>
        </el-pagination>
        <!--<my-page :page-size="siz" :total="total" @changepage="changepages"></my-page>-->
    </div>
</template>

<script>
    import {SUCCESS,FAIL,TOKENFAIL,IMGPATH} from "../../config/base";
    export default {
        name: "Select",
        data() {
            return {
                cateAll: [],
                current:0,
                count:0,
                limit:5,
                currentPage4: 4,
                imgurl:IMGPATH
            }
        },
        methods: {
            deletecate(id){
                console.log(id);
                fetch('http://www.fruit.com/api/category/'+id,{
                    method: 'DELETE',
                    headers: {
                        'token':sessionStorage.getItem('token')
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === SUCCESS) {
                            this.cateAll=this.cateAll.filter(ele=>ele.id!=id);
                            this.$message.success(data.msg);
                        } else if(data.code === TOKENFAIL){
                            this.$message.warning(data.msg);
                        }else if(data.code === FAIL){
                            this.$message.error(data.msg);
                        }
                    })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.current=val;
            },
            getCate() {
                fetch('http://www.fruit.com/api/category', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token':sessionStorage.getItem('token')
                     }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === SUCCESS) {
                            this.cateAll = data.data;
                            this.count=data.count;
                            this.$message.success(data.msg);
                        } else if(data.code === TOKENFAIL){
                            this.$message.warning(data.msg);
                        }else if(data.code === FAIL){
                            this.$message.error(data.msg);
                        }
                    })
            },
        },
        beforeMount() {
            this.getCate();
        },
    }
</script>

<style scoped>
img{
    max-height: 80px;
}
</style>