<template>
    <div>
<ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center text-muted small">
    Over 100,000 deaths
    <span><img src="http://maps.google.com/mapfiles/ms/micons/lodging.png"></span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center text-muted small">
  Active cases over 150,000
    <span><img src="http://maps.google.com/mapfiles/kml/pal3/icon37.png"></span>
  </li>
</ul>

        <gmap-map 
        :center="{lat: 35.0000, lng:9.0000}"
        :zoom="3" 
        style="width: 100%; height:600px; margin-top: 50px;">
            <gmap-info-window 
            :options="infoWindowOptions" 
            :position="infoWindowPosition" 
            :opened="infoWindowOpened" 
            @closeclick="handleInfoWindowClose">
                <div class="info-window">
                    <h5 v-text="resultContries.location"></h5>
                    <p class="text-info">Case:
                    {{ Number(resultContries.confirmed).toLocaleString() }} 
                   </p>
                    <p class="text-danger">Deaths:
                     {{ Number(resultContries.dead).toLocaleString() }}  
                    </p>
                    <p class="text-success">Recovered:
                      {{ Number(resultContries.recovered).toLocaleString() }} 
                    </p>
                    <p class="text-warning">Active:
                      {{ Number(active).toLocaleString() }} 
                    </p>
                </div>
            </gmap-info-window>
            <gmap-marker v-for="r in data" :key="r.location" 
            :position="getPosition(r)" 
            :clickable="true" 
            :draggable="false" 
            :icon="getMarkers(r)"
            @click="handleMarkerClicked(r)"></gmap-marker>
        </gmap-map>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "GoogleMap",

    data() {
        return {
            data: [],
            infoWindowOptions: {
                pixelOffset: {
                    width: 0,
                    height: -35
                }
            },
            resultContries: {},
            active: "",
            infoWindowOpened: false
        }
    },
    created() {
        axios.get('https://www.trackcorona.live/api/countries')
            .then((response) => this.data = response.data.data)
            .catch((error) => console.error(error));
    },
    methods: {
       getMarkers(r) {
       const activeCases = r.confirmed - r.dead - r.recovered;
       if (r.dead > 100000){
        return "http://maps.google.com/mapfiles/ms/micons/lodging.png"
         }
       else if(activeCases > 150000){
           return "http://maps.google.com/mapfiles/kml/pal3/icon37.png"
       }else{
        return  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iMjkiIHZpZXdCb3g9IjAgMCAyMyAyOSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0yMyAxMS41QzIzIDIxLjUgMTEuNSAyOC41IDExLjUgMjguNUMxMS41IDI4LjUgMCAyMS41IDAgMTEuNUMwIDUuMTQ4NzMgNS4xNDg3MyAwIDExLjUgMEMxNy44NTEzIDAgMjMgNS4xNDg3MyAyMyAxMS41WiIgZmlsbD0iIzMzMzMzMyIvPg0KPGNpcmNsZSBjeD0iMTEuNSIgY3k9IjExLjUiIHI9IjUuNSIgZmlsbD0iYmxhY2siLz4NCjwvc3ZnPg0K";
       }
       },
        getPosition(r) {
            return {
                lat: parseFloat(r.latitude),
                lng: parseFloat(r.longitude)

            }
        },
        handleMarkerClicked(r) {
            this.resultContries = r;
            this.active = this.resultContries.confirmed - this.resultContries.recovered - this.resultContries.dead;
            this.infoWindowOpened = true;
        },
        handleInfoWindowClose() {
            this.resultContries = {};
            this.infoWindowOpened = false;
        }

    },
    computed: {

        infoWindowPosition() {
            return {
                lat: parseFloat(this.resultContries.latitude),
                lng: parseFloat(this.resultContries.longitude)
            };
        },
    }
};
</script>
<style scoped>
.list-group{
    width: 250px;
    height: 80px;
    position: absolute;
    left: 25px;
    top: 185px;
    z-index: 999;
    opacity:0.6;
}
.list-group:hover{
  opacity:1;
}

</style>