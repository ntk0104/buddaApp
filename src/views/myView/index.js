import React, { Component } from 'react'
import {
        View,
        Text
} from 'react-native';

class MyView extends Component{

    constructor(props){
        super(props)
    }

    render() {
        return(
            <View>
                <Text>My View</Text>
            </View>
        );
    }
}

export default MyView