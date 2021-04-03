import productController from './controllers/product'
import storeController from './controllers/store'

export default app => {
  app.get('/products', productController.getList)
  app.get('/products/:productId', productController.get)
  app.get('/store/inventory', storeController.getInventory)
}
