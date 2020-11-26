<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { HorizontalBar } from "vue-chartjs";
export default {
  extends: HorizontalBar,

  computed: {
    ...mapState(["newTodayDeaths"]),
    ...mapGetters(["getTodayCountriesForDeaths", "getTodayDeathsTotal"])
  },
  methods: {
    ...mapActions(["getTodayDeathsData"])
  },
  async mounted() {
    await this.getTodayDeathsData();
    this.renderChart({ 
      labels: this.getTodayCountriesForDeaths,
      
      datasets: [
         {
          label: "New Deaths",
          borderColor: "#E74C3C",
          pointBackgroundColor: "white",
          borderWidth: 1,
          pointBorderColor: "white",
          backgroundColor: "#E74C3C",
          data: this.getTodayDeathsTotal
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
};
</script>