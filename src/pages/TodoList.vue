<template lang="pug">
    .todo-list
        .todo-list__filter
            el-form(:inline="true" v-model="form")
                el-row
                    el-col(:span="12")
                        el-form-item(label="Status")
                            el-select(v-model="form.status" placeholder="Select Status")
                                el-option(
                                    v-for="(status, index) in filters.status"
                                    :key="index"
                                    :label="status.label"
                                    :value="status.value"
                                )
                    el-col(:span="12")
                        el-form-item(label="Category")
                            el-select(v-model="form.category" placeholder="Select Category" multiple collapse-tags)
                                el-option(
                                    v-for="(category, index) in categories"
                                    :key="index"
                                    :label="category.name"
                                    :value="category.key"
                                )
        .todo-list__content    
            el-timeline
                el-timeline-item(
                    v-for="(item, index) in todos"
                    :key="index"
                    :timestamp="item.due_at"
                    placement="top"
                )
                    |{{ item.title }}
</template>

<script>

import { mapState } from 'vuex';

export default {
    name: 'TodoList',
    computed: {
        ...mapState([
            'categories',
            'todos'
        ])
    },
    data: () => {
        return {
            form: {
                category: [],
                status: null
            },
            filters: {
                status: [
                    { label: 'All', value: 'all' },
                    { label: 'Completed', value: 'completed' },
                    { label: 'Uncompleted', value: 'uncompleted' }
                ]
            }
        }
    }
}
</script>


<style lang="scss">
    .todo-list {
        text-align: left;
        margin: 0 10%;

        &__filter {
            margin-bottom: 2rem;
        }
    }
</style>
