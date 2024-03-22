import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import axios from 'axios';
import Header from '../components/Header';
const Home = () => {
  const [info, setInfo] = React.useState({
    temp: 'loading..',
    description: 'loading..',
    name: 'loading..',
    icon: 'loading..',
  });
  React.useEffect(() => {
    getWeather();
  }, []);

  const MyCity = 'visakhapatnam',
    APIkey = 'f738629a362bfb615e811eeeda4f40a1';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&appid=${APIkey}&units=metric`;

  const getWeather = async () => {
    try {
      const {data} = await axios.get(url);
      setInfo({
        temp: data.main.temp,
        description: data.weather[0].description,
        name: data.name,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      console.log(error.message);
      s;
    }
  };

  return (
    <View>
      <Header />
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: '900',
            marginTop: 20,
            color: '#00aaff',
          }}>
          {info.name}
        </Text>
        <Image
          style={{width: 200, height: 200}}
          source={{uri: `http://openweathermap.org/img/wn/${info.icon}@2x.png`}}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: '900',
            marginTop: 20,
            color: '#00aaff',
            backgroundColor: '#fff',
            padding: 10,
            width: '90%',
            textAlign: 'center',
          }}>
          {info.temp}°C
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '900',
            marginTop: 20,
            color: '#00aaff',
            backgroundColor: '#fff',
            padding: 10,
            width: '90%',
            textAlign: 'center',
          }}>
          {info.description}
        </Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
