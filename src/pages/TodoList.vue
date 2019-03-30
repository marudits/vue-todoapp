<template lang="pug">
    .todo-list
        .todo-list__filter
            el-form(:inline="true" v-model="form")
                el-row
                    el-col(:xs="12" :sm="8")
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
                    el-col(:xs="12" :sm="8")
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
                    el-col(:xs="24" :sm="8").progress-info
                        p {{ data.filter(x => x.is_done).length }} of {{ data.length }} has completed.
                        ProgressBar(:percentage="(data.filter(x => x.is_done).length / data.length) * 100 || 0")
        .todo-list__form
            el-collapse(v-model="form.todo" accordion)
                el-collapse-item(name="todo-add")
                    template(slot="title")
                        p
                            i.el-icon-caret-top(v-if="form.todo !== ''") 
                            i.el-icon-caret-bottom(v-else) 
                            | Add New Item
                    TodoForm(v-on:form-close="handleClick('form-close')" v-on:show-message="(msg, type) => showMessage(msg, type)")
        .todo-list__content    
            el-timeline
                el-timeline-item(
                    v-for="(item, index) in data"
                    :key="index"
                    :icon="mapCategoryToIcon(item.category)"
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
</template>

<script>

import { mapState, mapGetters } from 'vuex';

// components
import ProgressBar from '../components/ProgressBar';
import TodoForm from '../components/TodoForm';

// shared
import { CONSTANTS } from '../shared/constants';

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
        ProgressBar,
        TodoForm
    },
    mounted(){
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
            data: [],
            stats: {
                percentage: 0,
                completed: 0,
                total: 0
            }
        }
    },
    methods: {
        handleClick(type, value){
            switch(type){
                case 'toggle-is-done':
                    this.$store.dispatch(CONSTANTS.ACTIONS.TODO.TOGGLE_IS_DONE, value);
                    this.showMessage('Item status has been updated', 'info');
                    break;
                case 'remove-todo':
                    this.$store.dispatch(CONSTANTS.ACTIONS.TODO.REMOVE, value);
                    this.showMessage('Item is removed', 'error');
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
        },
        mapCategoryToIcon(category){
            return CONSTANTS.TODOS.CATEGORIES.find(x => x.key === category)['icon'];
        },
        showMessage(message = 'Lorem ipsum dolor sit amet', type = 'message',){
            this.$message({ type, message })
        },
    },
    watch: {
        sortedData(){
        },
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

            .progress-info {
                p {
                    margin: 0;
                }
            }
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
                        color: lightgray;
                    }                    
                }

                &__title {
                    .actions {
                        button {
                            &.toggle {
                                color: gray;
                                border-color: lightgray;
                                background-color: white;
                            }
                        }
                    }

                    h3 {
                        margin-top: .5rem;
                        margin-bottom: 0;
                    }
                }
            }

            .el-timeline {
                &-item {
                    &__node {
                        width: 1.3rem;
                        height: 1.3rem;
                        left: -0.3rem;
                        top: -0.3rem;

                        // &:hover {
                        background-color: $teal-lighten-3;
                        // }

                        i {
                            &:hover {
                                color: $teal;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
