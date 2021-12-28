'use strict'
import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new RecordNotFoundException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class RecordNotFoundException extends Exception {
  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(error.status).send({
      message: error.message,
      status: error.status,
      method: ctx.request.method(),
      timeZone: DateTime.local(),
    })
  }
}
