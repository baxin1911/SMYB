import { register } from "../../../api/authApi";
import { useForm } from "../../../core/forms/form.js";

useForm({
    selector: '#registerForm',
    modalId: 'registerModal',
    sendRequest: (data, options) => register(data, options),
});