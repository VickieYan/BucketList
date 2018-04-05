import React, { Componet } from 'react'
import { View } from 'react-native'

const JustifyContentBasics = () => (
    <View
        style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
        <View
            style={{ width: 50, height: 50, backgroundColor: 'powderblue' }}
        />
        <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
        <View style={{ width: 50, height: 50, backgroundColor: 'steelblue' }} />
    </View>
)

export default JustifyContentBasics
