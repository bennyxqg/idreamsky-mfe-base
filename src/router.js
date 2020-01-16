const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/mfe-pack',
        title: '道具管理',
        name: 'mfe-pack',
        access: 0,
        component: (resolve) => require(['./views/mfe.vue'], resolve)
    }
];
export default routers;