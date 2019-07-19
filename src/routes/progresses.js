const express = require('express')

const progress = require('../usecases/progress')
const router = express.Router()

router.use(express.json())

router.post('/', async (req, res) => {
  try {
    const newProgressData = req.body
    const newProgress = await progress.newTopic(newProgressData)
    res.json({
      success: true,
      message: 'progreso creado',
      payload: {
        newProgress
      }
    })
  } catch (error) {
    console.error('error: ', error)
    res.status = 400
    res.json({
      success: false,
      message: 'progreso no creado',
      error: error.message
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const newProgressData = req.body
    const updateProgress = await progress.updateById(id, newProgressData)
    res.json({
      success: true,
      massege: 'Informacion del progreso actualizada con exito',
      payload: {
        updateProgress
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
    const deleteProgress = await progress.deleteById(id)
    res.json({
      success: true,
      message: 'Progreso eliminado',
      payload: {
        deleteProgress
      }
    })
  } catch (error) {
    console.error('error: ', error)
    res.status = 400
    res.json({
      success: false,
      message: 'Progreso no eliminado',
      error: error.message
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const progresses = await progress.getAll()
    res.json({
      succes: true,
      message: 'todos los progresos obtenidos',
      payload: {
        progresses
      }
    })
  } catch (error) {
    console.error('error: ', error)
    res.status = 400
    res.json({
      success: false,
      message: 'Error al obtener progresos',
      error: error.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const foundProgress = await progress.getById(id)
    res.json({
      message: 'Progreso encontrado',
      success: true,
      payload: {
        foundProgress
      }
    })
  } catch (error) {
    console.log('error: ', error)
    res.status = 400
    res.json({
      success: false,
      message: 'error al encontrar progreso',
      error: error.massege
    })
  }
})

module.exports = router
