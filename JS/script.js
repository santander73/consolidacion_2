document.addEventListener('DOMContentLoaded', () => {
    const techIcons = document.querySelectorAll('.tech-icon');

    techIcons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            moveIcon(icon);
        });

        icon.addEventListener('mouseout', () => {
            resetIcon(icon);
        });
    });

    function moveIcon(icon) {
        const randomX = Math.random() * 20 - 10; 
        const randomY = Math.random() * 20 - 10;
        icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }

    function resetIcon(icon) {
        icon.style.transform = 'translate(0, 0)';
    }
});

//Menu
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse'); 

    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navbarCollapse).toggle();
            }
        });
    });
});


//CV PDF
document.addEventListener('DOMContentLoaded', function () {
    const showCvBtn = document.getElementById('showCvBtn');
    const closeCvBtn = document.getElementById('closeCvBtn');
    const cvOverlay = document.getElementById('cvOverlay');
    const pdfViewer = document.getElementById('pdfViewer');


    const pdfUrl = 'https://santander73.github.io/consolidacion_2/joselus.pdf';
    showCvBtn.addEventListener('click', function () {
        cvOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Mostrando el CV y cargando PDF desde:', pdfUrl);
        loadPdf(pdfUrl);
    });

    closeCvBtn.addEventListener('click', function () {
        cvOverlay.style.display = 'none';
        document.body.style.overflow = '';
    });

    cvOverlay.addEventListener('click', function (e) {
        if (e.target === cvOverlay) {
            cvOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    function loadPdf(url) {
        if (typeof pdfjsLib === 'undefined') {
            console.error('Error: PDF.js no está cargado.');
            return;
        }

        pdfjsLib.getDocument(url).promise.then(function (pdf) {
            pdf.getPage(1).then(function (page) {
                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });

                pdfViewer.height = viewport.height;
                pdfViewer.width = viewport.width;

                const renderContext = {
                    canvasContext: pdfViewer.getContext('2d'),
                    viewport: viewport
                };
                page.render(renderContext);
                console.log('PDF renderizado correctamente');
            });
        }).catch(function (error) {
            console.error('Error al cargar el PDF:', error);
            alert('Error al cargar el PDF. Por favor, verifica la ruta del archivo.');
        });
    }
});




//Contacto
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const submitterName = document.getElementById('submitterName');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
            // Aquí normalmente enviarías los datos al servidor
            console.log('Formulario enviado');
            showThankYouMessage();
        }
    });

    function validateForm() {
        let isValid = true;

        // Validar nombre
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            showError('name', 'El nombre es requerido');
            isValid = false;
        } else {
            clearError('name');
        }

        // Validar email
        const email = document.getElementById('email');
        if (email.value.trim() === '') {
            showError('email', 'El email es requerido');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError('email', 'Email inválido');
            isValid = false;
        } else {
            clearError('email');
        }

        // Validar teléfono
        const phone = document.getElementById('phone');
        if (phone.value.trim() === '') {
            showError('phone', 'El teléfono es requerido');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showError('phone', 'Número de teléfono inválido');
            isValid = false;
        } else {
            clearError('phone');
        }

        // Validar mensaje
        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            showError('message', 'El mensaje es requerido');
            isValid = false;
        } else {
            clearError('message');
        }

        return isValid;
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidPhone(phone) {
        const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return re.test(phone);
    }

    function showError(field, message) {
        const errorElement = document.getElementById(field + 'Error');
        errorElement.textContent = message;
        document.getElementById(field).classList.add('error-input');
    }

    function clearError(field) {
        const errorElement = document.getElementById(field + 'Error');
        errorElement.textContent = '';
        document.getElementById(field).classList.remove('error-input');
    }

    function showThankYouMessage() {
        const name = document.getElementById('name').value;
        submitterName.textContent = name;
        form.classList.add('hidden');
        thankYouMessage.classList.remove('hidden');
    }
});

function formContacto() {
    let form = document.getElementById("contacto")
    let envDiv = document.getElementById("enviar")
    if (form.checkValidity()) {
        let nombre = documnet.getElementById("inputName").value
        envDiv.innerHTML = "!Gracias por escribir," + nombre + "!Pronto te respondere.";
        envDiv.classList.add("border", "p-1")
    }
}

//Movimiento imagenes card

document.addEventListener('DOMContentLoaded', function () {
    const image = document.querySelector('.moving-image');
    const container = document.querySelector('.image-container');

    container.addEventListener('mousemove', function (e) {
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        image.style.transform = `
            scale(1.1)
            translate(${x * 20}px, ${y * 20}px)
            rotateX(${y * 10}deg)
            rotateY(${-x * 10}deg)
        `;
    });

    container.addEventListener('mouseleave', function () {
        image.style.transform = 'scale(1) translate(0, 0) rotateX(0) rotateY(0)';
    });
});
