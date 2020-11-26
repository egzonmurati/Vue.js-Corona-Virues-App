
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { HorizontalBar } from "vue-chartjs";
export default {
  extends: HorizontalBar,

  computed: {
    ...mapState(["allDeaths"]),
    ...mapGetters(["getCountriesForDeaths", "getDeathsTotal"])
  },
  methods: {
    ...mapActions(["getNewDeathsData"])
  },
  async mounted() {
    await this.getNewDeathsData();
    this.renderChart({ 
      labels: this.getCountriesForDeaths,
      
      datasets: [
         {
          label: "Most Deaths",
          borderColor: "#78281F",
          pointBackgroundColor: "white",
          borderWidth: 1,
          pointBorderColor: "white",
          backgroundColor: "#78281F",
          data: this.getDeathsTotal
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
};
</script>

