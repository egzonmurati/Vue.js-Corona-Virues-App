<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    label:  {
      type: Array
    },
    chartData:  {
      type: Array
    }
  },
  mounted() {
    this.renderChart(
      {
          labels: this.label,
        datasets: [
          {
            label: "New Deaths",
            data: this.chartData,
            backgroundColor: "transparent",
            borderColor: "red",
            pointBackgroundColor: "red"
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
         
        }
      }
    );
  }
};
</script>