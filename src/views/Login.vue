<template>
    <div class="bcackcolor">
        <div class="box">
                <el-form :model="form">
                    <el-form-item>
                        <el-input v-model="form.names" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="btn-box">
                            <el-button type="primary" @click="onSubmit">登录</el-button>
                            <el-button>取消</el-button>
                        </div>

                    </el-form-item>
                </el-form>
            </div>
    </div>
</template>

<script>
    import {SUCCESS, FAIL, HOSTNAME} from "../config/base";

    export default {
        name: "login",
        data() {
            return {
                form: {
                    names: "",
                    password: ''
                }
            }
        },
        methods: {
            onSubmit() {
                fetch(HOSTNAME + '/admin/login/index', {
                    method: 'POST',
                    body: JSON.stringify(this.form),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.code === SUCCESS) {
                            let redirect = this.$route.query.redirect || 'mains';
                            this.$message.success(res.msg);
                            console.log(res);
                            sessionStorage.token = res.data.token;
                            sessionStorage.names = res.data.names;
                            this.$router.push({name: redirect});
                        } else if (res.code === FAIL) {
                            this.$message.success(res.msg);
                        }
                    })
            }
        }

    }
</script>

<style scoped >
    .bcackcolor {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: url("../assets/bj1.jpg") no-repeat center center;
        background-size: cover;
        background-color: red;
    }
    .box {
        width: 260px;
        height: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: beige;
        padding: 20px;
        border-radius: 10px;
    }
    .btn-box{
        display: flex;
        justify-content: space-around;
    }
</style>