import { fetchMedications } from './model.js';
import { renderMedications } from './view.js';

export async function loadMedications() {
    const medications = await fetchMedications();
    renderMedications(medications);
}
