<template>
  <el-container id="app">
    <el-header>
      <h1>TodoApp</h1>
    </el-header>
    <el-main>
      <TodoList />
    </el-main>
    <el-footer>
      <el-row>
        <p>Copyright &copy; 2019 by <a href="mailto:marudits@gmail.com">marudits</a></p>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
import TodoList from './pages/TodoList.vue';

export default {
  name: 'app',
  components: {
    TodoList
  }
}
</script>

<style lang="scss">
  #app {
    text-align: center;

    footer {
      position: fixed;
      bottom: 0px;
      right: 0px;
      width: 100%;
    }
  }
</style>
