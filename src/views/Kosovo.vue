<template>
    <div class="kosovo">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-3 col-md-3 mb-4">
                    <div class="card border-left-info shadow h-100 py-2 text-white" style="background: #0e0e0e;">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Total Cases</div>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{ Number(TotalCases).toLocaleString() }} <span class="badge badge-info" title="New Case" v-if="NewConfirmed > 0"> + {{NewConfirmed}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fa fa-users fa-2x text-info"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-3 mb-4">
                    <div class="card border-left-danger shadow h-100 py-2 text-white" style="background: #0e0e0e;">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">Total Death</div>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{ Number(TotalDeaths).toLocaleString() }} <span class="badge badge-danger" title="New Death" v-if="NewDeaths > 0"> + {{NewDeaths}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fa fa-bed fa-2x text-danger"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-3 mb-4">
                    <div class="card border-left-success shadow h-100 py-2 text-white" style="background: #0e0e0e;">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Total Recovered</div>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                                {{ Number(TotalRecovered).toLocaleString() }} <span class="badge badge-success" title="New Recovered" v-if="NewRecovered > 0"> + {{NewRecovered}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fa fa-child fa-2x text-success"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-3 mb-4">
                    <div class="card border-left-warning shadow h-100 py-2 text-white" style="background: #0e0e0e;">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Active Cases</div>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{ Number(TotalActiveCase).toLocaleString() }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fa fa-bell fa-2x text-warning"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container pb-5">
    <h2 class="p-3 mb-5 mt-5 text-center text-white" 
    style="font-family: 'freight-book', serif;">
    Daily reported new cases and new deaths of 
    coronavirus in Kosovo in 10 days
    </h2>
            <div class="row">
                <div class="col pl-2">
                    <LineChart :label="labels" :chart-data="confirmed"></LineChart>
                </div>
                <div class="col">
                    <LineChartDeaths :label="labels" :chart-data="deaths"></LineChartDeaths>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// @ is an alias to /srcimport HelloWorld from "@/components/HelloWorld.vue";

import axios from "axios";
// import covid19 from '@/components/json/covid19.json'
import LineChart from "@/components/LineChart.vue";
import LineChartDeaths from "@/components/LineChartDeaths.vue";
import moment from "moment";
export default {
    name: "kosvo",
    components: {
        LineChartDeaths,
        LineChart
    },
    data() {
        return {
            // items: covid19,
            airData: {},
            loaded: false,
            TotalCases: "",
            TotalDeaths: "",
            TotalRecovered: "",
            TotalActiveCase: "",
            NewConfirmed: "",
            NewDeaths: "",
            NewRecovered: "",
            DateCases: "",
            labels: [],
            confirmed: [],
            deaths: []
        }
    },
    created() {
        // this.worldtotal();
        this.statsCases();
        this.getJsonData();
    },
    methods: {
        getJsonData() {
            axios.get("coronavirues.json")
                .then(response => {
                    let newdate = new Date().toISOString().slice(0, 10);
                    let lastweek = moment().subtract('days', 9).format('YYYY-MM-DD')
                    const res = response.data;
                    let result = res.filter(function(obj) {
                        return obj.Date >= lastweek && obj.Date <= newdate;
                    });
                    for (var i = 0; i < result.length; i++) {
                        this.labels.push(result[i].Date)
                        this.confirmed.push(result[i].NewCases)
                        this.deaths.push(result[i].NewDeath)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // TotalCases,TotalDeaths,TotalRecovered,TotalActiveCase
        statsCases() {
            axios.get("coronavirues.json")
                .then(response => {
                    for (var i = 0; i < 250; i++) {

                        this.TotalCases = response.data[i].Cases;
                        this.TotalDeaths = response.data[i].Deaths;
                        this.TotalRecovered = response.data[i].Recovered;
                        this.TotalActiveCase = response.data[i].ActiveCases;
                        this.NewConfirmed = response.data[i].NewCases;
                        this.NewDeaths = response.data[i].NewDeath;
                        this.NewRecovered = response.data[i].NewRecovered;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            // Get data form API
            // axios.get("https://api.covid19api.com/summary")
            //     .then(response => {
            //         for (var i = 0; i < 250; i++) {
            //             // console.log(response.data.Countries[i].CountryCode);
            //             if (response.data.Countries[i].CountryCode == "XK") {
            //                 this.TotalCases = response.data.Countries[i].TotalConfirmed;
            //                 this.TotalDeaths = response.data.Countries[i].TotalDeaths;
            //                 this.TotalRecovered = response.data.Countries[i].TotalRecovered;
            //                 this.TotalActiveCase = this.TotalCases - this.TotalDeaths - this.TotalRecovered;
            //             }
            //         }
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });
        }
        // This is for APi data for newCases,NewDeaths,NewRecovered
        // worldtotal() {
        //     var d = new Date();
        //     var curr_date = d.getDate();
        //     var yesterday = d.getDate() - 2;
        //     // var oneWeek = d.getDate();
        //     var curr_month = d.getMonth() + 1; //Months are zero based
        //     var curr_year = d.getFullYear();
        //     const first = (curr_year + "-" + curr_month + "-" + curr_date + "T00:00:00Z");
        //     const second = (curr_year + "-" + curr_month + "-" + yesterday + "T00:00:00Z");
        //     axios.get("https://api.covid19api.com/country/XK?from=" + second + "&to=" + first)
        //         .then(response => {
        //             this.DateCases = response.data[1].Date;
        //             console.log(this.DateCases);
        //             let firstDateConfirmed = response.data[0].Confirmed;
        //             let secondDateConfirmed = response.data[1].Confirmed;
        //             this.NewConfirmed = secondDateConfirmed - firstDateConfirmed;
        //             let firstDateDeaths = response.data[0].Deaths;
        //             let secondDateDeaths = response.data[1].Deaths;
        //             this.NewDeaths = secondDateDeaths - firstDateDeaths;
        //             let firstDateRecovered = response.data[0].Recovered;
        //             let secondDateRecovered = response.data[1].Recovered;
        //             this.NewRecovered = secondDateRecovered - firstDateRecovered;
        //         });      
        // }
    }
};
</script>
<style scoped>
.apps {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    align-content: center;
}

.border-left-info {
    border-left: .25rem solid #36b9cc !important;
}

.border-left-danger {
    border-left: .25rem solid #e74a3b !important;
}

.border-left-success {
    border-left: .25rem solid #1cc88a !important;
}

.border-left-warning {
    border-left: .25rem solid #f6c23e !important;
}
</style>