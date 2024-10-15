import { Modal, StyleSheet, View, Text, TouchableOpacity, TextInput, ActivityIndicator, AsyncStorage, Alert } from 'react-native'
import React, { FC, useState, useEffect } from 'react'
import * as Location from 'expo-location';
import { useAppSelector } from '../hooks/redux';
import { useActions } from '../hooks/action';
import ModalButtons from './ModalButtons';

const ModalAdd: FC = () => {
  const { iSModal, locations } = useAppSelector(state => state.app)
  const { iShowModal, addLocation, setSendError } = useActions()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [description, onChangeDescription] = useState<string>('')
  const [isEmptyFields, setIsEmptyFields] = useState<boolean>(false)

  const save = async () => {
    try {
      await AsyncStorage.setItem('locations', JSON.stringify(locations))
    } catch (err: any) {
      Alert.alert(err.message)
      console.log('err.message', err.message)
    }
  }

  useEffect(() => {
    save()
  }, [locations])

  // for getting locations 
  const [coordinates, setСoordinates] = useState<number[] | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onButtonGetLocation = () => {

    (async () => {
      setIsLoading(true)
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      const coordinates = [location.coords.latitude, location.coords.longitude]
      setСoordinates(coordinates)
      setIsLoading(false)
    })()
  }

  let text = 'Waiting..'
  if (errorMsg) {
    text = errorMsg;
  } else if (coordinates) {
    text = JSON.stringify(coordinates)
  }

  const cleanModal = () => {
    iShowModal(false)
    setСoordinates(null)
    onChangeDescription('')
    setIsEmptyFields(false)
    setSendError('')
    setIsLoading(false)
  }

  const onPressAdd = () => {
    const id = Date.now().toString()
    coordinates && description
      ? addLocation({ coordinates, description, id }) && cleanModal()
      : setIsEmptyFields(true)
  }

  const onPressClose = () => {
    cleanModal()
  }


  return (
    <View style={styles.centeredView} >
      <Modal
        animationType="fade"
        transparent={true}
        visible={iSModal}
      // onShow={onShow}
      >
        <View style={styles.centeredView} >
          <View style={styles.modalView}>
            <Text style={styles.textInput}>Контрольная точка</Text>
            {isEmptyFields && <Text style={styles.warning}>Заполните все поля!</Text>}
            {
              !coordinates &&
              <TouchableOpacity style={styles.buttonGetLocation} onPress={onButtonGetLocation}>
                {!isLoading
                  ? <Text style={styles.textButton}>Получить координаты</Text>
                  : <ActivityIndicator size="small" color="white" />
                }
              </TouchableOpacity>
            }
            {
              coordinates &&
              <>
                <Text style={styles.text}>Широта: {coordinates[0]}</Text>
                <Text style={styles.text}>Долгота: {coordinates[1]}</Text>
              </>
            }
            {/* <Text style={styles.textInput}>Описание:</Text> */}
            <TextInput style={styles.input}
              onChangeText={onChangeDescription}
              numberOfLines={2}
              placeholder='Описание'
            />
            <ModalButtons onPressAdd={onPressAdd} onPressClose={onPressClose} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ModalAdd

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    // width: '100%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: '55%',
    left: '10%',
    paddingHorizontal: 15,
  },
  modalView: {
    width: '100%',
    maxHeight: 250,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonGetLocation: {
    marginTop: 10,
    backgroundColor: "#00c68f",
    padding: 9.5,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 200,
  },
  textButton: {
    color: 'white'
  },
  text: {

  },
  textInput: {
    margin: 10,
    fontSize: 22
  },
  warning: {
    fontSize: 16,
    color: 'red'
  },
  input: {
    paddingHorizontal: 10,
    marginVertical: 10,
    width: 200,
    borderWidth: 2,
    borderColor: '#00c68f',
    borderRadius: 10,
    justifyContent: 'center',
  },


  // buttonClose: {
  //   width: 20,
  //   position: 'absolute',
  //   right: 15,
  //   top: 5
  // },
})