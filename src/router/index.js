
import { createRouter, createWebHistory } from "vue-router"
import Home from "../pages/Home.vue"
import Favourite from "../pages/Favourite.vue"
import Login from "../pages/Login.vue"


const routes = [
    {
        path: "/", component: Home, name: "home"
    },
    {
        path: "/favourite", component: Favourite, name: "favourite"
    },
    {
        path: "/login", component: Login, name: "login"
    }
]
export default createRouter(
    {
        history: createWebHistory(), routes
    })