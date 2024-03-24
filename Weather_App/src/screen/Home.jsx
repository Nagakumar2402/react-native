import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import {API_KEY} from '@env';

const Home = props => {
  const [info, setInfo] = useState({
    temp: 'loading..',
    description: 'loading..',
    name: 'loading..',
    icon: 'loading..',
    country: 'loading..',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const {city} = props.route.params;
    fetchWeather(city);
  }, [props.route.params.city]); // Trigger fetchWeather when city changes

  const fetchWeather = async city => {
    const APIkey = API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;
    try {
      const {data} = await axios.get(url);
      setInfo({
        temp: data.main.temp,
        description: data.weather[0].description,
        name: data.name,
        icon: data.weather[0].icon,
        country: data.sys.country,
      });
      setError(null);
    } catch (error) {
      console.log(error.message);
      if (error.response && error.response.status === 404) {
        setError('City not found');
      } else if (error.message === 'Network Error') {
        setError('Network Error');
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      {error ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{
              width: 200,
              height: 200,
              marginBottom: 5,
              borderRadius: 16 / 3,
            }}
            source={{
              uri: 'https://cdni.iconscout.com/illustration/premium/thumb/not-found-7621845-6166999.png',
            }}
          />
          <Text style={{fontSize: 20, fontWeight: '900', color: '#00aaff'}}>
            {error}
          </Text>
        </View>
      ) : (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: '900',
              marginTop: 20,
              color: '#00aaff',
              backgroundColor: '#fff',
            }}>
            {info.name}
          </Text>
          <Image
            style={{width: 200, height: 200}}
            source={{
              uri: `http://openweathermap.org/img/wn/${info.icon}@2x.png`,
            }}
          />
          <Text
            style={{
              fontSize: 30,
              fontWeight: '900',
              marginTop: 10,
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
              marginTop: 5,
              color: '#00aaff',
              backgroundColor: '#fff',
              padding: 10,
              width: '70%',
              textAlign: 'center',
            }}>
            {info.description}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '900',
              marginTop: 5,
              color: '#00aaff',
              backgroundColor: '#fff',
              padding: 10,
              width: '70%',
              textAlign: 'center',
            }}>
            {info.country}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Home;
