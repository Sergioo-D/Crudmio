import React, { useState, useEffect, useContext,useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../context/AuthContext';
import { Button } from 'react-native-elements';


const HomeScreen = ({ navigation }) => {
  const { user,setUser } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);


  const handleLogout = () => {
    // Limpiar el estado del usuario
    setUser(null);

    // Navegar a la pantalla de inicio de sesión
    navigation.navigate('Login');
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="sign-out" size={30} color="#fff" style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  
  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
    });
  }, [navigation]);

 

  useEffect(() => {
    if (user === null) {
      console.log('No hay un usuario logueado');
    } else {
      console.log('Hay un usuario logueado:', user);
    }
  }, [user]);
  useFocusEffect(
    useCallback(() => {
      const fetchContacts = async () => {
        if (user) {
          const storedContacts = await AsyncStorage.getItem(`contacts_${user.id}`);
          const parsedContacts = storedContacts ? JSON.parse(storedContacts) : [];
          setContacts(parsedContacts);
        }
      };
  
      fetchContacts();
    }, [user]) // Dependencia cambiada a 'user' en lugar de 'user.id'
  );

  const handleAddContact = () => {
    navigation.navigate('Agregar Contacto');
  };

  const handleContactPress = (contact) => {
    navigation.navigate('Detalles del Contacto', { contact });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleContactPress(item)}>
            <Text style={styles.contactName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Icon name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD1DC', // Rosa palo
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: '#EE82EE', // Violeta
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'left',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 40,
    marginLeft: 10,
    color: '#000'
  },
});

export default HomeScreen;