import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const tareasIniciales = [
    { id: '1', titulo: 'Crear una API', materia: 'Programación', colorMateria: '#81C784', fecha: '24 Febrero', completada: false },
    { id: '2', titulo: 'Inserts', materia: 'Base de datos', colorMateria: '#FFF59D', fecha: '25 Febrero', completada: false },
    { id: '3', titulo: 'Principio de Bernoulli', materia: 'Física', colorMateria: '#4FC3F7', fecha: '26 Febrero', completada: true },
    { id: '4', titulo: 'Exposición', materia: 'Desarrollo Humano', colorMateria: '#E57373', fecha: '28 Febrero', completada: false },
];

export default function TareasScreen({ navigation }) {
    const [tareas, setTareas] = useState(tareasIniciales);
    const [filtroActivo, setFiltroActivo] = useState('Todas'); 

    const toggleTarea = (id) => {
        setTareas(tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
    };

    const tareasFiltradas = tareas.filter(t => {
        if (filtroActivo === 'Pendientes') return !t.completada;
        if (filtroActivo === 'Completas') return t.completada;
        return true; 
    });

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => toggleTarea(item.id)} style={styles.checkboxContainer}>
                <Ionicons name={item.completada ? "checkbox" : "square-outline"} size={28} color={item.completada ? "#4CAF50" : "#B0BEC5"} />
            </TouchableOpacity>
            
            <View style={styles.cardContent}>
                <Text style={[styles.tareaTitle, item.completada && styles.tareaCompletadaText]}>{item.titulo}</Text>
                <View style={[styles.materiaTag, { backgroundColor: item.colorMateria }]}>
                    <Text style={styles.materiaTagText}>{item.materia}</Text>
                </View>
            </View>

            <View style={styles.dateContainer}>
                <Feather name="calendar" size={14} color="#888" />
                <Text style={styles.dateText}>{item.fecha}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tareas</Text>
            </View>

            <View style={styles.controlsContainer}>
                <View style={styles.searchContainer}>
                    <TextInput placeholder="Buscar Tarea" style={styles.searchInput} />
                    <Feather name="search" size={20} color="#888" />
                </View>
                
                {/* AQUÍ ESTÁ LA CONEXIÓN AL FORMULARIO */}
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => navigation.navigate('CrearTarea')}
                >
                    <Text style={styles.addButtonText}>Nueva Tarea</Text>
                    <Feather name="plus" size={20} color="#333" />
                </TouchableOpacity>
            </View>

            <View style={styles.filtersContainer}>
                {['Todas', 'Pendientes', 'Completas'].map(filtro => (
                    <TouchableOpacity 
                        key={filtro}
                        style={[styles.filterPill, filtroActivo === filtro && styles.filterPillActive]}
                        onPress={() => setFiltroActivo(filtro)}
                    >
                        <Text style={[styles.filterText, filtroActivo === filtro && styles.filterTextActive]}>{filtro}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={tareasFiltradas}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingTop: 20, paddingBottom: 15 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    controlsContainer: { paddingHorizontal: 25, marginBottom: 15 },
    searchContainer: { flexDirection: 'row', backgroundColor: '#F0F8FF', height: 45, borderRadius: 25, alignItems: 'center', paddingHorizontal: 15, marginBottom: 10, borderWidth: 1, borderColor: '#E0E0E0' },
    searchInput: { flex: 1, color: '#333', fontSize: 14 },
    addButton: { flexDirection: 'row', backgroundColor: '#FFFFFF', height: 45, borderRadius: 25, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#333' },
    addButtonText: { fontSize: 16, fontWeight: '600', color: '#333', marginRight: 8 },
    filtersContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, marginBottom: 20 },
    filterPill: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#E0E0E0', minWidth: '30%', alignItems: 'center' },
    filterPillActive: { backgroundColor: '#E0F7FA', borderColor: '#4FC3F7' },
    filterText: { fontSize: 13, color: '#666', fontWeight: '500' },
    filterTextActive: { color: '#0288D1', fontWeight: 'bold' },
    listContainer: { paddingHorizontal: 25, paddingBottom: 20 },
    card: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 15, padding: 15, marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: '#EEEEEE', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3 },
    checkboxContainer: { marginRight: 15 },
    cardContent: { flex: 1 },
    tareaTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 6 },
    tareaCompletadaText: { textDecorationLine: 'line-through', color: '#9E9E9E' },
    materiaTag: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
    materiaTagText: { fontSize: 10, fontWeight: 'bold', color: '#333' },
    dateContainer: { alignItems: 'flex-end', justifyContent: 'center' },
    dateText: { fontSize: 12, color: '#888', marginTop: 4, fontWeight: '500' }
});