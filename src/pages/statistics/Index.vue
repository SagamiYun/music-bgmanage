<template>
  <div class="page">
    <div class="q-pa-md">
      <div class="q-gutter-y-md" style="max-width: 600px">
        <q-card :style="{ width: '75vw', height: '75vh' }">
          <div
            id="userAddressChart"
            :style="{ width: '72vw', height: '72vh' }"
          ></div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getUserAddress } from '../../api/statistic.js';
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
const tab = ref('mails');
const drawLine = () => {
  let userAddressChart = echarts.init(
    document.getElementById('userAddressChart')
  );

  let option = {
    color: [
      '#1976d2',
      '#26a69a',
      '#9c27b0',
      '#1d1d1d',
      '#21ba45',
      '#c10015',
      '#31ccec',
      '#f2c037'
    ],
    title: {
      text: '各地区用户比例统计图',
      subtext: '虚拟数据',
      left: 'left'
    },
    legend: {
      trigger: 'item'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '地区比例',
        type: 'pie',
        radius: [40, 200],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 10
        },
        data: []
      }
    ]
  };
  getUserAddress().then(res => {
    res.data.forEach(item => {
      option.series[0].data.push({ name: item.address, value: item.count });
    });
    userAddressChart.setOption(option);
  });
};

onMounted(drawLine);
</script>

<style scoped>
.container-fluid {
  margin: 0;
  padding: 0;
}
</style>
