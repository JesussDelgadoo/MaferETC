import { apiClient } from '../api/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (correo, password) => {
    try {
        const response = await apiClient.post('/usuarios/login', { correo, password });
    
        if (response.data && response.data.success) {
        // Guardar identificador o token en almacenamiento local
        await AsyncStorage.setItem('userId', response.data.user.id.toString());
        return { success: true, data: response.data.user };
        } else {
        return { success: false, message: 'Credenciales inválidas' };
        }
    } catch (error) {
        console.error("Error en loginUser:", error);
        return { success: false, message: 'Error de conexión con el servidor' };
    }
};