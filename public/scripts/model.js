export async function fetchMedications() {
    const response = await fetch('/medication', {
        method: 'GET',
        credentials: 'include', 
    });

    if (!response.ok) {
        throw new Error("Failed to fetch medications");
    }

    return response.json();
}

export async function deleteMedication(id) {
    const response = await fetch(`/medication/${id}`, {
        method: 'DELETE',
        credentials: 'include', 
    });

    if (!response.ok) {
        throw new Error("Failed to delete medication");
    }

    return response.json();
}

