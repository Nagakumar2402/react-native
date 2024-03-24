import {Button, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';

const Search = props => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    const trimmedCity = city.trim();
    props.navigation.navigate('Home', {city: trimmedCity});
    setCity('');
  };

  return (
    <View>
      <Header />
      <View style={{paddingHorizontal: 5}}>
        <TextInput
          style={styles.input}
          placeholder="City Name"
          value={city}
          onChangeText={text => setCity(text)}
        />
        <Button style={styles.btn} title="Search" onPress={handleSearch} />
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
  },
});
