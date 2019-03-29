<template lang="pug">
    .todos-list
        header
        content
            ul(v-if="todos && todos.length > 0")
                li(v-for="item of todos" :key="item.key")
                    | {{item.title}}
        footer
</template>

<script>

import { mapState } from 'vuex';

export default {
    name: 'TodoList',
    computed: {
        ...mapState([
            'todos'
        ])
    }
}
</script>


<style lang="scss">

</style>
