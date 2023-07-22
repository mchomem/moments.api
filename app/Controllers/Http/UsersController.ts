import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    public async store({ request, response }: HttpContextContract) {
        const body = request.body();
        const user = await User.create(body)
        response.status(201);

        return {
            message: 'User created with successfully',
            data: user
        }
    }

    public async index() {
        const users = await User.query();

        return {
            data: users
        }
    }

    public async destroy({ params, response }: HttpContextContract) {
        const user = await User.findOrFail(params.id)
        user.active = false
        await user.save()
        response.status(200);

        return {
            message: 'User deleted',
            data: user
        }
    }

    public async update({ params, request, response }: HttpContextContract) {
        const body = request.body()
        const user = await User.query()
            .where('id', params.id)
            .where('active', true)
            .first()

        if (user !== null) {
            user.login = body.login
            user.password = body.password
            await user.save();
            response.status(200)

            return {
                message: `User updated at ${new Date().toLocaleString('pt-BR')}`,
                data: user
            }
        } else {
            response.status(404)
            return {
                message: 'User not found',
                data: null
            }
        }
    }
}
