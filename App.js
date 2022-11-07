import React,  {useRef, useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Animated, Easing, Pressable } from 'react-native';

const Triangle1 = (props) => {  
  return(   
    <Animated.View style={[styles.triangle, 
                          {top: props.Top, borderBottomColor: props.Color, transform: [{ rotate: props.Rotate }]}]}>      
    </Animated.View>
  )};
const Triangle2 = (props) => {  
  return(   
    <Animated.View style={[styles.triangle, 
                          {top: props.Top, borderBottomColor: props.Color, transform: [{ scale: props.Scale }]}]}>      
    </Animated.View>
  )};


export default function App() {
  const animated1Top = useRef(new Animated.Value(10)).current;
  const animated2Top = useRef(new Animated.Value(10)).current;
  const animated3Top = useRef(new Animated.Value(10)).current;
  const animated4Top = useRef(new Animated.Value(10)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  const fadeInAndOut = () => {
    Animated.sequence([
      Animated.timing(animated1Top, {
      toValue: 150,
      duration: 2000,
    }),
      Animated.timing(animated1Top, {
      toValue: 10,
      duration: 2000,
    }),
    ]).start();
  };

  const colorTransit = () =>{
    Animated.sequence([
      Animated.timing(animated2Top, {
      easing: Easing.bounce,
      toValue: 150,
      duration: 2000,
    }),
      Animated.timing(animated2Top, {
      toValue: 10,
      duration: 2000,
    }),
    ]).start();
  }

  const rotateAndBack = () =>{
    Animated.sequence([
      Animated.timing(animated3Top, {
      easing: Easing.bounce,
      toValue: 150,
      duration: 2000,
    }),
      Animated.timing(rotation, {
      toValue: 1,
      duration: 1000,
    }),
      Animated.timing(animated3Top, {
      toValue: 10,
      duration: 2000,
    }),
    ]).start();
  }
  const scaleUp = () =>{
    Animated.sequence([
     Animated.timing(animated4Top, {
      easing: Easing.bounce,
      toValue: 150,
      duration: 2000,
    }), 
    Animated.timing(scale, {
      toValue: 1,
      duration: 1000,
    }),
      Animated.timing(scale, {
      toValue: 0,
      duration: 1000,
    }),
      Animated.timing(animated4Top, {
      toValue: 10,
      duration: 2000,
    }),
    ]).start();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Triangle1
         Top={animated1Top}                
         Color="yellow"/>
      <Triangle1
         Top={animated2Top}                
         Color={animated2Top.interpolate({inputRange: [0, 100], outputRange: ["yellow", "pink"] })}/>
      <Triangle1
         Top={animated3Top}                
         Color= {animated3Top.interpolate({inputRange: [0, 100], outputRange: ["yellow", "lightgreen"] })}
         Rotate = {rotation.interpolate({inputRange:[0,1], outputRange:['0deg','360deg']})}/>
      <Triangle2
         Top={animated4Top}  
         Color="yellow"              
         Scale = {scale.interpolate({inputRange:[0,1], outputRange:[1,3]})}/>

      <View style={styles.btns}>
      /* The triangle will come down and back up */
        <Pressable style={styles.btn} onPressIn={fadeInAndOut}>
          <Text style={styles.text}>Fade In&Out</Text>
        </Pressable>
      /* The triangle will come down buncing alone with the color changes from yellow to pink */
        <Pressable style={styles.btn} onPressIn={colorTransit}>
          <Text style={styles.text}>Color Transit</Text>
        </Pressable>
      /* The triangle with come up with color changed and rotate 360 degrees clockwise, and then come back up */
        <Pressable style={styles.btn} onPressIn={rotateAndBack}>
          <Text style={styles.text}>Rotate Clockwise!</Text>
        </Pressable>
      /* The triangle will come down bouncing and scale up fro 3 times of its original size */
        <Pressable style={styles.btn} onPressIn={scaleUp}>
          <Text style={styles.text}>Scale Up!</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexdirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btns:{
    position: 'relative',

  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'lightpink',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
  triangle: {
    position: 'absolute',
    width: 100,
    right: 120,
    backgroundColor: 'transparent',
    borderStyle: "solid",
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "yellow",
  }
});