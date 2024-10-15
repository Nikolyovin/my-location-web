import { StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'
import emailjs from "emailjs-com"
import { REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, REACT_APP_USER_ID } from "@env"
import { useActions } from '../hooks/action'
import { useAppSelector } from '../hooks/redux'

interface IProps {
  coordinates: number[]
  description: string
}

const ButtonSendEmail: FC<IProps> = ({ coordinates, description }) => {
  const { isShowNotification, isShowNotificationError, isShowLoading } = useActions()
  const { isLoading } = useAppSelector(state => state.app)

  const templateParams = {
    coordinates: `Широта: ${coordinates[0]} Долгота: ${coordinates[1]}`,
    user_email: 'pulya0763@gmail.com',
    description: description
  }

  const sendEmail = () => {
    isShowLoading(true)
    console.log('isLoading1', isLoading);
    
    emailjs.send(
      REACT_APP_SERVICE_ID,
      REACT_APP_TEMPLATE_ID,
      templateParams,
      REACT_APP_USER_ID,
    ).then(
      result => { if (result.status === 200) isShowNotification(true) } ,
      error => isShowNotificationError(true) && isShowNotification(true)
      ,
    )
    isShowLoading('isLoading2', isLoading)
  }

  return (
    <TouchableOpacity  onPress = { sendEmail }>
      <FontAwesome5
        name = { 'envelope-square' }
        size = { 40 }
        color = { 'black' }
      />
    </TouchableOpacity>
  )
}

export default ButtonSendEmail

const styles = StyleSheet.create({
  
})