import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/Layout/Layout';
import Welcome from '@/components/welcome';
import UserList from '@/components/userList/userList';
import Login from '@/views/login/Login';
import AddUser from '@/components/userList/innerPage/add-user';
import SurveStaff from '@/components/userList/surveStaff';
import Complaint from '@/components/operation/complaint';
import compManage from '@/components/operation/compManage';
Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        component: Layout,
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: '/',
                redirect: '/welcome',
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/welcome',
                component: Welcome,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/userlist',
                component: UserList,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/addUser',
                component: AddUser,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/survestaff',
                component: SurveStaff,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/complaint',
                component: Complaint,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/compManage',
                component: compManage,
                meta: {
                    requireAuth: true
                }
            }
        ]
    },
    {
        path: '/login',
        component: Login
    }
];
export default new VueRouter({
    routes
});
