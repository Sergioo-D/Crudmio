import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistroScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = async () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Por favor, introduce un usuario y una contraseña');
    } else {
      try {
        // Verificar si el nombre de usuario ya existe en AsyncStorage
        const storedUsername = await AsyncStorage.getItem('username');
        
        if (storedUsername !== null && storedUsername === username) {
          // El nombre de usuario ya existe
          Alert.alert('Error', 'El nombre de usuario ya está en uso');
        } else {
          // Guardar los datos del usuario en AsyncStorage
          await AsyncStorage.setItem('userID', 'userID');
          await AsyncStorage.setItem('username', username);
          await AsyncStorage.setItem('password', password);
          
          Alert.alert('Éxito', 'Usuario registrado con éxito');
          navigation.navigate('Login');
        }
      } catch (error) {
        // Error al guardar los datos en AsyncStorage
        console.error(error);
      }
    }
  };

  return (
    <View>
      <Icon name="user" size={30} color="#900"/> 
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <Icon name="lock" size={30} color="#900"/>
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrar" onPress={onRegister} />
    </View>
  );
};

export default RegistroScreen;