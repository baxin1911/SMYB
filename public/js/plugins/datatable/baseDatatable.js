export const createDataTable = (tableId, options = {}) => {

    $(document).ready(function() {
        $(`#${tableId}`).DataTable({
            ...options,
            url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
        });
    });
}