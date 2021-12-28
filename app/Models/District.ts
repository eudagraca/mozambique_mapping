import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Province from './Province'
import Locality from './Locality'

export default class District extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public prefix: string

  @column()
  public gentilic: string

  @column()
  public postalCode: string

  @column()
  public population: string

  @column()
  public provinceId: number

  @belongsTo(() => Province)
  public province: BelongsTo<typeof Province>

  @hasMany(() => Locality)
  public localities: HasMany<typeof Locality>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
