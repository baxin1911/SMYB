import { getErrorMessage, getSuccessMessage } from "../constants/apiMessages.js";
import { notifications } from "../plugins/swal/swalComponent.js";
import { showModal } from "../ui/modalUI.js";

export const handleSuccessResponse = (response, onSuccess) => {

    const { status, data } = response;

    if (status === 204) return;

    const code = data.code;
    const successMessage = getSuccessMessage(code);

    switch (code) {
        
        case 'SUCCESS_LOGIN':
        case 'UPDATED_ACCOUNT_PASSWORD':
            localStorage.setItem('showSuccessToast', successMessage);
            onSuccess.redirect();
            break;

        default:
            notifications.showSuccess(successMessage);
    }
}

export const handleErrorResponse = (response, onError) => {

    const { data, status } = response;

    if (!status) {
        
        showErrorToast();

        return;
    }

    const errorMessage = getErrorMessage(data.code);

    switch (status) {

        case 400:
            notifications.showWarning(errorMessage);
            onError.showFormErrors?.(data.errors);
            break;

        case 401:
            window.location.replace('/');

            notifications.showError(errorMessage);
            break;

        case 429:
            notifications.showWarning(errorMessage);
            break;

        default:
            showModal();
    }
}