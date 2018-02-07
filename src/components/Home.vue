<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <h2 class="text-center">Lists</h2>
        <!-- New List -->
        <form>
          <div class="row">
            <div class="col-xs-8">
              <div class="form-group">
                <label for="new-list-name" class="sr-only">Name*</label>
                <input type="text" class="form-control input-lg"
                 id="new-list-name" name="name" required v-model="new_list.name"
                 placeholder="Name*">
              </div>
            </div>
            <div class="col-xs-4">
              <div class="form-group">
              <button type="submit" class="btn btn-default btn-lg btn-block"
               @click.prevent="submitNewList">Submit</button>
               </div>
            </div>
          </div>
        </form>
        <!-- List index -->
        <div class="list-group">
          <router-link class="list-group-item" v-for="list in lists" :key="list"
           @dblclick.prevent="editList(list)" :to="{ name: 'ListView', params: { id: list.id }}">
           <div v-show="list === edit_list">
             <div class="row">
               <div class="col-xs-11">
                  <input type="text" class="input-lg form-control"
                  v-model="edit_list.name" @keyup.enter="updateList(edit_list)"
                  @keyup.esc="escapeUpdateList" autofocus> 
               </div>
               <div class="col-xs-1"><a @click.prevent="escapeUpdateList"><i class="fas fa-times-circle"></i></a></div>
             </div>
             </div>
            <div v-show="list !== edit_list">{{ list.name }} <span class="pull-right">
              <a @click.prevent="editList(list)"> <i class="fas fa-edit"></i> </a> 
              <a @click.prevent="destroyList(list)"> <i class="fas fa-trash"></i></a></span></div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HTTP from '../http_common';

export default {
  name: 'Home',
  data() {
    return {
      com_name: 'Home',
      new_list: {},
      lists: [],
      edit_list: {},
    };
  },
  methods: {
    submitNewList() {
      const headers = { headers: {} };
      const session = JSON.parse(localStorage.getItem('session'));
      headers.headers.sid = session.sid;
      headers.headers.utoken = session.utoken;
      HTTP.post('/lists', this.new_list, headers)
        .then(response => {
          // show success toast
          this.$toasted.show('New list created successfully', {
            icon: 'check-circle',
            action: {
              text: 'CLOSE',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
          // clear form
          this.new_list.name = null;
          // generate event new list created
          this.$bus.$emit('new-list-created');
        })
        .catch(e => {
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
    getLists() {
      const headers = { headers: {} };
      const session = JSON.parse(localStorage.getItem('session'));
      headers.headers.sid = session.sid;
      headers.headers.utoken = session.utoken;
      HTTP.get('/lists', headers)
        .then(response => {
          if (response.data.length === 0) {
            // Show empty toast
            this.$toasted.show("You don't have any lists for now", {
              icon: 'battery-empty',
              action: {
                text: 'CLOSE',
                onClick: (e, toastObject) => {
                  toastObject.goAway(0);
                },
              },
            });
            this.lists = response.data;
          } else {
            this.lists = response.data;
          }
        })
        .catch(e => {});
    },
    editList(list) {
      this.edit_list = list;
    },
    updateList(edit_list) {
      // update list
      const headers = { headers: {} };
      const session = JSON.parse(localStorage.getItem('session'));
      const data = { name: edit_list.name };
      headers.headers.sid = session.sid;
      headers.headers.utoken = session.utoken;
      HTTP.put('/lists/' + edit_list.id.toString(), data, headers)
        .then(response => {
          // show success toast
          this.$toasted.show('List has been edited successfully', {
            icon: 'check-circle',
            action: {
              text: 'CLOSE',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
          // complete the edit
          this.edit_list = {};
          // Get latest list of lists
          this.$bus.$emit('new-list-created');
        })
        .catch(e => {
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
    escapeUpdateList() {
      this.edit_list = {};
    },
    destroyList(list) {
      let ask = confirm('Are you sure you want to delete list?');
      if (ask === true) {
        const headers = { headers: {} };
        const session = JSON.parse(localStorage.getItem('session'));
        headers.headers.sid = session.sid;
        headers.headers.utoken = session.utoken;
        HTTP.delete('/lists/' + list.id.toString(), headers)
          .then(response => {
            // show success toast
            this.$toasted.show('List has been deleted successfully', {
              icon: 'check-circle',
              action: {
                text: 'CLOSE',
                onClick: (e, toastObject) => {
                  toastObject.goAway(0);
                },
              },
            });
            // Get latest list of lists
            this.$bus.$emit('new-list-created');
          })
          .catch({});
      }
    },
  },
  mounted() {
    this.isLoggedIn = localStorage.getItem('session') !== null;
    if (!this.isLoggedIn) {
      this.$router.push({ name: 'Login' });
    } else {
      this.getLists();
    }
    this.$bus.$on('new-list-created', () => {
      this.getLists();
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
</style>
