/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// HABILITAR CORS
Route.group(() => {
  Route.resource('/moments', 'MomentsController').apiOnly()
  Route.post('/moments/:momentId/comments', 'CommentsController.store')
  
  // Novas rotas
  Route.resource('/users', 'UsersController').apiOnly()
  Route.get('/auth/:login/:password', 'AuthController.login')
  Route.get('/auth/test', 'AuthController.test')

  // TODO: expôr a rota para a controller de comentários.
}).prefix('/api')
