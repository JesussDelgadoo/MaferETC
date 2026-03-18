import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexto/AuthContext';

export default function HomeScreen() {
    // Extraemos la función logout de nuestro contexto global
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Inicio de sesión exitoso!</Text>
            
            <TouchableOpacity style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#f5f6fa'
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 30,
        color: '#333'
    },
    button: { 
        backgroundColor: '#D32F2F', 
        paddingVertical: 15, 
        paddingHorizontal: 30,
        borderRadius: 10,
        elevation: 3
    },
    buttonText: { 
        color: 'white', 
        fontWeight: 'bold',
        fontSize: 16
    }
});