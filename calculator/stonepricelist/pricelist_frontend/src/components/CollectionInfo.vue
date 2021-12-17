<template>
  <div class="offcanvas-body">
    <table class="table table-sm table-hover mb-0">
      <thead>
        <tr>
          <th scope="col">Название</th>
          <th scope="col">Арт.</th>
          <th scope="col" class="text-end pe-2">Цена</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stone in collection_data" :key="stone.code">
          <td>{{ stone.name }}</td>
          <td>
            <span class="additional-info">{{ stone.code }}</span>
          </td>
          <td class="text-end pe-2">
            <span v-if="!stone.notStandart">{{ collection_info.price }}</span
            ><span class="ms-1">руб/м<sup>2</sup></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CollectionInfo",
  props: {
    collection_data: Object,
    collection_info: Object,
  },
};
</script>
