<template>
    <div class="form-box" v-if="updatacate">
        <el-form ref="form" :model="updatacate" label-width="80px">
            <el-form-item label="分类名称">
                <el-input v-model="updatacate.cname" placeholder="Username" clearable>>
                    <i slot="prefix" class="el-icon-user"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input  v-model="updatacate.sort" placeholder="Password" clearable>>
                    <i slot="prefix" class="el-icon-lock"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="缩略图">
                <el-upload class="avatar-uploader" :action="hostname+'/api/upload'"
                           :show-file-list="false"
                           :on-success="uploadsuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <!--<template>-->
                    <!--<img :src="'http://localhost/'+updatacate.thumb" alt="updatacate.cname" :title="updatacate.cname">-->
                <!--</template>-->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updatafrom(id)">提交修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {SUCCESS, FAIL, TOKENFAIL, HOSTNAME} from "../../config/base";

    export default {
        name: "Updata",
        data() {
            return {
                imageUrl:'',
                updatacate: null,
                id: '',
                hostname:HOSTNAME,
                category: {
                    cname: '',
                    thumb: '',
                    sort: '',
                },
            }
        },
        methods: {
            uploadsuccess(res) {
                this.imageUrl ='http://localhost/'+res.src;
                this.updatacate.thumb=res.src;
            },
            updatafrom(id) {
                fetch(HOSTNAME + '/api/category/' + id, {
                    method: 'PUT',
                    body: JSON.stringify(this.updatacate),
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
            updata(id) {
                fetch('http://www.fruit.com/api/category/' + id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': sessionStorage.getItem('token')
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === SUCCESS) {
                            this.updatacate = data.data;
                            this.imageUrl='http://localhost/'+data.data.thumb;
                            this.$message.success(data.msg);
                        } else if (data.code === TOKENFAIL) {
                            this.$message.warning(data.msg);
                        } else if (data.code === FAIL) {
                            this.$message.error(data.msg);
                        }
                    })
            },
            getid() {
                this.id = this.$route.params.id;
            }
        },
        beforeMount() {
            this.getid();
            this.updata(this.id);
        },
    }
</script>

<style scoped>
    .form-box {
        max-width: 400px;
    }

    .el-select {
        display: block;
    }
</style>