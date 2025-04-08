import { fetchMedications } from './model.js';
import { renderMedications } from './view.js';

export async function loadMedications() {
    const medications = await fetchMedications();
    renderMedications(medications);
} 

document.addEventListener('DOMContentLoaded', () => {
    loadMedications();

    if (window.currentUser) {
        document.getElementById('addBtn')?.classList.remove('hidden');
        document.querySelectorAll('.delete-btn').forEach(btn => btn.classList.remove('hidden'));
    } else {
        document.getElementById('addBtn')?.classList.add('hidden');
        document.querySelectorAll('.delete-btn').forEach(btn => btn.classList.add('hidden'));
    }
});

