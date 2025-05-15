// Sample testimonio data for demonstration
const testimonials = [
    {
        nombre: "María González",
        cargo: "Dueña, Tienda de Electrónicos",
        mensaje: "InventarioPro ha simplificado nuestro control de stock de manera increíble. Las alertas automáticas nos han ayudado a evitar quedarnos sin productos clave.",
        estrellas: 5,
        imagen: "https://randomuser.me/api/portraits/women/43.jpg"
    },
    {
        nombre: "Carlos Mendoza",
        cargo: "Gerente, Distribuidora Alimentos",
        mensaje: "La personalización de categorías y campos nos permite adaptar el sistema exactamente a nuestras necesidades. El equipo ahorra horas cada semana.",
        estrellas: 5,
        imagen: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        nombre: "Ana Torres",
        cargo: "Directora, Cadena de Farmacias",
        mensaje: "Los gráficos en tiempo real nos dan visibilidad inmediata sobre nuestro inventario. La implementación fue sencilla y el soporte excelente.",
        estrellas: 4.5,
        imagen: "https://randomuser.me/api/portraits/women/65.jpg"
    }
];

const containerTestimonials = document.getElementById('testimonials-container');

testimonials.forEach(({ nombre, cargo, mensaje, estrellas, imagen }) => {
    const fullStars = Math.floor(estrellas);
    const halfStar = estrellas % 1 >= 0.5;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += `<i class="fas fa-star"></i>`;
    }
    if (halfStar) {
        starsHTML += `<i class="fas fa-star-half-alt"></i>`;
    }

    const testimonialHTML = `
            <div class="bg-gray-50 p-8 rounded-xl">
                <div class="flex items-center mb-6 text-yellow-400 text-2xl mr-1">
                    ${starsHTML}
                </div>
                <p class="text-gray-700 mb-6">"${mensaje}"</p>
                <div class="flex items-center">
                    <img src="${imagen}" alt="Cliente satisfecho" class="w-12 h-12 rounded-full mr-4">
                    <div>
                        <h4 class="font-bold">${nombre}</h4>
                        <p class="text-gray-600 text-sm">${cargo}</p>
                    </div>
                </div>
            </div>
        `;

    containerTestimonials.innerHTML += testimonialHTML;
});

