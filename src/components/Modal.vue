<template>
  <div
    class="modal fade"
    :class="{ show: visible }"
    tabindex="-1"
    style="display: block"
    aria-modal="true"
    role="dialog"
    v-if="visible"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            @click="$emit('close')"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <slot></slot>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="$emit('close')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,

      default: false,
    },
  },
};
</script>

<style scoped>
.modal {
  display: none;
  background: rgba(0, 0, 0, 0.6);
}

.modal.show {
  display: block;
}
</style>
