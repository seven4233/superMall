import Vuex from "vuex";
import Vue from 'vue'
import { getHomeData } from "@/api/home";
import { getDetail, getRecommend } from "@/api/detail";


Vue.use(Vuex)
export default new Vuex.Store({

    state: {
        banners: [],
        // 首页推荐
        recommends: [],
        // 详情页的推荐
        detail_recommends: [],
        itemInfo: {},
        shopInfo: {},
        columns: [],
        detailInfo: {},
        itemParams: {},
        rate: {}
    },
    mutations: {
        getHomeData(state, payload) {
            state.banners = payload.banner.list,
                state.recommends = payload.recommend.list

        },
        getDetail(state, payload) {
            state.itemInfo = payload.itemInfo
            state.shopInfo = payload.shopInfo
            state.columns = payload.columns
            state.detailInfo = payload.detailInfo
            state.itemParams = payload.itemParams
            state.rate = payload.rate
        },
        getRecommend(state, payload) {
            state.detail_recommends = payload
        }
    },
    actions: {
        async getHomeData({ commit }) {
            let result = await getHomeData()
            commit('getHomeData', result.data.data)
        },

        async getDetail({ commit }, payload) {

            let result = await getDetail(payload.id)
            // console.log(result.data.result)
            commit('getDetail', result.data.result)
        },
        async getRecommend({ commit }) {

            let result = await getRecommend()
            console.log(result.data.data.list)
            commit('getRecommend', result.data.data.list)
        }
    },




    getters: {
        banners(state) {
            return state.banners
        },
        recommends(state) {
            return state.recommends
        },
        itemInfo(state) {
            return state.itemInfo
        },
        shopInfo(state) {
            return state.shopInfo
        },
        columns(state) {
            return state.columns
        },
        detailInfo(state) {
            return state.detailInfo
        },
        itemParams(state) {
            return state.itemParams
        },
        rate(state) {
            return state.rate
        },
        detail_recommends(state) {
            return state.detail_recommends
        }

    }

})