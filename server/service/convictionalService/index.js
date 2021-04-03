import axios from 'axios'
import _ from 'lodash'
import { productListSchema, productSchema } from './validationSchema'
import { Product, Inventory } from './schema/product'
import { CustomError, NotFoundError, InvalidRequest } from './Error'

class convictionalService {
  constructor() {
    const service = axios.create({
      baseURL: 'https://my-json-server.typicode.com',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
    this.service = service
    service.interceptors.response.use(this.handleSuccess, this.handleError)
    return this
  }

  handleSuccess = response => {
    return response
  }

  handleError = async error => {
    throw new Error(error.message)
  }

  validateProductList = data => {
    const validation = productListSchema.validate(data)
    if (validation.error) {
      throw new CustomError({
        message: 'Invalid response from server',
        code: 500,
      })
    }
  }

  validateProduct = data => {
    const validation = productSchema.validate(data)
    if (validation.error) {
      throw new CustomError({
        message: 'Invalid response from server',
        code: 500,
      })
    }
  }

  getProductList = async productId => {
    try {
      let query = '/convictional/engineering-interview/products/'
      const res = await this.service.get(query)
      let productList = []
      if (productId) {
        productList.push(res.data)
      } else {
        productList = res.data
      }
      this.validateProductList(productList)
      const toReturn = []
      for (const product of productList) {
        const formatted = new Product(product)
        toReturn.push(formatted.toJSON())
      }
      return toReturn
    } catch (e) {
      throw new NotFoundError('Product not found')
    }
  }

  getProduct = async productId => {
    try {
      let query = `/convictional/engineering-interview/products/${productId}`
      const res = await this.service.get(query)
      let product = res.data
      if (_.isEmpty(res.data)) {
        throw new NotFoundError('Product not found')
      }
      this.validateProduct(product)
      product = new Product(product)
      return product.toJSON()
    } catch (e) {
      throw new InvalidRequest('Invalid ID supplied')
    }
  }

  getInventory = async () => {
    const query = '/convictional/engineering-interview/products/'
    const res = await this.service.get(query)
    const toReturn = []

    const productList = res.data
    this.validateProductList(productList)

    for (const product of productList) {
      for (const variant of product.variants) {
        const formatted = new Inventory({ product, variant })
        toReturn.push(formatted.toJSON())
      }
    }
    return toReturn
  }
}

export default convictionalService
