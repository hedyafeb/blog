<template>
    <div class="container">
        <h1>Edit Post</h1>
        {{ $route.params.articleID }}
        <hr>
        <form>
            <div class="alert alert-primary" role="alert" v-if="successPosting">
                {{ message }}
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" placeholder="Write title here" v-model="inputArticle.title">
            </div>
            <div class="form-group">
                <label>Content: </label>
                <textarea class="form-control" rows="10" placeholder="Write detail here" v-model="inputArticle.detail"></textarea>
            </div>
            <button type="submit" class="btn btn-dark" @click.prevent="updateArticle">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    props: ['article'],
    data() {
        return {
            inputArticle: {
                title: "",
                detail: ""
            },
            successPosting: false,
            message: ""
        }
    },
    methods: {
        updateArticle: function() {
            console.log(this.inputArticle);
            console.log('iniii', this.article);
            
            // axios({
            //     method: 'PUT',
            //     url: `http://localhost:3000/article/${}`,
            //     data: {
            //         title: this.inputArticle.title,
            //         detail: this.inputArticle.detail
            //     },
            //     headers: {
            //         accesstoken: localStorage.getItem('accesstoken')
            //     }
            // })
            // .then()
            // .catch()
        }
    }
}
</script>
