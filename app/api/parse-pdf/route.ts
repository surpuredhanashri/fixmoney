// Temporary placeholder response - PDF parsing temporarily disabled
export async function POST() {
  return new Response(JSON.stringify({ error: 'PDF parsing temporarily disabled' }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' }
  });
} 