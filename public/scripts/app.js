import { loadMedications } from '/scripts/controller.js';



document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/') {
        loadMedications();    
    }
});


