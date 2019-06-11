import React, { Component } from 'react'
import {
        View,
        Text
} from 'react-native';
import styles from './styles'

class Head extends Component{

    constructor(props){
        super(props)
    }

    render() {
        alert("asdf")
        return(
            <View>
                <Text>Head</Text>
            </View>
        );
    }
}

export default Head