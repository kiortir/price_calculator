<template>
  <table>
    <tbody>
      <tr v-for="work in pricelist" :key="work.name">
        <td>{{ work.name }}</td>
        <td>{{ work.measurement }}</td>
        <td>{{ work.cost }}</td>
        <td>{{ work.spending }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "WorkPricelist",
  props: {
    pricelist: Object,
  },
};
</script>
