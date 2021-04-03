import convictionalService from '../service/convictionalService'

const get = async (req, res, next) => {
  try {
    const { productId } = req.params
    const apiService = new convictionalService()
    const product = await apiService.getProduct(productId)
    return res.status(200).send(product)
  } catch (error) {
    next(error)
  }
}

const getList = async (req, res, next) => {
  try {
    const apiService = new convictionalService()
    const productList = await apiService.getProductList()
    return res.status(200).send(productList)
  } catch (error) {
    next(error)
  }
}

export default {
  getList,
  get,
}

