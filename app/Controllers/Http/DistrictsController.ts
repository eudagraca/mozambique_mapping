// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import RecordNotFoundException from 'App/Exceptions/GenericResponseException'
import District from 'App/Models/District'
import Province from 'App/Models/Province'
import { DateTime } from 'luxon'

export default class DistrictsController {
  public className: string

  constructor() {
    this.className = District.name
  }
  /**
   * get all districts
   */
  public async index({ request }) {
    const pageNumber = request.qs().page || 1
    const districts = await District.query().preload('localities').paginate(pageNumber, 10)
    return districts
  }
  /**
   *  store Distrinct
   */
  public async store({ request }) {
    try {
      const province = await Province.findOrFail(request.input('province_id'))
      const district = await province.related('districts').create({
        name: request.input('name'),
        gentilic: request.input('gentilic'),
        population: request.input('population'),
        prefix: request.input('prefix'),
        postalCode: request.input('postal_code'),
      })
      return district
    } catch (error) {
      const message = `${this.className} ${error.message}`
      const status = error.status
      const errorCode = error.statusCode
      throw new RecordNotFoundException(message, status, errorCode)
    }
  }

  /**
   * update district record
   */
  public async update({ request, params }) {
    try {
      const district = await District.findOrFail(params.id)
      let province
      if (request.input('province_id')) {
        province = await Province.findOrFail(request.input('province_id'))
      }
      district.name = request.input('name') ?? district.name
      district.prefix = request.input('prefix') ?? district.prefix
      district.population = request.input('population') ?? district.population
      district.gentilic = request.input('gentilic') ?? district.gentilic
      if (province) {
        district.provinceId = province.id
      }
      district.postalCode = request.input('postal_code') ?? district.postalCode
      district.updatedAt = DateTime.local()
      await district.save()
    } catch (error) {
      const message = `${this.className} ${error.message}`
      const status = error.status
      const errorCode = error.statusCode
      throw new RecordNotFoundException(message, status, errorCode)
    }
  }

  /**
   * show
   */
  public async show({ params }) {
    try {
      const district = await District.findOrFail(params.id)
      await district.load('localities')
      return district
    } catch (error) {
      const message = `${this.className} ${error.message}`
      const status = error.status
      const errorCode = error.statusCode
      throw new RecordNotFoundException(message, status, errorCode)
    }
  }

  /**
   * Delete a single District
   */
  public async destroy({ params }) {
    try {
      const district = await District.findOrFail(params.id)
      return await district.delete()
    } catch (error) {
      const message = `${this.className} ${error.message}`
      const status = error.status
      const errorCode = error.statusCode
      throw new RecordNotFoundException(message, status, errorCode)
    }
  }
}
