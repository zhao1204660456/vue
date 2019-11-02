<template>
    <div>
        <el-form :inline="true" :model="selectform" class="demo-form-inline">
            <el-form-item label="分类查询">
                <el-col :span="11">
                    <el-select v-model="selectform.cid" placeholder="请选择分类" style="width: 100px;">
                        <el-option v-for="item in catenames" :key="item.id" :label="item.cname"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-col :span="11">
                    <el-input type="text" placeholder="关键字搜索" v-model="selectform.gname"
                              style="width: 100px;"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="现价价格区间">
                <el-input type="text" placeholder="最小价格" v-model="selectform.minprice"
                          style="width: 100px;"></el-input>
                ---
                <el-input type="text" placeholder="最大价格" v-model="selectform.maxprice"
                          style="width: 100px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="cateAll" border style="width: 100%">
            <el-table-column fixed prop="id" label="ID" width="40">
            </el-table-column>
            <el-table-column prop="cname" label="分类名" width="100">
            </el-table-column>
            <el-table-column prop="gname" label="商品名称" width="120">
            </el-table-column>
            <el-table-column prop="mprice" label="市场价格" width="100">
            </el-table-column>
            <el-table-column prop="sale" label="零售价格" width="120">
            </el-table-column>
            <el-table-column prop="stock" label="商品库存" width="100">
            </el-table-column>
            <el-table-column prop="detail" label="商品详情" width="120">
            </el-table-column>
            <el-table-column label="banner图" width="140">
                <template slot-scope="scope">
                    <img v-for="(i,index) in scope.row.banner.split(',')" :key='index' :src="imgurl+i"
                         alt="scope.row.name" style="width:50px">
                </template>
            </el-table-column>
            <el-table-column prop="thumb" label="缩略图" width="120">
                <template slot-scope="scope">
                    <img :src="imgurl+scope.row.thumb" alt="">
                </template>
            </el-table-column>
            <!--<el-table-column prop="create_time" label="添加时间" width="160">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="update_time" label="修改时间" width="160">-->
            <!--</el-table-column>-->
            <el-table-column label="操作" width="120" fixed="right">
                <template slot-scope="scope">
                    <router-link :to="{name:'goodsupdata',params:{id:scope.row.id}}">
                        <el-button type="primary" icon="el-icon-edit" circle>
                        </el-button>
                    </router-link>
                    <el-button style="margin-left: 10px" type="danger" @click="deletecate(scope.row.id)" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage4" :page-size="limit"
                       layout="total, prev, pager, next, jumper" :total='count'>
        </el-pagination>
        <!--<my-page :page-size="siz" :total="total" @changepage="changepages"></my-page>-->
    </div>
</template>

<script>
    import {SUCCESS, FAIL, TOKENFAIL, IMGPATH} from "../../config/base";
    import axios from 'axios'

    export default {
        name: "Select",
        data() {
            return {
                catenames: [],
                banners: [],
                cateAll: [],
                current: 1,
                count: 0,
                limit: 3,
                currentPage4: 1,
                imgurl: IMGPATH,
                selectform: {
                    minprice: '',
                    maxprice: '',
                    cid: '',
                    gname: '',
                }
            }
        },
        methods: {
            deletecate(id) {
                fetch('http://www.fruit.com/api/goods/' + id, {
                    method: 'DELETE',
                    headers: {
                        'token': sessionStorage.getItem('token')
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === SUCCESS) {
                            this.cateAll = this.cateAll.filter(ele => ele.id != id);
                            this.$message.success(data.msg);
                        } else if (data.code === TOKENFAIL) {
                            this.$message.warning(data.msg);
                        } else if (data.code === FAIL) {
                            this.$message.error(data.msg);
                        }
                    })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.current = val;
                this.getCate(val);
            },
            Success_banner(res) {
                this.gbannerArr.push(res.data.src);
            },
            Remove_banner(file) {
                this.gbannerArr = this.gbannerArr.filter(ele => ele != file.response.data.src);
            },
            Preview_banner(file) {
                this.imgSrc_banner = file.url;
                this.dialogVisible = true;
            },
            getCatename() {
                axios.get('http://www.fruit.com/api/category', {
                    headers: {}
                })
                    .then(res => {
                        res = res.data.data;
                        this.catenames = res;
                        this.$message.success(res.msg);
                    })
                    .catch(error => console.log(error))
            },
            //搜索商品
            getCate(currents) {
                let formdata = this.selectform
                axios.get('http://www.fruit.com/api/goods',
                    {
                        params: {
                            current: currents,
                            limit: this.limit,
                            cid: formdata.cid,
                            gname:formdata.gname,
                            maxprice: formdata.maxprice,
                            minprice: formdata.minprice,
                        }
                    })
                    .then(res => {
                        res = res.data;
                        this.cateAll = res.data;
                        this.count = res.count;
                        this.$message.success(res.msg);
                    })
                    .catch(error => console.log(error))
                // fetch('http://www.fruit.com/api/goods?current='+currents, {
                //     method: 'GET',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'token': sessionStorage.getItem('token')
                //     }
                // })
                //     .then(res => res.json())
                //     .then(data => {
                //         if (data.code === SUCCESS) {
                //             this.cateAll = data.data;
                //             this.count = data.count;
                //             this.$message.success(data.msg);
                //         } else if (data.code === TOKENFAIL) {
                //             this.$message.warning(data.msg);
                //         } else if (data.code === FAIL) {
                //             this.$message.error(data.msg);
                //         }
                //     })
            },
            onSubmit() {
                this.getCate(1);
            },
        },
        beforeMount() {
            this.getCatename();
            this.getCate(this.current);
        },
    }
</script>

<style scoped>
    img {
        max-height: 80px;
    }
</style>