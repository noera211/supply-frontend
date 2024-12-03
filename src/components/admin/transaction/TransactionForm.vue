<template>
    <div>
        <form @submit.prevent="submitForm">
            <table>
                <tbody>
                <tr>
                    <td>ID Transaksi</td>
                    <td>
                        <input type="text" v-model="form.id" id="id" :disabled="isEdit" required/>
                    </td>
                </tr>
                <tr>
                    <td>Tanggal Transaksi</td>
                    <td>
                        <input type="date" v-model="form.tanggal" id="tanggal" required />
                    </td>
                </tr>
                <tr>
                    <td>Kode Barang</td>
                    <td>
                        <input type="text" v-model="form.kodeBarang" id="kodeBarang" required />
                    </td>
                </tr>
                <tr>
                    <td>Jumlah</td>
                    <td>
                        <input type="number" v-model="form.jumlah" id="jumlah" required />
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="submit">{{ isEdit ? "Simpan Perubahan" : "Tambah Transaksi" }}</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        transaction: {
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
                tanggal: "",
                kodeBarang: "",
                jumlah: 0,
            },
        };
    },
    watch: {
        transaction: {
            immediate: true,
            handler(newTransaction) {
                if (this.isEdit) {
                    this.form = { ...newTransaction };
                } else {
                    this.form = {
                        id: "",
                        tanggal: "",
                        kodeBarang: "",
                        jumlah: 0,
                    };
                }
            },
        },
    },
    methods: {
        submitForm() {
            if (
                this.form.id &&
                this.form.tanggal &&
                this.form.kodeBarang &&
                this.form.jumlah !== null &&
                this.form.jumlah !== undefined
            ) {
                this.$emit("submit", this.form);
            }
        },
    },
    emits: ["submit"],
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}
td {
    padding: 10px;
    border: 1px solid #ddd;
}
input[type="text"],
input[type="date"],
input[type="number"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
button[type="submit"] {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
button[type="submit"]:hover {
    background-color: #45a049;
}
</style>
