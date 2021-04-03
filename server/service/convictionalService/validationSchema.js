import Joi from 'joi'

export const imageSchema = Joi.object({
  src: Joi.string().required(),
}).unknown()

export const variantSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required(),
  sku: Joi.string().required(),
  weight: Joi.number().required(),
  weight_unit: Joi.string().required(),
  images: Joi.array().items(imageSchema),
}).unknown()

export const productSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required(),
  body_html: Joi.string().required(),
  vendor: Joi.string().required(),
  variants: Joi.array().items(variantSchema),
}).unknown()

export const productListSchema = Joi.array().items(productSchema)
