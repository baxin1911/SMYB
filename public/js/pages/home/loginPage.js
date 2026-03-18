import { useForm } from "../../core/forms/form.js";
import { login } from "../../api/authApi.js";

useForm({
    selector: '#loginForm',
    normalizeErrors: ({ errors }) => {

        errors.name = errors.name ? 'Usuario incorrecto' : null;
        errors.password = errors.password ? 'Contraseña incorrecta' : null;

        return errors;
    },
    sendRequest: (data, options) => login(data, options),
});