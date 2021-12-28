import RecordNotFoundException from 'App/Exceptions/GenericResponseException'
import Province from 'App/Models/Province'
import { DateTime } from 'luxon'

export default class ProvincesController {
  public className: string

  constructor() {
    this.className = Province.name
  }
  /**
   * get all Provinces
   */
  public async index({ response, request }) {
    const pageNumber = request.qs().page || 1
    // const provinces = await Province.query().paginate(pageNumber, 10)
    const provinces = await Province.query().preload('districts').paginate(pageNumber, 10)
    return response.ok(provinces)
  }

  /**
   * return a single Province
   */
  public async show({ params, response }) {
    try {
      const province = await Province.findOrFail(params.id)
      await province.load('districts')
      return response.ok(province)
    } catch (error) {
      const message = `${this.className} ${error.message}`
      const status = error.status
      const errorCode = error.statusCode
      throw new RecordNotFoundException(message, status, errorCode)
    }
  }

  /**
   *  store a Province
   */
  public async store({ request, response }) {
    const province = await Province.create({
      name: request.input('name'),
      region: request.input('region'),
      population: request.input('population'),
      area: request.input('area'),
      prefix: request.input('prefix'),
      postalCode: request.input('postal_code'),
    })
    return response.ok(province)
  }

  /**
   * update Province record
   */
  public async update({ request, params, response }) {
    try {
      const province = await Province.findOrFail(params.id)
      province.name = request.input('name') ?? province.name
      province.region = request.input('region') ?? province.region
      province.population = request.input('population') ?? province.population
      province.area = request.input('area') ?? province.area
      province.prefix = request.input('prefix') ?? province.prefix
      province.postalCode = request.input('postal_code') ?? province.postalCode
      province.updatedAt = DateTime.local()
      await province.save()
      await province.load('districts')
      return response.ok(province)
    } catch (error) {
      const message = `${this.className} ${error.message}`
      const status = error.status
      const errorCode = error.statusCode
      throw new RecordNotFoundException(message, status, errorCode)
    }
  }

  /**
   * Delete a single Province
   */
  public async destroy({ params, response }) {
    try {
      const province = await Province.findOrFail(params.id)
      return response.ok(await province.delete())
    } catch (error) {
      const message = `${this.className} ${error.message}`
      const status = error.status
      const errorCode = error.statusCode
      throw new RecordNotFoundException(message, status, errorCode)
    }
  }
}
