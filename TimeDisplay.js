import React, {Component} from 'react';
import {
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Constants} from 'expo';

export default class DigitalClock extends Component {
  state = {
    _interval: null,
    isRunning: false,
    lapList: [],
  };

  _clearTimer = () => {
    clearInterval(this.state._interval);
  };

  _onStart = () => {
    this.props.handleStart();
    this.setState({
      isRunning: true,
      _interval: setInterval(() => this.props.handleUpdate(), 100),
    });
  };

  _onReset = () => {
    this.props.handleReset();
  };

  _onStop = () => {
    if (this.state._interval) {
      this._clearTimer();
      this.setState({
        isRunning: false,
      });
    }
  };

  _onPause = () => {
    this._clearTimer();
  };

  _onNewLap = () => {
    let {minute, second, mili} = this.props;
    let miliString =
      mili < 100 ? `0${Math.floor(mili / 10)}` : `${Math.floor(mili / 10)}`;
    let secondString =
      second < 10 ? `0${Math.floor(second)}` : `${Math.floor(second)}`;
    let minuteString =
      minute < 10 ? `0${Math.floor(minute)}` : `${Math.floor(minute)}`;

    let {lapList} = this.state;
    let record = `${minuteString}:${secondString}.${miliString}`;
    this.setState({
      lapList: [...this.state.lapList, record],
    });
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
          {this.props.mili > 0 && this.state.isRunning === false ? (
            <TouchableHighlight
              style={styles.touchable}
              onPress={this._onReset}
            >
              <Text style={styles.text}>Reset</Text>
            </TouchableHighlight>
          ) : (
            <TouchableHighlight
              style={styles.touchable}
              onPress={this._onNewLap}
            >
              <Text style={styles.text}>Lap</Text>
            </TouchableHighlight>
          )}

          <View style={styles.separator} />
          {this.state.isRunning === false ? (
            <TouchableHighlight
              style={styles.touchable}
              onPress={this._onStart}
            >
              <Text style={styles.text}>Start</Text>
            </TouchableHighlight>
          ) : (
            <TouchableHighlight
              style={styles.touchableRed}
              onPress={this._onStop}
            >
              <Text style={styles.text}>Stop</Text>
            </TouchableHighlight>
          )}
        </View>
        <ScrollView style={styles.lapWrapper}>
          {this.state.lapList.map((item, index) => {
            return <Lap idx={index} key={index} time={item} />;
          })}
          <View
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: '#eeeeee',
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

function Lap(props: LapProps) {
  let {idx, time} = props;
  return (
    <View style={styles.lap}>
      <Text style={[styles.text, {flex: 1}]}>{`Lap. ${idx + 1}   - `}</Text>
      <Text style={[styles.text, {flex: 1, textAlign: 'right'}]}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'space-between',
    backgroundColor: '#000',
    alignItems: 'center',
  },
  lapWrapper: {
    flex: 1,
    flexDirection: 'row',
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#eeeeee',
  },
  lap: {
    paddingTop: 4,
    borderTopWidth: 0.5,
    borderTopColor: '#eeeeee',
    flexDirection: 'row',
    height: 30,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.02)',
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
    width: '100%',
  },
  containerTap: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000',
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
  touchableRed: {
    backgroundColor: 'red',
    height: 80,
    width: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
