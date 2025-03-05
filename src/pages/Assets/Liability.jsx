import React, { useState, useEffect } from "react";
import axios from "axios";

const LibalityManagement = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_APP_IMAGE}/apis/assests/get/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAssets(response.data.assets || []);
      } catch (err) {
        console.error("Error fetching assets:", err);
        setError("Failed to load assets");
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  // ✅ Calculate total quantity & total price
  let totalQuantity = 0;
  let totalPrice = 0;

  assets.forEach((asset) => {
    const quantity = asset.stock || asset.quantity || 0;
    const price = parseFloat(asset.landing_cost || asset.amount || 0);
    totalQuantity += quantity;
    totalPrice += quantity * price;
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Asset Management</h2>
      
      {loading ? (
        <p className="text-center">Loading assets...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : (
        <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price (Per Item)</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => {
                const quantity = asset.stock || asset.quantity || 0;
                const price = parseFloat(asset.landing_cost || asset.amount || 0);
                const total = quantity * price;

                return (
                  <tr key={index}>
                    <td>{asset.name}</td>
                    <td>{quantity}</td>
                    <td>₹{price.toFixed(2)}</td>
                    <td>₹{total.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Show Total only if there are valid values */}
      {totalQuantity > 0 && totalPrice > 0 && (
        <div className="text-end mt-3">
          <h5>Total Quantity: <strong>{totalQuantity}</strong></h5>
          <h5>Total Price: <strong>₹{totalPrice.toFixed(2)}</strong></h5>
        </div>
      )}
    </div>
  );
};

export default LibalityManagement;
