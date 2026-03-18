import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../contexto/AuthContext';

export default function PerfilScreen() {
    // Extraemos al usuario y la función de cerrar sesión del contexto
    const { user, logout } = useAuth();

    // Función que muestra una alerta antes de cerrar sesión por seguridad
    const handleLogout = () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro de que deseas salir de tu cuenta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Salir', 
                    style: 'destructive', 
                    onPress: async () => {
                        await logout();
                    } 
                }
            ]
        );
    };

    // Componente reutilizable para las filas del menú
    const renderMenuItem = (icon, title, isDestructive = false, onPress = () => {}) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuItemLeft}>
                <View style={[styles.iconContainer, isDestructive && { backgroundColor: '#FFEBEE' }]}>
                    <Feather name={icon} size={20} color={isDestructive ? '#FF5252' : '#4FC3F7'} />
                </View>
                <Text style={[styles.menuItemText, isDestructive && { color: '#FF5252' }]}>{title}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#D3D3D3" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Encabezado */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mi Perfil</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Tarjeta de Información del Usuario */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        {/* Muestra la primera letra del nombre del usuario, o una 'U' por defecto */}
                        <Text style={styles.avatarText}>
                            {user?.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                        </Text>
                    </View>
                    <Text style={styles.userName}>{user?.nombre || 'Usuario Estudiante'}</Text>
                    <Text style={styles.userEmail}>{user?.correo || 'correo@estudiante.com'}</Text>

                    <TouchableOpacity style={styles.editButton} onPress={() => alert('Próximamente: Editar Perfil')}>
                        <Text style={styles.editButtonText}>Editar perfil</Text>
                    </TouchableOpacity>
                </View>

                {/* Opciones del Menú - Configuración */}
                <View style={styles.menuSection}>
                    <Text style={styles.sectionTitle}>Configuración</Text>
                    <View style={styles.menuCard}>
                        {renderMenuItem('bell', 'Notificaciones', false, () => alert('Notificaciones'))}
                        <View style={styles.separator} />
                        {renderMenuItem('lock', 'Privacidad y Seguridad', false, () => alert('Privacidad'))}
                        <View style={styles.separator} />
                        {renderMenuItem('moon', 'Tema Oscuro', false, () => alert('Tema Oscuro'))}
                    </View>
                </View>

                {/* Opciones del Menú - Soporte */}
                <View style={styles.menuSection}>
                    <Text style={styles.sectionTitle}>Soporte</Text>
                    <View style={styles.menuCard}>
                        {renderMenuItem('help-circle', 'Centro de Ayuda', false, () => alert('Ayuda'))}
                        <View style={styles.separator} />
                        {renderMenuItem('info', 'Acerca de la app', false, () => alert('Acerca de'))}
                    </View>
                </View>

                {/* Botón de Cerrar Sesión */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Feather name="log-out" size={20} color="#FF5252" style={styles.logoutIcon} />
                    <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: {
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    scrollContent: { padding: 20, paddingBottom: 40 },
    
    // Estilos de la tarjeta de perfil
    profileCard: {
        alignItems: 'center',
        backgroundColor: '#F0F8FF', // Azul muy clarito
        borderRadius: 20,
        padding: 25,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#E3F2FD',
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#90CAF9', // Fondo del avatar
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    avatarText: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF' },
    userName: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    userEmail: { fontSize: 14, color: '#666', marginBottom: 20 },
    editButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#90CAF9',
    },
    editButtonText: { color: '#1976D2', fontSize: 14, fontWeight: '600' },

    // Estilos del menú
    menuSection: { marginBottom: 25 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10, marginLeft: 5 },
    menuCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E1F5FE', // Fondo del icono
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuItemText: { fontSize: 15, color: '#333', fontWeight: '500' },
    separator: { height: 1, backgroundColor: '#F0F0F0', marginLeft: 65 }, // Línea divisoria

    // Estilos botón de salir
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#FFEBEE', // Fondo rojo muy claro
        height: 55,
        borderRadius: 25, // Forma de píldora
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#FFCDD2',
    },
    logoutIcon: { marginRight: 10 },
    logoutButtonText: { color: '#FF5252', fontSize: 16, fontWeight: 'bold' }
});