import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button,StyleSheet,TouchableOpacity} from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { Icon } from 'react-native-elements';

const ContactDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);
  const [contact, setContact] = useState(route.params.contact);

  const handleEdit = () => {
    navigation.navigate('Editar Contacto', { contact });
  };

  const handleDelete = async () => {
    const storedContacts = await AsyncStorage.getItem(`contacts_${user.id}`);
    const contacts = storedContacts ? JSON.parse(storedContacts) : [];
    const newContacts = contacts.filter(c => c.id !== contact.id);
    await AsyncStorage.setItem(`contacts_${user.id}`, JSON.stringify(newContacts));
    navigation.goBack();
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchContact = async () => {
        const storedContacts = await AsyncStorage.getItem(`contacts_${user.id}`);
        const contacts = storedContacts ? JSON.parse(storedContacts) : [];
        const updatedContact = contacts.find(c => c.id === contact.id);
  
        if (updatedContact) {
          setContact(updatedContact);
        }
      };
  
      fetchContact();
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
      marginBottom: 15
    },
    button: {
      backgroundColor: '#EE82EE', // Violeta
      color: '#FFFFFF', // Texto blanco
      width: '20%', // Ocupa todo el ancho disponible
      height: 30, // Altura del botón
      borderRadius: 10, // Bordes redondeados
      
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'flex-start', // Alinea los elementos al inicio de la fila
      marginBottom: 10,
    },
    buttond: {
      backgroundColor: '#EE82EE', // Violeta
      width: '20%', // Ocupa todo el ancho disponible
      height: 30, // Altura del botón
      justifyContent: 'center', // Centra el icono verticalmente
      alignItems: 'center', // Centra el icono horizontalmente
      marginBottom: 10, // Margen inferior para separar del botón
      marginTop: 10, // Margen inferior para separar del botón
      borderRadius: 10, // Bordes redondeados
      
    },
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.inputRow}>
          <Icon name="person" size={24} color="#517fa4" style={{marginRight : 10}} />
          <Text style={styles.text}>Nombre: {contact.name}</Text>
        </View>
        <View style={styles.inputRow}>
          <Icon name="phone" size={24} color="#517fa4"style={{marginRight : 10}} />
          <Text style={styles.text}>Teléfono: {contact.phone}</Text>
        </View>
        <View style={styles.inputRow}>
          <Icon name="mail" size={24} color="#517fa4"style={{marginRight : 10}} />
          <Text style={styles.text}>Email: {contact.email}</Text>
        </View>
        <View style={styles.inputRow}>
          <Icon name="home" size={24} color="#517fa4"style={{marginRight : 10}} />
          <Text style={styles.text}>Dirección: {contact.address}</Text>
        </View>
      </View>
        <Button title='Editar' onPress={handleEdit} color={styles.button.backgroundColor} />
        <TouchableOpacity style={styles.buttond} onPress={handleDelete}>
        <Icon name="delete" size={24} color="#FFFFFF" />
        </TouchableOpacity>
    </View>
  );
};

export default ContactDetailScreen;