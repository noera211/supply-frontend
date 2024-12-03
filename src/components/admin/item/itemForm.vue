<template>
  <form @submit.prevent="submitForm" class="item-form">
      <div class="mb-3">
          <label for="id" class="form-label">Kode Barang</label>
          <input type="text" v-model="form.id" id="id" class="form-control" required />
      </div>
      <div class="mb-3">
          <label for="name" class="form-label">Nama Barang</label>
          <input type="text" v-model="form.name" id="name" class="form-control" required />
      </div>
      <div class="mb-3">
          <label for="description" class="form-label">Deskripsi</label>
          <textarea v-model="form.description" id="description" class="form-control" required></textarea>
      </div>
      <div class="mb-3">
          <label for="quantity" class="form-label">Stok</label>
          <input type="number" v-model.number="form.quantity" id="quantity" class="form-control" required />
      </div>
      <div v-if="form.error" class="alert alert-danger">{{ form.error }}</div>
      <button type="submit" class="btn btn-success w-100">
          {{ isEdit ? "Simpan Perubahan" : "Tambah Item" }}
      </button>
  </form>
</template>

<script>
import { useItemStore } from '@/store/itemStore';
export default {
  props: {
      item: {
          type: Object,
          default: () => ({}),
      },
      isEdit: {
          type: Boolean,
          default: false,
      },
  },
  data() {
      return {
          form: {
              id: "",
              name: "",
              description: "",
              quantity: 0,
              error: "",
          },
      };
  },
  watch: {
      item: {
          immediate: true,
          handler(newItem) {
              if (this.isEdit) {
                  this.form = {
                      id: newItem.id,
                      name: newItem.name,
                      description: newItem.description,
                      quantity: newItem.quantity,
                      error: "",
                  };
              } else {
                  this.resetForm();
              }
          },
      },
  },
  methods: {
      resetForm() {
          this.form = {
              id: "",
              name: "",
              description: "",
              quantity: 0,
              error: "",
          };
      },
      async submitForm() {
          try {
              this.form.error = "";

              const payload = {
                  id: this.form.id,
                  name: this.form.name,
                  description: this.form.description,
                  quantity: this.form.quantity,
              };

              console.log("Sending data to server:", payload);

              if (this.isEdit) {
                  await useItemStore().updateItem(payload);
              } else {
                  await useItemStore().addItem(payload);
              }

              this.$emit("submit", this.form);
              this.resetForm();
          } catch (error) {
              console.error("Failed to submit form:", error);
              if (error.response) {
                  console.error("Response Status:", error.response.status);
                  console.error("Response Data:", error.response.data);
                  this.form.error = error.response.data.message || "Unknown error";
              } else if (error.request) {
                  console.error("Request made but no response received:", error.request);
                  this.form.error = "Request made but no response received";
              } else {
                  console.error("Error details:", error.message);
                  this.form.error = error.message || "Failed to submit form";
              }
          }
      },
  },
};
</script>

<style scoped>
.item-form .form-label {
  margin-top: 1rem;
}

.alert {
  margin-top: 1rem;
}
</style>