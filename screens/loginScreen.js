import React, { useState, useContext,useEffect } from 'react';
import { Button, View, Text, TextInput,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const { user,setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
  
      const user = users.find(user => user.username === username && user.password === password);
  
      if (user) {
        setUser({ id: user.id, username: user.username });
        navigation.navigate('Inicio');
      } else {
        ToastAndroid.show('Usuario o contraseña incorrectos', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Esta función se ejecutará cada vez que la pantalla gane el foco
      setPassword('');
      return () => {};
    }, [])
  );

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
      <View style={styles.textContainer}>
        <Text style={styles.text}>Usuario</Text>
        <TextInput placeholder='Nombre de usuario' value={username} onChangeText={setUsername} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Contraseña</Text>
        <TextInput placeholder='Contraseña' value={password} onChangeText={setPassword} secureTextEntry />
      </View>
      <Button title='Iniciar sesión' onPress={handleLogin} color={styles.button.backgroundColor} />
      <Button title='Registrarse' onPress={() => navigation.navigate('Registro')} color={styles.button.backgroundColor} />
    </View>
  );
};

export default LoginScreen;