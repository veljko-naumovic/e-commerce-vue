<script setup lang="ts">
import { computed, ref } from "vue";
import { useProductsStore } from "@/stores/products";
import type { Product } from "@/types/product";

const productsStore = useProductsStore();
const editing = ref<Product | null>(null);

const form = ref<Product>({
    id: crypto.randomUUID(),
    title: "",
    description: "",
    price: 0,
    category: "electronics",
    stock: 0,
    image: "https://via.placeholder.com/300"
});

const resetForm = () => {
    form.value = {
        id: crypto.randomUUID(),
        title: "",
        description: "",
        price: 0,
        category: "electronics",
        stock: 0,
        image: "https://via.placeholder.com/300"
    };
    editing.value = null;
};

const handleSubmit = async () => {
    if (editing.value) {
        await productsStore.updateProduct(form.value);
    } else {
        await productsStore.addProduct(form.value);
    }
    resetForm();
};

const handleEdit = (product: Product) => {
    editing.value = product;
    form.value = { ...product };
};

const handleDelete = (id: string) => {
    productsStore.deleteProduct(id);
};

const handlePriceChange = async (id: string, value: number) => {
    const product = productsStore.products.find(p => p.id === id);
    if (!product) return;

    await productsStore.updateProduct({
        ...product,
        price: value
    });
};

const products = computed(() => productsStore.products);
</script>

<template>
    <div class="admin">
        <h1>Admin Panel</h1>

        <form @submit.prevent="handleSubmit" class="form">

            <h2 class="form-title">
                {{ editing ? "Edit Product" : "Add New Product" }}
            </h2>

            <div class="form-grid">

                <div class="form-group">
                    <label>Title</label>
                    <input v-model="form.title" required />
                </div>

                <div class="form-group">
                    <label>Category</label>
                    <select v-model="form.category">
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="books">Books</option>
                        <option value="home">Home</option>
                    </select>
                </div>

                <div class="form-group full">
                    <label>Description</label>
                    <textarea v-model="form.description" rows="3" required />
                </div>

                <div class="form-group">
                    <label>Price ($)</label>
                    <input v-model.number="form.price" type="number" />
                </div>

                <div class="form-group">
                    <label>Stock</label>
                    <input v-model.number="form.stock" type="number" />
                </div>

            </div>

            <div class="form-actions">
                <button type="submit">
                    {{ editing ? "Update Product" : "Add Product" }}
                </button>

                <button v-if="editing" type="button" class="cancel" @click="resetForm">
                    Cancel
                </button>
            </div>

        </form>

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
                <tr v-for="product in products" :key="product.id">
                    <td data-label="Title">
                        {{ product.title }}
                    </td>

                    <td data-label="Price">
                        <input type="number" :value="product.price" @change="(e) =>
                            handlePriceChange(
                                product.id,
                                Number((e.target as HTMLInputElement).value)
                            )" />
                    </td>

                    <td data-label="Stock">
                        {{ product.stock }}
                    </td>

                    <td data-label="Actions">
                        <button @click="handleEdit(product)">
                            Edit
                        </button>
                        <button @click="handleDelete(product.id)">
                            Delete
                        </button>
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

.form {
    background: white;
    padding: 28px;
    border-radius: 14px;
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
    margin-bottom: 40px;
}

.form-title {
    margin-bottom: 24px;
    font-size: 18px;
    font-weight: 600;
    color: var(--color-primary);
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;

    label {
        font-size: 13px;
        font-weight: 600;
        color: #444;
    }

    input,
    select,
    textarea {
        padding: 10px 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 14px;
        transition: all 0.2s ease;

        &:focus {
            outline: none;
            border-color: var(--color-primary);
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
        }
    }

    textarea {
        resize: vertical;
    }
}

.form-group.full {
    grid-column: span 2;
}

.form-actions {
    margin-top: 28px;
    display: flex;
    gap: 12px;
}

.form-actions button {
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.form-actions button:first-child {
    background: var(--color-primary);
    color: white;

    &:hover {
        background: var(--color-primary-hover);
    }
}

.form-actions .cancel {
    background: #eee;
    color: #333;

    &:hover {
        background: #ddd;
    }
}


table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}

thead {
    background: var(--color-primary);
    color: white;

    th {
        text-align: left;
        padding: 14px;
        font-weight: 500;
        font-size: 14px;
    }
}

tbody tr {
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

table input[type="number"] {
    width: 80px;
    padding: 6px;
    border: 1px solid #ddd;
    border-radius: 6px;
}

table button {
    padding: 6px 10px;
    border: none;
    border-radius: 6px;
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


@media (max-width: 768px) {

    .form-grid {
        grid-template-columns: 1fr;
    }

    .form-group.full {
        grid-column: span 1;
    }

    .form-actions {
        flex-direction: column;

        button {
            width: 100%;
        }
    }

    table {
        border: none;
        box-shadow: none;
    }

    thead {
        display: none;
    }

    table,
    tbody,
    tr,
    td {
        display: block;
        width: 100%;
    }

    tr {
        background: white;
        margin-bottom: 16px;
        padding: 16px;
        border-radius: 10px;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    }

    td {
        padding: 8px 0;
        border-bottom: 1px solid #f1f1f1;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    td:last-child {
        border-bottom: none;
    }

    td::before {
        content: attr(data-label);
        font-weight: 600;
        color: #555;
    }

    td[data-label="Actions"] {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }

    td[data-label="Actions"] button {
        width: 100%;
    }
}
</style>