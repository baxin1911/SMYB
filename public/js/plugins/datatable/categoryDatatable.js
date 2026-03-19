import { createDataTable } from "./baseDatatable.js";

export const createCategoryDatatable = (tableId) => {
    
    const table = createDataTable(tableId, {
        ajax: '/api/warehouse/categories',
        columns: [
            { data: 'name' },
            {
                data: 'id',
                render: () => {
                return `
                    <button class="btn-edit">✏️</button>
                `;
                }
            }
        ],
        buttons: [
            {
                text: 'Nueva categoría',
                action: () => {
                    const form = document.getElementById('categoryForm');
                    form.dataset.mode = 'create';
                    form.dataset.id = '';
                    form.reset();
                    document.getElementById('categoryModalTitle').textContent = 'Registrar categoría';
                    document.getElementById('saveCategoryBtn').textContent = 'Guardar';
                    const modalElement = document.getElementById('modal');
                    const modal = mdb.Modal.getOrCreateInstance(modalElement);

                    modal.show();
                }
            }
        ]
    });

    $(`#${ tableId } tbody`).on('click', '.btn-edit', function() {

        const data = table.row($(this).closest('tr')).data();

        document.getElementById('nameCategoryInput').value = data.name;

        const form = document.getElementById('categoryForm');
        form.dataset.mode = 'edit';
        form.dataset.id = data.id;

        document.getElementById('categoryModalTitle').textContent = 'Editar categoría';
        document.getElementById('saveCategoryBtn').textContent = 'Actualizar';

        const modal = mdb.Modal.getOrCreateInstance(modalElement);
        modal.show();
    });
}