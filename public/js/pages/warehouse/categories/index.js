import { createCategoryDatatable } from "../../../plugins/datatable/categoryDatatable.js";
import { useForm } from "../../../application/form.js";
import { editCategory, registerCategory } from "../../../application/warehouse/categories.js";
import { validators } from "../../../core/validations/validators.js";
import { notifications } from "../../../plugins/swal/swalComponent.js";

createCategoryDatatable('categoryTable');

useForm({
    selector: '#categoryForm',
    getErrors: (formData) => {
        
        const errors = {};

        errors.name = validators.name(formData.name);

        return errors;
    },
    sendRequest: async ({ formData, form }) => {

        const mode = form.dataset.mode;
        const id = form.dataset.id;
        let response;

        if (mode === 'create') response = await registerCategory(formData);
        else response = await editCategory(formData, id);

        form.reset();

        form.dataset.mode = '';
        form.dataset.id = '';

        notifications.showSuccess(response.message);

        const modalElement = document.getElementById('modal');
        const modal = mdb.Modal.getInstance(modalElement);

        modal.hide();

        const table = $('#categoryTable').DataTable();

        table.draw(null, false);
    }
});