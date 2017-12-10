import React, {Component} from 'react'
import moment from 'moment'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native'

// after we added Card, import it
import Card from '../components/card'
import * as firebase from 'firebase'

// PROBLEM with installing momentjs:
// To install momentjs, we navigated to the root of our app in terminal and issued
//    npm i --save moment
// But once imported moment, we all had issues complaining about AppEnyry.js in node_modules directory
// of this project (see the tree view), so we realized that intalling momentjs, removed number of
// packages from node_modules and in order to fix this, we opened terminal and navigated to the
// location of our app and issued
//    npm -i
// which installs all the modules in your project again.  That fixed the issue.

export default class TodoMain extends Component {
  // our component state an be anyting, so we can put note, notes[] or whatever we like.
  // but if we update anything in state at any moment, we must call setState to save it to state.
  state = {
     // every time you tYpe something in TextInput, note state will change
     note: '',
     notes: [],
  }

  componentDidMount(){
    firebase.database().ref("todo").on("value", snap => {
      res = snap.val()
      console.log(res)
      this.setState({notes: [res]})
    })
    console.log(this.state.notes)
  }

  handlePress() {
    if (this.state.note) {
          // save to firebase instead to array
      const firebaseRef = firebase.database().ref("todo").push().key
      firebase.database().ref('todo')
      .child(firebaseRef)
      .update({
        note: this.state.note,
        date: moment().format("MMMM Do YYYY")
      })

      // // push adds an element to array to its end
      // this.state.notes.push({
      //   note: this.state.note,
      //   date: moment().format("MMMM Do YYYY")
      // })
      // each time you change something from state, need to call setState on it again
      //this.setState({notes: this.state.notes, note: ''})
      this.setState({note: ''})
      console.log("notes ==> ", this.state.notes)
    }
  }

  deleteNote(key) {
    // splice adds AND removes an element from the array, key is location, 1 is number of items to
    // delete from array.  Below, provides start location where to delete deleteCount items, and
    // optionally add item1, item2, ...
    //   array.splice(start, deleteCount [, item1 [, item2 [, ...]]])
    this.state.notes.splice(key, 1)
    this.setState({notes: this.state.notes})
  }

  render() {
    // map() creaes new array with the result returned by a funciton, in case here, arrow function
    // which returns new instance of our Card class and assigns to it key, keywal, note, and an
    // onPress event which handles deletion of the Card.
    const notes = this.state.notes.map((note, i) => {
      return(
        <Card
          key={i}
          keyval={i}
          note={note}
          onPress={() => this.deleteNote(i)}
        />
      )
    })

    return(
      <View style={styles.container}>

        <View style={styles.header}>
          <TextInput
            style={styles.textinputstyle}
            value={this.state.note}
            placeholder={"Type your note here"}
            onChangeText={(note) => this.setState({note})} // or {note: note}
          />

          <View style={styles.button}>
            <TouchableOpacity onPress={() => this.handlePress()}>
              <Text style={{fontSize: 40, color: 'red'}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          {/* <Text style={{backgroundColor: 'transparent'}}>{this.state.note}</Text> */}
          <ScrollView>
            {notes}
          </ScrollView>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Memos Always Help!</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    backgroundColor: 'red',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 5,
    width: '100%',
  },
  footer: {
    flex: 0.6,
    backgroundColor: 'black',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  textinputstyle: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'bisque',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 66,
    right: 20,
  }
})
