<template>
    <div class="form-box" v-if="goods">
        <el-form ref="form" :model="goods" label-width="80px">
            <el-form-item label="分类名" prop="cid" v-if="category">
                <el-select v-model="goods.cid"  placeholder="商品分类名称">
                    <el-option v-for="item in category" :label="item.cname" :key="item.id" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="goods.gname" placeholder="商品名称6-3字符" clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="商品规格">
                <el-input v-model="goods.norms" placeholder="商品规格" clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="商品描述">
                <el-input v-model="goods.describe" placeholder="商品描述" clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="商品品牌">
                <el-input v-model="goods.brand" placeholder="商品品牌" clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="商品原价">
                <el-input v-model="goods.mprice" placeholder="商品原价" clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="商品现价">
                <el-input v-model="goods.sale" placeholder="商品现价" clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="商品库存">
                <el-input v-model="goods.stock" placeholder="商品库存" clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="商品详情">
                <el-input v-model="goods.detail" placeholder="商品详情" clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="缩略图">
                <el-upload class="avatar-uploader" :action="hostname+'/api/upload'"
                           :show-file-list="false"
                           :on-success="thumbUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" style="height: 100px">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="轮播图">
                <el-upload class="avatar-uploader" :action="hostname+'/api/upload'" :file-list="fileList" :on-exceed="handleExceed"
                           :show-file-list="false" :limit="bannerlimit" :multiple="true" :on-success="bannerUpload">
                    <el-button class="el-button el-button--primary">点击上传轮播图</el-button>
                </el-upload>
                <div class="banner-box" :v-if="bannerArr">
                    <ul>
                        <li v-for="(item,index) in bannerArr" :key="index" @mouseenter="showmask(index)"
                            @mouseleave="hiddenmask(index)">
                            <div class="mask" ref="mask">
                                <i class="el-icon-zoom-in" @click="lookbanner(index)"></i>
                                <i class="el-icon-delete" @click="delectbanner(index)"></i>
                            </div>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                            <img :src="imgpath+item" alt="">
                        </li>
                    </ul>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updatafrom(id)">提交修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {SUCCESS, FAIL, TOKENFAIL, HOSTNAME, IMGPATH} from "../../config/base";
    // import axios from 'axios';
    export default {
        name: "Updata",
        data() {
            return {
                bannerlimit: 3,
                imgpath: IMGPATH,
                dialogVisible: false,
                dialogImageUrl: '',
                imageUrl: '',
                goods: null,
                id: '',
                bannerArr: [],
                hostname: HOSTNAME,
                category: '',
                fileList:[]
            }
        },
        methods: {
            //缩略图上传
            thumbUpload(res) {
                this.imageUrl = 'http://localhost/' + res.src;
                this.goods.thumb = res.src;
            },
            //banner图遮罩显示
            showmask(index) {
                this.$refs.mask[index].style.display = "flex";
            },
            //banner图遮罩隐藏
            hiddenmask(index) {
                this.$refs.mask[index].style.display = "none";
            },
            //上传成功后返回地址上传
            uploadsuccess(res) {
                this.imageUrl = 'http://localhost/' + res.src;
                this.goods.thumb = res.src;
            },
            //图片上传达到最大值提示
            handleExceed(){
              this.$message.warning('图片上传不能超过三张');
            },
            //上传banner图
            bannerUpload(res) {
                this.bannerArr.push(res.src);
                let obj={};
                obj={
                    'name':"banner",//没有那么不影响结果
                    'url':res.src
                };
                this.fileList.push(obj);
            },
            //查看banner图放大
            lookbanner(index) {
                this.dialogImageUrl = this.imgpath + this.bannerArr[index];
                this.dialogVisible = true;
            },
            //删除banner图
            delectbanner(index) {
                this.bannerArr.splice(index, 1);
                this.fileList.splice(index,1);
                // this.bannerlimit = this.bannerlimit + 1;
            },
            //修改信息
            updatafrom(id) {
                fetch(HOSTNAME + '/api/goods/' + id, {
                    method: 'PUT',
                    body: JSON.stringify(this.goods),
                    headers: {
                        'Content-Type': 'application/json',
                        'token': sessionStorage.getItem('token')
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === SUCCESS) {
                            this.$message.success(data.msg);
                        } else if (data.code === TOKENFAIL) {
                            this.$message.warning(data.msg);
                        } else if (data.code === FAIL) {
                            this.$message.error(data.msg);
                        }
                    })
            },
            //获取商品信息
            updata(id) {
                fetch('http://www.fruit.com/api/goods/' + id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': sessionStorage.getItem('token')
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === SUCCESS) {
                            this.goods = data.data;
                            this.bannerArr = data.data.banner.split(',');
                            this.fileList=this.bannerArr.map(ele=>({name:'banner',url:ele}));
                            // this.bannerlimit=3-this.bannerArr.length;
                            this.imageUrl = 'http://localhost/' + data.data.thumb;
                            this.$message.success(data.msg);
                        } else if (data.code === TOKENFAIL) {
                            this.$message.warning(data.msg);
                        } else if (data.code === FAIL) {
                            this.$message.error(data.msg);
                        }
                    })
            },
            //获取当前商品id
            getid() {
                this.id = this.$route.params.id;
            },
            //获取分类名称
            getCate() {
                fetch('http://www.fruit.com/api/category', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': sessionStorage.getItem('token')
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        this.loading=false;
                        if (data.code === SUCCESS) {
                            this.category = data.data;
                        } else if (data.code === TOKENFAIL) {
                            this.$message.warning(data.msg);
                        } else if (data.code === FAIL) {
                            this.$message.error(data.msg);
                        }
                    })
            },
        },
        //
        beforeMount() {
            this.getid();
            this.getCate();
            this.updata(this.id);
        },
        //监听
        watch:{
            bannerArr(){
                this.goods.banner=this.bannerArr.join();
            }
        },
    }
</script>

<style lang="scss">
    .form-box {
        max-width: 400px;
    }

    .img-banner-box {
        height: 100px;
        width: 400px;
    }

    .img-banner-box > img {
        margin-right: 10px;
    }

    .el-select {
        display: block;
    }

    .banner-box {
        width: 600px;

        > ul {
            display: flex;

            > li {
                position: relative;
                width: 100px;
                height: 100%;
                margin-left: 10px;
                margin-right: 10px;

                > .mask {
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: none;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.3);

                    > i {
                        margin-right: 5px;
                        margin-left: 5px;
                        color: #fff;
                    }
                }

                > img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>