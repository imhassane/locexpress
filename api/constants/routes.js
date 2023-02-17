module.exports = {
    accounts: {
        root: '/accounts',
        AUTHENTICATE: 'authenticate'
    },

    properties: {
        root: '/properties',
        GET_ALL: '/',
        GET_ONE: '/:id/details',
        DELETE: '/:id/delete',
        UPDATE: '/:id/update',
        CREATE: '/'
    }
}