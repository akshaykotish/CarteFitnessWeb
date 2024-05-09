const firebase  = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyCjYt47fYAJ0d43Cpb1EpS-TEqDzmjuUB0",
    authDomain: "trackjobsgovernment.firebaseapp.com",
    projectId: "trackjobsgovernment",
    storageBucket: "trackjobsgovernment.appspot.com",
    messagingSenderId: "633423406728",
    appId: "1:633423406728:web:2ae618b4914f9b9988213d",
    measurementId: "G-2NWJEGN7ZF"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
module.exports = db;