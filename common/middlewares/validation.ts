import withJoi from 'next-joi'

export default withJoi({
  onValidationError: (_, res, error) => {
    return res.status(400).json({ message: error.message, code: 400 })
  },
})
