const items = [
    { name: "(5/2) X (3/2) pipe", quantity: 4, unit: "ft", price: 0 },
    { name: "clip", quantity: 8, unit: "ft", price: 0 },
    { name: "eangle 1x1", quantity: 4/6, unit: "ft", price: 0 }, 
    { name: "fix rubber", quantity: 4, unit: "ft", price: 0 },
    { name: "glass 5mm", quantity: 1, unit: "sqft", price: 0 },
    { name: "screws 6x13", quantity: 16, unit: "pcs", price: 0 },
    { name: "screws 10x75", quantity: 4, unit: "pcs", price: 0 },
  ];
  
  function renderTable() {
    const tbody = document.getElementById('itemsTable');
    tbody.innerHTML = '';
    let grandTotal = 0;
    items.forEach((item, idx) => {
      const total = item.quantity * item.price;
      grandTotal += total;
      tbody.innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td><input type="number" value="${item.quantity}" min="0" onchange="updateItem(${idx}, 'quantity', this.value)"></td>
          <td>${item.unit}</td>
          <td><input type="number" id="price-input-${idx}" value="${item.price}" min="0" onchange="updateItem(${idx}, 'price', this.value)"></td>
          <td>${total.toFixed(2)}</td>
        </tr>
      `;
    });
    document.getElementById('grandTotal').innerText = grandTotal.toFixed(2);
  }
  
  function updateQuantities() {
    const width = Number(document.getElementById('width').value);
    const height = Number(document.getElementById('height').value);
  
    // Perimeter and area for scaling
    const baseWidth = 1, baseHeight = 1;
    const basePerimeter = 2 * (baseWidth + baseHeight); // 4
    const baseArea = baseWidth * baseHeight; // 1
  
    const perimeter = 2 * (width + height);
    const area = width * height;
  
    items[0].quantity = Math.round(4 * (perimeter / basePerimeter));      // pipe (perimeter)
    items[1].quantity = Math.round(8 * (perimeter / basePerimeter) * 2);  // clip (twice perimeter)
    items[2].quantity = +(4/6 * (perimeter / basePerimeter)).toFixed(2);  // eangle (perimeter, use 4.6 as base)
    items[3].quantity = Math.round(4 * (perimeter / basePerimeter));      // rubber (perimeter)
    items[4].quantity = Math.round(1 * (area / baseArea));                // glass (area)
    items[5].quantity = Math.round(16 * (perimeter/ baseArea));               // screws 6x13 (area)
    items[6].quantity = Math.round(4 * (perimeter / baseArea));                // screws 10x75 (area)
    
  
      renderTable();
}
  
function calculateTotal() {
    // Read prices from input fields and update items array
    items.forEach((item, idx) => {
      const priceInput = document.getElementById(`price-input-${idx}`);
      if (priceInput) {
        item.price = Number(priceInput.value);
      }
    });
  
    // Calculate grand total
    let grandTotal = 0;
    items.forEach(item => {
      grandTotal += item.quantity * item.price;
    });
    document.getElementById('grandTotal').innerText = grandTotal.toFixed(2);
  
    // Re-render table to update totals column
    renderTable();
  }
  
  // Initial render
  window.onload = renderTable; 