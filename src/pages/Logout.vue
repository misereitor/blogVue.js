<template>
  <div>
    Logout
  </div>
</template>
<script>
import Auth from '../Auth.js'
export default {
  data () {
    return {
    }
  },
  created: function () {
    Auth.logout();
    console.log(Auth.getLogin());
    this.$router.push('/home');
  }
}
</script>