import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, Button} from 'react-native'
import * as firebase from 'firebase'

export default class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  }

  handleLogin = () => {
    //deconstruct these from state so we can use it in the firebase.auth function below
    // without having to prefix it with "this."
    const {email, password} = this.state

    // this is copied from firebase sing in existing users
    firebase.auth().signInWithEmailAndPassword(email, password)
    // because it is promisse use then to navigate to TodoMain screen if existing user
    .then(() => this.props.navigation.navigate("TodoMain"))
    .catch(() => {
      //otherwise, if non existing user, copy from firebase code sinpped
      //for sign up new users is a non existing user
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate("TodoMain"))
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>Login Page</Text>
        <TextInput
          style={styles.textInput}
          placeholder="email"
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          style={styles.textInput}
          placeholder="password"
          secureTextEntry
          onChangeText={password => this.setState({password})}
        />
        <Button
          title='Login or Sign Up'
          onPress={() => this.handleLogin()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  textInput: {
      marginTop: 10,
      width: '70%',
      height: 40,
      borderWidth: 1,
      borderColor: 'darkgray'
  }
})
