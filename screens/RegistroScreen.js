import React, { useState, useContext, useEffect } from 'react';
import { View, ToastAndroid,StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const RegistroScreen = ({ navigation }) => {
  const {isLoggedIn} = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

useEffect(() => {
  if (isLoggedIn) {
    navigation.navigate('Inicio');
  }
},[]);
const handleRegister = async () => {
  try {
    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      ToastAndroid.show('Usuario ya existe', ToastAndroid.SHORT);
      return;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show('Contraseña no coincide', ToastAndroid.SHORT);
      return;
    }

    const userId = Math.floor(Math.random() * 1000000); // Generate a random user ID

    const newUser = { id: userId, username, password };
    users.push(newUser);

    await AsyncStorage.setItem('users', JSON.stringify(users));

    // Guardar el usuario en el AuthContext
    // setUser(newUser);

    navigation.navigate('Login');
  } catch (error) {
    console.error(error);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Alinea los elementos al inicio
    alignItems: 'center',
    backgroundColor: '#FFD1DC', // Rosa palo
    padding: 10, // Agrega un poco de padding alrededor
  },
  textContainer: {
    backgroundColor: '#FFFFFF', // Fondo blanco
    padding: 10, // Agrega un poco de padding alrededor
    borderRadius: 10, // Bordes redondeados
    marginBottom: 10, // Margen inferior para separar del botón
    width: '100%', // Ocupa todo el ancho disponible
  },
  text: {
    fontSize: 18, // Tamaño de fuente más grande
  },
  button: {
    backgroundColor: '#EE82EE', // Violeta
    color: '#FFFFFF', // Texto blanco
  },
});

return (
  <View style={styles.container}>
    <Input
      placeholder='Nombre de usuario'
      value={username}
      onChangeText={setUsername}
    />
    <Input
      placeholder='Contraseña'
      value={password}
      secureTextEntry
      onChangeText={setPassword}
    />
    <Input
      placeholder='Confirmar contraseña'
      value={confirmPassword}
      secureTextEntry
      onChangeText={setConfirmPassword}
    />
    <Button title='Registrar' onPress={handleRegister} buttonStyle={{backgroundColor: styles.button.backgroundColor}} />
  </View>
);
};

export default RegistroScreen;