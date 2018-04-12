/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import {
    HelloWorld,
    LotsOfStyles,
    FixedDimensionsBasics,
    FlexDirectionBasics,
    JustifyContentBasics,
    AlignItemsBasics,
    PizzaTranslator,
    IScrolledDownAndWhatHappenedNextShockedMe,
} from './src/practice'

import TimeCounter from './src/timecounter'

import SimTanTan from './src/simtantan'
import Flix from './src/simtantan/Flix'

import { Home } from './src/todolist'

import {
    AnimatedBaic1,
    AnimatedBasic2,
    AnimatedBasic3,
    AnimatedBasic4,
    AnimatedBasic5,
    AnimatedBasic6,
    AnimatedBasic7,
    AnimatedBasic8,
    AnimatedBasic9,
} from './src/animate'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
})

// type Props = {}
export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SimTanTan />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
