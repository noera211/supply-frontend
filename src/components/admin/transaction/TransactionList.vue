<template>
  <div class="transaction-list">
    <div class="header">
      <h2>Daftar Transaksi</h2>
      <button class="add-btn" @click="showAddForm">Tambah Transaksi</button>
    </div>
    <div class="transaction-cards">
            <TransactionCard 
                v-for="transaction in transactions" 
                :key="transaction.id" 
                :transaction="transaction" 
                @edit-transaction="editTransaction" 
                @delete-transaction="confirmDeleteTransaction" 
            />
        </div>
        <Modal :visible="showForm" @close="cancelEditForm">
            <TransactionForm
                :transaction="selectedTransaction"
                :isEdit="isEdit"
                @submit="handleSubmit"
                @cancel="cancelEditForm"
            />
        </Modal>
  </div>
</template>

<script>
import TransactionCard from "./TransactionCard.vue";
import Modal from "@/components/Modal.vue";
import TransactionForm from "./TransactionForm.vue";

export default {
  components: {
    TransactionCard,
    Modal,
    TransactionForm,

  },
  data() {
    return {
      transactions: [
        {
          kode: "2024001",
          namaKaryawan: "Budiono",
          namaBarang: "Acer Nitro 15 AN515-58",
          jumlahPinjam: 1,
          tanggalPinjam: "2024-8-10",
          tanggalKembali: "2024-8-17",
          status: "Borrowed",
        },

        {
          kode: "2024002",
          namaKaryawan: "Sisil",
          namaBarang: "Lenovo LOQ 15 15IRH8",
          jumlahPinjam: 1,
          tanggalPinjam: "2024-8-10",
          tanggalKembali: "2024-8-17",
          status: "Borrowed",
        },
      ],
      showForm: false,
      selectedTransaction: null,
      isEdit: false,
    };
  },

  methods: {
        showAddForm() {
            this.selectedTransaction = { id: null, user: "", item: "", amount: 0 };
            this.isEdit = false;
            this.showForm = true;
        },
        editTransaction(transaction) {
            this.selectedTransaction = { ...transaction };
            this.isEdit = true;
            this.showForm = true;
        },
        handleSubmit(transaction) {
            if (transaction.user && transaction.item && transaction.amount !== null) {
                if (this.isEdit) {
                    const index = this.transactions.findIndex(t => t.id === transaction.id);
                    this.transactions[index] = transaction;
                } else {
                    transaction.id = this.transactions.length + 1; // Generate a simple ID
                    this.transactions.push(transaction);
                }
            }
            this.showForm = false;
        },
        cancelEditForm() {
            this.showForm = false;
        },
        confirmDeleteTransaction(transaction) {
            if (confirm(`Apakah Anda yakin ingin menghapus transaksi untuk ${transaction.user}?`)) {
                this.deleteTransaction(transaction.id);
            }
        },
        deleteTransaction(id) {
            this.transactions = this.transactions.filter(transaction => transaction.id !== id);
        },
    },

};
</script>

<style scoped>
.transaction-list {
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

h2 {
  color: #595dd1;
  font-size: 24px;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,td {
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: center;
  vertical-align: middle;
}

th {
  background-color: #595dd1;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

button {
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.verif-btn {
  background-color: #4caf50;
  color: white;
}

.verif-btn:hover {
  background-color: #45a049;
}

.verif-btn[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}
@media (max-width: 600px) {
  th,td {
    padding: 8px 10px;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .action-buttons button {
    margin: 5px 0;
  }
}
</style>
