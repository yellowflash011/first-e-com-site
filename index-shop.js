document.querySelectorAll(".cart").forEach((icon) => {
  icon.addEventListener("click", () => {
    const product = icon.closest(".pro");
    const id = product.dataset.productId;
    fetch("products.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then((products) => {
        const p = products.find((p) => p.id === id);
        if (!p) {
          alert("Product not found!");
          return;
        }
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existing = cart.find((item) => item.id === id);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({
            id: p.id,
            name: p.name,
            price: parseFloat(p.price.replace("$", "")) || 0,
            image: p.mainImage,
            quantity: 1,
          });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${p.name} added to cart!`);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("Error adding item to cart.");
      });
  });
});
