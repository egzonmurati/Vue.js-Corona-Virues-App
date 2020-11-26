<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { HorizontalBar } from "vue-chartjs";
export default {
  extends: HorizontalBar,

  computed: {
    ...mapState(["data"]),
    ...mapGetters(["getCountries","getCountriesForNewCases", "getTotal", "getTodaysTotal"])
  },
  methods: {
    ...mapActions(["getData"])
  },
  async mounted() {
    await this.getData();
    this.renderChart({ 
      labels: this.getCountries,
      
      datasets: [
         {
          label: "Most Cases",
          borderColor: "#154360",
          pointBackgroundColor: "white",
          borderWidth: 1,
          pointBorderColor: "white",
          backgroundColor: "#154360",
          data: this.getTotal
        }
        
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
};


</script>

