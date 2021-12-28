import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Districts extends BaseSchema {
  protected tableName = 'districts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary()
      table.string('name')
      table
        .integer('province_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('provinces')
        .onDelete('CASCADE')
      table.string('gentilic')
      table.string('population')
      table.string('prefix')
      table.integer('postal_code')
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
