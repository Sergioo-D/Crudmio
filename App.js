import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, AddContactScreen, ContactDetailScreen, EditContactScreen, LoginScreen, RegistroScreen } from './screens';
import { AuthProvider } from './context/AuthContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
    <NavigationContainer>
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#800080', // Lila
      },
      headerTintColor: '#fff', // Cambia esto al color que desees para el texto y los iconos
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Registro" component={RegistroScreen} />
    <Stack.Screen name="Inicio" component={HomeScreen} />
    <Stack.Screen name="Agregar Contacto" component={AddContactScreen} />
    <Stack.Screen name="Detalles del Contacto" component={ContactDetailScreen} />
    <Stack.Screen name="Editar Contacto" component={EditContactScreen} />
  </Stack.Navigator>
</NavigationContainer>
    </AuthProvider>
  );
};

export default App;