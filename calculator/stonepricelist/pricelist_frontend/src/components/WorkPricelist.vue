<template>
  <input type="text" class="form-control mb-3" placeholder="Поиск..." v-model="search_str">
  <table class="table table-striped table-hover">
    <thead>
      <td>Название работы</td>
      <td>ед. измерения</td>
      <td>Цена</td>
    </thead>
    <tbody>
      <tr v-for="work in filtered_jobs" :key="work.name">
        <td class="job-title">{{ work.name }}</td>
        <td>{{ work.measurement }}</td>
        <td>{{ work.cost }}</td>
        <!-- <td>{{ work.spending }}</td> -->
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
  data() {
    return {
      search_str: "",
    }
  },
  computed: {
    filtered_jobs() {
      if (!this.search_str) {
        return this.pricelist
      }
      const refined_q = this.search_str.toLowerCase().replace(' ', '')

      return this.pricelist.filter(el => {
        if (!el.name) {
          return false
        }
        console.log({
          name: el.name.toLowerCase().replaceAll(' ', ''),
          refined_q
        })
        return el.name.toLowerCase().replaceAll(' ', '').startsWith(refined_q)
      })
    }
  }
};
</script>

<style scoped>
/* thead {
  font-weight: semibold;
  font-size: larger;
}

.job-title {
  font-size: 1.05rem;
}

tbody>tr:nth-child(even) {
  background-color: bisque;
} */
</style>

<!-- <script setup>
defineProps({
  pricelist: Object,
})
</script> -->