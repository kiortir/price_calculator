<template>
  <Teleport to="body">
    <Dialog :open="isOpen" @close="setIsOpen">
      <DialogOverlay />

      <DialogTitle>Deactivate account</DialogTitle>
      <DialogDescription>This will permanently deactivate your account</DialogDescription>

      <p>
        Are you sure you want to deactivate your account? All of your data will be
        permanently removed. This action cannot be undone.
      </p>

      <!--
      You can render additional buttons to dismiss your dialog by setting your
      `isOpen` state to `false`. 
      -->
      <button @click="setIsOpen(false)">Cancel</button>
      <button @click="handleDeactivate">Deactivate</button>
    </Dialog>
  </Teleport>
</template>

<script>
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue/dist/index';


export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
  },


}
</script>