const fs = require('fs');
const FormData = require('form-data');

// Test the PDF parsing API
async function testPDFParsing() {
  try {
    // Create a simple test PDF content (this is just for testing)
    const testContent = `
Date: 01/01/2024
Description: Salary Credit
Amount: 50000.00

Date: 02/01/2024
Description: Restaurant Payment
Amount: 1200.00

Date: 03/01/2024
Description: Fuel Payment
Amount: 2500.00
    `;
    
    console.log('Testing PDF parsing with content:', testContent);
    
    // Test the API endpoint
    const response = await fetch('http://localhost:3001/api/analyze-statement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: testContent,
        fileType: 'pdf'
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Success:', data);
    } else {
      console.error('Error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testPDFParsing(); 