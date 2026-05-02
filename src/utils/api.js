const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function sendContactEmail(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send message');
    }

    return result;
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw error;
  }
}
