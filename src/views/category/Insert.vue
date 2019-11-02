<template>
    <div class="form-box">
        <el-form ref="form" :model="category" :rules="rules" label-width="100px">
            <el-form-item label="分类名" prop="cname">
                <el-input v-model="category.cname" icon="el-icon-search" placeholder="商品分类名称" minlength="2" maxlength="4" show-word-limit clearable>>
                </el-input>
            </el-form-item>
            <el-form-item label="缩略图">
                <el-upload class="avatar-uploader" :action="hostname+'/api/upload'"
                        :show-file-list="false"
                        :on-success="uploadsuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input v-model.number="category.sort" placeholder="排序"  clearable>>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitform">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {SUCCESS,FAIL,TOKENFAIL,HOSTNAME} from "../../config/base";
    export default {
        name: "Insert",
        data: function () {
            return {
                imageUrl:'',
                hostname:HOSTNAME,
                category: {
                    cname: '',
                    thumb:'',
                    sort:'',
                },
                rules: {
                    cname: [
                        {required: true, message: '请输入分类名', trigger: 'blur'},
                        {min: 2, max: 4, message: '长度在 2 到 4个字符', trigger: 'blur'}
                    ],
                    sort: [
                        {required: true, message: '请输入排序号', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            uploadsuccess(res) {
                this.imageUrl ='http://localhost/'+res.src;
                this.category.thumb=res.src;
            },
            submitform() {
                fetch('http://www.fruit.com/api/category', {
                    method: 'POST',
                    body: JSON.stringify(this.category),
                    headers: {
                        'Content-Type': 'application/json', // 指定提交方式为表单提交
                        'token':sessionStorage.getItem('token')
                        // 'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
                    },
                }).then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                }).then(res=> {
                    if (res.code===SUCCESS){
                        this.$message.success(res.msg);
                    } else if (res.code===TOKENFAIL) {
                        this.$message.warning(res.msg);
                    } else if (res.code===FAIL) {
                        this.$message.error(res.msg);
                    }
                })
            }
        },
    }
</script>

<style>
    .el-textarea__inner {

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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>