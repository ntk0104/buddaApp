import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { colors } from '../../utils'

// export default props => {
//     const { onChange, customStyle } = props
//     console.log("Rendering TextInput with placeholder: " + props.placeholder)

//     const handleOnChange = e => {
//         onChange(e)
//     }

//     return (
//         <TextInput
//             {...props}
//             underlineColorAndroid={'transparent'}
//             style={[styles.textInput, customStyle]}
//             onChangeText={handleOnChange}
//             placeholderTextColor={colors.whiteTransPrimary}
//         />
//     )
// }

export default Input = React.memo((props) => {
    const { onChange, customStyle } = props
    console.log("Rendering TextInput with placeholder: " + props.placeholder)

    const handleOnChange = e => {
        onChange(e)
    }

    return (
        <TextInput
            {...props}
            underlineColorAndroid={'transparent'}
            style={[styles.textInput, customStyle]}
            onChangeText={handleOnChange}
            placeholderTextColor={colors.whiteTransPrimary}
        />
    )
}, (prevProps, newProps) => {
    // only re-render if the props 'children' changed
    return prevProps.placeholder === newProps.placeholder
})

const styles = StyleSheet.create({
    textInput: {
        color: colors.bluePrimary,
        fontSize: 20,
        borderStyle: 'solid',
        borderBottomColor: colors.whiteTransPrimary,
        borderBottomWidth: 1,
    }
})
