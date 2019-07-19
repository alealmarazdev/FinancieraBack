const express = require('express')

const theme = require('../usecases/themes')
const router = express.Router()

router.use(express.json())

router.post('/', async (req, res) => {
  try {
    const newThemeData = req.body
    const newTheme = await theme.newTheme(newThemeData)
    res.json({
      success: true,
      message: 'tema creado',
      payload: {
        newTheme
      }
    })
  } catch (error) {
    console.error('error: ', error)
    res.status = 400
    res.json({
      success: false,
      message: 'tema no creado',
      error: error.message
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const newThemeData = req.body
    const updateTheme = await theme.updateById(id, newThemeData)
    res.json({
      success: true,
      massage: 'Informacion del tema actualizada con exito',
      payload: {
        updateTheme
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
    const deleteTheme = await theme.deleteById(id)
    res.json({
      success: true,
      message: 'Tema eliminado',
      payload: {
        deleteTheme
      }
    })
  } catch (error) {
    console.error('error: ', error)
    res.status = 400
    res.json({
      success: false,
      message: 'Tema no eliminado',
      error: error.message
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const themes = await theme.getAll()
    res.json({
      succes: true,
      message: 'todos los temas obtenidos',
      payload: {
        themes
      }
    })
  } catch (error) {
    console.error('error: ', error)
    res.status = 400
    res.json({
      success: false,
      message: 'Error al obtener temas',
      error: error.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const foundTheme = await theme.getById(id)
    res.json({
      message: 'tema encontrado',
      success: true,
      payload: {
        foundTheme
      }
    })
  } catch (error) {
    console.log('error: ', error)
    res.status = 400
    res.json({
      success: false,
      message: 'error al encontrar tema',
      error: error.massage
    })
  }
})

module.exports = router
