import convictionalService from '../service/convictionalService'

const getInventory = async (req, res, next) => {
  try {
    const apiService = new convictionalService()
    const inventory = await apiService.getInventory()
    return res.status(200).send(inventory)
  } catch (error) {
    next(error)
  }
}

export default {
  getInventory,
}
