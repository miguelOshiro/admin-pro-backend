const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [{
            titulo: 'Dashboard!!!',
            icono: 'tio-home-vs-1-outlined',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'Graficas', url: 'grafica1' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'ProgressBar', url: 'progress' },
                { titulo: 'Rxjs', url: 'rxjs' },
            ]
        },

        {
            titulo: 'Mantenimiento',
            icono: 'tio-dashboard-vs-outlined',
            submenu: [
                //{ titulo: 'Usuarios', url: 'usuarios'},
                { titulo: 'Hospitales', url: 'hospitales' },
                { titulo: 'Medicos', url: 'medicos' },
            ]
        },
    ];


    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' });
    }

    return menu;

}

module.exports = {
    getMenuFrontEnd
}