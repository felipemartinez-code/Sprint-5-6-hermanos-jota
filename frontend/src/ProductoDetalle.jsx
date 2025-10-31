import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 


const API_URL = 'http://localhost:5000/api/productos'; 

function ProductoDetalle({ addToCart }) { 
    // MongoDB usa _id. El parámetro de la URL se llama 'id'
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [mensajeVisible, setMensajeVisible] = useState(false);

    
    useEffect(() => {
        fetch(`${API_URL}/${id}`)
            .then(res => {
                if (!res.ok) throw new Error(`Producto no encontrado.`);
                return res.json();
            })
            .then(data => {
                
                setProducto(data); 
                setCargando(false);
            })
            .catch(err => {
                console.error("Error al obtener el producto:", err);
                setError("❌ No se pudo cargar el detalle del producto. Asegúrate que la BD esté conectada.");
                setCargando(false);
            });
    }, [id]); 
    
    
    const handleAddToCart = () => {
        if (producto) {
            
            addToCart(producto); 
            setMensajeVisible(true);
            setTimeout(() => setMensajeVisible(false), 3000);
        }
    };
    
    
    const handleDelete = async () => {
        //confirmacion del usuario
        if (!window.confirm(`¿Estás seguro de que quieres eliminar el producto "${producto.nombre}"? Esta acción es irreversible.`)) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${producto._id}`, { 
                method: 'DELETE',
            });

            if (response.status !== 200 && response.status !== 204) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar el producto.');
            }

            
            navigate('/catalogo', { state: { successMessage: 'Producto eliminado con éxito.' } });

        } catch (err) {
            setError(err.message);
            console.error('Error al eliminar:', err);
        }
    };
    
    // Renderizado de estados
    if (cargando) {
        return <main className="featured-products"><div className="catalogo-header">Cargando detalles...</div></main>;
    }

    if (error) {
        return <main className="featured-products"><div className="catalogo-header error-text">{error}</div></main>;
    }
    
    if (!producto || producto.message === 'Producto no encontrado') {
        return <main className="featured-products"><div className="catalogo-header">Producto no encontrado.</div></main>;
    }

    // Renderizado del producto
    return (
        <main className="featured-products"> 
            <div className="catalogo-header catalogo-header-flex"> 
                 <Link to="/catalogo" className="btn">
                    ← Volver al Catálogo
                 </Link>
            </div>
            
            {mensajeVisible && (
                <div className="cart-confirmation-message">
                    ✅ ¡**{producto.nombre}** añadido al carrito!
                </div>
            )}
            

            <div className="producto-detalle">
                
                <div className="image-column">
                    <img 
                        src={producto.imagenUrl || '/assets/Fotos_Hermanos_Jota/placeholder.jpg'} 
                        alt={producto.nombre} 
                        className="producto-detalle-imagen" 
                    />
                </div>
                
                <div className="info-column"> 
                    <h1>{producto.nombre}</h1>
                    
                    <p className="product-detail-price">
                        $ {producto.precio ? Number(producto.precio).toLocaleString('es-AR') : 'Precio no disponible'}
                    </p>
                    
                    <p className="product-detail-description">
                        {producto.descripcion || 'Descripción detallada del producto no disponible.'}
                    </p>
                    
                    <p>Stock Disponible: **{producto.stock || 0}**</p>

                    {/* Botón para Carrito */}
                    <button 
                        className="btn btn-add-to-cart-detail"
                        onClick={handleAddToCart}
                        disabled={producto.stock <= 0}
                    >
                        {producto.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                    </button>
                    
                    
                    <div style={{ marginTop: '30px', borderTop: '1px solid #ccc', paddingTop: '15px' }}>
                        <h4>Opciones de Administración:</h4>
                        <button 
                            className="btn" 
                            style={{ backgroundColor: '#007bff', marginRight: '10px' }}
                            // Navega al formulario de edición con el _id del producto
                            onClick={() => navigate(`/admin/editar-producto/${producto._id}`)}
                        >
                            Editar
                        </button>
                        <button 
                            className="btn" 
                            style={{ backgroundColor: '#dc3545' }}
                            onClick={handleDelete}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductoDetalle;