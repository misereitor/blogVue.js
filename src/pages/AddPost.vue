<template>
  <div>
    <h4>Add Post</h4>
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input
            id="login"
            type="text"
            v-model="post.title"
          />
          <label for="login">Title</label>
          <div>
          </div>
        </div>
        <div class="input-field col s12">
          <textarea
            id="textarea1"
            class="materialize-textarea"
            v-model="post.text"
          ></textarea>
          <label for="textarea1">Texto</label>
        </div>
      </div>
      <div class="input-field col s12">
        <button
          class="waves-effect waves-light btn right"
          @click="add"
        >Enviar</button>
      </div>
    </form>
    <div
      v-show="showProgress"
      class="progress"
    >
      <div class="indeterminate"></div>
    </div>
  </div>
</template>
<script>
import Auth from '../Auth.js'
export default {
  data () {
    return {
      post: {
        title: "",
        token: "",
        text: "",
        user: {
          _id: ""
        }
      }
    }
  },

  created: function () {
    let login = Auth.getLogin()
    if (login.token == null) {
      this.$router.push("/login")
    } else {
      this.post.user._id = login.id;
      this.post.token = login.token;
    }
  },
  methods: {
    add: function () {
      this.$http.post('/api/posts', this.post).then(function (response) {
        this.$router.push("/home");
      }, function (error) {
        //console.log(error)
        M.toast({ html: 'Error: ' + error.data.message })
      });
    }
  }
}
</script>