import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image
} from 'react-native';
import Slider from '@react-native-community/slider';


import { RiskContext, RiskContextProvider } from './context/Storage.js';
import colors from './assets/colors/colors.js';
import endpoints from './assets/endpoint/endpoints.js';

const Portfolio = ({ backgroundStyle }) => {
  const { risks, addRisk } = useContext(RiskContext);
  const [score, setScore] = useState(0)
  const getRiskScore = async () => {
    try {
      const response = await fetch(`${endpoints.baseUrl}${endpoints.riskScore}`);
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
        <Text style={{
          fontSize: 22,
          fontFamily: 'NunitoSans-Bold',
          color: colors.black
        }}>RoboAdvisor</Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={[backgroundStyle, {
            flex: 1,
            padding: 20
          }]}>
          <Image style={{
            height: 64,
            width: 64,
            resizeMode: 'contain',
            marginBottom: 20,
            alignSelf: 'center'
          }}
            source={require('./assets/images/profile.png')} />
          <Text style={{
            fontSize: 16,
            fontFamily: 'NunitoSans-SemiBold',
            color: colors.black
          }}>Risk Score: {score}</Text>
          <View style={{
            paddingVertical: 10,
            elevation: 2,
            borderRadius: 8,
            marginTop:5
          }}>
            <Slider
              style={{ width: '100%', height: 20 }}
              minimumValue={0}
              maximumValue={10}
              minimumTrackTintColor="#A89AD3"
              maximumTrackTintColor="#DDD4FB"
              thumbTintColor={colors.primary}
              onSlidingComplete={(value) => {
                setScore(parseInt(value))
              }}

            />
            <View style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
              <Text style={{
                fontSize: 16,
                fontFamily: 'NunitoSans-Regular',
                color: colors.black
              }}>0</Text>
               <Text style={{
                fontSize: 16,
                fontFamily: 'NunitoSans-Regular',
                color: colors.black
              }}>10</Text>
            </View>
          </View>
          <Text style={{
            fontSize: 16,
            fontFamily: 'NunitoSans-SemiBold',
            color: colors.black,
            marginTop:20
          }}>Your Portfolio</Text>
        </View>
      </ScrollView>
    </>
  )
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? colors.black : colors.white,
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
