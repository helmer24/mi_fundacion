// Ruta a la carpeta donde están las imágenes
const folderPath = "galeria_de_actividades/";

// Contenedor del carrusel
const carouselImagesContainer = document.getElementById("carousel-images");

// Formatos permitidos para las imágenes
const allowedFormats = [".jpg", ".jpeg", ".png", ".gif"];

// Función para cargar imágenes dinámicamente
function loadImages() {
    fetch(folderPath)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                console.error("No se pudo acceder a la carpeta de imágenes.");
            }
        })
        .then(data => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(data, "text/html");
            const links = htmlDocument.querySelectorAll("a");

            links.forEach(link => {
                const fileName = link.getAttribute("href");
                const fileExtension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();

                if (allowedFormats.includes(fileExtension)) {
                    const imgElement = document.createElement("img");
                    imgElement.src = folderPath + fileName;
                    imgElement.alt = "Imagen de actividad";
                    carouselImagesContainer.appendChild(imgElement);
                }
            });

            // Inicia el carrusel automático
            startCarousel();
        })
        .catch(error => console.error("Error cargando imágenes: ", error));
}

// Función para iniciar el movimiento del carrusel
function startCarousel() {
    const images = document.querySelectorAll(".carousel-images img");
    let index = 0;

    setInterval(() => {
        carouselImagesContainer.style.transform = `translateX(-${index * 100}%)`;
        index = (index + 1) % images.length;
    }, 3000); // Cambia de imagen cada 3 segundos
}

// Carga las imágenes al inicio
loadImages();
