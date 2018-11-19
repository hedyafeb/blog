<template>
    <div class="container">
        <div class="card mb-4" >
            <img class="card-img-top" alt="Card image cap" src="http://placehold.it/750x300">  
            <div class="card-body">
                <h2 class="card-title">{{ article.title }}</h2>
                <p class="card-text" >{{ article.detail }}</p>
                <router-link :to="`/articles/${article._id}`" >Read More</router-link>
            </div>
            <div class="card-footer text-muted">
                Posted on {{ article.createdAt }} by {{ article.userID.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['article']
}
</script>



