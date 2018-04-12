import React, { Component } from 'react'

import { View, StyleSheet, Animated, Text, PanResponder } from 'react-native'

export default class Card extends Component {
    componentWillMount() {
        this.animatedValue = new Animated.ValueXY()
        this._value = { x: 0, y: 0 }
        this.animatedValue.addListener(value => (this._value = value))
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            // 开始手势操作
            onPanResponderGrant: (evt, gestureState) => {
                this.animatedValue.setOffset({
                    x: this._value.x,
                    y: this._value.y,
                })
                this.animatedValue.setValue({ x: 0, y: 0 })
            },
            onPanResponderMove: Animated.event([
                null,
                { dx: this.animatedValue.x, dy: this.animatedValue.y },
            ]),
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                this.animatedValue.flattenOffset()
                Animated.decay(this.animatedValue, {
                    deceleration: 0.997,
                    velocity: { x: gestureState.vx, y: gestureState.vy },
                }).start()
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                return true
            },
        })
    }

    render() {
        const animatedStyle = {
            transform: this.animatedValue.getTranslateTransform(),
        }
        const { backgroundColor } = this.props
        return (
            <Animated.View
                style={[styles.button, animatedStyle, { backgroundColor }]}
                {...this._panResponder.panHandlers}>
                <Text style={styles.text}>Drag me</Text>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFF',
    },
})
