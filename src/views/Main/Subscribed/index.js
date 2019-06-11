import React, { Component } from 'react'
import {
        View,
        Text
} from 'react-native';
import styles from './styles'

class Subscribed extends Component{

    constructor(props){
        super(props)
    }

    render() {
        return(
            <View>
                <Text>Subscribed</Text>
            </View>
        );
    }
}

export default Subscribed