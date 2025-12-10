// Simple diagnostic to check React mount and API connectivity
console.log('=== App Diagnostics ===');
console.log('Window location:', window.location.href);
console.log('Root element exists:', !!document.getElementById('root'));
console.log('Root innerHTML length:', document.getElementById('root')?.innerHTML?.length || 0);

// Check API
fetch('http://localhost:3001/books/')
  .then(res => {
    console.log('API Response status:', res.status);
    return res.json();
  })
  .then(data => {
    console.log('API Books count:', data?.length);
    console.log('First book:', data?.[0]);
  })
  .catch(err => console.error('API Error:', err.message));

// Check env
console.log('REACT_APP_API_URL env:', process.env.REACT_APP_API_URL);
console.log('=== End Diagnostics ===');
