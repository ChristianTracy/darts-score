import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAByfx_b07ibSvK4ob33ELlHCYc4DIMHqo",
  authDomain: "darts-score-80424.firebaseapp.com",
  databaseURL: "https://darts-score-80424.firebaseio.com",
  projectId: "darts-score-80424",
  storageBucket: "darts-score-80424.appspot.com",
  messagingSenderId: "336372665196"
};
const firebaseConnection = firebase.initializeApp(config);
export default firebaseConnection;