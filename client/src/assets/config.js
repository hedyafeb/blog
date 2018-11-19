// const firebase = require("firebase"); coba ini
import firebase from "firebase";

const config = {
    apiKey: "AIzaSyCD3x8FaVmx_P_beLpXZ6xXMtfiZ7BQjxk",
    authDomain: "blog-hacktiv.firebaseapp.com",
    databaseURL: "https://blog-hacktiv.firebaseio.com",
    projectId: "blog-hacktiv",
    storageBucket: "blog-hacktiv.appspot.com",
    messagingSenderId: "642113297143"
};


let database = firebase.initializeApp(config).database()

export default database