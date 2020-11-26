<template>
    <div class="about">
        <section class="about-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-5">
                        <div class="about-img">
                            <img alt="Vue logo" src="../assets/covid.png" />
                        </div>
                    </div>
                    <div class="col-md-7 about-right">
                        <h2 class="color-3 text-white font-weight-light"><b>About us Covid-19</b></h2>
                        <p class="lead text-left text-white">
                            COVID-19 affects different people in different ways. Infected people have had a wide range of symptoms reported – from mild symptoms to severe illness.
                        </p>
                        <p class="text-left text-white">Symptoms may appear 2-14 days after exposure to the virus. People with these symptoms may have COVID-19:</p>
                        <ul>
                            <li class="text-left text-white">Fever or chills</li>
                            <li class="text-left text-white">Cough</li>
                            <li class="text-left text-white">Shortness of breath or difficulty breathing</li>
                            <li class="text-left text-white">Fatigue</li>
                            <li class="text-left text-white">Muscle or body aches</li>
                            <li class="text-left text-white">Headache</li>
                            <li class="text-left text-white">New loss of taste or smell</li>
                            <li class="text-left text-white">Sore throat</li>
                            <li class="text-left text-white">Congestion or runny nose</li>
                            <li class="text-left text-white">Nausea or vomiting</li>
                            <li class="text-left text-white">Diarrhea</li>
                        </ul>
                        <p class="text-left text-white">This dashboard was built with the Html5,Css3,Bootstrap Vue.js,Chart-js,Vue2-google-maps, API for JavaScript - the source code is available on <a href="#" class="badge badge-light">Github</a></p>
                        <p class="text-left text-white">Data sources API:</p>
                        <ul>
                            <li class="text-left text-white"><a href="https://api.covid19api.com/summary" class="badge badge-info">https://api.covid19api.com/summary</a></li>
                            <li class="text-left text-white"><a href="https://www.trackcorona.live/api/countries" class="badge badge-info">https://www.trackcorona.live/api/countries</a></li>
                            <li class="text-left text-white"><a href="https://corona.lmao.ninja/v3/covid-19/countries" class="badge badge-info">https://corona.lmao.ninja/v3/covid-19/countries</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <!--  <p>This prototype was built with the ArcGIS API for JavaScript - the source code is available on Github.

Data sources WHO, CDC, ECDC, NHC and DXY</p> -->
    </div>
</template>
<script>
// @ is an alias to /src


export default {
    name: "Home",
    components: {

    }
};
</script>
<style scoped>
.about-page {
    font-family: tahoma;


}

.container {
    padding-top: 90px;
    padding-bottom: 50px;
    border: 1px solid white;
}

.about-img {
    padding-top: 150px;
}
</style>