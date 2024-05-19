const AppError = require('../utils/AppError')
const knex = require('../database/knex')

const { hash, compare } = require('bcryptjs')

class usersControllers {
  async create(request, response) {
    const { name, email, password } = request.body;
    const [ checkUsersExits ] = await knex('users').where({ email })

    console.log(checkUsersExits)

    if(!name){
      throw new AppError('Nome é obrigatório!')
    }

    if(checkUsersExits){
      throw new AppError('O email ja foi cadastrado!')
    }

    const hashedPassword = await hash(password, 8)

    await knex('users').insert({
      name,
      email,
      password: hashedPassword,
    })

    return response.status(201).json()
  }

  async update(request, response){
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const [user] = await knex('users').where({ id })

    if(!user){
      throw new AppError('Usuario nao encontrado!')
    }

    const [userWithUdateEmail] = await knex('users').where({ email })

    if(userWithUdateEmail && userWithUdateEmail.id !== user.id){
      throw new AppError('O email já está em uso.')
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password){
      throw new AppError('A senha antiga é obrigatória!')
    }

    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password)
      if(!checkOldPassword){
        throw new AppError('A senha antiga está incorreta!')
      }

      user.password = password;
    }
    
    await knex('users').where({ id: user.id}).update({
      name: user.name,
      email: user.email,
      password: user.password,
      update_at: knex.fn.now()
    })

    return response.json()
  }
}

module.exports = usersControllers;