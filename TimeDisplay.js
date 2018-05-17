import React, {Component} from 'react';
import {TouchableHighlight, StyleSheet, Text, View} from 'react-native';
import {Constants} from 'expo';

export default class DigitalClock extends Component {
  state = {
    _interval: null,
  };

  _clearTimer = () => {
    clearInterval(this.state._interval);
  };

  _onStart = () => {
    if (this.props.mili < 1001) {
      this.props.handleStart(),
        this.setState({
          _interval: setInterval(() => this.props.handleUpdate(), 100),
        });
    }
  };

  _onPause = () => {
    this._clearTimer();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerClock}>
          {this.props.minute < 10 ? (
            <Text style={styles.timerText}>{`0${Math.floor(
              this.props.minute,
            )}: `}</Text>
          ) : (
            <Text style={styles.timerText}>{`${Math.floor(
              this.props.minute,
            )}: `}</Text>
          )}
          {this.props.second < 10 ? (
            <Text style={styles.timerText}>{`0${Math.floor(
              this.props.second,
            )}. `}</Text>
          ) : (
            <Text style={styles.timerText}>{`${Math.floor(
              this.props.second,
            )}. `}</Text>
          )}
          {this.props.mili < 100 ? (
            <Text style={styles.timerText}>{`0${Math.floor(
              this.props.mili / 10,
            )} `}</Text>
          ) : (
            <Text style={styles.timerText}>{`${Math.floor(
              this.props.mili / 10,
            )} `}</Text>
          )}
        </View>
        <View style={styles.containerTap}>
          <TouchableHighlight style={styles.touchable} onPress={this._onPause}>
            <Text style={styles.text}>Pause</Text>
          </TouchableHighlight>
          <View style={styles.separator} />
          <TouchableHighlight style={styles.touchable} onPress={this._onStart}>
            <Text style={styles.text}>Start</Text>
          </TouchableHighlight>
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
    width: 85,
  },
  containerClock: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  containerTap: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchable: {
    backgroundColor: 'green',
    height: 80,
    width: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginRight: 10,
    marginLeft: 10,
  },
});
