<template>
  <div>
    <div
      v-show="showProgress"
      class="progress"
    >
      <div class="indeterminate"></div>
    </div>
    <div
      class="row"
      v-for="post in posts"
      :key="post._id"
    >
      <div class="col s12">
        <div class="card blue lighten-5">
          <div class="card-content black-text">
            <span class="card-title">{{post.title}}</span>
            <p>{{post.text}}</p>
          </div>
          <div class="card-action">
            <span><i class="material-icons">perm_identity</i> {{post.user.name}}</span>
            <a
              href="#"
              @click="remove(post)"
              class="right blue-text"
              v-if="login.token!=null && login.id==post.user._id"
            >Remove</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Auth from '../Auth.js'
export default {
  data () {
    return {
      posts: null,
      showProgress: true,
      login: Auth.getLogin()
    }
  },
  created: function () {
    this.showProgress = true;
    this.loadPosts();
  },
  methods: {
    remove: function (post) {
      post.token = Auth.getLogin().token;
      this.$http.delete('/api/posts/' + post._id, post).then(function (response) {
        this.loadPosts();
      }, function (error) {
        //console.log(error)
        M.toast({ html: 'Error: ' + error.data.message })
      });
    }, loadPosts: function () {
      this.$http.get('/api/posts').then(function (response) {
        this.showProgress = false
        this.posts = response.data
      }, function (error) {
        this.showProgress = false
        M.toast({ html: 'Error: ' + error.statusText })
      })
    }
  }
}

</script>
