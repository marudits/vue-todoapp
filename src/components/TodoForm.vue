<template lang="pug">
    el-form(ref="todo-form" :model="form" :rules="rules" label-width="120px" :label-position="`top`").todo-form
        el-row
            el-col
                el-form-item(label="Title" prop="title")
                    el-input(type="text" v-model="form.title")
        el-row(:gutter="12")
            el-col(:xs="24" :sm="12")
                el-form-item(label="Category" prop="category")
                    el-select(v-model="form.category" placeholder="Select Category" style="width:100%;")
                        el-option(
                            v-for="(category, index) in categories"
                            :key="index"
                            :label="category.name"
                            :value="category.key"
                        )     
            el-col(:xs="24" :sm="12")
                el-form-item(label="Due at" prop="due_at")
                    el-date-picker(v-model="form.due_at" type="datetime" placeholder="Select date and time" style="width: 100%;")
        el-row
            el-col        
                el-form-item.actions
                    el-button(@click="handleForm('reset')") Reset
                    el-button(type="success" @click="handleForm('submit')") Submit

</template>

<script>
import { mapState } from 'vuex';

// shared
import { CONSTANTS } from '../shared/constants';

export default {
    name: 'TodoForm',
    computed: {
        ...mapState([
            'categories',
            'todos'
        ])
    },
    data: () => {
        const validateDueAt = (rule, value, cb) => {
            if(new Date(value).getTime() < new Date().getTime()){
                cb(new Error('Please select future datetime'))
            } else {
                cb();
            }
        }

        return {
            form: {
                title: null,
                category: null,
                due_at: null,
                is_done: false
            },
            rules: {
                title: [
                    { required: true, message: 'Please input title', trigger: 'blur' },
                    { min: 5, max: 200, message: 'Length should be 5 to 200', trigger: 'blur' }
                ],
                category: [
                    { required: true, message: 'Please select category', trigger: 'change' },
                ],
                due_at: [
                    { required: true, message: 'Please select due at', trigger: 'change' },
                    { validator: validateDueAt, trigger: 'change' }
                ],
            }
        }
    },
    methods: {
        handleForm(type, value, options){
            switch(type){
                case 'reset':
                    this.form = {
                        title: null,
                        category: null,
                        due_at: null,
                        is_done: false
                    }
                    break;
                case 'submit':
                    this.$refs['todo-form'].validate((valid) => {
                        if(valid){
                            this.$store.dispatch(CONSTANTS.ACTIONS.TODO.ADD, Object.assign(
                                {}, this.form, 
                                { id: new Date().getTime(), due_at: new Date(this.form.due_at).getTime()}
                                )
                            );

                            this.$refs['todo-form'].resetFields();
                            this.$emit('form-close');
                        }
                    })
                    break;
            }
        }
    }
}
</script>

<style lang="scss">
    .todo-form {
        .el-form-item {
            margin-bottom: 1rem;

            &__label {
                padding: 0px;
            }

            &.actions {
                margin-top: 2rem;
            }
        }
    }
</style>


