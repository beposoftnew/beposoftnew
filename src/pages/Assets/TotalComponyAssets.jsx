import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TotalComponyAssets = () => {
  const [chartData, setChartData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLiabilities = fetch("https://bepocart.in/apis/liability/get/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
      .then((res) => res.json())
      .then((data) => data.liabilities.map((item) => ({
        name: item.emi_name,
        liabilities: item.pending_amount,
        assets: 0 // Default to 0, to be merged later
      })));

    const fetchAssets = fetch("https://bepocart.in/apis/get/asset/report/", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
      .then((res) => res.json())
      .then((data) => {
        const processedAssets = data.assets.flatMap((category) =>
          category.products
            .filter(product => product.landing_cost && product.stock > 0) // Ignore null costs or zero stock
            .map(product => ({
              name: product.name,
              liabilities: 0, // Default to 0, to be merged later
              assets: product.landing_cost * product.stock
            }))
        );
        return processedAssets;
      });

    Promise.all([fetchLiabilities, fetchAssets])
      .then(([liabilityData, assetData]) => {
        const mergedData = [...liabilityData, ...assetData];
        setChartData(mergedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{marginTop:"90px"}}>
      <h2>Company Profile: Liabilities vs Assets</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="liabilities" stroke="#FF0000" name="Liabilities" />
          <Line type="monotone" dataKey="assets" stroke="#008000" name="Assets" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalComponyAssets;
