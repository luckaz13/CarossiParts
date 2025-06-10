// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Image Modal Functionality
const modal = document.getElementById('modalOverlay');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDescription');
const modalPrevBtn = document.getElementById('modal-prev-btn');
const modalNextBtn = document.getElementById('modal-next-btn');
const modalCloseBtn = document.querySelector('.close-modal'); // Assuming this is the close button

let galleryItems = [];
let currentGalleryIndex = 0;
let focusedElementBeforeModal = null;

document.addEventListener('DOMContentLoaded', () => {
    const allGalleryImages = document.querySelectorAll('.gallery-item img, #featuredImage');
    allGalleryImages.forEach((img) => {
        const onclickAttr = img.getAttribute('onclick');
        if (onclickAttr) {
            const match = onclickAttr.match(/openModal\('([^']*)', '([^']*)', '([^']*)'\)/);
            if (match) {
                galleryItems.push({
                    src: match[1],
                    title: match[2],
                    description: match[3],
                    element: img // Store the original element to return focus
                });
            }
        }
    });
});

function openModal(src, title, description) {
    focusedElementBeforeModal = document.activeElement; // Store the currently focused element

    // Find the index of the opened image
    currentGalleryIndex = galleryItems.findIndex(item => item.src === src);

    modalImg.src = src;
    modalTitle.textContent = title;
    modalDesc.textContent = description;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus(); // Focus on the close button for accessibility
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.body.style.overflow = 'auto';
    if (focusedElementBeforeModal) {
        focusedElementBeforeModal.focus(); // Return focus to the element that opened the modal
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
modalNextBtn.addEventListener('click', showNextImage);
modalNextBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    showNextImage();
});
modalPrevBtn.addEventListener('click', showPrevImage);
modalPrevBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    showPrevImage();
});

// Close modal with Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
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
        if (i === index) {
            media.classList.remove('hidden');
            if (media.tagName === 'VIDEO') {
                media.style.objectPosition = 'center 20%'; // Ajusta a posição do vídeo para 20% acima
                media.play();
            }
        } else {
            media.classList.add('hidden');
            if (media.tagName === 'VIDEO') {
                media.pause();
                media.currentTime = 0;
            }
        }
    });
}

prevMediaButton.addEventListener('click', () => {
    currentMediaIndex = (currentMediaIndex - 1 + mediaElements.length) % mediaElements.length;
    showMedia(currentMediaIndex);
});

nextMediaButton.addEventListener('click', () => {
    currentMediaIndex = (currentMediaIndex + 1) % mediaElements.length;
    showMedia(currentMediaIndex);
});

// Initialize with the first media element visible
showMedia(currentMediaIndex);

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
        currentImage26 = (currentImage26 + 1) % images26.length;
        images26[currentImage26].classList.remove('hidden');
    }

    function startCarousel26() {
        intervalId26 = setInterval(toggleImage26, 3000);
        pauseButton.classList.remove('hidden');
        playButton.classList.add('hidden');
    }

    function stopCarousel26() {
        clearInterval(intervalId26);
        pauseButton.classList.add('hidden');
        playButton.classList.remove('hidden');
    }

    // Start automatically
    startCarousel26();

    pauseButton.addEventListener('click', stopCarousel26);
    playButton.addEventListener('click', startCarousel26);
}