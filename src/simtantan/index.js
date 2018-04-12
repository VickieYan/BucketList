import React, { Component } from 'react'
import { Text, Image, View, StyleSheet } from 'react-native'
import Flix from './Flix'

class Simtantan extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Flix backgroundColor="#fbc2eb" />
                <Flix backgroundColor="#fed6e3" />
                <Flix backgroundColor="#d4fc79" />
                <Flix backgroundColor="#96e6a1" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        width: 300,
        height: 300,
    },
})

export default Simtantan
