import Vuex from "vuex";
import Vue from 'vue'
import { getHomeData } from "@/api/home";

Vue.use(Vuex)
export default new Vuex.Store({

    state: {
        banners: [],
        recommends: []
    },
    mutations: {
        getHomeData(state, payload) {
            state.banners = payload.banner.list,
                state.recommends = payload.recommend.list

        },
    },
    actions: {
        async getHomeData({ commit }) {
            let result = await getHomeData()
            commit('getHomeData', result.data.data)
        }
    },




    getters: {
        banners(state) {
            return state.banners
        },
        recommends(state) {
            return state.recommends
        },

    }

})