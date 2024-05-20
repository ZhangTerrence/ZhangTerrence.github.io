const PUBLIC_KEY = "pjwb13dwz8i3vOpg4"
const SERVICE_ID = "service_lmvn4vk"
const TEMPLATE_ID = "template_nspml0n"

function initAnchors() {
    const sectionLinks = document.querySelectorAll('.section_link');

    sectionLinks.forEach(sectionLink => {
        sectionLink.addEventListener('click', () => {
            const section = sectionLink.getAttribute('data-section');
            const sectionElement = document.getElementById(section);

            sectionElement.scrollIntoView({
                block: 'start', behavior: 'smooth',
            })
        })
    })
}

function initEmailJs() {
    emailjs.init({
        publicKey: PUBLIC_KEY,
    });
}

(function main() {
    initAnchors();
    initEmailJs();

    const contactForm = document.getElementById('contact__form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        for (const [_, value] of Object.entries(Object.fromEntries(new FormData(contactForm)))) {
            if (typeof value !== "string" || value.trim().length === 0) {
                return;
            }
        }

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, "#contact__form", {})
            .then(response => console.log(response))
            .catch(error => console.log(error));

        e.currentTarget.reset();
    })
})();

