import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

class ParallaxScrollView extends Component {
    render() {
        const {
            children,
            windowHeight,
            backgroundSource,
            headerView,
        } = this.props
        return (
            <View style={[styles.content, { height: windowHeight }]}>
                <Image
                    style={{ height: windowHeight }}
                    source={backgroundSource}
                />
                {headerView}
                {children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        // flex: 1,
    },
})

ParallaxScrollView.defaultProps = {
    windowHeight: 300,
}

export default ParallaxScrollView
