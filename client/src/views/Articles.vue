<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-8">
          <ArticleList v-for="article in articles" :article='article' :key="article._id"></ArticleList>
        </div>
        <div class="col-4">
          <Sidebar></Sidebar>
        </div> 
      </div>
    </div>

  </div> 

</template>

<script>
// @ is an alias to /src

import Sidebar from '@/components/Sidebar.vue'
import ArticleList from '@/components/ArticleList.vue'

export default {
  name: 'home',
  components: { Sidebar, ArticleList },
    data () {
      return {
        articles: []
    }
  },
  methods: {
    getArticles: function() {
      axios({
        method: 'GET',
        // url: 'http://localhost:3000/article'
        url: 'https://blog-server.hedyafeb.me/article'
      })
      .then( response => {
        this.articles = response.data
      })
      .catch( err => {
        console.log(err)
      })
    }
  },
  created: function() {
    this.getArticles()
  }
}
</script>
