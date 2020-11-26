<template>
    <div class="home">
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <div class="card text-white mb-3" style="max-width: 18rem; background: #0e0e0e;">
                        <div class="card-body">
                            <i class="fa fa-users fa-2x text-info"></i>
                            <h5 class="card-title">Coronavirus Cases:</h5>
                            <p class="card-text text-info">
                                {{ Number(cases).toLocaleString() }}
                            </p>
                        </div>
                        <div class="card-footer text-muted">
                            New Confirmed: <span class="card-text text-info">
                                {{ Number(NewConfirmed).toLocaleString() }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card text-white mb-3" style="max-width: 18rem; background: #0e0e0e;">
                        <div class="card-body">
                            <i class="fa fa-bed fa-2x text-danger"></i>
                            <h5 class="card-title">Deaths:</h5>
                            <p class="card-text text-danger">
                                {{ Number(deaths).toLocaleString() }}
                            </p>
                        </div>
                        <div class="card-footer text-muted">
                            New Deaths:<span class="card-text text-danger">
                                {{ Number(NewDeaths).toLocaleString() }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card text-white mb-3" style="max-width: 18rem; background: #0e0e0e;">
                        <div class="card-body">
                            <i class="fa fa-child fa-2x text-success"></i>
                            <h5 class="card-title">Recovered:</h5>
                            <p class="card-text text-success">
                                {{ Number(recovered).toLocaleString() }}
                            </p>
                        </div>
                        <div class="card-footer text-muted">
                            New Recovered:<span class="card-text text-success">
                                {{ Number(NewRecovered).toLocaleString() }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <h2 class="p-3 mb-5 mt-5 text-center text-white" style="font-family: 'freight-book', serif;">Top ten most affected countries with New Cases,Total Cases and Total Deaths</h2>
            <div class="row">
                <div class="col-3">
                    <NewTodayCase />
                </div>
                <div class="col-3">
                    <CasesBar></CasesBar>
                </div>
                <div class="col-3">
                    <newDeaths></newDeaths>
                </div>
                <div class="col-3">
                    <TotalDeaths />
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col">
                    <h2 class="p-3 mb-5 mt-5 text-center text-white" style="font-family: 'freight-book', serif;">Reported Cases and Deaths by Country</h2>
                    <table class="table table-fixed">
                        <thead>
                            <tr>
                                <th scope="col" class="col-3 text-white"> <input class="form-control search text-white" type="search" placeholder="Search a country" aria-label="Search" v-model="searchText"></th>
                                <th scope="col" class="col-2 text-white">NewConfirmed</th>
                                <th scope="col" class="col-2 text-white">TotalConfirmed</th>
                                <th scope="col" class="col-2 text-white">NewDeaths</th>
                                <th scope="col" class="col-1 text-white">TotalDeaths</th>
                                <!--  <th scope="col" class="col-sm">NewRecovered</th> -->
                                <th scope="col" class="col-2 text-white">TotalRecovered</th>
                            </tr>
                        </thead>
                        <tbody v-if="fileterContries.length">
                            <tr v-for="user in fileterContries" :key="user.name">
                                <td class="col-3 text-white">{{ user.Country }}</td>
                                <td class="col-2 text-white">
                                    {{ Number(user.NewConfirmed).toLocaleString() }}
                                </td>
                                <td class="col-2 text-primary">
                                    {{ Number(user.TotalConfirmed).toLocaleString() }}</td>
                                <td class="col-2 text-white">
                                    {{ Number(user.NewDeaths).toLocaleString() }}</td>
                                <td class="col-1 text-danger">
                                    {{ Number(user.TotalDeaths).toLocaleString() }}</td>
                                <!--      <td class="col-1">{{ user.NewRecovered }}</td> -->
                                <td class="col-2 text-success">
                                    {{ Number(user.TotalRecovered).toLocaleString() }}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="6">No country found.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import CasesBar from "@/components/CasesBar.vue";
import NewTodayCase from "@/components/NewTodayCase.vue";
import newDeaths from "@/components/newDeaths.vue";
import TotalDeaths from "@/components/TotalDeaths.vue";
export default {
    name: "Home",
    components: {
        CasesBar,
        NewTodayCase,
        TotalDeaths,
        newDeaths
    },
    data() {
        return {

            selectedCountry: "",
            cases: "",
            deaths: "",
            recovered: "",
            NewConfirmed: "",
            NewDeaths: "",
            NewRecovered: "",
            labels: [],
            confirmed: [],
            recorveds: [],
            deathss: [],
            users: [],
            searchText: ""


        }
    },

    created() {
        this.topContry();
        this.worldtotal();
        // https://covid19tracking.narrativa.com/feed_en.json Kosovo
        axios.get("https://api.covid19api.com/country/albania?from=2020-10-28T00:00:00Z&to=2020-11-04T00:00:00Z").then(response => {


                for (var i = 0; i < 100; i++) {
                    const allDate = response.data[i].Date
                    const date = moment(allDate, "YYYYMMDD").format("DD/MM/YYYY");
                    this.labels.push(date)
                    this.confirmed.push(response.data[i].Active)
                    this.recorveds.push(response.data[i].Recovered)
                    this.deathss.push(response.data[i].Deaths)
                }

            })
            .catch(err => console.log(err));



    },

    methods: {
        worldtotal() {
            axios.get("https://api.covid19api.com/summary")
                .then(response => {
                    this.cases = response.data.Global.TotalConfirmed;
                    this.deaths = response.data.Global.TotalDeaths;
                    this.recovered = response.data.Global.TotalRecovered;
                    this.NewConfirmed = response.data.Global.NewConfirmed;
                    this.NewDeaths = response.data.Global.NewDeaths;
                    this.NewRecovered = response.data.Global.NewRecovered;
                })

        },
        topContry() {

            axios.get('https://api.covid19api.com/summary')
                .then(response => {
                    this.users = response.data.Countries;

                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }

    },
    computed: {
        fileterContries() {
            return this.users.filter((user) => {
                return user.Country.toLowerCase().match(this.searchText);
            });
        }
    }
};
</script>
<style scoped>
.display-4 {
    margin-top: 40px;
    margin-bottom: 15px;
}

.form-control {
    width: 70%;
    height: 20px;
    margin: 0 auto;
    padding: 11px;
    background-color: black;
}

.form-control:focus {
    box-shadow: none;
    background: none;
}

.table-fixed tbody {
    height: 450px;
    overflow-y: auto;
    width: 100%;
}

.table-fixed thead,
.table-fixed tbody,
.table-fixed tr,
.table-fixed td,
.table-fixed th {
    display: block;
}

.table-fixed tbody td,
.table-fixed tbody th,
.table-fixed thead>tr>th {
    float: left;
    position: relative;

    &::after {
        content: '';
        clear: both;
        display: block;
    }
}
</style>