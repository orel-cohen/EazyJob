import * as firebase from "firebase";

class Firebase {

    /**
     * Initialises Firebase
     */
    static initialise() {
        firebase.initializeApp({
            apiKey: "AIzaSyBY0PddfjOocVkTtQaFtCFd2oTfqPMpdZE",
            authDomain: "eazyjob-ohr.firebaseapp.com",
            databaseURL: "https://eazyjob-ohr.firebaseio.com",
            storageBucket: "eazyjob-ohr.appspot.com"
        });
    }

}

module.exports = Firebase;