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
        .todo-list__form
            el-collapse(v-model="form.todo" accordion)
                el-collapse-item(name="todo-add")
                    template(slot="title")
                        p
                            i.el-icon-caret-top(v-if="form.todo !== ''") 
                            i.el-icon-caret-bottom(v-else) 
                            | Add New Item
                    TodoForm(v-on:form-close="handleClick('form-close')")
        .todo-list__content    
            el-timeline
                el-timeline-item(
                    v-for="(item, index) in data"
                    :key="index"
                    :timestamp="new Date(item.due_at).toLocaleString()"
                    placement="top"
                    v-bind:class="{completed: item.is_done}"
                ).todo-item
                    .todo-item__title
                        .actions
                            el-button.toggle(
                                icon="el-icon-check" size="mini" circle
                                @click="() => handleClick('toggle-is-done', item)"
                            )
                            el-button.remove(
                                icon="el-icon-delete" size="mini" type="danger" circle
                                @click="() => handleClick('remove-todo', item)"
                            )
                        h3 {{ item.title }}
                    .todo-item__footer
                        |{{item.category}}
</template>

<script>

import { mapState, mapGetters } from 'vuex';

// components
import TodoForm from '../components/TodoForm';

export default {
    name: 'TodoList',
    computed: {
        ...mapState([
            'categories',
        ]),
        ...mapGetters([
            'sortedData'
        ])
    },
    components: {
        TodoForm
    },
    created(){
        this.loadList();
    },
    data: () => {
        return {
            form: {
                categories: [],
                status: null,
                todo: ''
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
                case 'remove-todo':
                    this.$store.commit('removeTodo', value);                    
                    break;
                case 'form-close':
                    this.form.todo = '';                   
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
                        default:
                            this.loadList();
                            break;
                    }
                    break;
                case 'change-categories':
                    if(this.form.categories.length > 0){
                        this.data = this.$store.getters.filteredCategories(this.form.categories);
                    } else {
                        this.handleForm('change-status');
                    }
                    break;
            }
        },
        loadList(){
            this.data = this.sortedData;
        }
    },
    watch: {
        sortedData(){
        }
    }
}
</script>


<style lang="scss">
    @import '../assets/styles/variable.scss';
    .todo-list {
        text-align: left;
        margin: 0;

        &__filter {
            margin-bottom: 1rem;
        }

        &__form {
            margin-bottom: 2rem;
            
            .el-collapse-item {
                
                &__header {

                    p {
                        width: 100%;
                        text-align: center;
                        margin-bottom: 0;

                        i {
                            font-size: 1.25em;
                            margin-right: .5rem;
                        }
                    }
                }

                &__arrow {
                    display: none;
                }
            }
        }

        &__content {
            .todo-item {
                &.completed {
                    .actions {
                        button {
                            &.toggle {
                                color: $teal;
                                border-color: $teal-lighten-2;
                                background-color: $teal-lighten-4;
                            }
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
                            &.toggle {
                                color: gray;
                                border-color: lightgray;
                                background-color: white;
                            }
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
