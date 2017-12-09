import React, {Component} from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'

export default class Card extends Component {
  render(){
    return (
      <View key={this.props.keyVal}
            style={styles.cardContainer}>
        <View style={styles.text}>
          <Text>{this.props.note.note}</Text>
          <Text>Date: {this.props.note.date}</Text>
        </View>
        <View style={styles.deleteButton}>
          <TouchableOpacity
            onPress={this.props.onPress}
          >
            <Text style={{color: 'white', fontSize: 30}}>D</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    flexDirection: 'row',
    height: 60,
    borderWidth: 3,
    borderColor: 'darkgray',
    marginTop: 5,
    marginLeft: '5%',
  },
  text: {
    flex: 5,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.8,
    backgroundColor: 'green',
  },
})
