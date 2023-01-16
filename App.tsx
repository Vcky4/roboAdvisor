/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// type Movie = {
//   id: string;
//   title: string;
//   releaseYear: string;
// };


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState<[]>([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#0000' : '#fff',
  };
  const getRiskScore = async () => {
    try {
      const response = await fetch('https://robo-advisor-one.vercel.app/api/risk-score');
      const json = await response.json();
      setData(json.riskScore);
      console.log(json.riskScore);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getRiskScore();
  }, []);
  return (
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
  );
}

const styles = StyleSheet.create({

});

export default App;
