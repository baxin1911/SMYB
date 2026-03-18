import { prisma } from "../lib/prisma.js";

async function main() {

    await prisma.role.createMany({
        data: [
            { name: 'Administrador del sistema' },
            { name: 'Administrador' },
            { name: 'Coordinador' },
            { name: 'Auxiliar' },
            { name: 'Operador' },
            { name: 'Instalador' },
            { name: 'Almacenista' },
        ]
    });

    await prisma.department.createMany({
        data: [
            { name: 'Administración' },
            { name: 'Ventas' },
            { name: 'Diseño' },
            { name: 'Sistemas' },
            { name: 'Almacén' },
            { name: 'Impresión' },
            { name: 'Router' },
            { name: 'Acabados' },
            { name: 'Taller 3D' },
            { name: 'Herrería' },
            { name: 'PT' },
            { name: 'Tráfico' },
            { name: 'Instalaciones' },
        ]
    });
}

main().finally(() => {
    prisma.$disconnect();
});