<template>
    <div class="register container" >
        <div class="row">
            <div class="col-6">
                <h3>Register</h3>
                <form>
                    <div class="form-group">
                        <label for="inputEmail">Name</label>
                        <input type="email" class="form-control" placeholder="Enter name" v-model="registerData.name" required> 
                    </div>
                    <div class="form-group">
                        <label for="inputEmail">Email address</label>
                        <input type="email" class="form-control" placeholder="Enter email" v-model="registerData.email" required> 
                    </div>
                    <div class="form-group">
                        <label for="inputPassword">Password</label>
                        <input type="password" class="form-control" placeholder="Password" v-model="registerData.password" required> 
                    </div> 
                    <p> <button type="submit" class="btn btn-primary mr-4" v-on:click.prevent="register"> Register </button> </p>
                </form>
                <div class="alert alert-info" role="alert" v-show="alert">
                    {{ message }}
                </div>
            </div>
            <div class="col-6">
            </div>
        </div>   
    </div>
</template>

<script>
    export default {
        data() {
            return {
                registerData: {
                    name: "",
                    email: "",
                    password: ""
                },
                message: "",
                alert: false
            }
        },
        methods: {
            register () {
                axios({
                    method: 'POST',
                    url: 'http://localhost:3000/register',
                    data: {
                        email: this.registerData.email,
                        password: this.registerData.password,
                        name: this.registerData.name
                    }
                })
                .then( response => {
                    this.$router.push('/')
                })
                .catch( err => {
                    console.log(`${err} from register new User`);
                    this.message = err.response.data.msg
                    this.alert = true
                })
            }
        }
    }
</script>
