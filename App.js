import React from 'react';
import {TouchableHighlight, StyleSheet, Text, View} from 'react-native';
import {Constants} from 'expo';
import TimeDisplay from './TimeDisplay';

export default class App extends React.Component {
  state = {
    minute: 0,
    second: 0,
    mili: 0,
    startingTime: null,
  };

  _handleStart = () => {
    this.setState((prevState) => {
      return {startingTime: new Date()};
    });
  };

  _handleUpdate = () => {
    this.setState((prevState) => {
      currentTime = new Date();
      diff = currentTime - prevState.startingTime;
      if (diff < 999) {
        return {mili: diff};
      } else if (diff < 60000) {
        return {second: diff / 1000, mili: diff % 1000};
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Stopwatch</Text>
        <View>
          <TimeDisplay
            handleStart={this._handleStart}
            handleUpdate={this._handleUpdate}
            minute={this.state.minute}
            second={this.state.second}
            mili={this.state.mili}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'space-between',
    backgroundColor: '#000',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  timerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 56,
  },
  containerClock: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTap: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
