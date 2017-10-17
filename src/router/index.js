import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/Layout/Layout';
import Login from '@/views/login/Login';
import Welcome from '@/components/welcome';
import UserList from '@/components/userList/userList';
import officalEdit from '@/components/userList/innerPage/userDetail';
import AddUser from '@/components/userList/innerPage/add-user';
import SurveStaff from '@/components/userList/surveStaff';
import Complaint from '@/components/operation/complaint';
import compManage from '@/components/operation/compManage';
import Refund from '@/components/operation/refund';
import HisManage from '@/components/operation/hisManage';
import TrialManage from '@/components/operation/trialManage';
import paperDetail from '@/components/operation/innerPage/paperDetail';
import userData from '@/components/dataAnalysis/userData';
import behaviourData from '@/components/dataAnalysis/behaviourData';
import tradeData from '@/components/dataAnalysis/tradeData';
import operationLog from '@/components/systemManage/operationLog';
import keyManage from '@/components/systemManage/keyManage';
import adminManage from '@/components/systemManage/adminManage';
import addManage from '@/components/systemManage/innerPage/addManage';
import detailCourt from '@/components/operation/innerPage/detailCourt';
import userSet from '@/components/systemManage/innerPage/userSet';
import adminPermission from '@/components/systemManage/innerPage/adminPermission';
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
                path: '/userDetail',
                component: officalEdit,
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
            },
            {
                path: '/refund',
                component: Refund,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/HisManage',
                component: HisManage,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/TrialManage',
                component: TrialManage,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/userData',
                component: userData,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/behaviourData',
                component: behaviourData,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/tradeData',
                component: tradeData,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/adminManage',
                component: adminManage,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/keyManage',
                component: keyManage,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/operationLog',
                component: operationLog,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/paperDetail',
                component: paperDetail,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/addManage',
                component: addManage,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/detailCourt',
                component: detailCourt,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/userSet',
                component: userSet,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/adminPermission',
                component: adminPermission,
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
