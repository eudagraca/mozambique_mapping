// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import RecordNotFoundException from 'App/Exceptions/GenericResponseException'
import District from 'App/Models/District'
import Locality from 'App/Models/Locality'
import { DateTime } from 'luxon'

export default class LocalitiesController {
  public className: string

  constructor() {
    this.className = Locality.name
  }
  /**
   * get all Localities
   */
  public async index({ request, response }) {
    const pageNumber = request.qs().page || 1
    const localities = await Locality.query().paginate(pageNumber, 10)
    return response.ok(localities)
  }

  /**
   *  store Province
   */
  public async store({ request, response }) {
    const district = await District.findOrFail(request.input('district_id', 0))
    const locality = await district.related('localities').create({
      name: request.input('name'),
    })
    return response.ok(locality)
  }

  /**
   * update District
   */
  public async update({ request, params, response }) {
    try {
      const locality = await Locality.findOrFail(params.id)
      let district
      if (request.input('district_id')) {
        district = await District.query().where('id', request.input('district_id'))
      }
      locality.name = request.input('name') ?? district.name
      if (district) {
        locality.districtId = district.id
      }
      locality.updatedAt = DateTime.local()
      await locality.save()
      return response.ok(locality)
    } catch (error) {
      const message = `${this.className} ${error.message}`
      const status = error.status
      const errorCode = error.statusCode
      throw new RecordNotFoundException(message, status, errorCode)
    }
  }

  /**
   * return a single Locality
   */
  public async show({ params, response }) {
    try {
      const locality = await Locality.findOrFail(params.id)
      return response.ok(locality)
    } catch (error) {
      const message = `${this.className} ${error.message}`
      const status = error.status
      const errorCode = error.statusCode
      throw new RecordNotFoundException(message, status, errorCode)
    }
  }

  /**
   * Delete a single Locality
   */
  public async destroy({ params, response }) {
    try {
      const locality = await Locality.findOrFail(params.id)
      return response.ok(await locality.delete())
    } catch (error) {
      const message = `${this.className} ${error.message}`
      const status = error.status
      const errorCode = error.statusCode
      throw new RecordNotFoundException(message, status, errorCode)
    }
  }
}
