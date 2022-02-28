<template>
  <SwitchGroup>
    <div class="flex items-center">
      <SwitchLabel class="mr-2">
        <svg
          class="h-6 w-6 text-cyan-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </SwitchLabel>
      <Switch
        v-model="enabled"
        :class="enabled ? 'bg-teal-900' : 'bg-teal-700'"
        class="relative inline-flex items-center h-6 rounded-full w-11"
      >
        <span
          :class="enabled ? 'translate-x-6' : 'translate-x-1'"
          class="transition duration-200 ease-in-out transform inline-block w-4 h-4 bg-white rounded-full"
        />
      </Switch>
    </div>
  </SwitchGroup>
</template>

<script>
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue/dist/index'

export default {
  name: 'VSwitch',
  components: { Switch, SwitchGroup, SwitchLabel },
  emits: ['change'],
  props: ['value'],
  computed: {
    enabled: {
        get(){
            return this.value
        },
        set(val) {
            this.$emit('change', val)
        }
    }
  }
}
</script>
