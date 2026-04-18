import mermaid from 'mermaid';

// Initialize Mermaid
mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'Inter, system-ui, sans-serif',
});

document.addEventListener('DOMContentLoaded', () => {
    // Create and inject modal for Mermaid zooming
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-toolbar">
                <button type="button" class="modal-zoom-btn" data-zoom-action="out">-</button>
                <button type="button" class="modal-zoom-btn" data-zoom-action="in">+</button>
                <button type="button" class="modal-reset-btn" data-zoom-action="reset">Reset</button>
            </div>
            <div class="modal-diagram-viewport">
                <div class="modal-diagram-stage">
                    <div class="modal-diagram-inner"></div>
                </div>
            </div>
        </div>
        <div class="close-modal">&times;</div>
    `;
    document.body.appendChild(modal);

    const modalViewport = modal.querySelector('.modal-diagram-viewport');
    const modalInner = modal.querySelector('.modal-diagram-inner');
    const zoomControls = modal.querySelectorAll('[data-zoom-action]');
    const closeBtn = modal.querySelector('.close-modal');
    let activeModalSvg = null;
    let modalBaseWidth = 0;
    let modalBaseHeight = 0;
    let modalZoom = 1;

    const getSvgDimensions = (svg) => {
        const renderedRect = svg.getBoundingClientRect();
        const viewBoxWidth = svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal.width : 0;
        const viewBoxHeight = svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal.height : 0;

        const widthAttr = parseFloat(svg.getAttribute('width'));
        const heightAttr = parseFloat(svg.getAttribute('height'));

        const width =
            viewBoxWidth ||
            (!Number.isNaN(widthAttr) && widthAttr > 0 ? widthAttr : 0) ||
            renderedRect.width ||
            1200;

        const height =
            viewBoxHeight ||
            (!Number.isNaN(heightAttr) && heightAttr > 0 ? heightAttr : 0) ||
            renderedRect.height ||
            800;

        return { width, height };
    };

    const applyModalZoom = () => {
        if (!activeModalSvg) {
            return;
        }

        modalInner.style.width = `${modalBaseWidth * modalZoom}px`;
        modalInner.style.height = `${modalBaseHeight * modalZoom}px`;
        activeModalSvg.style.width = '100%';
        activeModalSvg.style.height = '100%';
    };

    const setInitialModalZoom = () => {
        const viewportWidth = modalViewport.clientWidth || window.innerWidth * 0.9;
        const viewportHeight = modalViewport.clientHeight || window.innerHeight * 0.9;
        const fitWidth = viewportWidth / modalBaseWidth;
        const fitHeight = viewportHeight / modalBaseHeight;
        const fitZoom = Math.min(fitWidth, fitHeight, 1);

        modalZoom = Math.max(fitZoom, 0.5);
        applyModalZoom();
    };

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            modalInner.innerHTML = '';
            modalInner.style.width = '';
            modalInner.style.height = '';
            activeModalSvg = null;
            modalBaseWidth = 0;
            modalBaseHeight = 0;
            modalZoom = 1;
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    zoomControls.forEach(control => {
        control.addEventListener('click', () => {
            if (!activeModalSvg) {
                return;
            }

            const action = control.dataset.zoomAction;
            if (action === 'in') {
                modalZoom = Math.min(modalZoom + 0.25, 3);
            } else if (action === 'out') {
                modalZoom = Math.max(modalZoom - 0.25, 0.5);
            } else {
                modalZoom = 1;
            }

            applyModalZoom();
        });
    });

    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        // Keep anything already on screen visible before enabling JS-driven reveal styles.
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            if (inView) {
                el.classList.add('active');
            }
        });

        document.documentElement.classList.add('js-reveal');
        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }

    const renderMermaidDiagrams = async () => {
        const diagrams = document.querySelectorAll('.mermaid');
        for (const diagram of diagrams) {
            try {
                await mermaid.run({ nodes: [diagram] });
            } catch (error) {
                console.error('Mermaid render failed:', error);
                const container = diagram.closest('.mermaid-container');
                if (container) {
                    container.classList.add('mermaid-error');
                }
            }
        }
    };

    renderMermaidDiagrams();

    // Handle Mermaid Zoom Buttons
    const mermaidContainers = document.querySelectorAll('.mermaid-container');
    mermaidContainers.forEach(container => {
        const zoomBtn = document.createElement('button');
        zoomBtn.className = 'zoom-btn';
        zoomBtn.innerText = 'Zoom Diagram';
        container.appendChild(zoomBtn);

        zoomBtn.addEventListener('click', () => {
            const svg = container.querySelector('.mermaid svg');
            if (svg) {
                activeModalSvg = svg.cloneNode(true);
                const { width, height } = getSvgDimensions(svg);
                modalBaseWidth = width;
                modalBaseHeight = height;
                modalInner.innerHTML = '';
                modalInner.appendChild(activeModalSvg);
                modal.style.display = 'flex';
                requestAnimationFrame(() => {
                    setInitialModalZoom();
                    modal.classList.add('active');
                });
            }
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header glassmorphism effect on scroll
    const header = document.querySelector('body > header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
                header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.8)';
                header.style.boxShadow = 'none';
            }
        });
    }
});
