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
            label: "New cases",
            data: this.chartData,
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
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