import React, { Component } from 'react'
import {
        View,
        Text
} from 'react-native';
import styles from './styles'

class Reset extends Component{

    constructor(props){
        super(props)
    }

    render() {
        return(
            <View>
                <Text>Reset</Text>
            </View>
        );
    }
}

export default Reset