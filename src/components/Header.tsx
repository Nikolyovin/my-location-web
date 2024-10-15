import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { useActions } from '../hooks/action'
import { useAppSelector } from '../hooks/redux'

const Header: () => void = () => {
    const { isShowEditMode } = useActions()
    const { isEditMode } = useAppSelector(state => state.app)

    const onPress: () => void = () => {
        isShowEditMode(false)
    }

    return (
        <>
            <Text style={styles.title}>Список координат:</Text>
            {isEditMode &&
                <TouchableOpacity style={styles.buttonCancel} onPress={onPress}>
                    <Text style={styles.text}>Отменить</Text>
                </TouchableOpacity>
            }
        </>
    )
}

export default Header

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        paddingTop: 50
    },
    buttonCancel: {
        alignSelf: 'flex-end',
        paddingRight: 25,
    },
    text: {
        // textAlign: 'left',
        // color: '#00c68f',
        color: 'red',
        fontSize: 17,
    },
})