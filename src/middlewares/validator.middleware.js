export const validatorSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body)
    next()
  } catch (e) {
    return res
      .status(400)
      .json({ message: e.errors.map((e) => e.message) })
  }
}
