import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'mains',
        component: () => import('../views/main/Mains.vue'),
        meta: {tittle: '后台管理', auth: true},
        children: [
            {
                path: 'insert',
                name: 'cateinsert',
                component: () => import('../views/category/Insert.vue'),
                meta: {tittle: '添加分类', auth: true}
            },
            {
                path: 'select',
                name: 'cateselect',
                component: () => import('../views/category/Select.vue'),
                meta: {tittle: '分类查看', auth: true}
            },
            {
                path: 'updata/:id',
                name: 'cateupdata',
                component: () => import('../views/category/Updata.vue'),
                meta: {tittle: '分类编辑', auth: true}
            },
            {
                path:'goodsinsert',
                name:'goodsinsert',
                component:()=>import('../views/goods/Insert.vue'),
                meta:{tittle:'商品插入',auth:true}
            },
            {
                path: 'goodsselect',
                name: 'goodsselect',
                component: () => import('../views/goods/Select.vue'),
                meta: {tittle: '分类查看', auth: true}
            },
            {
                path: 'goodsupdata/:id',
                name: 'goodsupdata',
                component: () => import('../views/goods/Updata.vue'),
                meta: {tittle: '分类编辑', auth: true}
            },
        ],

    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
        meta: {tittle: '后台登录'}
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    let title = to.meta.tittle || '每日生鲜系统';
    document.title = title;
    if (to.meta.auth) {
        let token = sessionStorage.getItem('token');
        if (token) {
            next();
        } else {
            next('/login?redirect=' + to.name);
        }
    } else {
        next();
    }
});

export default router
