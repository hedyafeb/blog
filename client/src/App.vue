<template>
    <div id="app"> 
      <!-- id="app" sbnernya ga usah, toh di index.html udah ada -->
      <div id="nav">
        <Navbar v-bind:userID="userID" v-bind:checktoken="checkToken"></Navbar>
      </div>
      <router-view v-on:fetchUser="currentFetchUser($event)"></router-view>
    </div>
</template>
    

<script>
  import Navbar from '@/components/Navbar.vue'

  export default {
    components: { Navbar },
    data() {
      return {
        userID: "" 
      }
    },
    methods: {
      currentFetchUser: function(userID) {
        this.userID = userID
      },
      checkToken: function() { 
        this.userID = localStorage.getItem('userID')
      }
    },
    created() {
      this.checkToken()
    }
  }

</script>

