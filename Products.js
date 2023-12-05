// Fetching products data from the API
const fetchProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

// This is the function to display products based on category and search query
const displayProducts = (products, category, searchQuery, page) => {
  const productsPerPage = 10;
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;

  const filteredProducts = products.filter(
    product =>
      (category === 'all' || product.category.toLowerCase() === category.toLowerCase()) &&
      (searchQuery === '' ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const paginatedProducts = filteredProducts.slice(start, end);

  const productContainer = document.getElementById('products-container');
  productContainer.innerHTML = paginatedProducts
    .map(
      product => `
      <div class="product-detail">
        <h2>${product.title}</h2>
        <p>Price: $${product.price}</p>
        <p>Discount: ${product.discountPercentage}%</p>
        <p>Category: ${product.category}</p>
        <div class="gallery-container">
          ${product.images.map(imageUrl => `<img src="${imageUrl}" alt="${product.title}">`).join('')}
        </div>
        <button class="product-info-button">View Details</button>
      </div>
    `
    )
    .join('');

  displayPagination(filteredProducts.length, productsPerPage, page);

  // Adding new event listeners for the new buttons
  const productInfoButtons = document.querySelectorAll('.product-info-button');
  productInfoButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const productId = paginatedProducts[index].id; // Get the product ID
      window.open(`productDetails.html?id=${productId}`, '_blank'); // Open a new window with the product details page
    });
  });
};

// This function  displays pagination buttons
const displayPagination = (totalItems, itemsPerPage, currentPage) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    if (i === currentPage) {
      button.classList.add('active');
    }
    button.addEventListener('click', () => {
      displayProducts(currentCategoryProducts, currentCategory, currentSearchQuery, i);
    });
    paginationContainer.appendChild(button);
  }
};

// Global variables to store current state
let currentCategory = 'all';
let currentSearchQuery = '';
let currentCategoryProducts = [];

// This function handles the next and previous pagination
const handlePagination = (action) => {
  const paginationButtons = document.querySelectorAll('#pagination button');
  let currentPage = 1;

  paginationButtons.forEach(button => {
    if (button.classList.contains('active')) {
      currentPage = parseInt(button.innerText);
      button.classList.remove('active');
    }
  });

  if (action === 'next' && currentPage < paginationButtons.length) {
    displayProducts(currentCategoryProducts, currentCategory, currentSearchQuery, currentPage + 1);
  } else if (action === 'prev' && currentPage > 1) {
    displayProducts(currentCategoryProducts, currentCategory, currentSearchQuery, currentPage - 1);
  }
};

// Loading products and initially displaying first page
fetchProducts().then(products => {
  currentCategoryProducts = products;
  displayProducts(products, currentCategory, currentSearchQuery, 1);
});

// Listen/detect category changes
const categorySelect = document.getElementById('category');
categorySelect.addEventListener('change', async function () {
  currentCategory = this.value;
  const searchQuery = document.getElementById('search').value.trim();
  const products = await fetchProducts();
  currentCategoryProducts = products;
  displayProducts(products, currentCategory, searchQuery, 1);
});

// Listening search input
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', async function () {
  currentSearchQuery = this.value.trim();
  const selectedCategory = categorySelect.value;
  const products = await fetchProducts();
  currentCategoryProducts = products;
  displayProducts(products, selectedCategory, currentSearchQuery, 1);
});

// Listen to next and previous pagination buttons
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

nextButton.addEventListener('click', () => {
  handlePagination('next');
});

prevButton.addEventListener('click', () => {
  handlePagination('prev');
});
