import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'

interface IProps {
    onPressClose: () => void
    onPressAdd: () => void
}

const ModalButtons: FC<IProps> = ({ onPressAdd, onPressClose }) => {
    return (
        <View style = { styles.footerModal }>
            <TouchableOpacity style = { styles.buttonAdd } onPress = { onPressAdd }>
                <Text style = { styles.textButton }>Добавить</Text>
            </TouchableOpacity>
            <TouchableOpacity style = { styles.buttonClose } onPress = { onPressClose }>
                <Text style = { styles.text }>Отменить</Text>
            </TouchableOpacity>
        </View>
  )
}

export default ModalButtons

const styles = StyleSheet.create({
    footerModal: {
        flexDirection: 'row',
        paddingBottom: 20,
        justifyContent: 'space-between'
    },
    textButton: {
        color: 'white'
    },
    text: {
      
    },
    buttonAdd: {
        backgroundColor: "#00c68f",
        marginTop: 10,
        padding: 9.5,
        borderRadius: 15,
        marginRight: 5,
      },
      buttonClose: {
        borderColor: "#00c68f",
        borderWidth: 2,
        marginTop: 10,
        padding: 9.5,
        borderRadius: 15,
      },
})