<script setup lang="ts">
import { ref } from "vue";
import { useProductsStore } from "@/stores/products";
import type { Product } from "@/types/product";

const productsStore = useProductsStore();

const editing = ref<Product | null>(null);

const form = ref<Product>({
    id: Date.now(),
    title: "",
    description: "",
    price: 0,
    category: "electronics",
    stock: 0,
    image: "https://via.placeholder.com/300"
});

const resetForm = () => {
    form.value = {
        id: Date.now(),
        title: "",
        description: "",
        price: 0,
        category: "electronics",
        stock: 0,
        image: "https://via.placeholder.com/300"
    };
    editing.value = null;
};

const handleSubmit = () => {
    if (editing.value) {
        productsStore.updateProduct(form.value);
    } else {
        productsStore.addProduct(form.value);
    }

    resetForm();
};

const handleEdit = (product: Product) => {
    editing.value = product;
    form.value = { ...product };
};

const handleDelete = (id: number) => {
    productsStore.deleteProduct(id);
};

const handlePriceChange = (id: number, value: number) => {
    productsStore.updatePriceOptimistic(id, value);
};
</script>

<template>
    <div class="admin">
        <h1>Admin Panel</h1>

        <!-- FORM -->
        <form @submit.prevent="handleSubmit" class="form">
            <input v-model="form.title" placeholder="Title" required />
            <input v-model="form.description" placeholder="Description" required />
            <input v-model.number="form.price" type="number" placeholder="Price" />
            <input v-model.number="form.stock" type="number" placeholder="Stock" />

            <select v-model="form.category">
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                <option value="home">Home</option>
            </select>

            <button type="submit">
                {{ editing ? "Update" : "Add" }} Product
            </button>
        </form>

        <!-- LIST -->
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="product in productsStore.products" :key="product.id">
                    <td>{{ product.title }}</td>

                    <td>
                        <input type="number" :value="product.price"
                            @change="(e) => handlePriceChange(product.id, Number((e.target as HTMLInputElement).value))" />
                    </td>

                    <td>{{ product.stock }}</td>

                    <td>
                        <button @click="handleEdit(product)">Edit</button>
                        <button @click="handleDelete(product.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped lang="scss">
.admin {
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;

    h1 {
        margin-bottom: 30px;
    }
}

/* ================= FORM ================= */

.form {
    background: #ffffff;
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 40px;

    input,
    select {
        padding: 10px 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        transition: border 0.2s ease;

        &:focus {
            outline: none;
            border-color: #111;
        }
    }

    button {
        grid-column: 1 / -1;
        padding: 12px;
        background: #111;
        color: white;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s ease;

        &:hover {
            background: #333;
        }
    }
}

/* ================= TABLE ================= */

table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);

    thead {
        background: #111;
        color: white;

        th {
            text-align: left;
            padding: 14px;
            font-weight: 500;
            font-size: 14px;
        }
    }

    tbody {
        tr {
            border-bottom: 1px solid #eee;
            transition: background 0.15s ease;

            &:hover {
                background: #f8f8f8;
            }

            td {
                padding: 12px 14px;
                font-size: 14px;
            }
        }
    }

    input[type="number"] {
        width: 80px;
        padding: 6px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
}

/* ================= ACTION BUTTONS ================= */

table button {
    padding: 6px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    transition: all 0.2s ease;
    margin-right: 6px;
}

table button:first-of-type {
    background: #2d6cdf;
    color: white;

    &:hover {
        background: #1f4fbf;
    }
}

table button:last-of-type {
    background: crimson;
    color: white;

    &:hover {
        background: #b40028;
    }
}
</style>
