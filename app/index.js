import React, {Component} from 'react'
import Routes from './Screens/Routes'
import { StyleSheet, View } from 'react-native'
import * as firebase from 'firebase'

//copied this from firebase
  // Initialize Firebase
  //initialize config from our top component so we dont need to do it again
  //var config = {}
  const config = {
    apiKey: "AIzaSyC4KmmvK8TgBhuOy605ZltpB43yg9v21Zg",
    authDomain: "todo-meetup.firebaseapp.com",
    databaseURL: "https://todo-meetup.firebaseio.com",
    projectId: "todo-meetup",
    storageBucket: "",
    messagingSenderId: "732538674324"
  };
  firebase.initializeApp(config);

// moved all from index to TodoMain.js

export default class App extends Component {

  render() {
    return(
      <View style={{flex: 1}}>
        <Routes />
      </View>
    )
  }
}
