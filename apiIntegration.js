// Fetch product data from the API
const fetchProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.products; // Extracting only the products array from the response
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// Call the function to fetch products
fetchProducts()
  .then((products) => {
    if (products) {
      displayProductInfo(products); // Display all products
    } else {
      // Handle no data scenario
      console.log('No products fetched.');
    }
  });
