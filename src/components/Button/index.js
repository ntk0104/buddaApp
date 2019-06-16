import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { colors } from '../../utils'

export default Button = React.memo((props) => {
    const { children, onPress, btnStyle, txtStyle } = props
    console.log("Reder Button_Component with children props: " + children)

    return (
        <TouchableOpacity
            {...props}
            onPress={onPress}
            style={[styles.buttonWrapper, btnStyle]}
        >
            <Text style={[styles.text, txtStyle]}>{children}</Text>
        </TouchableOpacity>
    )
}, (prevProps, newProps) => {
    // only re-render if the props 'children' changed
    return prevProps.children === newProps.children
})

const styles = StyleSheet.create({
    buttonWrapper: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.whitePrimary,
        marginHorizontal: 35,
    },
    text: {
        fontSize: 18,
    }
})
