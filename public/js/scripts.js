// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
        // Atualiza aria-label para refletir o estado atual
        const isDarkMode = document.documentElement.classList.contains('dark');
        darkModeToggle.setAttribute('aria-label', isDarkMode ? 'Desativar modo escuro' : 'Ativar modo escuro');
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark');
        darkModeToggle.setAttribute('aria-label', 'Desativar modo escuro');
    } else {
        document.documentElement.classList.remove('dark');
        darkModeToggle.setAttribute('aria-label', 'Ativar modo escuro');
    }
}


// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        const icon = mobileMenuButton.querySelector('i');
        console.log('--- Clique no botão do menu mobile ---');
        console.log('Estado inicial do menu (hidden):', mobileMenu.classList.contains('hidden'));
        console.log('Classes do menu antes da ação:', mobileMenu.classList.value);

        if (mobileMenu.classList.contains('hidden')) {
            // Abrir menu
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('mobile-menu-fade-in');
            mobileMenu.classList.remove('mobile-menu-fade-out'); // Garante que a classe de saída seja removida
            mobileMenuButton.setAttribute('aria-expanded', 'true');
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            mobileMenuButton.setAttribute('aria-label', 'Fechar menu mobile');
            console.log('Menu aberto. Classes do menu após abrir:', mobileMenu.classList.value);
            console.log('Ícone do botão após abrir:', icon.classList.value);
        } else {
            // Fechar menu
            console.log('Iniciando processo de fechamento do menu.');
            mobileMenu.classList.add('mobile-menu-fade-out');
            mobileMenu.classList.remove('mobile-menu-fade-in'); // Garante que a classe de entrada seja removida
            
            // Adiciona a classe hidden imediatamente para garantir que o menu seja ocultado
            // A animação de fade-out ainda será executada visualmente (se o display não for sobrescrito)
            // e o animationend ainda pode ser útil para outras ações, mas não para o 'hidden'
            mobileMenu.classList.add('hidden');
            
            // Atualiza o ícone e aria-expanded imediatamente ao fechar o menu
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileMenuButton.setAttribute('aria-label', 'Abrir menu mobile');
            console.log('Menu oculto. Classes do menu após adicionar hidden:', mobileMenu.classList.value);
            console.log('Ícone do botão após fechar:', icon.classList.value);

            // O animationend ainda pode ser útil para outras ações, mas não para o 'hidden' ou ícone
            mobileMenu.addEventListener('animationend', function handler() {
                console.log('Evento animationend disparado para fechamento.');
                mobileMenu.removeEventListener('animationend', handler); // Remove o listener após a execução
            }, { once: true });
        }
    });
}

// Fecha o menu mobile ao clicar em um link
const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
if (mobileMenuLinks.length > 0) {
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                console.log('--- Link do menu mobile clicado. Fechando menu. ---');
                mobileMenu.classList.add('mobile-menu-fade-out');
                mobileMenu.classList.remove('mobile-menu-fade-in'); // Garante que a classe de entrada seja removida
                
                // Adiciona a classe hidden imediatamente para garantir que o menu seja ocultado
                mobileMenu.classList.add('hidden');

                // Atualiza o ícone e aria-expanded imediatamente ao fechar o menu
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                mobileMenuButton.setAttribute('aria-label', 'Abrir menu mobile');
                console.log('Menu oculto. Classes do menu após adicionar hidden (link):', mobileMenu.classList.value);
                console.log('Ícone do botão após fechar (link):', icon.classList.value);

                mobileMenu.addEventListener('animationend', function handler() {
                    console.log('Evento animationend disparado para fechamento (link).');
                    mobileMenu.removeEventListener('animationend', handler); // Remove o listener após a execução
                }, { once: true });
            }
        });
    });
}


// Image Modal Functionality
const modal = document.getElementById('modalOverlay');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDescription');
const modalPrevBtn = document.getElementById('modal-prev-btn');
const modalNextBtn = document.getElementById('modal-next-btn');
const modalCloseBtn = document.querySelector('.close-modal');

let galleryItems = [];
let currentGalleryIndex = 0;
let focusedElementBeforeModal = null;

// Função para obter elementos focáveis dentro de um contêiner
function getFocusableElements(container) {
    return Array.from(
        container.querySelectorAll(
            'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        )
    ).filter(
        (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const galleryTriggers = document.querySelectorAll('.gallery-item-trigger');
    galleryTriggers.forEach((img, index) => {
        galleryItems.push({
            src: img.dataset.src,
            title: img.dataset.title,
            description: img.dataset.description,
            element: img // Store the original element to return focus
        });

        img.addEventListener('click', () => {
            openModal(index);
        });
    });
});

function openModal(index) {
    console.log('openModal() chamado. Índice:', index); // Log para diagnóstico
    focusedElementBeforeModal = document.activeElement; // Store the currently focused element

    currentGalleryIndex = index; // Set the current index directly

    const item = galleryItems[currentGalleryIndex];
    modalImg.src = item.src;
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.description;
    
    modal.classList.remove('hidden');
    modal.classList.add('modal-slide-in-up');
    modal.classList.remove('modal-slide-out-down');
    modal.style.display = 'flex';
    // document.body.style.overflow = 'hidden'; // Removido para evitar travamento em webviews
    console.log('Manipulação de overflow do body removida.'); // Log para diagnóstico
    modal.classList.add('will-change-transform', 'will-change-opacity');
    document.querySelectorAll('body > *:not(#modalOverlay)').forEach(element => {
        if (element.id !== 'modalOverlay') {
            element.setAttribute('aria-hidden', 'true');
        }
    });
    modal.setAttribute('aria-hidden', 'false'); // Torna o modal visível para leitores de tela
    modal.focus(); // Move o foco para o modal

    // Adiciona event listener para trap de foco
    modal.addEventListener('keydown', trapTabKey);
}

function closeModal() {
    console.log('closeModal() chamado.'); // Log para diagnóstico
    modal.classList.remove('modal-slide-in-up');
    modal.classList.add('modal-slide-out-down');
    
    // document.body.style.overflow = 'auto'; // Removido para evitar travamento em webviews
    console.log('Manipulação de overflow do body removida.'); // Log para diagnóstico

    document.querySelectorAll('body > *:not(#modalOverlay)').forEach(element => {
        if (element.id !== 'modalOverlay') {
            element.removeAttribute('aria-hidden');
        }
    });
    modal.setAttribute('aria-hidden', 'true');
    modal.removeEventListener('keydown', trapTabKey);

    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.add('hidden');
        modal.classList.remove('will-change-transform', 'will-change-opacity');
        modal.classList.remove('modal-slide-out-down');
    }, 500);

    if (focusedElementBeforeModal) {
        focusedElementBeforeModal.focus();
    }
}

// Trap de foco para o modal
function trapTabKey(e) {
    if (e.key === 'Tab') {
        const focusableElements = getFocusableElements(modal);
        const firstFocusableEl = focusableElements[0];
        const lastFocusableEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
            }
        }
    }
}

function showImageInModal(index) {
    const item = galleryItems[index];
    modalImg.src = item.src;
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.description;
}

function showNextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    showImageInModal(currentGalleryIndex);
}

function showPrevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    showImageInModal(currentGalleryIndex);
}

// Event Listeners for modal navigation
if (modalNextBtn) {
    modalNextBtn.addEventListener('click', showNextImage);
    modalNextBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        showNextImage();
    });
}
if (modalPrevBtn) {
    modalPrevBtn.addEventListener('click', showPrevImage);
    modalPrevBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        showPrevImage();
    });
}
if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
}


// Close modal with Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
        closeModal();
    }
});

// Close modal when clicking outside the image
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
window.addEventListener('touchstart', (e) => {
    if (e.target === modal) {
        e.preventDefault(); // Previne o "ghost click"
        closeModal();
    }
});

// Featured Project Media Carousel
const featuredImage = document.getElementById('featuredImage');
const featuredVideo = document.getElementById('featuredVideo');
const prevMediaButton = document.getElementById('prevMedia');
const nextMediaButton = document.getElementById('nextMedia');

const mediaElements = [featuredImage, featuredVideo];
let currentMediaIndex = 0;

function showMedia(index) {
    mediaElements.forEach((media, i) => {
        if (media) { // Adiciona verificação para garantir que o elemento existe
            if (i === index) {
                media.classList.remove('hidden');
                media.setAttribute('aria-current', 'true'); // Adiciona aria-current ao slide ativo
                if (media.tagName === 'VIDEO') {
                    media.style.objectPosition = 'center 20%'; // Ajusta a posição do vídeo para 20% acima
                    media.play();
                }
            } else {
                media.classList.add('hidden');
                media.removeAttribute('aria-current'); // Remove aria-current dos slides inativos
                if (media.tagName === 'VIDEO') {
                    media.pause();
                    media.currentTime = 0;
                }
            }
        }
    });
}

if (prevMediaButton) {
    prevMediaButton.addEventListener('click', () => {
        currentMediaIndex = (currentMediaIndex - 1 + mediaElements.length) % mediaElements.length;
        showMedia(currentMediaIndex);
    });
}

if (nextMediaButton) {
    nextMediaButton.addEventListener('click', () => {
        currentMediaIndex = (currentMediaIndex + 1) % mediaElements.length;
        showMedia(currentMediaIndex);
    });
}


// Initialize with the first media element visible
if (mediaElements.length > 0) {
    showMedia(currentMediaIndex);
}


// Image 26a/26b Toggle
const image26a = document.getElementById('image26a');
const image26b = document.getElementById('image26b');

if (image26a && image26b) {
    let currentImage26 = 0;
    const images26 = [image26a, image26b];
    let intervalId26;

    const pauseButton = document.getElementById('pauseImage26');
    const playButton = document.getElementById('playImage26');

    function toggleImage26() {
        images26[currentImage26].classList.add('hidden');
        images26[currentImage26].removeAttribute('aria-current'); // Remove aria-current do slide inativo
        currentImage26 = (currentImage26 + 1) % images26.length;
        images26[currentImage26].classList.remove('hidden');
        images26[currentImage26].setAttribute('aria-current', 'true'); // Adiciona aria-current ao slide ativo
    }

    function startCarousel26() {
        // Limpa qualquer intervalo existente para evitar múltiplos intervalos
        stopCarousel26();
        intervalId26 = setInterval(toggleImage26, 3000);
        if (pauseButton) pauseButton.classList.remove('hidden');
        if (playButton) playButton.classList.add('hidden');
    }

    function stopCarousel26() {
        clearInterval(intervalId26);
        if (pauseButton) pauseButton.classList.add('hidden');
        if (playButton) playButton.classList.remove('hidden');
    }

    // Start automatically
    startCarousel26();
    // Define aria-current para a imagem inicial
    if (images26.length > 0) {
        images26[currentImage26].setAttribute('aria-current', 'true');
    }

    if (pauseButton) pauseButton.addEventListener('click', stopCarousel26);
    if (playButton) playButton.addEventListener('click', startCarousel26);
}
// Form Validation and Feedback
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonContent = submitButton.innerHTML;

    // Funções de feedback visual
    function applyFocusStyle(inputElement) {
        inputElement.classList.add('form-field-focused');
    }

    function removeFocusStyle(inputElement) {
        inputElement.classList.remove('form-field-focused');
    }

    function updateValidationFeedback(inputElement, isValid, message = '') {
        const wrapper = inputElement.closest('.form-field-wrapper');
        if (!wrapper) return;

        const checkIcon = wrapper.querySelector('.fa-check');
        const timesIcon = wrapper.querySelector('.fa-times');
        const feedbackMessage = wrapper.querySelector('.validation-message');

        // Limpa estados anteriores
        inputElement.classList.remove('form-field-valid', 'form-field-invalid');
        inputElement.removeAttribute('aria-invalid');
        if (checkIcon) checkIcon.classList.add('hidden');
        if (timesIcon) timesIcon.classList.add('hidden');
        if (feedbackMessage) {
            feedbackMessage.classList.add('hidden');
            feedbackMessage.textContent = '';
        }

        if (isValid) {
            inputElement.classList.add('form-field-valid');
            if (checkIcon) checkIcon.classList.remove('hidden');
        } else {
            inputElement.classList.add('form-field-invalid');
            inputElement.setAttribute('aria-invalid', 'true');
            if (timesIcon) timesIcon.classList.remove('hidden');
            if (feedbackMessage && message) {
                feedbackMessage.textContent = message;
                feedbackMessage.classList.remove('hidden');
            }
        }
    }

    function markAsInvalid(inputElement, message = 'Campo obrigatório.') {
        updateValidationFeedback(inputElement, false, message);
    }

    function markAsValid(inputElement) {
        updateValidationFeedback(inputElement, true);
    }

    function isValidEmail(email) {
        // Basic email validation regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    contactForm.addEventListener('submit', function(event) {
        let isValid = true;

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Validate Name
        if (nameInput.value.trim() === '') {
            markAsInvalid(nameInput);
            isValid = false;
        } else {
            markAsValid(nameInput);
        }

        // Validate Email
        if (!isValidEmail(emailInput.value)) {
            markAsInvalid(emailInput, 'Por favor, insira um e-mail válido.');
            isValid = false;
        } else {
            markAsValid(emailInput);
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            markAsInvalid(messageInput);
            isValid = false;
        } else {
            markAsValid(messageInput);
        }

        if (!isValid) {
            event.preventDefault(); // Previne o envio se a validação JS falhar
            alert('Por favor, preencha todos os campos obrigatórios corretamente.');
        } else {
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
            submitButton.classList.add('opacity-70', 'cursor-not-allowed');
        }
    });

    // Add real-time validation feedback on input change/blur
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            applyFocusStyle(input);
        });

        input.addEventListener('blur', () => {
            removeFocusStyle(input);
            if (input.id === 'email') {
                if (!isValidEmail(input.value)) {
                    markAsInvalid(input, 'Por favor, insira um e-mail válido.');
                } else {
                    markAsValid(input);
                }
            } else if (input.hasAttribute('required') && input.value.trim() === '') {
                markAsInvalid(input);
            } else {
                markAsValid(input);
            }
        });

        input.addEventListener('input', () => {
            // Limpa o feedback de validação ao digitar
            updateValidationFeedback(input, true); // Assume válido temporariamente
        });
    });
}
// Back to Top Button
const backToTopBtn = document.getElementById('backToTopBtn');

if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll animation
        });
    });
}