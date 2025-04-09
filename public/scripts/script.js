import { deleteMedication } from '/scripts/model.js';

export async function checkAuthentication() {
    try {
        const response = await fetch('/auth/status');
        const data = await response.json();

        if (data.authenticated) {
            // User is logged in, show buttons
            showButtons();
            
            
        } else {
            // User is not logged in, hide buttons
            console.log('User is not logged in');
        }
    } catch (error) {
        console.error('Error fetching authentication status:', error);
    }
}

function showButtons() {
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.classList.remove('hidden');
        button.addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            try {
                await deleteMedication(id);
                event.target.closest('.medication-card').remove();
            } catch (error) {
                console.error('Error deleting medication:', error);
            }
        });
    });
    const addBtn = document.querySelector('#addBtn');
    addBtn.classList.remove('hidden');
    addBtn.addEventListener('click', () => {
        window.location.href = '/addMedication';
    });
}



