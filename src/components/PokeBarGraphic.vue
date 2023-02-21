<template>
  <Bar
   :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import {  ref, watch } from "vue";
import { Result } from "@/models/MPokeList";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps(['data'])

const chartData = ref({
  labels: JSON.parse(JSON.stringify(props.data.map((pk:Result)=> pk.name))),
  datasets: [
    {
      label: "Poke Data XP",
      backgroundColor: "#f87979",
      data: JSON.parse(JSON.stringify(props.data.map((pk:Result)=> pk.base_experience))),
    },
  ],
});

const chartOptions = ref({
  responsive: true,
});

watch(()=> props.data, (newData) => {
  chartData.value = {
  labels: JSON.parse(JSON.stringify(newData.map((pk:Result)=> pk.name))),
  datasets: [
    {
      label: "Poke Data XP",
      backgroundColor: "#f87979",
      data: JSON.parse(JSON.stringify(newData.map((pk:Result)=> pk.base_experience))),
    },
  ],
}
})

</script>
