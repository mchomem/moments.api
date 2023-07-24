import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import jwt from 'jsonwebtoken';
import Env from '@ioc:Adonis/Core/Env';

export default class AuthController {

    // http://localhost:3333/api/auth/:login/:password
    public async login({ params, response }: HttpContextContract) {
        const user = await User.query()
            .where('login', params.login)
            .where('password', params.password)
            .where('active', true)
            .first()

        response.status(200);

        if (user !== null) {
            const token = jwt.sign(
                { login: user.login, createdAt: user.createdAt },
                Env.get('APP_KEY'),
                { expiresIn: '1h' }
            )

            return {
                message: `[${new Date().toLocaleString('pt-BR')}]: Access granted.`,
                data: { id: user.id, full_name: user.fullName, login: user.login, token: token }
            }
        }
        return {
            message: 'Access denied',
            data: { login: null, token: null }
        }
    }

    // http://localhost:3333/api/auth/test?login={value}&password={value}
    public async test({ request, response }: HttpContextContract) {
        const queryString = request.qs()
        console.log(queryString)
        const hashedValue = await Hash.make(queryString.password)

        if (await Hash.verify(hashedValue, queryString.password))
            console.log('password ok')
        else
            console.log('password not ok')

        response.status(200)

        return {
            message: 'test1',
            data: queryString,
            extra: hashedValue
        }
    }
}
