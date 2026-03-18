import { createDataTable } from "./baseDatatable.js";

export const createCategoryDatatable = (tableId) => {
    
    createDataTable(tableId, {
        ajax: '/api/categories',
        dom: 'Bfrtip',
        columns: [
            { data: 'name' },
            {
                data: 'id',
                render: (data) => {
                return `
                    <button onclick="editar(${ data })">✏️</button>
                `;
                }
            }
        ],
        buttons: [
            {
                text: 'Nueva categoría',
                action: () => {
                    const modalElement = document.getElementById('modal');
                    const modal = new mdb.Modal(modalElement);

                    modal.show();
                }
            }
        ]
    });
}