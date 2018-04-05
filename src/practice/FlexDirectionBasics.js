import React, { Component } from 'react'
import { View } from 'react-native'
const FlexDirectionBasics = () => (
    <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ width: 50, height: 50, backgroundColor: 'pink' }} />
        <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
        <View style={{ width: 50, height: 50, backgroundColor: 'steelblue' }} />
    </View>
)

export default FlexDirectionBasics
