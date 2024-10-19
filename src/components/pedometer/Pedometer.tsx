import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { FC, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { usePedometerStore } from '../../state/pedometerStore'
import StepCounter, { parseStepData, startStepCounterUpdate, stopStepCounterUpdate } from '@dongminyu/react-native-step-counter'
import { playTTS } from '../../utils/ttsListners'

const Pedometer:FC<{ message: string, onCross: () => void }> = ({ message, onCross }) => {

  const {stepCount,dailyGoal,addSteps}=usePedometerStore();
  StepCounter.addListener('StepCounter.stepsSensorInfo')
  const startStepCounter=()=>{
      startStepCounterUpdate(new Date(), (data) => {
        const parsedData=parseStepData(data);
        addSteps(parsedData.steps,parsedData.distance)
      })
  }
  const stopStepCounter=()=>{
      stopStepCounterUpdate( )
  }

  useEffect(()=>{
    if(stepCount>=dailyGoal){
        playTTS("You've reached your daily goal. No need to start the counter again today.")
    }
    else{
      startStepCounter()
    }
    return()=>{
      stopStepCounter()
    }
  },[])

  
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.cross} onPress={onCross}>
        <Icon name='close-circle' size={RFValue(20)} color='red' />
    </TouchableOpacity>
    <Image
        source={require('../../assets/images/logo_short.png')}
        style={styles.logo}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      paddingVertical: 10,
      width: '90%',
      justifyContent: 'center',
      backgroundColor: 'white',
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#000',
      shadowOpacity: 0.08,
      elevation: 10,
      shadowRadius: 16,
      borderRadius: 10
  },
  logo: {
      width: 50,
      height: 50,
      alignSelf: 'center',
      marginVertical: 10
  },
  cross: {
      position: 'absolute',
      right: 10,
      top: 10
  }
})


export default Pedometer