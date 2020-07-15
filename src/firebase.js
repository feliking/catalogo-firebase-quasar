import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyDJta8f5Gm0o3zd2zQOLr7oVqJVRMOb1yc',
  authDomain: 'catalogo-8f7f8.firebaseapp.com',
  databaseURL: 'https://catalogo-8f7f8.firebaseio.com',
  projectId: 'catalogo-8f7f8',
  storageBucket: 'catalogo-8f7f8.appspot.com',
  messagingSenderId: '866793595434',
  appId: '1:866793595434:web:1e73182fb510f24ff9d953'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
