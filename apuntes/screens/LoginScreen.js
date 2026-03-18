import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, View, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../contexto/AuthContext'; // Usamos nuestro contexto

export default function LoginScreen({ navigation }) {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [cargando, setCargando] = useState(false);
    
    // Traemos la función login de nuestro contexto
    const { login } = useAuth();

    const handleLogin = async () => {
      if (!correo || !password) {
        Alert.alert('Error', 'Por favor ingresa correo y contraseña');
        return;
      }

      setCargando(true);
      // El tercer parámetro 'true' es para "recordar sesión"
      const result = await login(correo, password, true); 
      setCargando(false);

      if (!result.success) {
        Alert.alert('Error', result.error || 'Credenciales incorrectas.');
      }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
             <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
        
            <View style={styles.headerSection}>
                <View style={styles.logoCircle}>
                    <AntDesign name="book" size={40} color="#1976D2" /> 
                </View>
                <Text style={styles.appName}>apuntes</Text>
                <Text style={styles.subTitleApp}>Gestión de Tareas</Text>
            </View>
            
            <View style={styles.recuadro}>
                <Text style={styles.title}>Inicia Sesión</Text>
                
                <Text style={styles.inputLabel}>Correo electrónico</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='ejemplo@correo.com'
                    keyboardType='email-address'
                    autoCapitalize="none"
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
                
                <TouchableOpacity 
                    style={styles.loginButton} 
                    onPress={handleLogin}
                    disabled={cargando}
                >
                    {cargando ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.loginButtonText}>Entrar</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>¿No tienes cuenta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                        <Text style={styles.registerLink}>Crea una cuenta.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, alignItems: 'center', backgroundColor: '#1976D2', paddingTop: 50 },
    headerSection: { justifyContent: 'center', alignItems: 'center', height: '40%', paddingTop: 20 },
    logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    appName: { fontSize: 32, fontWeight: 'bold', color: 'white', marginBottom: 5 },
    subTitleApp: { fontSize: 16, color: 'white', opacity: 0.8, marginBottom: 30 },
    recuadro: { flex: 1, backgroundColor: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 30, width: '100%', elevation: 10 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: "#333" },
    inputLabel: { fontSize: 14, color: '#333', marginBottom: 5, fontWeight: '500' },
    input: { height: 50, borderColor: '#eee', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 20, backgroundColor: '#fafafa', fontSize: 16 },
    loginButton: { backgroundColor: '#1976D2', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 10, marginBottom: 20 },
    loginButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    registerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
    registerText: { color: '#666', fontSize: 14 },
    registerLink: { color: '#1976D2', fontWeight: 'bold', fontSize: 14 },
});