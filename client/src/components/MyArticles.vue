<template>
    <div>
        <h1>Your article list: </h1>
        <ul v-for="article in myarticles" :key="article._id">
            <li style="list-style-type:none"> <h4> {{ article.title }} </h4> </li>
            <button type="button" class="btn btn-light"> <router-link :to="`/articles/${article._id}`" > Read More </router-link> </button>
            <button type="button" class="btn btn-light"> <router-link :article="article" :to="`/myPage/edit`" > Edit </router-link> </button>
            <button type="button" class="btn btn-danger" @click="deleteArticle(article._id)"> Delete </button>
            <hr>
        </ul>
    </div>
</template>

<script>

export default {
    data() {
        return {
            myarticles: []
        }
    },
    props: [''],
    methods: {
        getMyArticles: function() {
            axios({
                method: 'POST',
                // url: `http://localhost:3000/article/myArticles`,
                url: `https://blog-server.hedyafeb.me/article/myArticles`,
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                }
            })
            .then( response => {
                this.myarticles = response.data
            })
            .catch( err => {
                console.log(err);
                
            })
        },

        deleteArticle: function(articleID) {
            axios({
                method: 'DELETE',
                // url: `http://localhost:3000/article/${articleID}`
                url: `https://blog-server.hedyafeb.me/article/${articleID}`
            })
            .then( response => {
                this.getMyArticles()
            })
            .catch( err => {
                console.log(err);
            })
        }
    },
    created() {
        this.getMyArticles()
    }
}
</script>
