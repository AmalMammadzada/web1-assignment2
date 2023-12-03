const productList = document.getElementById('productList');
const endpoint = 'https://dummyjson.com/products';

// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Initialize the page with fetched products
async function init() {
  const products = await fetchData();
  if (products) {
    displayProducts(products);
  } else {
    // Handle error scenario
    productList.innerHTML = '<p>Failed to fetch data. Please try again later.</p>';
  }
}

// Call the init function to start the application
init();
