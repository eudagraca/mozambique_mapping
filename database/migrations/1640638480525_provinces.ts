import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Provinces extends BaseSchema {
  protected tableName = 'provinces'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary()
      table.string('name')
      table.enum('region', ['North', 'Sul', 'Centro'])
      table.string('population')
      table.string('area')
      table.string('prefix')
      table.string('postal_code', 100)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
