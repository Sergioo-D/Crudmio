import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);

    const loadContacts = async () => {
        try {
            const value = await AsyncStorage.getItem('@contacts');
            if(value !== null) {
                setContacts(JSON.parse(value));
            }
        } catch(e) {
            // error reading value
            console.log(e);
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadContacts();
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id ? item.id.toString() : ''}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Detalles del Contacto', { contact: item })}>
                        <Text style={{ fontSize: 35 }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('Agregar Contacto')}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
  },
});

export default HomeScreen;