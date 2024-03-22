import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
const Search = () => {
  const [city, setCity] = useState('');
  console.log(city);

  return (
    <View>
      <Header />
      <View style={{paddingHorizontal: 5}}>
        <TextInput
          style={styles.input}
          label="city name"
          placeholder="City Name"
          value={city}
          onChangeText={text => setCity(text)}
        />

        <Button style={styles.btn} title="search" onPress={{}} />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 2,
    marginTop: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 20,
    textTransform: 'capitalize',
  },
});
