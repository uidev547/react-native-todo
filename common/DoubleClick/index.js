import React, { Component } from "react";
import { TouchableOpacity } from "react-native";

export default class DoubleClick extends Component {
  static defaultProps = {
    delay: 200,
    styles: [],
    onClick: () => {},
    onDoubleClick: () => {}
  }
  constructor(props) {
    super(props);
    this.delayTime = props.delay;
    this.firstPress = true;
    this.lastTime = new Date();
    this.timer = false;
  }

  _onPress = () => {
    const { onClick, onDoubleClick } = this.props;
    let now = new Date().getTime();
    if (this.firstPress) {
      this.firstPress = false;
      this.timer = setTimeout(() => {
        onClick();
        this.firstPress = true;
      }, this.delayTime);
      this.lastTime = now;
    } else {
      if (now - this.lastTime < this.delayTime) {
        clearTimeout(this.timer);
        onDoubleClick();
        this.firstPress = true;
      }
    }
  };

  render() {
    const { styles, children } = this.props;
    return (
      <TouchableOpacity onPress={this._onPress} style={styles}>
        {children}
      </TouchableOpacity>
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }
}