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
