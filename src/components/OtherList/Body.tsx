import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'native-base';
import { delay } from 'redux-saga/effects';
const strchangedot = (_str: string) => {
    if (_str.length > 13) {
        return (_str.slice(0, 11) + "...");
    } else return _str;
}
class Body extends Component {
    state = {
        selectIndex: -1,
        myself_source: '',
        myself_amount: '',
        spouse_source: '',
        spouse_amount: '',
    };
    selectItem(index: number) {
        let tmp = this.props.itemList[index];      
        let prestate = this.state;
        prestate.selectIndex = index;
        prestate.myself_source = tmp.myself_source;
        prestate.myself_amount = tmp.myself_amount;
        prestate.spouse_source = tmp.spouse_source;
        prestate.spouse_amount = tmp.spouse_amount;

        this.setState(prestate);
        //this.props.changeItem(this.state);
    }
    selectItemCheck(index: number) {
        this.props.changeItem(this.state);       
        this.setState({
            selectIndex: -1,
            myself_source: '',
            myself_amount: '',
            spouse_source: '',
            spouse_amount: '',
        });
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.itemList.map((item, index) => (
                        <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 1, borderStyle: "dashed", borderColor: "#AACCCC" }} key={index}>
                            <View style={styles.content_l}>
                                {index == this.state.selectIndex
                                    ?
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ flex: 1, flexDirection: 'row', }}>
                                            <Text style={{ flex: 2, textAlign: 'center', textAlignVertical: 'center', paddingRight: 10 }}>Source</Text>
                                            <TextInput
                                                style={styles.inputText}
                                                placeholder='Enter new'
                                                autoCorrect={false}
                                                value={this.state.myself_source.toString()}
                                                onChangeText={(newval) => this.setState({ myself_source: newval })}
                                            />

                                            <TextInput
                                                style={styles.inputText}
                                                placeholder='Enter new'
                                                autoCorrect={false}
                                                value={this.state.spouse_source.toString()}
                                                onChangeText={(newval) => this.setState({ spouse_source: newval })}
                                            />
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', }}>
                                            <Text style={{ flex: 2, textAlign: 'center', textAlignVertical: 'center', paddingRight: 10 }}>Amount</Text>
                                            <TextInput
                                                style={styles.inputText}
                                                placeholder='Enter new'
                                                autoCorrect={false}
                                                value={this.state.myself_amount.toString()}
                                                keyboardType='numeric'
                                                onChangeText={(newval) => this.setState({ myself_amount: newval })}
                                            />
                                            <TextInput
                                                style={styles.inputText}
                                                placeholder='Enter new'
                                                autoCorrect={false}
                                                keyboardType='numeric'
                                                ref='spouse'
                                                value={this.state.spouse_amount.toString()}
                                                onChangeText={(newval) => this.setState({ spouse_amount: newval })}
                                            />
                                        </View>
                                    </View>
                                    :
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ flex: 1, flexDirection: 'row', }}>
                                            <Text style={{ flex: 2, textAlign: 'center', textAlignVertical: 'center', paddingRight: 10 }}>Source</Text>
                                            <Text style={styles.Text}> {strchangedot(item.myself_source)} </Text>
                                            <Text style={styles.Text}> {strchangedot(item.spouse_source)} </Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', }}>
                                            <Text style={{ flex: 2, textAlign: 'center', textAlignVertical: 'center', paddingRight: 10 }}>Amount</Text>
                                            <Text style={styles.Text}> {item.myself_amount == '0' ? '' : item.myself_amount} </Text>
                                            <Text style={styles.Text}> {item.spouse_amount == '0' ? '' : item.spouse_amount} </Text>
                                        </View>
                                    </View>}
                            </View>
                            <View style={styles.content_R}>
                                {index == this.state.selectIndex
                                    ? <TouchableOpacity style={{ flex: 1, width: 30, height: 30 }} onPressOut={() => this.selectItemCheck(index)}>
                                        <Icon
                                            type="SimpleLineIcons"
                                            name="check"
                                            style={{ color: '#000', fontSize: 16, textAlign: "center" }}
                                        />
                                    </TouchableOpacity>
                                    : <View style={{ flex: 1, flexDirection: "row" }}>
                                        <TouchableOpacity style={{ flex: 1, width: 30, height: 30 }} onPressOut={() => this.selectItem(index)}>
                                            <Icon
                                                type="SimpleLineIcons"
                                                name="note"
                                                style={{ color: '#000', fontSize: 16, textAlign: "center" }}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flex: 1, width: 30, height: 30 }} onPressOut={() => this.props.deleteItem(index)} >
                                            <Icon
                                                type="SimpleLineIcons"
                                                name="trash"
                                                style={{ color: '#000', fontSize: 16, textAlign: "center" }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </View>
                    ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        // borderBottomWidth: 1,
        paddingTop: 3,
        paddingBottom: 2,
        // borderColor: '#3a8081',
    },
    content_l: { flex: 4 },
    content_R: {
        width: 64,
        marginTop: 35,
        alignContent: "center",
        alignItems: "center",

    },
    inputText: {
        flex: 3,
        borderColor: '#3a8081',
        borderWidth: 1,
        height: 30,
        padding: 2,
        paddingLeft: 5,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 2,
        marginBottom: 2,
    },
    Text: {
        flex: 3,
        height: 30,
        padding: 2,
        paddingLeft: 5,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 2,
        marginBottom: 2,
    },
});

export default Body;