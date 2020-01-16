import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';


import * as singleSpa from 'single-spa';
import { GlobalEventDistributor } from './globalEventDistributor'
import { loadApp } from './helper'

async function init() {
    const globalEventDistributor = new GlobalEventDistributor();
    const loadingPromises = [];

    // app1: The URL "/app1/..." is being redirected to "http://localhost:9001/..." this is done by the webpack proxy (webpack.config.js)
    // loadingPromises.push(loadApp('app1', '/app1', '/app1/singleSpaEntry.js', '/app1/store.js', globalEventDistributor));

    // app2: The URL "/app2/..." is being redirected to "http://localhost:9002/..." this is done by the webpack proxy (webpack.config.js)
    // loadingPromises.push(loadApp('app2', '/app2', '/app2/singleSpaEntry.js', '/app2/store.js', globalEventDistributor));

    // app3: The URL "/app3/..." is being redirected to "http://localhost:9003/..." this is done by the webpack proxy (webpack.config.js)
    loadingPromises.push(loadApp('mfe-pack', '/mfe-pack', 'main.js', null, null)); // does not have a store, so we pass null

    // app3: The URL "/app4/..." is being redirected to "http://localhost:9004/..." this is done by the webpack proxy (webpack.config.js)
    // loadingPromises.push(loadApp('app4', '/app4', '/app4/singleSpaEntry.js', null, null)); // does not have a store, so we pass null

    // app5: The URL "/app5/..." is being redirected to "http://localhost:9005/..." this is done by the webpack proxy (webpack.config.js)
    // loadingPromises.push(loadApp('app5', '/app5', '/app5/singleSpaEntry.js', '/app5/store.js', globalEventDistributor));

    // wait until all stores are loaded and all apps are registered with singleSpa
    await Promise.all(loadingPromises);

    singleSpa.start();
}

init();

Vue.use(VueRouter);
Vue.use(iView);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
