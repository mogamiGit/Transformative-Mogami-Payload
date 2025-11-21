import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET ,

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),

  editor: lexicalEditor({}),

  // Colecciones (aquí defines tus modelos de datos)
  collections: [
    // Ejemplo: colección de usuarios
    {
      slug: 'users',
      auth: true,
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
  ],

  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
