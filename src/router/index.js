
import { createRouter, createWebHistory } from "vue-router"
import Home from "../components/Home.vue"
import Favourite from "../components/Favourite.vue"


const routes = [
    {
        path: "/", component: Home, name: "home"
    },
    {
        path: "/favourite", component: Favourite, name: "favourite"
    }
]
export default createRouter(
    {
        history: createWebHistory(), routes
    })