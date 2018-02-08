<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 hidden-sm hidden-xs">
        <h2 class="text-center">Lists</h2>
        <!-- List index -->
        <div class="list-group">
          <router-link class="list-group-item" v-for="list in lists" :key="list" v-bind:class="[list.id == list_id ? 'active' : '']" :to="{ name: 'ListView', params: { id: list.id }}">
            <div>{{ list.name }}</div>
          </router-link>
        </div>
      </div>
      <div class="col-md-3 hidden-md hidden-lg">
        <router-link :to="{ name: 'Home'}">
            <i class="fas fa-arrow-circle-left"></i> Lists
          </router-link>
      </div>
      <div class="col-md-9">
        <h2 class="text-center">Todos</h2>
        <!-- New todo -->
        <form>
          <div class="row">
            <div class="col-xs-8">
              <div class="form-group">
                <label for="new-todo-name" class="sr-only">Name*</label>
                <input type="text" class="form-control input-lg"
                 id="new-todo-name" name="name" required v-model="new_todo.name"
                 placeholder="Name*">
              </div>
            </div>
            <div class="col-xs-4">
              <div class="form-group">
              <button type="submit" class="btn btn-default btn-lg btn-block"
               @click.prevent="submitNewTodo">Submit</button>
               </div>
            </div>
          </div>
        </form>
        <!-- Todo index -->
        <div class="list-group">
          <a class="list-group-item" v-for="todo in todos" :key="todo">
           <div v-show="todo === edit_todo">
             <div class="row">
               <div class="col-xs-11">
                  <input type="text" class="input-lg form-control"
                  v-model="edit_todo.name" @keyup.enter="updateTodo(edit_todo)"
                  @keyup.esc="escapeUpdateTodo" autofocus>
               </div>
               <div class="col-xs-1"><a @click.prevent="escapeUpdateTodo"><i class="fas fa-times-circle"></i></a></div>
             </div>
             </div>
            <div v-show="todo !== edit_todo" :class="[todo.status === 'done' ? 'completed' : '']"><input type="checkbox" :checked="todo.status === 'done'" @click="updateStatusTodo(todo)"> {{ todo.name }} <span class="pull-right">
              <a @click.prevent="editTodo(todo)"> <i class="fas fa-edit"></i> </a>
              <a @click.prevent="destroyTodo(todo)"> <i class="fas fa-trash"></i></a></span></div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HTTP from '../http_common';

export default {
  name: 'ListView',
  data() {
    return {
      com_name: 'ListView',
      list_id: null,
      lists: [],
      todos: [],
      new_todo: {},
      edit_todo: {},
    };
  },
  methods: {
    getTodos() {
      const headers = { headers: {} };
      const session = JSON.parse(localStorage.getItem('session'));
      headers.headers.sid = session.sid;
      headers.headers.utoken = session.utoken;
      HTTP.get('/lists/' + this.list_id.toString() + '/tasks', headers)
        .then((response) => {
          this.todos = response.data;
        })
        .catch((e) => {
          this.$router.push({ name: 'Home' });
        });
    },
    getLists() {
      const headers = { headers: {} };
      const session = JSON.parse(localStorage.getItem('session'));
      headers.headers.sid = session.sid;
      headers.headers.utoken = session.utoken;
      HTTP.get('/lists', headers)
        .then((response) => {
          if (response.data.length === 0) {
            this.lists = response.data;
          } else {
            this.lists = response.data;
          }
        })
        .catch((e) => {});
    },
    submitNewTodo() {
      const headers = { headers: {} };
      const session = JSON.parse(localStorage.getItem('session'));
      headers.headers.sid = session.sid;
      headers.headers.utoken = session.utoken;
      HTTP.post(
        '/lists/' + this.list_id.toString() + '/tasks',
        this.new_todo,
        headers,
      )
        .then((response) => {
          // show success toast
          this.$toasted.show('New todo created successfully', {
            icon: 'check-circle',
            action: {
              text: 'CLOSE',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
          // clear form
          this.new_todo.name = null;
          // generate event new list created
          this.$bus.$emit('new-todo-created');
        })
        .catch((e) => {
          // Show error toast
          this.$toasted.show(e.response.data.errors[0], {
            icon: 'exclamation-trianle',
            action: {
              text: 'CLOSE',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
        });
    },
    editTodo(todo) {
      this.edit_todo = todo;
    },
    updateTodo(edit_todo) {
      // update todo
      const headers = { headers: {} };
      const session = JSON.parse(localStorage.getItem('session'));
      const data = { name: edit_todo.name };
      headers.headers.sid = session.sid;
      headers.headers.utoken = session.utoken;
      HTTP.put(
        '/lists/' +
          this.list_id.toString() +
          '/tasks/' +
          edit_todo.id.toString(),
        data,
        headers,
      )
        .then((response) => {
          // show success toast
          this.$toasted.show('Todo has been edited successfully', {
            icon: 'check-circle',
            action: {
              text: 'CLOSE',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
          // complete the edit
          this.edit_todo = {};
          // Get latest todo of todos
          this.$bus.$emit('new-todo-created');
        })
        .catch((e) => {
          // Show error toast
          this.$toasted.show(e.response.data.errors[0], {
            icon: 'exclamation-trianle',
            action: {
              text: 'CLOSE',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
        });
    },
    escapeUpdateTodo() {
      this.edit_todo = {};
      this.getTodos();
    },
    destroyTodo(todo) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Are you sure you want to delete todo?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const headers = { headers: {} };
          const session = JSON.parse(localStorage.getItem('session'));
          headers.headers.sid = session.sid;
          headers.headers.utoken = session.utoken;
          HTTP.delete(
            '/lists/' +
              this.list_id.toString() +
              '/tasks/' +
              todo.id.toString(),
            headers,
          )
            .then((response) => {
              // show success toast
              this.$toasted.show('Todo has been deleted successfully', {
                icon: 'check-circle',
                action: {
                  text: 'CLOSE',
                  onClick: (e, toastObject) => {
                    toastObject.goAway(0);
                  },
                },
              });
              // Get latest todo of todos
              this.$bus.$emit('new-todo-created');
            })
            .catch({});
        }
      });
    },
    updateStatusTodo(todo) {
      // update todo
      const headers = { headers: {} };
      const session = JSON.parse(localStorage.getItem('session'));
      let data = {};
      if (todo.status === 'todo') {
        data = { status: 'done' };
      } else {
        data = { status: 'todo' };
      }
      headers.headers.sid = session.sid;
      headers.headers.utoken = session.utoken;
      HTTP.put(
        '/lists/' + this.list_id.toString() + '/tasks/' + todo.id.toString(),
        data,
        headers,
      )
        .then((response) => {
          // show success toast
          this.$toasted.show('Todo has been updated successfully', {
            icon: 'check-circle',
            action: {
              text: 'CLOSE',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
          // Get latest todo of todos
          this.$bus.$emit('new-todo-created');
        })
        .catch((e) => {
          // Show error toast
          this.$toasted.show(e.response.data.errors[0], {
            icon: 'exclamation-trianle',
            action: {
              text: 'CLOSE',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
        });
    },
  },
  mounted() {
    this.isLoggedIn = localStorage.getItem('session') !== null;
    if (!this.isLoggedIn) {
      this.$router.push({ name: 'Login' });
    } else {
      this.list_id = this.$route.params.id;
      this.getLists();
      this.getTodos();
    }
    this.$bus.$on('new-todo-created', () => {
      this.getTodos();
    });
  },
};
</script>

<style scoped>
a:hover,
a,
a:visited {
  text-decoration: none;
  color: black;
}
.completed {
  text-decoration: line-through;
}
</style>
