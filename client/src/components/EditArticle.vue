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
                <input type="text" class="form-control" placeholder="Write title here" >
            </div>
            <div class="form-group">
                <label>Content: </label>
                <textarea class="form-control" rows="10" placeholder="Write detail here" ></textarea>
            </div>
            <button type="submit" class="btn btn-dark" >Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    props: ['article'],
    data() {
        return {
            // article: {
            //     title: "",
            //     detail: ""
            // },
            successPosting: false,
            message: ""
        }
    }
}
</script>
