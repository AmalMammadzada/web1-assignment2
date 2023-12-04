// Function to display detailed product information and gallery for all products
const displayProductInfo = (products) => {
  const productContainer = document.getElementById('products-container');

  if (!products || products.length === 0) {
    productContainer.innerHTML = '<p>No products available.</p>';
    return;
  }

  productContainer.innerHTML = ''; // Clear previous content

  products.forEach((product) => {
    const productDetailContainer = document.createElement('div');
    productDetailContainer.classList.add('product-detail');

    if (!product || !product.images || !Array.isArray(product.images) || product.images.length === 0) {
      productDetailContainer.innerHTML = '<p>No product details available.</p>';
    } else {
      const title = document.createElement('h2');
      title.textContent = product.title;
      productDetailContainer.appendChild(title);

      const price = document.createElement('p');
      price.textContent = `Price: $${product.price}`;
      productDetailContainer.appendChild(price);

      const discount = document.createElement('p');
      discount.textContent = `Discount: ${product.discountPercentage}%`;
      productDetailContainer.appendChild(discount);

      const category = document.createElement('p');
      category.textContent = `Category: ${product.category}`;
      productDetailContainer.appendChild(category);

      const galleryContainer = document.createElement('div');
      galleryContainer.classList.add('gallery-container');

      product.images.forEach((imageUrl) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = product.title;
        galleryContainer.appendChild(img);
      });

      productDetailContainer.appendChild(galleryContainer);
    }

    productContainer.appendChild(productDetailContainer);
  });
};

// Example data for testing (replace this with actual data from the API)
const sampleProducts = [
  // Sample product objects here
];

// Displaying sample data (for testing purposes)
displayProductInfo(sampleProducts); // Replace this line with the API call in your code
