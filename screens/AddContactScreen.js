import React, { useState, useContext } from 'react';
import { Button, View, Text, TextInput,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import { Icon } from 'react-native-elements';

const AddContactScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSave = async () => {
    const newContact = { id: Date.now(), name, phone, email, address };
    const storedContacts = await AsyncStorage.getItem(`contacts_${user.id}`);
    const contacts = storedContacts ? JSON.parse(storedContacts) : [];
    contacts.push(newContact);
    await AsyncStorage.setItem(`contacts_${user.id}`, JSON.stringify(contacts));
    navigation.navigate("Inicio");
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
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    text: {
      marginLeft: 10,
      // ...
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.inputRow}>
          <Icon name="person" size={24} color="#517fa4" />
          <TextInput style={styles.text} placeholder='Nombre' value={name} onChangeText={setName} />
        </View>
        <View style={styles.inputRow}>
          <Icon name="phone" size={24} color="#517fa4" />
          <TextInput style={styles.text} placeholder='Teléfono' value={phone} onChangeText={setPhone} />
        </View>
        <View style={styles.inputRow}>
          <Icon name="email" size={24} color="#517fa4" />
          <TextInput style={styles.text} placeholder='Email' value={email} onChangeText={setEmail} />
        </View>
        <View style={styles.inputRow}>
          <Icon name="home" size={24} color="#517fa4" />
          <TextInput style={styles.text} placeholder='Dirección' value={address} onChangeText={setAddress} />
        </View>
      </View>
      <Button title='Guardar' onPress={handleSave} color={styles.button.backgroundColor} />
    </View>
  );
};

export default AddContactScreen;