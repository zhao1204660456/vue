<template>
    <div class="form-box" v-loading.fullscreen.lock="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-form ref="form" :model="goods" :rules="rules" label-width="100px"  >
            <el-form-item label="分类名" prop="cid" v-if="category">
                <el-select v-model="goods.cid"  placeholder="商品分类名称">
                    <el-option v-for="item in category" :label="item.cname" :key="item.id" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称" prop="gname">
                <el-input v-model="goods.gname" placeholder="商品名称6-3字符"  clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="商品规格" prop="norms">
                <el-input v-model="goods.norms" placeholder="商品规格"  clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="商品描述" prop="describe">
                <el-input v-model="goods.describe" placeholder="商品描述"  clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="商品品牌" prop="brand">
                <el-input v-model="goods.brand" placeholder="商品品牌"  clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="商品原价" prop="mprice">
                <el-input v-model.number="goods.mprice" placeholder="商品原价"  clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="商品现价" prop="sale">
                <el-input v-model.number="goods.sale" placeholder="商品现价"  clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="商品库存" prop="stock">
                <el-input v-model="goods.stock" placeholder="商品库存"  clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="商品详情" prop="detail">
                <el-input v-model="goods.detail" placeholder="商品详情"  clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="缩略图">
                <el-upload class="avatar-uploader" :action="hostname+'/api/upload'"
                           :show-file-list="false"
                           :on-success="thumbUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="轮播图">
                <el-upload class="avatar-uploader" :action="hostname+'/api/upload'"
                           :show-file-list="false" :limit="bannerlimit" :multiple="true" :on-success="bannerUpload">
                    <el-button class="el-button el-button--primary">点击上传轮播图</el-button>
                </el-upload>
                <div class="banner-box" :v-if="bannerArr">
                    <ul>
                        <li v-for="(item,index) in bannerArr" :key="index" @mouseenter="showmask(index)" @mouseleave="hiddenmask(index)">
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
                <el-button type="primary" @click="submitform">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {SUCCESS,FAIL,TOKENFAIL,HOSTNAME,IMGPATH} from "../../config/base";
    import {api} from "../../config/api";
    // import axios from 'axios';
    export default {
        name: "Insert",
        data: function () {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                loading:true,
                imageUrl:'',
                bannerlimit:3,
                bannerArr: [],
                imgpath:IMGPATH,
                bannerUrl:'',
                hostname:HOSTNAME,
                category:'',
                goods: {
                    gname: '',
                    thumb:'',
                    mprice:'',
                    sale:'',
                    stock:'',
                    banner:'',
                    detail:'',
                    cid:'',
                    describe:'',
                    norms:'',
                    brand:''
                },
                rules: {
                    gname:  [
                        {required: true, message: '请输入分类名', trigger: 'blur'},
                    ],
                    thumb:[
                        {required: true, message: '请选择轮播图', trigger: 'blur'},
                    ],
                    mprice:[
                        {required: true, message: '请输入市场价', trigger: 'blur'},
                    ],
                    sale:[
                        {required: true, message: '请输入零售价', trigger: 'blur'},
                    ],
                    stock:[
                        {required: true, message: '请输入商品库存', trigger: 'blur'},
                    ],
                    detail:[
                        {required: true, message: '请输入商品详情', trigger: 'blur'},
                    ],
                    cid:[
                        {required: true, message: '请输入分类名', trigger: 'blur'},
                    ],
                    describe:[
                        {required: true, message: '请输入分类名', trigger: 'blur'},
                    ],
                    norms:[
                        {required: true, message: '请输入分类名', trigger: 'blur'},
                    ],
                    brand:[
                        {required: true, message: '请输入分类名', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            thumbUpload(res) {
                this.imageUrl ='http://localhost/'+res.src;
                this.goods.thumb=res.src;
            },
            bannerUpload(res){
                this.bannerArr.push(res.src);
            },
            showmask(index){
                this.$refs.mask[index].style.display="flex";
            },
            hiddenmask(index){
                this.$refs.mask[index].style.display="none";
            },
            lookbanner(index){
                this.dialogImageUrl=this.imgpath+this.bannerArr[index];
                this.dialogVisible=true;
            },
            delectbanner(index){
                this.bannerArr.splice(index,1);
                this.bannerlimit=this.bannerlimit+1;
            },
            submitform() {
                api('/api/goods','post',this.goods)
                    .catch(error=>{
                    console.log(error);
                });
                // axios.post(HOSTNAME+'/api/goods',{
                //     body:this.goods,
                // })
                //     .then(res=>{
                //         console.log(res);
                //     })
                //     .catch(error=>{
                //         console.log(error);
                //     })
                // fetch('http://www.fruit.com/api/goods', {
                //     method: 'POST',
                //     body: JSON.stringify(this.goods),
                //     headers: {
                //         'Content-Type': 'application/json', // 指定提交方式为表单提交
                //         'token':sessionStorage.getItem('token')
                //     },
                // }).then(res => {
                //     if (res.ok) {
                //         return res.json();
                //     }
                // }).then(res=> {
                //     if (res.code===SUCCESS){
                //         this.$message.success(res.msg);
                //     } else if (res.code===TOKENFAIL) {
                //         this.$message.warning(res.msg);
                //     } else if (res.code===FAIL) {
                //         this.$message.error(res.msg);
                //     }
                // })
            },
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
                            this.$message.success(data.msg);
                        } else if (data.code === TOKENFAIL) {
                            this.$message.warning(data.msg);
                        } else if (data.code === FAIL) {
                            this.$message.error(data.msg);
                        }
                    })
            },
        },
        watch:{
            bannerArr(){
                this.goods.banner=this.bannerArr.join();
            }
        },
        beforeMount() {
            this.getCate();
        },
    }
</script>

<style lang="scss">
    .banner-box{
        width: 600px;
        >ul{
            display: flex;
            >li{
                position: relative;
                width: 100px;
                height: 100%;
                margin-left: 10px;
                margin-right: 10px;
                >.mask{
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: none;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.3);
                    >i{
                        margin-right: 5px;
                        margin-left: 5px;
                        color: #fff;
                    }
                }
                >img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .form-box {
        max-width: 400px;
    }
    .el-select {
        display: block;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
    }
    .avatar {
        width: 150px;
        height: 150px;
        display: block;
    }
</style>