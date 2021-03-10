import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import AddPost from './pages/AddPost.vue'
import Logout from './pages/Logout.vue'

const Routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    {
        path: '/login', component: Login
    },
    {
        path: '/logout', component: Logout
    },
    {
        path: '/addPost', component: AddPost
    },
    {
        path: '/removePost', component: {
            template: "<b>removePost</b>"
        }
    },
]
export default Routes;