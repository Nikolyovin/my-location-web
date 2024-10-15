import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

import { FontAwesome5 } from '@expo/vector-icons'

const NotificationSuccess: FC = () => {
    return (
        <>
            <FontAwesome5
                name={'check-circle'}
                size={40}
                color={'#00c68f'}
            />
            <Text style={styles.text}>Сообщение успешно отправленно на почтовый ящик!</Text>
        </>
    )
}

export default NotificationSuccess

const styles = StyleSheet.create({
    text: {
        marginTop: 15,
        marginBottom: 5,
        fontSize: 20,
        textAlign: 'center',
        // fontFamily: 'Cochin'
    },

})