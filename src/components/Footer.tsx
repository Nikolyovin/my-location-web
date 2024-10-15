import { Alert, AsyncStorage, Dimensions, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useActions } from '../hooks/action'
import { useAppSelector } from '../hooks/redux'
import { REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, REACT_APP_USER_ID } from '@env'
import emailjs from 'emailjs-com'
import { ILokations } from '../models/models'
import { FontAwesome5 } from '@expo/vector-icons'

const Footer: FC = () => {
    const { iShowModal, setLocations, isShowLoading, isShowNotification, isShowNotificationError, setSendError } =
        useActions()
    const { locations, isLoading } = useAppSelector(state => state.app)
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)

    const onShowModal: () => void = () => {
        iShowModal(true)
    }

    // const removeAll: () => void = () => {
    //     setLocations([])
    // }

    //for send email
    const templateParams = {
        body: locations
            ?.map(
                item =>
                    `Широта, Долгота - ${item.coordinates[0]} ${item.coordinates[1]}; Описание: ${item.description};\n`
            )
            .join(''),
        user_email: 'av.zhulev@gmail.com'
    }

    const sendEmail: () => void = () => {
        if (!locations.length) {
            return Alert.alert('Ошибка отправки!', `Вы не можете отправить пустое сообщение!`)
        }

        isShowLoading(true)
        emailjs.send(REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, templateParams, REACT_APP_USER_ID).then(
            result => {
                if (result.status === 200) isShowLoading(false) && isShowNotification(true)
            },
            error => {
                console.log(error)
                setSendError(error.text)
                isShowLoading(false)
                isShowNotificationError(true)
                isShowNotification(true)
            }
        )
    }

    //for confirm
    const onRemoveAll: () => void = () => {
        Alert.alert('Удалить всё?', `Вы действительно хотите удалить всё? `, [
            {
                text: 'Отменить',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'Да',
                onPress: () => setLocations([]),
                style: 'default'
            }
        ])
    }

    //for hidden footer
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true) // or some other action
        })
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false) // or some other action
        })

        return () => {
            keyboardDidHideListener.remove()
            keyboardDidShowListener.remove()
        }
    }, [])

    if (isKeyboardVisible) return <></>

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={sendEmail}>
                <Text style={styles.buttonAddText}>Отправить всё</Text>
            </TouchableOpacity>
            <View style={styles.buttonAddWrap}>
                <TouchableOpacity style={styles.buttonAdd} onPress={onShowModal}>
                    <FontAwesome5 name={'plus'} size={40} color={'white'} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={onRemoveAll}>
                <Text style={styles.buttonAddText}>Удалить всё</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Footer

const screenWidth = Dimensions.get('window').width / 2

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        width: '100%',
        height: 100,
        backgroundColor: '#efefef',
        marginTop: 20
    },
    button: {
        backgroundColor: '#00c68f',
        // backgroundColor: 'red',
        // width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 120
    },
    buttonAddWrap: {
        position: 'absolute',
        left: screenWidth - 50,
        top: -25,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        alignSelf: 'flex-start',
        // borderWidth: 1,
        // borderColor: 'black',
        backgroundColor: '#efefef'
    },
    buttonAdd: {
        backgroundColor: '#00c68f',
        borderRadius: 50,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonAddText: {
        color: 'white'
    }
})
