<script>
export default {
  data() {
    return {
      estimations: []
    }
  },
  computed: {
    name2() {
      return this.name + '2'
    }
  },
  created() {
    fetch('api/getpage/', {
      method: 'POST',
      headers: {
        'X-CSRFToken': document.getElementsByName('csrfmiddlewaretoken')[0].value
      },
      page: this.$route.query.page || 1,
    }).then(r => r.json()).then(json => { this.estimations = json })
  }
}
</script>


<template>
  <div class="md:container md:mx-auto">
    <div class="control-panel"></div>
    <div
      class="result-list p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      <div
        class="rounded overflow-hidden shadow-lg bg-white"
        v-for="estimation in estimations"
        :key="estimation.id"
      >
        <router-link :to="`/${estimation.id}`">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-left">Расчет для {{ estimation.id }}</div>
            <div class="spec-list">
              <ul class="list-disc text-left">
                <li>
                  <span>Лид: {{ estimation.related_lead || "не указан" }}</span>
                </li>
                <li>
                  <span>Рассчитано: {{ estimation.created_by }}</span>
                </li>
                <li>
                  <span>Последнее изменение: {{ estimation.updated_at }}</span>
                </li>
              </ul>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>

</style>
