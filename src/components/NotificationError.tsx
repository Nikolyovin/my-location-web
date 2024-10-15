import { StyleSheet, Text } from 'react-native'
import React, { FC } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

interface IProps {
    emailError: string
}

const NotificationError: FC<IProps> = ({ emailError }) => {
    return (
        <>
            <FontAwesome5
                name={'exclamation-circle'}
                size={40}
                color={'red'}
            />
            <Text style={styles.text}>ОШИБКА!!!</Text>
            <Text style={styles.text}>{emailError}</Text>
        </>
    )
}

export default NotificationError

const styles = StyleSheet.create({

    text: {
        fontSize: 20,
        // fontFamily: 'Cochin',
        color: 'red',
        marginTop: 15,
        marginBottom: 5,
    },

})