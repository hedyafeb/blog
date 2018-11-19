<template>
    <div class="container border">
        <h3 class="my-4">Chat</h3>
        <ul class="list-group">
            <li class="list-group-item" v-for="chat in messages" :key="chat._id">{{ chat.message }} <p><small>{{ chat.user }}</small></p></li>
            
        </ul>
        <div class="input-group my-3 ">
            <input type="text" class="form-control" placeholder="Type message here" v-model="newMessage">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="writeChat"> Send </button>
            </div>
        </div>
        <div class="alert alert-light" role="alert" v-if="alert">
            You must login first
        </div>
    </div>


</template>

<script>
    import database from '@/assets/config.js'

    export default {
        data() {
            return {
                newMessage: "",
                alert: false,
                messages: {}
            }
        },
        methods: {
            writeChat: function() {
                let name = localStorage.getItem('name')
                if (!name) {
                    this.alert = true
                }
                else {
                    database.ref('messages/').push({
                        user: name,
                        message: this.newMessage
                    })
                }
            },

            readChat: function() {
                database.ref('messages/').on('value', (snapshot) => {
                    this.messages = Object.values(snapshot.val())
                })

            }
        },
        created() {
            this.readChat()
        }
    }
</script>



