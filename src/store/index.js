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
        itemParamsInfo: {},
        itemParamsRule: {},
        rate: {},
        skuInfo: {},
        cartData: []
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
            state.itemParamsInfo = payload.itemParams.info
            state.itemParamsRule = payload.itemParams.rule
            state.rate = payload.rate
            state.skuInfo = payload.skuInfo
            state.skuInfo_defaultPrice = payload.skuInfo.defaultPrice
        },
        getRecommend(state, payload) {
            state.detail_recommends = payload
        },
        cartData(state, payload) {
            state.cartData.push(payload)
        }
    },
    actions: {
        async getHomeData({ commit }) {
            let result = await getHomeData()
            commit('getHomeData', result.data.data)
        },

        async getDetail({ commit }, payload) {

            let result = await getDetail(payload.id)
            console.log(result.data.result.skuInfo)
            commit('getDetail', result.data.result)
        },
        async getRecommend({ commit }) {

            let result = await getRecommend()
            commit('getRecommend', result.data.data.list)
        },

        // 购物车数据
        cartData({ commit }, payload) {
            commit('cartData', payload)
            console.log(payload)
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
        itemParamsInfo(state) {
            return state.itemParamsInfo
        },
        itemParamsRule(state) {
            return state.itemParamsRule
        },
        rate(state) {
            return state.rate
        },
        detail_recommends(state) {
            return state.detail_recommends
        },
        skuInfo(state) {
            return state.skuInfo
        },
        cartData(state) {
            return state.cartData
        }

    }

})