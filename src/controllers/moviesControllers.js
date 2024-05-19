const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class moviesControllers {
  async create(request, response){
    const { title, description, note, tags   } = request.body;
    const { user_id } = request.params;

    const [userExist] = await knex('users').where('id', user_id)
    if(!userExist){
      throw new AppError('O usuario nao existe!')
    }

    const [moveis_id] = await knex('movies  ').insert({
      title,
      description,
      note,
      user_id
    })

    const tagsInsert = tags.map(name => {
      return {
        name,
        user_id,
        moveis_id
      }
    })

    await knex('tags').insert(tagsInsert)

    response.json()
  }

  async show(request, response){
    const { id } = request.params;

    const moveis = await knex('movies').where({ id }).first();
    const tags = await knex('tags').where({ moveis_id: id}).orderBy('name')

    return response.json({
      ...moveis,
      tags,
    });
  }

  async delete(request, response){
    const { id } = request.params;

    await knex('movies').where({ id }).delete();

    return response.json();
  }

  async index(request, response){
    const { user_id, title, tags } =  request.query;
    let moveis;

    if(tags){
      const filteTags = tags.split(',').map(tag => tag.trim())

      moveis = await knex('tags')
                      .select([
                        'movies.id',
                        'movies.title',
                        'movies.user_id'
                      ])
                      .where('movies.user_id', user_id)
                      .whereLike('movies.title', `%${title}%`)
                      .whereIn('name', filteTags)
                      .innerJoin('movies', "movies.id", 'tags.moveis_id')
                      .orderBy('movies.title')
    }else{

    moveis = await knex('movies')
                          .where({ user_id })
                          .whereLike('title', `%${title}%`)
                          .orderBy('title')
    
    }

    const userTags = await knex('tags').where({ user_id })
    const moveisWithTags = moveis.map(film => {
      const filmTags = userTags.filter(tag => tag.moveis_id === film.id);

      return {
        ...film,
        tags: filmTags
      }
    })


    return response.json(moveisWithTags)
  }
}

module.exports = moviesControllers;