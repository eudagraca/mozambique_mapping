import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Localities extends BaseSchema {
  protected tableName = 'localities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table
        .integer('district_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('districts')
        .onDelete('CASCADE')

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
