const express = require('express')

const topic = require('../usecases/topic')
const router = express.Router()

router.use(express.json())

router.post('/', async (req, res) => {
  try {
    const newTopicData = req.body
    const newTopic = await topic.newTopic(newTopicData)
    res.json({
      success: true,
      message: 'topico creado',
      payload: {
        newTopic
      }
    })
  } catch (error) {
    console.error('error: ', error)
    res.status = 400
    res.json({
      success: false,
      message: 'topico no creado',
      error: error.message
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const newTopicData = req.body
    const updateTopic = await topic.updateById(id, newTopicData)
    res.json({
      success: true,
      message: 'Informacion del topico actualizada con exito',
      payload: {
        updateTopic
      }
    })
  } catch (error) {
    console.error('error: ', error)
    res.status = 400
    res.json({
      success: false,
      message: 'Error en las actualizacion de la informacion',
      error: error.message
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteTopic = await topic.deleteById(id)
    res.json({
      success: true,
      message: 'Topico eliminado',
      payload: {
        deleteTopic
      }
    })
  } catch (error) {
    console.error('error: ', error)
    res.status = 400
    res.json({
      success: false,
      message: 'Topico no eliminado',
      error: error.message
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const topics = await topic.getAll()
    res.json({
      success: true,
      message: 'todos los topicos obtenidos',
      payload: {
        topics
      }
    })
  } catch (error) {
    console.error('error: ', error)
    res.status = 400
    res.json({
      success: false,
      message: 'Error al obtener topicos',
      error: error.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const foundTopic = await topic.getById(id)
    res.json({
      message: 'topico encontrado',
      success: true,
      payload: {
        foundTopic
      }
    })
  } catch (error) {
    console.log('error: ', error)
    res.status = 400
    res.json({
      success: false,
      message: 'error al encontrar topico',
      error: error.message
    })
  }
})

module.exports = router
