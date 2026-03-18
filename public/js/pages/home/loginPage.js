import { login } from "../../application/auth/login.js";
import { useForm } from "../../application/form.js";

useForm({
    selector: '#loginForm',
    normalizeErrors: ({ errors }) => {

        errors.name = errors.name ? 'Usuario incorrecto' : null;
        errors.password = errors.password ? 'Contraseña incorrecta' : null;

        return errors;
    },
    sendRequest: async (data) => {

        const response = await login(data);

        localStorage.setItem('showSuccessToast', response.message);
        window.location.replace('/productos');
    }
});