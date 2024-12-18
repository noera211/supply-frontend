<template>
  <div class="transaction-form">
    <form @submit.prevent="submitForm" class="p-4 bg-light border rounded shadow-sm">
      <h2 class="text-center mb-4">Pengembalian Barang</h2>
      
      <div class="mb-3">
        <label for="kode" class="form-label">Kode Barang:</label>
        <input type="text" v-model="form.kode" id="kode" class="form-control" disabled />
      </div>
      
      <div class="mb-3">
        <label for="nama" class="form-label">Nama Produk:</label>
        <input type="text" v-model="form.nama" id="nama" class="form-control" disabled />
      </div>
      
      <div class="mb-3">
        <label for="tanggal_pinjam" class="form-label">Tanggal Pinjam:</label>
        <input type="date" v-model="form.tanggal_pinjam" id="tanggal_pinjam" class="form-control" disabled />
      </div>
      
      <div class="mb-3">
        <label for="tanggal_kembali" class="form-label">Tanggal Kembali:</label>
        <input type="date" v-model="form.tanggal_kembali" id="tanggal_kembali" class="form-control" />
      </div>
      
      <div class="mb-3">
        <label for="jumlah_pinjam" class="form-label">Jumlah Pinjam:</label>
        <input type="number" v-model="form.jumlah_pinjam" id="jumlah_pinjam" class="form-control" disabled />
      </div>
      
      <div class="d-flex justify-content-between">
        <button type="button" class="btn btn-danger" @click="cancelForm">Batal</button>
        <button type="submit" class="btn btn-success">Ajukan</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useTransactionStore } from '@/store/transactionStore';  // Import the store
import { ref, watch } from "vue";  // Import ref and watch from vue

export default {
  props: {
    transaction: Object,
  },
  setup(props, { emit }) {
    const store = useTransactionStore();
    const form = ref({
      kode: props.transaction ? props.transaction.kode : "",
      nama: props.transaction ? props.transaction.namaBarang : "",
      tanggal_pinjam: props.transaction ? props.transaction.tanggalPinjam : "",
      tanggal_kembali: "",
      jumlah_pinjam: props.transaction ? props.transaction.jumlahPinjam : 1,
    });

    // Watch for changes in transaction props and update form data
    watch(
      () => props.transaction,
      (newTransaction) => {
        if (newTransaction) {
          form.value.kode = newTransaction.kode;
          form.value.nama = newTransaction.namaBarang;
          form.value.tanggal_pinjam = newTransaction.tanggalPinjam;
          form.value.jumlah_pinjam = newTransaction.jumlahPinjam;
        }
      },
      { immediate: true }
    );

    const submitForm = async () => {
      // Validation for Tanggal Kembali
      if (!form.value.tanggal_kembali) {
        alert("Tanggal kembali tidak boleh kosong.");
        return;
      }
      if (new Date(form.value.tanggal_kembali) <= new Date(form.value.tanggal_pinjam)) {
        alert("Tanggal kembali harus lebih besar dari tanggal pinjam.");
        return;
      }

      const updatedTransaction = { ...form.value, status: "Returned" };
      // Call the store method to update transaction status
      await store.returnTransaction(props.transaction.id, updatedTransaction);
      // Emit submit event with the updated form
      emit("submit", updatedTransaction);
    };

    const cancelForm = () => {
      emit("cancel");
    };

    return {
      form,
      submitForm,
      cancelForm,
    };
  },
};
</script>

<style scoped>
.transaction-form {
  max-width: 600px;
  margin: 20px auto;
}

.form-control {
  font-size: 1rem; /* Adjust font size */
}

button:disabled {
  cursor: not-allowed;
}
</style>
