import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useRef, useEffect } from 'react'
import Card from './Card'
import { useAppSelector } from '../hooks/redux'
import { ScrollView } from 'react-native-gesture-handler'
import IsLoading from './IsLoading'
import { useActions } from '../hooks/action'

const Cards: FC = () => {
    const { locations, isLoading } = useAppSelector(state => state.app)
    const { setLocations } = useActions()

    const requestPayments: () => void = async () => {
        try {
            const locations: string | null = await AsyncStorage.getItem('locations')
            setLocations(JSON.parse(locations || ''))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        requestPayments()
    }, [])


    const scrollRef = useRef(null)                        //needed to resolve the conflict with reanimated and ScrollView
    console.log('isLoading1', isLoading);

    if (isLoading) return <IsLoading />

    // return <IsLoading />
    console.log('isLoading2', isLoading);
    return (
        <ScrollView ref={scrollRef} style={styles.cardsWrap}>
            {/* <TouchableOpacity style={styles.buttonCancel}>
                <Text style={styles.text}>Отменить</Text>
            </TouchableOpacity> */}
            {locations?.map(item => (
                <Card
                    key={item.id}
                    id={item.id}
                    coordinates={item.coordinates}
                    description={item.description}
                />)
            )}


        </ScrollView>
    )
}

export default Cards

const styles = StyleSheet.create({
    // buttonCancel: {

    // },
    // text: {
    //     color: '#00c68f',
    // },
    cardsWrap: {
        flex: 1,
        paddingTop: 15,
        width: '100%',
    },
    cardsList: {

    }
})