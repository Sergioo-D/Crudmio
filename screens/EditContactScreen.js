import React, { useState, useEffect, useContext } from 'react';
import { Button, View, TextInput,Text,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { Icon } from 'react-native-elements';

const EditContactScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { contact } = route.params;

  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);
  const [address, setAddress] = useState(contact.address);

  useEffect(() => {
    setName(contact.name);
    setPhone(contact.phone);
    setEmail(contact.email);
    setAddress(contact.address);
  }, [contact]);

  const handleSave = async () => {
    const updatedContact = { ...contact, name, phone, email, address };
    const storedContacts = await AsyncStorage.getItem(`contacts_${user.id}`);
    const contacts = storedContacts ? JSON.parse(storedContacts) : [];
    const contactIndex = contacts.findIndex(c => c.id === contact.id);
    contacts[contactIndex] = updatedContact;
    await AsyncStorage.setItem(`contacts_${user.id}`, JSON.stringify(contacts));
    navigation.goBack();
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
      alignItems: 'center', // Alinea los elementos al centro de la fila
      marginBottom: 10,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.inputRow}>
          <Icon name="person" size={24} color="#517fa4" style={{marginRight : 10}} />
          <Text style={styles.text}>Nombre:</Text>
          <TextInput value={name} onChangeText={setName} />
        </View>
  
        <View style={styles.inputRow}>
          <Icon name="phone" size={24} color="#517fa4" style={{marginRight : 10}} />
          <Text style={styles.text}>Teléfono:</Text>
          <TextInput value={phone} onChangeText={setPhone} />
        </View>
  
        <View style={styles.inputRow}>
          <Icon name="mail" size={24} color="#517fa4" style={{marginRight : 10}} />
          <Text style={styles.text}>Email:</Text>
          <TextInput value={email} onChangeText={setEmail} />
        </View>
  
        <View style={styles.inputRow}>
          <Icon name="home" size={24} color="#517fa4" style={{marginRight : 10}} />
          <Text style={styles.text}>Dirección:</Text>
          <TextInput value={address} onChangeText={setAddress} />
        </View>
      </View>
  
      <Button title='Guardar' onPress={handleSave} color={styles.button.backgroundColor} />
    </View>
  );
};

export default EditContactScreen;