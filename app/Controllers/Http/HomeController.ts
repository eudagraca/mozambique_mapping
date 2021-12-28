// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import District from 'App/Models/District'
import Province from 'App/Models/Province'

export default class HomeController {
  public async home({ view }) {
    const provinces = await Province.query().orderBy('name', 'asc')
    const districts = await District.query().orderBy('name', 'asc')

    return view.render('home', {
      provinces: provinces,
      districts: districts,
    })
  }
}
