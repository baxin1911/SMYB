export const createDataTable = (tableId, options = {}) => {

    return $(`#${tableId}`).DataTable({
        ...options,
        language: {
            url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
        },
        serverSide: true,
        processing: true
    });
}