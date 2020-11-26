
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { HorizontalBar } from "vue-chartjs";
export default {
  extends: HorizontalBar,

  computed: {
    ...mapState(["allCases"]),
    ...mapGetters(["getCountriesForNewCases", "getTodaysTotal"])
  },
  methods: {
    ...mapActions(["getNewData"])
  },
  async mounted() {
    await this.getNewData();
    this.renderChart({ 
      labels: this.getCountriesForNewCases,
      
      datasets: [
         {
          label: "New Cases",
          borderColor: "#2E86C1",
          pointBackgroundColor: "white",
          borderWidth: 1,
          pointBorderColor: "white",
          backgroundColor: "#2E86C1",
          data: this.getTodaysTotal
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
};
</script>

