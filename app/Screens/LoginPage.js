import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, Button} from 'react-native'

export default class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  }

  handleLogin = () => {
    console.log("Hey login Page")
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
          onPress={() => this.handleLogin}
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
