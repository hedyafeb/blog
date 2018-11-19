<template>
    <div class="media mb-4">
        <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
        <div class="media-body">
            <h5 class="mt-0">{{ comment.userID.name }} || {{ comment.title}}  </h5>
            {{ comment.detail }}
            <button type="button" class="btn btn-link" @click="deleteComment" v-if="enableDelete">Delete</button>
        </div>
    </div>



</template>


<script>
export default {
    props: ['comment'],
    data() {
        return {
            currentUser: "",
            enableDelete: false
        }
    },
    methods: {
        showDeleteButton: function() {
            this.currentUser = localStorage.getItem('userID')
            if (this.currentUser === this.comment.userID._id) {
                this.enableDelete = true
            }
        },
        deleteComment: function() {
            axios({
                method: 'DELETE',
                url: `http://localhost:3000/article/${this.comment.articleID}/${this.comment._id}`,
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                }
            })
            .then( response => {
                this.$emit('deleteComment')
            })
            .catch( err => {
                console.log(err);
                
            })
        }
    },
    mounted() {
        this.showDeleteButton() 
    }
}
</script>
