const plans = [
    {
      nombre: "Básico",
      descripcion: "Perfecto para pequeños negocios",
      precio: 0,
      beneficios: [
        { texto: "Hasta 100 productos", activo: true },
        { texto: "5 categorías", activo: true },
        { texto: "Gráficos básicos", activo: true },
        { texto: "Alertas por email", activo: false },
        { texto: "Soporte prioritario", activo: false },
      ],
      boton: "Comenzar gratis",
      destacado: false,
    },
    {
      nombre: "Profesional",
      descripcion: "Para negocios en crecimiento",
      precio: 19,
      beneficios: [
        { texto: "Hasta 1,000 productos", activo: true },
        { texto: "Categorías ilimitadas", activo: true },
        { texto: "Gráficos avanzados", activo: true },
        { texto: "Alertas por email", activo: true },
        { texto: "Soporte prioritario", activo: true },
      ],
      boton: "Prueba gratuita",
      destacado: true,
    },
    {
      nombre: "Empresa",
      descripcion: "Para grandes volúmenes",
      precio: 49,
      beneficios: [
        { texto: "Productos ilimitados", activo: true },
        { texto: "Categorías ilimitadas", activo: true },
        { texto: "Gráficos premium", activo: true },
        { texto: "Alertas personalizadas", activo: true },
        { texto: "Soporte 24/7", activo: true },
      ],
      boton: "Contactar ventas",
      destacado: false,
    }
  ];
  
  const containerPricing = document.querySelector("#pricing .grid");
  plans.forEach(plan => {
    const card = document.createElement("div");
    card.className = `bg-white rounded-xl overflow-hidden shadow-sm ${
      plan.destacado ? "shadow-lg transform scale-105" : ""
    }`;
  
    const destacado = plan.destacado
      ? `<div class="bg-blue-600 text-white text-center py-2">
          <span class="font-medium">MÁS POPULAR</span>
        </div>`
      : "";
  
    const beneficios = plan.beneficios
      .map(b =>
        `<li class="flex items-center ${b.activo ? "" : "text-gray-400"}">
           <i class="fas fa-${b.activo ? "check text-green-500" : "times"} mr-2"></i>
           <span>${b.texto}</span>
         </li>`
      )
      .join("");
  
    card.innerHTML = `
      ${destacado}
      <div class="p-8">
        <h3 class="text-2xl font-bold mb-2">${plan.nombre}</h3>
        <p class="text-gray-600 mb-6">${plan.descripcion}</p>
        <div class="mb-6">
          <span class="text-4xl font-bold">$${plan.precio}</span>
          <span class="text-gray-500">/mes</span>
        </div>
        <ul class="space-y-3 mb-8">${beneficios}</ul>
        <button class="w-full py-3 ${
          plan.destacado
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "border border-blue-600 text-blue-600 hover:bg-blue-50"
        } font-medium rounded-lg transition duration-300">
          ${plan.boton}
        </button>
      </div>`;
  
    containerPricing.appendChild(card);
  });
  