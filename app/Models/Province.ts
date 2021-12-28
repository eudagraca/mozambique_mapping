import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import District from './District'

export default class Province extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public region: string

  @column()
  public population: string

  @column()
  public area: string

  @column()
  public prefix: string

  @column()
  public postalCode: string

  @hasMany(() => District)
  public districts: HasMany<typeof District>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
