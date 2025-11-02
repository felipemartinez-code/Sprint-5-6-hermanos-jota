import Product from '../models/product.model.js';

//get
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); 
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
};

//get por id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params; 
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
};

export const updateStock = async (req, res) => {
    try {
        
        const itemsToUpdate = req.body.items; 

        if (!itemsToUpdate || itemsToUpdate.length === 0) {
            return res.status(400).json({ message: 'La lista de ítems para actualizar stock está vacía.' });
        }

        
        for (const item of itemsToUpdate) {
          
            const productDB = await Product.findById(item.id); 
            
            if (!productDB) {
                return res.status(404).json({ message: `Producto con ID ${item.id} no encontrado.` });
            }
            
            if (productDB.stock < item.quantity) {
                
                return res.status(400).json({ 
                    message: `Stock insuficiente para ${productDB.nombre}. Solo quedan ${productDB.stock} unidades.`,
                    product: productDB.nombre 
                });
            }
        }
        
       
        const updatedProducts = [];
        for (const item of itemsToUpdate) {
          
            const updatedProduct = await Product.findByIdAndUpdate(
                item.id,
                { $inc: { stock: -item.quantity } }, 
                { new: true }
            );
            updatedProducts.push(updatedProduct);
        }

        res.status(200).json({ message: 'Stock actualizado exitosamente tras la compra.', updatedProducts });

    } catch (error) {
        res.status(500).json({ message: 'Error en la actualización de stock', error: error.message });
    }
};

// post
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body); 
    const savedProduct = await newProduct.save(); 
    
    res.status(201).json(savedProduct); 
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el producto', error: error.message });
  }
};

// put
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body; 
    
    
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado para actualizar' });
    }
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el producto', error: error.message });
  }
};

// delete
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
    }
    
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
};




export const checkoutProducts = async (req, res) => {
  
  const { cart } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ message: 'El carrito está vacío' });
  }

  try {
    
    for (const item of cart) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Producto con ID ${item.productId} no encontrado` });
      }

      if (product.stock < item.cantidad) {
        return res.status(400).json({
          message: `Stock insuficiente para ${product.nombre}. Stock disponible: ${product.stock}, Solicitado: ${item.cantidad}`
        });
      }
    }   
    for (const item of cart) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.cantidad }
      });
    }
    res.status(200).json({ message: 'Compra finalizada exitosamente. Stock actualizado.' });

  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor durante el checkout', error: error.message });
  }
};
