const Joi = require("joi");

exports.create = Joi.object().keys({
  nama: Joi.string().min(3).max(50).required(),
  tempatlahir: Joi.string().min(3).max(50).required(),
  alamat: Joi.string().min(8).max(50).required(),
  tanggallahir: Joi.date().required(),
  jeniskelamin: Joi.string().valid('L','P').required(),
  namaorangtua: Joi.string().min(3).max(50).required(),
  nohp: Joi.string().min(12).max(12).required(),
});

exports.update = Joi.object().keys({
  nama: Joi.string().min(3).max(50).required(),
  tempatlahir: Joi.string().min(3).max(50).required(),
  alamat: Joi.string().min(8).max(50).required(),
  tanggallahir: Joi.date().required(),
  jeniskelamin: Joi.string().valid('L','P').required(),
  namaorangtua: Joi.string().min(3).max(50).required(),
  nohp: Joi.string().min(12).max(12).required(),
});