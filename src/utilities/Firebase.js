import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD5xRHDREmUCdt9JhZpsxVC0cG0pWO8qZk',
  authDomain: 'bracketball-83683.firebaseapp.com',
  databaseURL: 'https://bracketball-83683.firebaseio.com',
  projectId: 'bracketball-83683',
  storageBucket: 'bracketball-83683.appspot.com',
  messagingSenderId: '129929714791',
  appId: '1:129929714791:web:49de46b1860dd8445f88c2',
  measurementId: 'G-XC986894ET',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Firebase test.
function storeHighScore(userId, score) {
  firebase
    .database()
    .ref('users/' + userId)
    .set({
      highscore: score,
    });
}

setupHighscoreListener(userId) {
  firebase.database().ref('users/' + userId).on('value', (snapshot) => {
    const highscore = snapshot.val().highscore;
    console.log("New high score: " + highscore);
  });
}
