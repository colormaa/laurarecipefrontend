import firebase from 'firebase/app';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyDXo-iXFQihtlionsPgTNAO4gQQ9hknnPQ",
    authDomain: "laurarecipe-4e1d6.firebaseapp.com",
    databaseURL: "https://laurarecipe-4e1d6.firebaseio.com",
    projectId: "laurarecipe-4e1d6",
    storageBucket: "laurarecipe-4e1d6.appspot.com",
    messagingSenderId: "572018072276",
    appId: "1:572018072276:web:624fbe1ddb11cab2"
  };

  firebase.initializeApp(firebaseConfig)

  const storage = firebase.storage();
  export{
      storage, firebase as default
  }