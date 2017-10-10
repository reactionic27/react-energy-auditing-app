import Joi from 'joi'

export default {

  register: Joi.object({
    company_name: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    submit_normal: Joi.string()
  }),

  registerInvited: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    // password_confirm: Joi.string().required()
  }),

  confirmInvited: Joi.object({
    password: Joi.string().required()
  }),

  login: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }),

  loginInvited: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }),

  forgotPassword: Joi.object({
    email: Joi.string().required().email()
  }),

  resetPassword: Joi.object({
    password: Joi.string().required(),
    password_confirm: Joi.string().required()
  })

}
