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

import { RiskContext } from './context/Storage.js';
import { RiskContextProvider } from './context/Storage.js';



function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const { risks, addRisk } = useContext(RiskContext);
  // const [data, setData] = useState([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#0000' : '#fff',
  };
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
    <RiskContextProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? '#0000' : '#fff',
            }}>

          </View>
        </ScrollView>
      </SafeAreaView>
    </RiskContextProvider>
  );
}

const styles = StyleSheet.create({

});

export default App;
