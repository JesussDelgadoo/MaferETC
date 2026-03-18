// import { apiClient } from '../api/apiConfig';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// class UserController {
//     async register(nombre, correo, password) {
//         try {
//             const response = await apiClient.post('/usuarios/registro', {
//                 nombre,
//                 correo,
//                 password
//             });
//             return response.data;
//         } catch (error) {
//             console.error("Error en registro:", error);
//             return { 
//                 success: false, 
//                 error: error.response?.data?.message || "Error de conexión al servidor" 
//             };
//         }
//     }

//     async login(correo, password, recordar = false) {
//         try {
//             const response = await apiClient.post('/usuarios/login', {
//                 correo,
//                 password
//             });

//             if (response.data && response.data.success) {
//                 const user = response.data.user;
                
//                 if (recordar) {
//                     await AsyncStorage.setItem('user_session', JSON.stringify(user));
//                 } else {
//                     await AsyncStorage.removeItem('user_session');
//                 }
//                 return { success: true, user };
//             }
//             return { success: false, error: response.data.message || "Credenciales incorrectas" };
//         } catch (error) {
//             console.error("Error en login:", error);
//             return { success: false, error: "Error de conexión al servidor" };
//         }
//     }

//     async logout() {
//         try {
//             await AsyncStorage.removeItem('user_session');
//             return true;
//         } catch (error) {
//             return false;
//         }
//     }

//     async getActiveSession() {
//         try {
//             const jsonValue = await AsyncStorage.getItem('user_session');
//             return jsonValue != null ? JSON.parse(jsonValue) : null;
//         } catch (e) {
//             return null;
//         }
//     }
// }

// export default new UserController();

import AsyncStorage from '@react-native-async-storage/async-storage';

class UserController {
    async register(nombre, correo, password) {
        // SIMULACIÓN TEMPORAL: Fingimos que la API respondió que todo salió bien
        console.log("Simulando registro en la base de datos...");
        return { 
            success: true, 
            user: { id: 1, nombre: nombre, correo: correo } 
        };
    }

    async login(correo, password, recordar = false) {
        // SIMULACIÓN TEMPORAL: Fingimos que la contraseña es correcta y entramos
        console.log("Simulando inicio de sesión...");
        const user = { id: 1, nombre: "Chucho", correo: correo };
        
        if (recordar) {
            await AsyncStorage.setItem('user_session', JSON.stringify(user));
        }
        return { success: true, user };
    }

    async logout() {
        try {
            await AsyncStorage.removeItem('user_session');
            return true;
        } catch (error) {
            return false;
        }
    }

    async getActiveSession() {
        try {
            const jsonValue = await AsyncStorage.getItem('user_session');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            return null;
        }
    }
}

export default new UserController();