// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config()

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: process.env.DATABASE_NAME
    },
    migrations: {
        directory: process.env.DATABASE_MIGRATIONS
    }
  },

  staging: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: process.env.DATABASE_NAME
    },
    migrations: {
        directory: process.env.DATABASE_MIGRATIONS
    }
  },

  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: process.env.DATABASE_NAME
    },
    migrations: {
        directory: process.env.DATABASE_MIGRATIONS
    }
  }

};
