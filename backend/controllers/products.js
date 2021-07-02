// import model
import Product from '../models/product.js'

// INDEX ROUTE
export const getAllProducts = async (_req, res) => {
  const products = await Product.find()
  return res.status(200).json(products)
}

// ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)

    if (!product) throw new Error('No show found')

    const commentToAdd = { ...req.body, owner: req.currentUser._id }

    product.comments.push(commentToAdd)

    await product.save()

    return res.status(200).json(product)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

// DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params

    const show = await Product.findById(id)
    if (!show) throw new Error('Show not found')

    const commentToDelete = show.comments.id(commentId)

    if (!commentToDelete) throw new Error('Comment not found')

    await commentToDelete.remove()
    await show.save()

    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err })
  }
}
