<template>
    <div id="box-style">
        <el-container>
            <el-aside>
                <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-sunny"></i> 商品分类管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1" >
                                <router-link :to="{name:'cateinsert'}">新增分类</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <router-link :to="{name:'cateselect'}">查看分类</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-sunny"></i> 商品管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1" >
                                <router-link :to="{name:'goodsinsert'}">商品上架</router-link>
                            </el-menu-item>
                            <el-menu-item index="2-2">
                                <router-link :to="{name:'goodsselect'}">查看商品</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header>
                    <el-menu
                            class="el-menu-demo"
                            mode="horizontal"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <el-submenu index="1">
                            <template slot="title">日报</template>
                            <el-menu-item index="1-1">填写日报
                            </el-menu-item>
                            <el-menu-item index="1-2">查看学生
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">管理</template>
                            <el-menu-item index="2-1">添加教师</el-menu-item>
                            <el-menu-item index="2-2">删除教师</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">管理</template>
                            <el-menu-item index="3-1">添加教师</el-menu-item>
                            <el-menu-item index="3-2">删除教师</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="6" style="float: right">{{names}}</el-menu-item>
                    </el-menu>

                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "mains",
        data(){
            return {
                names:''
            }
        },
        methods:{
            getNames(){
                this.names=JSON.parse(sessionStorage.getItem('names'))
            }
        },

    }
</script>

<style scoped>
    a{
        color: #ccc;
    }
    .el-menu-item.is-active{
        background-color: rgba(199, 236, 228, 0.44) !important;
        color: black;
    }
    #box-style {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
    }

    .el-container {
        height: 100%;
    }

    .el-container.is-vertical {
        width: 100%;
        height: 100%;
    }
    .el-menu-vertical-demo.el-menu{
        width: 100%;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
        padding: 0;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        width: 200px!important;

    }
    .el-aside > ul {
        height: 100%;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        height: 100%;
    }

    .el-main > div {
        height: 100%;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>