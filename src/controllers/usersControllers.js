const AppError = require('../utils/AppError')

class usersControllers {
  create(request, response) {
    const {name, email, password} = request.body;
    
    if(!name){
      throw new AppError('Nome é obrigatório!')
    }

    console.log(name, email, password)

    return response.status(201).json({
      name,
      email,
      password
    })
  }
}

module.exports = usersControllers;