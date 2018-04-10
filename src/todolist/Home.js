import React, { Component } from 'react'
import {
    View,
    ScrollView,
    List,
    ListItem,
    Text,
    FlatList,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Modal,
    TouchableOpacity,
} from 'react-native'
import Swipeout from 'react-native-swipeout'
import { Icon, FormLabel, FormInput, Button } from 'react-native-elements'
import { ParallaxScrollView } from './'
import { COLORS } from '../config/colors'
import { SCREEN_WIDTH, SCREEN_HEIGHT, LIST } from '../config/constants'

class Home extends Component {
    static propTypes = {}

    constructor(props) {
        super(props)
        this.state = {
            todos: [
                {
                    id: 0,
                    description: '不忘记最初就不怕以后',
                    category: 'test',
                    notes: '初心を忘れるべからず',
                    checked: true,
                },
                {
                    id: 1,
                    description: '不忘记最初就不怕以后',
                    category: '',
                    notes: '初心を忘れるべからず',
                    checked: false,
                },
            ],
            currentId: 1,
            addItemValue: '',
            showModal: false,
            indexOfModal: null,
        }
        this.handlePress = this.handlePress.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.hanleShowModal = this.hanleShowModal.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    handlePress(index) {
        const todos = this.state.todos.slice()
        todos[index].checked = !todos[index].checked
        this.setState({
            todos,
        })
    }

    handleSubmit() {
        if (!this.state.addItemValue) return
        const todos = this.state.todos.slice()
        todos.push({
            id: this.state.currentId + 1,
            description: this.state.addItemValue,
            category: '',
            notes: '',
            checked: false,
        })
        this.setState(prevState => ({
            todos,
            currentId: prevState.currentId + 1,
            addItemValue: '',
        }))
        this.refs['input'].blur()
    }

    handleDelete(index) {
        const todos = this.state.todos.slice()
        todos.splice(index, 1)
        this.setState({
            todos,
        })
    }

    hanleShowModal(index) {
        this.setState({
            showModal: true,
            indexOfModal: index,
        })
    }

    handleConfirm() {
        this.setState({
            showModal: false,
        })
    }

    handleEdit(type, val) {
        const { indexOfModal } = this.state
        const todos = this.state.todos.slice()
        todos[indexOfModal][type] = val
        this.setState({
            todos,
        })
    }

    formateDate() {
        const weeks = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ]
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
        const date = new Date()
        // 星期
        const week = date.getDay()
        // 月
        const month = date.getMonth()
        // 日
        const day = date.getDate()
        return `${weeks[week]}, ${months[month]} ${day}`
    }

    renderHeader() {
        return (
            <View style={styles.headerView}>
                <View style={styles.headerTextView}>
                    <Text style={styles.headerTextViewTitle}>My Day</Text>
                    <Text style={styles.headerTextViewSubtitle}>
                        {this.formateDate()}
                    </Text>
                </View>
            </View>
        )
    }

    renderToDoList() {
        const todos = this.state.todos
        return (
            <ScrollView style={styles.listView}>
                <FlatList
                    data={todos}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) =>
                        this.renderToDoListItem(item, index)
                    }
                />
            </ScrollView>
        )
    }

    renderToDoListItem(item, index) {
        const { description, category, notes, checked } = item
        const iconName = item.checked ? 'check-circle' : 'alarm-on'
        const swipeoutBtns = [
            {
                text: 'Delete',
                type: 'delete',
                onPress: () => this.handleDelete(index),
            },
        ]
        return (
            <Swipeout right={swipeoutBtns} autoClose>
                <TouchableOpacity
                    key={index}
                    style={styles.itemWrapper}
                    onPress={() => {
                        this.hanleShowModal(index)
                    }}>
                    <View style={styles.itemLeftIcon}>
                        <Icon
                            name={iconName}
                            onPress={() => {
                                this.handlePress(index)
                            }}
                        />
                    </View>
                    <View style={styles.itemTextWrapper}>
                        <Text
                            style={
                                checked
                                    ? styles.itemCompleteTitle
                                    : styles.itemInCompleteTitle
                            }>
                            {description}
                        </Text>
                        <View style={styles.itemSubtitleWrapper}>
                            <Text style={styles.itemCategory}>{category}</Text>
                            {notes && category ? <Text> · </Text> : null}
                            {notes ? (
                                <Icon
                                    name="book"
                                    size={12}
                                    color={COLORS.titleGreyComplete}
                                />
                            ) : null}
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        )
    }

    renderModal() {
        const { indexOfModal } = this.state
        const item = this.state.todos[indexOfModal]
        const { description, category, notes } = item
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    alert('Modal has been closed.')
                }}
                style={styles.modalWrapper}>
                <View style={styles.modalWrapper}>
                    <View style={styles.modalForm}>
                        <FormLabel>Description</FormLabel>
                        <FormInput
                            value={description}
                            onChangeText={val =>
                                this.handleEdit('description', val)
                            }
                        />
                        <FormLabel>Category</FormLabel>
                        <FormInput
                            value={category}
                            onChangeText={val =>
                                this.handleEdit('category', val)
                            }
                        />
                        <FormLabel>Notes</FormLabel>
                        <FormInput
                            value={notes}
                            onChangeText={val => this.handleEdit('notes', val)}
                        />
                    </View>
                    <Button
                        raised
                        icon={{ name: 'done' }}
                        title="CONFIRM"
                        backgroundColor="#2089dc"
                        onPress={this.handleConfirm}
                    />
                </View>
            </Modal>
        )
    }

    renderAddItem() {
        return (
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.addItemWrapper}>
                    <TextInput
                        ref="input"
                        placeholder="Add a todo"
                        style={styles.addItemInput}
                        onChangeText={text =>
                            this.setState({ addItemValue: text })
                        }
                        value={this.state.addItemValue}
                        onSubmitEditing={this.handleSubmit}
                    />
                    <Icon
                        name="add-circle-outline"
                        style={styles.addItemIcon}
                        onPress={this.handleSubmit}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }

    render() {
        const { showModal } = this.state
        return (
            <View style={styles.flexView}>
                {/*header*/}
                <ParallaxScrollView
                    windowHeight={SCREEN_HEIGHT * 0.38}
                    backgroundSource={require('../public/images/IMG_0286.jpg')}
                    headerView={this.renderHeader()}>
                    {/* content */}
                </ParallaxScrollView>
                {this.renderToDoList()}
                {this.renderAddItem()}
                {showModal ? this.renderModal() : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flexView: {
        flex: 1,
    },
    headerView: {
        flex: 5,
    },
    headerTextView: {
        position: 'absolute',
        left: 25,
        bottom: 25,
        backgroundColor: 'transparent',
    },
    headerTextViewTitle: {
        fontSize: 35,
        color: 'white',
        fontWeight: '300',
        paddingBottom: 10,
    },
    headerTextViewSubtitle: {
        fontSize: 20,
        color: 'white',
        fontWeight: '300',
    },
    listView: {
        backgroundColor: '#eee',
    },
    itemWrapper: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.addItemIconWithValue,
    },
    itemTextWrapper: {
        marginTop: 18,
    },
    itemCompleteTitle: {
        fontSize: 17,
        color: COLORS.titleGreyComplete,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    },
    itemInCompleteTitle: {
        fontSize: 17,
        color: COLORS.titleGreyInComplete,
    },
    itemSubtitleWrapper: {
        marginTop: 2,
        flexDirection: 'row',
    },
    itemCategory: {
        color: COLORS.titleGreyComplete,
        marginRight: 5,
    },
    itemLeftIcon: {
        margin: 15,
    },
    addItemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        paddingLeft: 25,
        paddingRight: 25,
    },
    addItemInput: {
        height: 50,
        // padding: 20,
        width: 300,
        lineHeight: 50,
    },
    modalWrapper: {
        flex: 1,
        // backgroundColor: 'pink',
        justifyContent: 'center',
    },
    modalForm: {
        marginBottom: 80,
    },
})

export default Home
