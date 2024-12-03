<template>
    <div class="transaction-card">
        <h3>Transaksi #{{ transaction.id }}</h3>
        <p>Pelanggan: {{ transaction.namaKaryawan }}</p>
        <p>Total: Rp {{ transaction.total ? transaction.total.toLocaleString() : '0' }}</p>
        <div class="buttons">
            <button @click="$emit('view-transaction', transaction)" class="view">Lihat</button>
            <button @click="$emit('delete-transaction', transaction.id)" class="delete">Hapus</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TransactionCard',
    props: {
        transaction: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped>
.transaction-card {
    border: 1px solid #ddd;
    padding: 16px;
    margin-bottom: 10px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}
.transaction-card h3 {
    margin: 0 0 10px;
    font-size: 1.5em;
    color: #333;
}
.transaction-card p {
    margin: 5px 0;
    color: #555;
}
.transaction-card .buttons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}
.transaction-card button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}
.transaction-card button:hover {
    background-color: #ddd;
}
.transaction-card button.view {
    background-color: #2196F3;
    color: white;
}
.transaction-card button.view:hover {
    background-color: #1976D2;
}
.transaction-card button.delete {
    background-color: #e74c3c;
    color: white;
}
.transaction-card button.delete:hover {
    background-color: #c0392b;
}
</style>
