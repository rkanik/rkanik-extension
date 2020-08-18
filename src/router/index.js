import Vue from 'vue'
import VueRouter from 'vue-router'
import views from "../views"

Vue.use(VueRouter)

var routes = Object.keys(views).map(key => ({
    name: views[key].name,
    component: views[key],
    path: views[key].path ? views[key].path : '/' + views[key].name,
}))

const router = new VueRouter({
    routes,
    mode: 'history',
    base: process.env.BASE_URL,
})

export default router