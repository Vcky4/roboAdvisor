import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { RiskContext, RiskContextProvider } from './context/Storage.js';

const Portfolio = ({ backgroundStyle }) => {
  const { risks, addRisk } = useContext(RiskContext);
  const getRiskScore = async () => {
    try {
      const response = await fetch('https://robo-advisor-one.vercel.app/api/risk-score');
      const json = await response.json();
      // setData(json.riskScore);
      addRisk(json.riskScore);
      // console.log(json.riskScore);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getRiskScore();
  }, []);
  useEffect(() => {
    console.log('risk', risks);
  }, [risks]);
  return (
    <>
      <View
        style={[backgroundStyle, { padding: 20 }]}>
        <Text >RoboAdvisor</Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={[backgroundStyle, {
            flex: 1,
          }]}>

        </View>
      </ScrollView>
    </>
  )
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#0000' : '#fff',
  };

  return (
    <RiskContextProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Portfolio backgroundStyle={backgroundStyle} />
      </SafeAreaView>
    </RiskContextProvider>
  );
}

const styles = StyleSheet.create({

});

export default App;
