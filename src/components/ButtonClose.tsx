import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import iconClose from '../../assets/close.png'

const ButtonClose = () => {
    return (
        <View>
            <TouchableOpacity style={styles.buttonDelete}  >
                <Image
                    style={styles.buttonDeleteIcon}
                    source={iconClose}
                />
            </TouchableOpacity>
        </View>
    )
}

export default ButtonClose

const styles = StyleSheet.create({
    buttonDelete: {
        width: 20,
    },
    buttonDeleteIcon: {
        width: 30,
        height: 30
    }
})