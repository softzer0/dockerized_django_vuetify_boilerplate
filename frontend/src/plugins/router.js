import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import axios, { ACCESS_TOKEN_LIFETIME } from '@/plugins/axios'

import Home from '@/components/Home'
import Login from '@/components/Login'
import User from "@/components/User";
import SignUp from "@/components/SignUp";

Vue.use(Router)

const isAuthenticated = (to, from, next) => {
    if (!store.getters['user/isLoggedIn']) {
        next({ name: 'Login' })
    } else {
        next()
    }
}

/*const isGuest = (to, from, next) => {
    if (!store.getters['user/isLoggedIn']) {
        next()
    } else {
        next({ name: 'User' })
    }
}*/

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            async beforeEnter (to, from, next) {
                if (to.params.logout) {
                    await store.dispatch('user/logout')
                }
                next()
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/sign-up',
            name: 'Sign up',
            component: SignUp,
        },
        {
            path: '/user',
            name: 'User',
            component: User,
            beforeEnter: isAuthenticated
        },
        {
            path: '/logout',
            name: 'Logout',
            redirect: { name: 'Home', params: { logout: true } }
        }
    ]
})

const waitForStorageToBeReady = async (to, from, next) => {
    await store.restored
    const token = store.getters['user/getAccessToken']
    if (token && !axios.defaults.headers.common.Authorization) {
        if (new Date().getTime() - store.getters['user/getLastRefreshSince'] < ACCESS_TOKEN_LIFETIME) {
            axios.defaults.headers.common = {Authorization: `Bearer ${token}`}
            store.dispatch('user/set_timeout_for_refresh', new Date().getTime() - store.getters['user/getLastRefreshSince'])
        } else {
            await store.dispatch('user/refresh_token')
        }
    }
    next()
}
router.beforeEach(waitForStorageToBeReady)

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.data && error.response.data.code === 'token_not_valid') {
            store.dispatch('user/clear_auth')
            router.push({name: 'Login'})
        }
        return Promise.reject(error)
    }
)

export default router