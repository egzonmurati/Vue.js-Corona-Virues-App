import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const api = "https://corona.lmao.ninja/v3/covid-19/countries";

export default new Vuex.Store({
    state: {
        allCases: [],
        newTodayCases: [],
        allDeaths: [],
        newTodayDeaths: []

    },
    mutations: {
        setData(state, cases) {
            state.allCases = cases;
        },
        setNewData(state, newCases) {
            state.newTodayCases = newCases;
            // console.log(state.newTodayCases);
        },
        setNewDeathsData(state, deaths) {
            state.allDeaths = deaths;

        },
        setTodayDeathsData(state, newDeaths) {
            state.newTodayDeaths = newDeaths;

        }
    },
    actions: {
        async getData({ commit }) {
            let { data } = await axios.get(api);
            commit("setData", data);
        },

        async getNewData({ commit }) {
            let { data } = await axios.get(api);
            commit("setNewData", data);
        },
        async getNewDeathsData({ commit }) {
            let { data } = await axios.get(api);
            commit("setNewDeathsData", data);
        },
        async getTodayDeathsData({ commit }) {
            let { data } = await axios.get(api);
            commit("setTodayDeathsData", data);
        }
    },
    getters: {
        getCountries(state) {

            let sortedArray = [...state.allCases].sort((a, b) => b.cases - a.cases).splice(0, 10);
            let countries = sortedArray.map(x => x.country);
            let countriesList = countries.slice(0, 10);
            return countriesList;
        },
        getCountriesForNewCases(state) {
            let sortedArray = [...state.newTodayCases].sort((a, b) => b.todayCases - a.todayCases).splice(0, 10);
            let countries = sortedArray.map(x => x.country);
            let countriesList = countries.slice(0, 10);
            return countriesList;
        },
        getCountriesForDeaths(state) {
            let sortedArray = [...state.allDeaths].sort((a, b) => b.deaths - a.deaths).splice(0, 10);
            let countries = sortedArray.map(x => x.country);
            let countriesList = countries.slice(0, 10);
            return countriesList;
        },
        getTodayCountriesForDeaths(state) {
            let sortedArray = [...state.newTodayDeaths].sort((a, b) => b.todayDeaths - a.todayDeaths).splice(0, 10);
            let countries = sortedArray.map(x => x.country);
            let countriesList = countries.slice(0, 10);
            return countriesList;
        },
        getTotal(state) {
            let sortedArray = [...state.allCases].sort((a, b) => b.cases - a.cases).splice(0, 10);

            let total = sortedArray.map(x => x.cases);
            let totalList = total.slice(0, 10);
            return totalList;
        },
        getTodaysTotal(state) {
            let sortedArray = [...state.newTodayCases].sort((a, b) => b.todayCases - a.todayCases).splice(0, 10);

            let today = sortedArray.map(x => x.todayCases);
            let todayList = today.slice(0, 10);
            return todayList;
        },
        getDeathsTotal(state) {
            let sortedArray = [...state.allDeaths].sort((a, b) => b.deaths - a.deaths).splice(0, 10);

            let today = sortedArray.map(x => x.deaths);
            let todayList = today.slice(0, 10);
            return todayList;
        },
        getTodayDeathsTotal(state) {
            let sortedArray = [...state.newTodayDeaths].sort((a, b) => b.todayDeaths - a.todayDeaths).splice(0, 10);

            let today = sortedArray.map(x => x.todayDeaths);
            let todayList = today.slice(0, 10);
            return todayList;
        }

    }
});