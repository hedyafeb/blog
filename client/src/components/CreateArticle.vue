<template>
    <div class="container">
        <h1>New Post</h1>
        <hr>
        <form>
            <div class="alert alert-primary" role="alert" v-show="successPosting || alert">
                {{ message }}
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" placeholder="Write title here" v-model="article.title">
            </div>
            <div class="form-group">
                <label>Content: </label>
                <textarea class="form-control" rows="10" placeholder="Write detail here" v-model="article.detail"></textarea>
            </div>
            <button type="submit" class="btn btn-dark" @click.prevent="postArticle">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            article: {
                title: "",
                detail: ""
            },
            successPosting: false,
            alert: false,
            message: ""
        }
    },
    methods: {
        postArticle: function() {
            axios({
                method: 'POST',
                // url: `http://localhost:3000/article`,
                url: `https://blog-server.hedyafeb.me/article`,
                data: {
                    title: this.article.title,
                    detail: this.article.detail
                },
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                }
            })
            .then( response => {
                this.message = "You have posted 1 article! Congrats!"
                this.successPosting = true
            })
            .catch( err => {
                console.log(err);
                this.alert = true
                this.message = err.response.data.msg
            })
        }
    }
}
</script>
