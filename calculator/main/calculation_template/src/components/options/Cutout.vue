<template>
<div class="card">
    <div class="card-header bg-transparent">
        <div class="row g-0">
            <div class="col-10 h-100 my-auto">Отверстия D⌀ &#60;= 35мм</div> <div class="col-2">
                    <button class="btn btn-outline-danger w-100 p-0" type="button" @click="$emit('removeoption')">
                        -
                    </button>
            </div>
        </div>
    </div>
    <div class="card-body row">
        <div class="col m-xl-auto my-auto">
            <input type="number" class="form-control" placeholder="шт." :value="data.quantity" @input="update('quantity', $event.target.value)" />
        </div>
    </div>
</div>
</template>

<script>
export default {
    emits: ["removeoption", "refresh"],
    name: "cutout",
    props: {
        optionIndex: Number,
        cardIndex: Number,
    },
    computed: {
        data() {
            return this.$store.state.values.product_cards[this.cardIndex].option_card[
                this.optionIndex
            ].data;
        },
    },
    methods: {
        update(field, value) {
            this.$emit("refresh", this.optionIndex, field, value);
        },
    },
};
</script>
