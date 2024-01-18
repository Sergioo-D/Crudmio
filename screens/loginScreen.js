import React, { useState } from 'react';
import { View,Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ route,navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');
  
      if (storedUsername !== null && storedPassword !== null) {
        if (username === storedUsername && password === storedPassword) {
          // El usuario está registrado, puedes navegar a la pantalla principal
          navigation.navigate('Inicio');
        } else {
          // Los datos introducidos no coinciden con los datos registrados
          Alert.alert('Error', 'Nombre de usuario o contraseña incorrectos');
        }
      } else {
        // No hay datos de usuario en AsyncStorage
        Alert.alert('Error', 'No hay datos de usuario registrados');
      }
    } catch (error) {
      // Error al recuperar los datos de AsyncStorage
      console.error(error);
    }
  };

  return (
    <View>
      <Input
        placeholder='Nombre Usuario'
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder='Password'
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title='Login' onPress={handleLogin} />
      <Button title = 'Registro' onPress={() => navigation.navigate('Registro')} />
    </View>
  );
};

export default LoginScreen;