import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Nama produk wajib diisi",
    "string.min": "Nama produk minimal 3 karakter",
    "any.required": "Nama produk wajib diisi",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Harga harus berupa angka",
    "number.min": "Harga tidak boleh negatif",
    "any.required": "Harga wajib diisi",
  }),
  supplierId: Joi.number(),
});
