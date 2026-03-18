import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, View, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useAuth } from '../contexto/AuthContext';

export default function RegistroScreen({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [cargando, setCargando] = useState(false);

    // Extraemos la función register de nuestro contexto
    const { register } = useAuth();

    const handleRegistro = async () => {
        // 1. Validar que no haya campos vacíos
        if (!nombre || !correo || !password || !confirmarPassword) {
            Alert.alert('Error', 'Por favor completa todos los campos.');
            return;
        }

        // 2. Validar que las contraseñas coincidan
        if (password !== confirmarPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        setCargando(true);
        
        // 3. Ejecutar la función de registro enviando los datos a la API
        const result = await register(nombre, correo, password);
        
        setCargando(false);

        if (result.success) {
            Alert.alert(
                '¡Registro Exitoso!', 
                'Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.',
                [{ text: 'Ir al Login', onPress: () => navigation.navigate('Login') }]
            );
        } else {
            Alert.alert('Error', result.error || 'Hubo un problema al registrar la cuenta.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
        
            <View style={styles.headerSection}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                
                <View style={styles.logoCircle}>
                    <AntDesign name="adduser" size={35} color="#1976D2" /> 
                </View>
                <Text style={styles.headerTitle}>Crear Cuenta</Text>
                <Text style={styles.subTitleApp}>Únete a la plataforma</Text>
            </View>
            
            <View style={styles.recuadro}>
                <Text style={styles.inputLabel}>Usuario (Nombre)</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder='Ej. Juan Pérez' 
                    value={nombre} 
                    onChangeText={setNombre} 
                />

                <Text style={styles.inputLabel}>Correo electrónico</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder='ejemplo@correo.com' 
                    keyboardType='email-address' 
                    autoCapitalize='none' 
                    value={correo} 
                    onChangeText={setCorreo} 
                />

                <Text style={styles.inputLabel}>Contraseña</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="********" 
                    secureTextEntry={true} 
                    value={password} 
                    onChangeText={setPassword} 
                />

                <Text style={styles.inputLabel}>Confirmar contraseña</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="********" 
                    secureTextEntry={true} 
                    value={confirmarPassword} 
                    onChangeText={setConfirmarPassword} 
                />
                
                <TouchableOpacity 
                    style={styles.registerButton} 
                    onPress={handleRegistro}
                    disabled={cargando}
                >
                    {cargando ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.registerButtonText}>Registrarse</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.loginLinkContainer}>
                    <Text style={styles.loginLinkText}>¿Ya tienes cuenta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Inicia Sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#1976D2',
        paddingTop: 50
    },
    headerSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center'
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 0,
        padding: 5, 
        zIndex: 10 
    },
    logoCircle: { 
        width: 70, 
        height: 70, 
        borderRadius: 35, 
        backgroundColor: 'white', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 10, 
        marginTop: 10 
    },
    headerTitle: { 
        fontSize: 28, 
        fontWeight: 'bold', 
        color: 'white' 
    },
    subTitleApp: { 
        fontSize: 16, 
        color: 'rgba(255,255,255,0.8)' 
    },
    recuadro: { 
        backgroundColor: 'white', 
        borderTopLeftRadius: 40, 
        borderTopRightRadius: 40, 
        padding: 30, 
        flex: 1, 
        elevation: 10 
    },
    inputLabel: { 
        fontSize: 14, 
        color: '#333', 
        marginBottom: 5, 
        fontWeight: '600' 
    },
    input: { 
        height: 50, 
        borderColor: '#eee', 
        borderWidth: 1, 
        borderRadius: 8, 
        paddingHorizontal: 15, 
        marginBottom: 15, 
        backgroundColor: '#fafafa', 
        fontSize: 16 
    },
    registerButton: { 
        backgroundColor: '#1976D2', 
        paddingVertical: 15, 
        borderRadius: 8, 
        alignItems: 'center', 
        marginTop: 10, 
        marginBottom: 20 
    },
    registerButtonText: { 
        color: 'white', 
        fontSize: 18, 
        fontWeight: 'bold' 
    },
    loginLinkContainer: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: 5, 
        marginBottom: 20 
    },
    loginLinkText: { 
        color: '#666', 
        fontSize: 15 
    },
    loginLink: { 
        color: '#1976D2', 
        fontWeight: 'bold', 
        fontSize: 15 
    }
});