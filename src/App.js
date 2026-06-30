import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const shortDesc = (text) => {
    return text.length > 100 ? text.slice(0, 100) + "..." : text;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Fake Store Products</h1>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {products.map((item) => (
          <div
            key={item.id}
            style={{
              width: "220px",
              border: "1px solid #ddd",
              margin: "10px",
              padding: "10px",
              borderRadius: "10px"
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />

            <h4>{item.title.slice(0, 30)}</h4>

            <p>{shortDesc(item.description)}</p>

            <p><b>${item.price}</b></p>

            {item.description.length > 100 && (
              <button
                onClick={() => setSelectedProduct(item)}
                style={{
                  padding: "5px 10px",
                  cursor: "pointer"
                }}
              >
                View
              </button>
            )}
          </div>
        ))}
      </div>

      
      {selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "500px"
            }}
          >
            <h2>{selectedProduct.title}</h2>

            <img
              src={selectedProduct.image}
              alt=""
              style={{ width: "120px" }}
            />

            <p>{selectedProduct.description}</p>

            <h4>${selectedProduct.price}</h4>

            <button onClick={() => setSelectedProduct(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;