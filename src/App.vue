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
  @import './assets/styles/variable';

  #app {
    text-align: center;

    header {
      background-color: $teal-lighten-2;
      color: $teal-lighten-4;
      font-weight: bolder;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 999;

      h1 {
        margin-top: 1rem;
        margin-bottom: 0;
      }
    }

    main {
      padding: 5rem 1rem;
    }

    footer {
      position: fixed;
      bottom: 0px;
      right: 0px;
      width: 100%;
      background-color: $teal-lighten-2;
      color: $teal-lighten-4;

      a {
        color: $teal-lighten-4;
        text-decoration: none;

        &:hover {
          color: $teal-lighten-5;
          text-decoration: underline;
        }
      }
    }
  }
</style>
