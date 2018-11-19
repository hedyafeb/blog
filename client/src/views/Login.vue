<template>
    <div class="login container" >
        <div class="row">
            <div class="col-6">
                <h3>Login</h3>
                <form>
                    <div class="form-group">
                        <label for="inputEmail">Email address</label>
                        <input type="email" class="form-control" placeholder="Enter email" v-model="loginData.email"> 
                    </div>
                    <div class="form-group">
                        <label for="inputPassword">Password</label>
                        <input type="password" class="form-control" placeholder="Password" v-model="loginData.password"> 
                    </div> 
                    <p> <button type="submit" class="btn btn-primary mr-4" v-on:click.prevent='login'> Login </button> </p>
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
                loginData: {
                    email: "",
                    password: ""
                },
                message: "",
                alert: false
            }
        },
        methods: {
            login() {
                axios({
                    method: 'POST',
                    // url: 'http://localhost:3000/login',
                    url: 'https://blog-server.hedyafeb.me/login',
                    data: {
                        email: this.loginData.email,
                        password: this.loginData.password
                    }
                })
                .then( response => {
                    console.log(response.data);
                    localStorage.setItem('accesstoken', response.data.accesstoken)
                    localStorage.setItem('userID', response.data.userID)
                    localStorage.setItem('name', response.data.name)
                    this.$emit('fetchUser', response.data.userID) 
                    this.$router.push('/')
                })
                .catch( err => {
                    console.log(err);
                    this.message = err.response.data.msg
                    this.alert = true
                })
            }
        }
    }
</script>