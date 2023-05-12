<template>
    <template v-if="is_ready">
        <div class="flex">
            <div class="text-title q-mr-auto">Управление товаром</div>
            <q-btn @click="show_add_new_product = true" icon="add" label="Добавить новый товар" no-caps color="red-5"/>
        </div>
        <q-table
                flat
                bordered
                :rows="products"
                :columns="columns"
                class="q-mt-md rounded-borders-lg"
                separator="cell"
                :pagination="{rowsPerPage: 10}"
        >
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="title" :props="props">
                        {{ props.row.title }}
                        <q-popup-edit v-model="props.row.title" v-slot="scope" buttons
                                      @update:model-value="updateProducts()">
                            <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set"/>
                        </q-popup-edit>
                    </q-td>
                    <q-td key="description" :props="props">
                        {{ props.row.description }}
                        <q-popup-edit v-model="props.row.description" buttons v-slot="scope"
                                      @update:model-value="updateProducts()">
                            <q-input type="textarea" v-model="scope.value" dense autofocus @keyup.enter="scope.set"/>
                        </q-popup-edit>
                    </q-td>
                    <q-td key="category" :props="props">
                        {{ props.row.category.name }}
                        <q-popup-edit v-model="props.row.category" v-slot="scope" buttons
                                      @update:model-value="updateProducts()">
                            <q-select
                                    v-model="scope.value"
                                    dense
                                    :options="product_categories.filter(category => category.id !== undefined)"
                                    option-value="id"
                                    option-label="name"
                                    autofocus
                            />
                        </q-popup-edit>
                    </q-td>
                    <q-td key="count_kg" :props="props">
                        {{ props.row.count_kg }}
                        <q-popup-edit v-model="props.row.count_kg" buttons v-slot="scope"
                                      @update:model-value="updateProducts()">
                            <q-input type="number" v-model="scope.value" dense autofocus @keyup.enter="scope.set"
                                     min="0"/>
                        </q-popup-edit>
                    </q-td>
                    <q-td key="price" :props="props">
                        {{ props.row.price }}
                        <q-popup-edit v-model="props.row.price" buttons v-slot="scope"
                                      @update:model-value="updateProducts()">
                            <q-input type="number" v-model="scope.value" dense autofocus @keyup.enter="scope.set"
                                     min="0"/>
                        </q-popup-edit>
                    </q-td>
                    <q-td key="action" :props="props">
                        <q-btn label="Удалить" flat class="bg-grey-3" no-caps dense style="width: 74px; font-weight: 400"
                               @click="removeProductById(props.row.id)"/>
                    </q-td>
                </q-tr>
            </template>
        </q-table>

        <q-dialog v-model="show_add_new_product">
            <q-card>
                <form @submit.prevent="addNewProduct()">
                    <q-card-section class="row items-center">
                        <div class="text-h6">Добавление нового товара</div>
                        <q-space/>
                        <q-btn icon="close" flat round dense v-close-popup/>
                    </q-card-section>

                    <q-separator/>

                    <q-card-section class="q-gutter-y-md">
                        <q-input v-model="new_product_title" label="Введите название" filled required/>
                        <q-input v-model="new_product_description" label="Введите описание" filled required/>
                        <q-select v-model="new_product_category"
                                  :options="product_categories.filter(category => category.id !== undefined)"
                                  option-value="name"
                                  option-label="name"
                                  label="Выберите категорию"
                                  filled
                                  required/>
                        <q-file v-model="new_product_image" label="Выберите файл" filled accept=".jpg, .png, .jpeg"/>
                    </q-card-section>

                    <q-separator/>
                    <q-card-section class="flex justify-end">
                        <q-btn label="Подтвердить" color="primary" type="submit" :loading="new_product_loading"/>
                    </q-card-section>
                </form>
            </q-card>
        </q-dialog>
    </template>
</template>

<script>
import {useProductsStore} from "../stores/products";
import {mapState} from "pinia";
import axios from "axios";

export default {
    name: "AdminPanel",
    data() {
        return {
            is_ready: false,

            show_add_new_product: false,
            new_product_loading: false,
            new_product_title: null,
            new_product_description: null,
            new_product_category: null,
            new_product_image: null,

            products: [],
            columns: [
                {
                    name: 'title',
                    label: 'Название',
                    align: 'left',
                    field: row => row.title,
                    sortable: true
                },
                {
                    name: 'description',
                    label: 'Описание',
                    align: 'left',
                    field: row => row.description,
                    sortable: true
                },
                {
                    name: 'category',
                    label: 'Категория',
                    align: 'center',
                    field: row => row.category,
                    sortable: true
                },
                {
                    name: 'count_kg',
                    label: 'Остаток (кг.)',
                    align: 'center',
                    field: row => row.count_kg,
                    sortable: true
                },
                {
                    name: 'price',
                    label: 'Стоимость (₽)',
                    align: 'center',
                    field: row => row.price,
                    sortable: true
                },
                {
                    name: 'action',
                    label: 'Действия',
                    align: 'center'
                },
            ]
        }
    },
    computed: {
        ...mapState(useProductsStore, ['products', 'product_categories']),
    },
    methods: {
        addNewProduct() {
            this.new_product_loading = true;
            const product_store = useProductsStore();

            let formData = new FormData();
            formData.append("title", this.new_product_title);
            formData.append("description", this.new_product_description);
            formData.append("category_id", this.new_product_category.id);
            formData.append("image", this.new_product_image);

            axios.post('/api/products', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                .then((response) => {
                    this.products = response.data.products.map(product => {
                        product.category = product_store.product_categories.find(category => category.id === product.category_id);
                        return product;
                    }).reverse();
                    this.show_add_new_product = false;
                    this.$q.notify({type: "positive", message: "Новый товар создан"})
                })
                .finally(() => this.new_product_loading = false)
        },
        updateProducts() {
            const product_store = useProductsStore();
            // обновляем category_id выбранных категорий по временному полю category
            this.products.forEach(el => el.category_id = el.category.id);
            product_store.updateAllProducts(this.products);
        },
        removeProductById(product_id) {
            const product_store = useProductsStore();

            axios.delete('/api/products/' + product_id)
                .then((response) => {
                    this.products = response.data.products.map(product => {
                        product.category = product_store.product_categories.find(category => category.id === product.category_id);
                        return product;
                    }).reverse();
                    this.$q.notify({type: "positive", message: "Товар удалён"})
                })
                .finally(() => this.new_product_loading = false)
        },
    },
    beforeMount() {
        const product_store = useProductsStore();
        product_store.get().then(() => {
            this.products = product_store.products.map(product => {
                product.category = product_store.product_categories.find(category => category.id === product.category_id);
                return product;
            })
            this.is_ready = true;
        });
    }
}
</script>
