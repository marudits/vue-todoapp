<template lang="pug">
    .todo-list
        .todo-list__filter
            el-form(:inline="true" v-model="form")
                el-row
                    el-col(:span="12")
                        el-form-item(label="Status")
                            el-select(
                                v-model="form.status" 
                                placeholder="Select Status" 
                                @change="() => handleForm('change-status')"
                            )
                                el-option(
                                    v-for="(status, index) in filters.status"
                                    :key="index"
                                    :label="status.label"
                                    :value="status.value"
                                )
                    el-col(:span="12")
                        el-form-item(label="Categories")
                            el-select(
                                v-model="form.categories" placeholder="Select Categories" multiple collapse-tags
                                @change="() => handleForm('change-categories')"
                                )
                                el-option(
                                    v-for="(category, index) in categories"
                                    :key="index"
                                    :label="category.name"
                                    :value="category.key"
                                )
        .todo-list__content    
            el-timeline
                el-timeline-item(
                    v-for="(item, index) in data"
                    :key="index"
                    :timestamp="item.due_at"
                    placement="top"
                    v-bind:class="{completed: item.is_done}"
                ).todo-item
                    .todo-item__title
                        .actions
                            el-button(
                                icon="el-icon-check" size="mini" circle
                                @click="() => handleClick('toggle-is-done', item)"
                            )
                        h3
                            |{{ item.title }}
                    .todo-item__footer
                        |{{item.category}}
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
    created(){
        this.loadList();
    },
    data: () => {
        return {
            form: {
                categories: [],
                status: null
            },
            filters: {
                status: [
                    { label: 'All', value: 'all' },
                    { label: 'Completed', value: 'completed' },
                    { label: 'Uncompleted', value: 'uncompleted' }
                ]
            },
            data: null
        }
    },
    methods: {
        handleClick(type, value){
            switch(type){
                case 'toggle-is-done':
                    this.$store.commit('toggleIsDone', value);                    
                    break;
            }
        },
        handleForm(type){
            switch(type){
                case 'change-status':
                    switch(this.form.status){
                        case 'all':
                            this.loadList();
                            break;
                        case 'completed':
                            this.data = this.$store.getters.completedTodos;
                            break;
                        case 'uncompleted':
                            this.data = this.$store.getters.uncompletedTodos;
                            break;
                    }
                    break;
                case 'change-categories':
                    this.data = this.$store.getters.filteredCategories(this.form.categories);
                    break;
            }
        },
        loadList(){
            this.data = this.$store.state.todos;
        }
    }
}
</script>


<style lang="scss">
    @import '../assets/styles/variable.scss';

    .todo-list {
        text-align: left;
        margin: 0 10%;

        &__filter {
            margin-bottom: 2rem;
        }

        &__content {
            .todo-item {
                &.completed {
                    .actions {
                        button {
                            color: $teal;
                            border-color: $teal-lighten-2;
                            background-color: $teal-lighten-4;
                        }
                    }

                    h3 {
                        text-decoration: line-through;
                    }                    
                }

                &__title {
                    display: inline-flex;

                    .actions {
                        margin-right: .5rem;

                        button {
                            color: gray;
                            border-color: lightgray;
                            background-color: white;
                        }
                    }

                    h3 {
                        margin-top: .25rem;
                    }
                }
            }
        }
    }
</style>
