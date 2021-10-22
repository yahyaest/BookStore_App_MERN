import Joi from "joi-browser";

export const validate = (formSchema, formData) => {
  const options = { abortEarly: false };
  const { error } = Joi.validate(formData, formSchema, options);
  if (!error) return null;

  const errors = {};
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
  }
  return errors;
};

export const validateProperty = (formSchema, { name, value }) => {
  const obj = { [name]: value };
  const schema = { [name]: formSchema[name] };
  const { error } = Joi.validate(obj, schema);
  return error ? error.details[0].message : null;
};
