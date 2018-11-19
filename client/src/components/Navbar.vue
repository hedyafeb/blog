<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container">
      <p class="navbar-brand" >My BLOG</p>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link> 
          </li>
          <li class="nav-item">
            <router-link to="/articles" class="nav-link">All Articles</router-link>
          </li>
          <li class="nav-item dropdown">
            <p class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" v-if="userID">
              My Menu
            </p>
            <div class="dropdown-menu" >
              <router-link to="/myPage/myArticles" class="dropdown-item" >my Articles</router-link>
              <router-link to="/myPage/create" class="dropdown-item" >Post new Article</router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link" v-if="!userID">Login</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" v-if="userID" v-on:click="logout">Logout</a>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link" v-if="!userID">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    
</template>


<script>


  export default {

    data() {
      return {
      }
    },
    props: ["userID", "checktoken"],
    methods: {

      logout: function() {
        localStorage.removeItem('accesstoken')
        localStorage.removeItem('userID')
        localStorage.removeItem('name')
        this.checktoken()
      }
    },
    mounted() { 
      this.checktoken()
    },
    watch: { 
      userID(newValue) { 
        console.log('new user id', newValue)
      }
    }
  }
</script>







