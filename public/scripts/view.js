import { checkAuthentication } from "/scripts/script.js";

export function renderMedications(medications) {
    const container = document.getElementById('medications-container');
    container.innerHTML = '';
    medications.forEach(med => {
        const div = document.createElement('div');
        div.classList.add('medication-card');
        div.innerHTML = `
            <h3>${med.brand_name}</h3>
            <p><strong>Generic Name:</strong> ${med.generic_name}</p>
            <p><strong>Manufacturer:</strong> ${med.manufacturer}</p>
            <p><strong>Dosage Strengths:</strong> ${med.dosage_strengths}</p>
            <p><strong>Dosage Forms:</strong> ${med.dosage_forms}</p>
            <p><strong>Drug Class:</strong> ${med.drug_class}</p>
            <button class="delete-btn hidden" data-id="${med._id}">Delete</button>
        `;
        container.appendChild(div);
    });

    checkAuthentication();
}

