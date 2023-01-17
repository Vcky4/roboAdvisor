import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  Animated
} from 'react-native';
import Slider from '@react-native-community/slider';


import { RiskContext, RiskContextProvider } from './context/Storage.js';
import colors from './assets/colors/colors.js';
import endpoints from './assets/endpoint/endpoints.js';
import renderItem from './utill/renderUtill.js';






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
  const [selected, setSelected] = useState(null)
  const bars = []
  if (selected) {
    for (var t = 1; t < 11; t++) {
      if (renderItem(t, selected).value > 0) {
        bars.push(
          <View
            key={t}
            style={{
              width: 30,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Text style={{
              textAlign: 'center',
              fontSize: 14,
              color: colors.black,

            }} >{renderItem(t, selected).symbol}</Text>
            <View style={{
              backgroundColor: colors.secondary,
              height: renderItem(t, selected).value + '%'
            }} />
          </View>
        );
      }
    }
  }

  const rows = []
  if (selected) {
    for (var t = 1; t < 11; t++) {
      rows.push(
        <View
          key={t}
          style={{
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
            borderRadius: 8,
            elevation: 2,
            padding: 10,
            marginTop: 16
          }}>

          <View style={{
            width: '100%',
            backgroundColor: "rgba(221,212,251,0.55)",
          }}>
            <View style={{
              backgroundColor: colors.secondary,
              height: 36,
              width: renderItem(t, selected).value + '%'
            }} />
          </View>
         <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center'
         }}>
         <Text style={{
            fontSize: 16,
            fontFamily: 'NunitoSans-SemiBold',
            color: colors.black,
            marginTop: 5
          }}>{renderItem(t, selected).title}</Text>
          <Text style={{
            fontSize: 16,
            fontFamily: 'NunitoSans-SemiBold',
            color: colors.black,
            marginTop: 5
          }}>{renderItem(t, selected).value / 2}%</Text>
         </View>
        </View>
      );

    }
  }

  useEffect(() => {
    getRiskScore();
  }, []);
  useEffect(() => {
    console.log('risk', risks);
    if (risks.length > 0) {
      setSelected(risks.find((item) => item.riskScore == score.toString()))
    }
  }, [score, risks]);
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
            padding: 20,
            marginBottom:60
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
            marginTop: 5
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
            marginTop: 20
          }}>Your Portfolio</Text>
          <View style={{
            height: 250,
            width: "100%",
            justifyContent: 'space-evenly',
            borderColor: colors.black,
            borderBottomWidth: 1,
            borderStartWidth: 1,
            alignItems: 'flex-end',
            flexDirection: 'row',
            marginTop: 10,
          }}>

            {bars}

          </View>
          <Text style={{
            fontSize: 16,
            fontFamily: 'NunitoSans-SemiBold',
            color: colors.black,
            marginTop: 20
          }}>Break down</Text>
          <View>
            {rows}
          </View>
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
