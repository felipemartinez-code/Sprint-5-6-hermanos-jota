import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

// 🚨 NOTA: API URL ajustada al puerto 5000 de tu Backend
const API_URL = 'http://localhost:5000/api/productos'; 

function ProductForm() {
    const navigate = useNavigate();
    const { id } = useParams(); // ID de MongoDB si estamos editando
    
    // Estado del formulario, inicializado con campos vacíos
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagenUrl: '' // Coincide con tu modelo de Mongoose
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const isEditMode = !!id; // Bandera para saber si es PUT o POST

    // REQUISITO: Cargar datos si estamos en modo edición (GET /api/productos/:id)
    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            fetch(`${API_URL}/${id}`)
                .then(res => res.json())
                .then(data => {
                    // Cargar los datos del producto en el formulario
                    setFormData({
                        nombre: data.nombre || '',
                        descripcion: data.descripcion || '',
                        precio: data.precio || 0,
                        stock: data.stock || 0,
                        imagenUrl: data.imagenUrl || ''
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error al cargar producto para edición:", err);
                    setError("Error al cargar datos de producto.");
                    setLoading(false);
                });
        } else {
            // Limpiar formulario al montar en modo creación
             setFormData({nombre: '', descripcion: '', precio: '', stock: '', imagenUrl: ''});
        }
    }, [id, isEditMode]);

    // REQUISITO: Función para manejar el formulario controlado
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            // Convertir precio y stock a número
            [name]: name === 'precio' || name === 'stock' ? (value === '' ? '' : Number(value)) : value 
        }));
    };

    // FUNCIÓN PRINCIPAL DE ENVÍO (POST o PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const method = isEditMode ? 'PUT' : 'POST';
        const url = isEditMode ? `${API_URL}/${id}` : API_URL;

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en la operación.');
            }

            // REQUISITO CUMPLIDO: Redirigir al catálogo tras el éxito (useNavigate)
            navigate('/catalogo', { state: { successMessage: isEditMode ? 'Producto actualizado con éxito.' : 'Producto creado con éxito.' } });

        } catch (err) {
            setError(`Error: ${err.message}`);
            setLoading(false);
        }
    };

    if (loading && isEditMode) {
        return <main className="featured-products"><div className="catalogo-header">Cargando datos para edición...</div></main>;
    }

    return (
        <main className="featured-products contact-main-padded">
            <h1 className="featured-title">
                {isEditMode ? 'Editar Producto' : 'Crear Nuevo Producto'}
            </h1>
            
            {/* Mensaje de error visible */}
            {error && <div className="success-message-box" style={{ borderColor: 'red', color: 'red', backgroundColor: '#ffe6e6' }}>{error}</div>}
            
            {/* Formulario controlado */}
            <form onSubmit={handleSubmit} className="contact-form" style={{ maxWidth: '600px', margin: '0 auto' }}>
                
                {/* Campo Nombre */}
                <div>
                    <label htmlFor="nombre">Nombre (Obligatorio):</label>
                    <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className="form-input-field" required />
                </div>

                {/* Campo Precio */}
                <div>
                    <label htmlFor="precio">Precio ($):</label>
                    <input type="number" id="precio" name="precio" value={formData.precio} onChange={handleChange} className="form-input-field" required />
                </div>
                
                {/* Campo Stock */}
                <div>
                    <label htmlFor="stock">Stock:</label>
                    <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} className="form-input-field" />
                </div>

                {/* Campo Imagen URL */}
                <div>
                    <label htmlFor="imagenUrl">Ruta Imagen (e.g., /assets/...):</label>
                    <input type="text" id="imagenUrl" name="imagenUrl" value={formData.imagenUrl} onChange={handleChange} className="form-input-field" />
                </div>

                {/* Campo Descripción */}
                <div>
                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea id="descripcion" name="descripcion" rows="4" value={formData.descripcion} onChange={handleChange} className="form-input-field"></textarea>
                </div>

                <button type="submit" className="btn btn-submit-margin" disabled={loading}>
                    {loading ? 'Guardando...' : (isEditMode ? 'Guardar Cambios' : 'Crear Producto')}
                </button>
                <Link to="/catalogo" className="btn" style={{backgroundColor: '#6c757d', display: 'block', textAlign: 'center', marginTop: '10px'}}>
                    Cancelar
                </Link>
            </form>
        </main>
    );
}

export default ProductForm;