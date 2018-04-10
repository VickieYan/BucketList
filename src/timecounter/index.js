import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    Button,
    ScrollView,
    FlatList,
} from 'react-native'

class TimeCounter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            records: [],
            currentIndex: 0,
            isStart: false,
            startTime: null,
            timeSpan: null,
            totalTime: null,
        }
        this.time1 = null
        this.handleToggle = this.handleToggle.bind(this)
        this.getTimeSpan = this.getTimeSpan.bind(this)
        this.timeFormate = this.timeFormate.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    getTimeSpan(startTime) {
        const endTime = new Date().getTime()
        const timeSpan = endTime - startTime
        this.setState(prevState => ({
            timeSpan: timeSpan + prevState.totalTime,
        }))
    }

    timeFormate(mili) {
        const minutes = new Date(mili).getMinutes()
        const seconds = new Date(mili).getSeconds()
        const miliseconds = parseInt(
            (mili - 60 * 60 * 1000 * minutes - 1000 * seconds) / 10
        )

        return `${minutes
            .toString()
            .padStart(2, 0)}:${seconds
            .toString()
            .padStart(2, 0)}:${miliseconds.toString().padStart(2, 0)}`
    }

    handleToggle() {
        const isStart = !this.state.isStart
        const records = this.state.records.slice()
        const { currentIndex, timeSpan } = this.state
        if (isStart) {
            // if (!this.state.startTime) {
            //     const startTime = new Date().getTime()
            //     this.setState({
            //         startTime,
            //     })
            // }
            const startTime = new Date().getTime()
            this.setState({
                startTime,
            })
            // 开启定时器
            this.time1 = setInterval(
                () => this.getTimeSpan(this.state.startTime || startTime),
                10
            )
        } else {
            // 停止定时器
            clearInterval(this.time1)
            records.push({
                index: currentIndex + 1,
                time: this.timeFormate(timeSpan),
            })
            this.setState({
                records,
                totalTime: this.state.timeSpan,
                currentIndex: currentIndex + 1,
            })
        }
        this.setState({
            isStart,
        })
    }

    handleReset() {
        this.setState({
            records: [],
            currentIndex: 0,
            isStart: false,
            startTime: null,
            timeSpan: null,
            totalTime: null,
        })
    }

    render() {
        const { records, timeSpan } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.timePreview}>
                    {this.timeFormate(timeSpan)}
                </Text>
                <View style={styles.timeControllArea}>
                    <View style={styles.timeControllWrapper}>
                        <Button
                            title="复位"
                            style={styles.timeControll}
                            onPress={this.handleReset}
                        />
                    </View>
                    <View style={styles.timeControllWrapper}>
                        <Button
                            title="启动"
                            style={styles.timeControll}
                            onPress={this.handleToggle}
                        />
                    </View>
                </View>
                <View style={styles.timeListWrapper}>
                    <FlatList
                        data={records}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => (
                            <View style={styles.recordsItemWrapper}>
                                <Text style={styles.recordsItem}>{`计数${
                                    item.index
                                }:`}</Text>
                                <Text style={styles.recordsItem}>
                                    {item.time}
                                </Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    timePreview: {
        flex: 0.5,
        alignItems: 'center',
        color: 'white',
        fontSize: 80,
        lineHeight: 400,
        textAlign: 'center',
    },
    timeControllArea: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeControllWrapper: {
        justifyContent: 'center',
        width: 80,
        height: 80,
        margin: 20,
        backgroundColor: '#ccc',
        borderRadius: 50,
        opacity: 0.5,
    },
    timeListWrapper: {
        flex: 0.3,
        borderTopColor: '#ccc',
        borderTopWidth: 0.5,
    },
    recordsItemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
    },
    recordsItem: {
        color: '#fff',
    },
})

export default TimeCounter
