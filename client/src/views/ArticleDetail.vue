<template>
    <div class="container">
        <div class="row">
            <div class="col-10">
                
                <!-- TITLE -->
                <div>
                    <h1 class="mt-4">{{ article.title }}</h1>
                    <p class="lead">
                    by <p> {{ article.userID.name }} </p>
                    <hr>

                    <p>Posted on {{ article.createdAt}}</p>

                    <hr>

                    <!-- BODY -->
                    <p class="lead"> {{ article.detail }} </p>

                    <hr>

                    <!-- COMMENT FORM -->
                    <div class="card my-4">
                        <h5 class="card-header">Leave a Comment:</h5>
                        <div class="card-body">
                            <form>
                                <input type="text" placeholder="title" class="form-control mb-1" v-model="inputComment.title">
                                <div class="form-group">
                                    <textarea class="form-control" rows="3" placeholder="content" v-model="inputComment.detail"></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary" @click.prevent="postComment">Submit</button>
                            </form>
                        </div>
                    </div>

                    <!-- POSTED COMMENT -->
                    <Comment v-for="comment in comments" :comment="comment" :key="comment._id" v-on:deleteComment="getComments(article._id)"></Comment>
                    {{ error }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Comment from '@/components/Comment.vue'

export default {
    data() {
        return {
            article: {},
            comments: [],
            inputComment: {
                title: "",
                detail: ""
            },
            error: ""
        }
    },
    components: { Comment },
    methods: {
        getArticle: function(articleID) {
            axios({
                method: 'GET',
                url: `http://localhost:3000/article/${articleID}`
            })
            .then( response => {
                this.article = response.data
            })
            .catch( err => {
                console.log(err)
            })
        },

        getComments: function(articleID) {
            axios({
                method: 'GET',
                url: `http://localhost:3000/article/${articleID}/comments`,
            })
            .then( response => {
                console.log(response.data); 
                this.comments = response.data 
            })
            .catch( err => {
                console.log(err)
            })
        },

        postComment: function() {
            axios({
                method: 'POST',
                url: `http://localhost:3000/article/${this.$route.params.articleID}/addComment`,
                data: {
                    title: this.inputComment.title,
                    detail: this.inputComment.detail 
                },
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                }
            })
            .then( response => {
                this.comments.push(response.data) 
                this.getComments(this.$route.params.articleID)
            })
            .catch( err => {
                console.log(err);
            })
        }

    },
    mounted() {
        this.getArticle(this.$route.params.articleID)
        this.getComments(this.$route.params.articleID)
    },
    watch: { 

        comments: function() {
            this.getComments()
        }
    }
}
</script>
