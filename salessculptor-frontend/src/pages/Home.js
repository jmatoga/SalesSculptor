import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [main, setMain] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const mainResponse = await axios.get("http://localhost:8090/campaigns");
      const mainData = mainResponse.data.map((data) => ({
        campaignId: data.campaignId,
        name: data.name,
        productName: data.product.productName,
        productPrice: data.product.productPrice,
        keywords: data.keywords,
        bidAmount: data.bidAmount,
        fund: data.fund,
        status: data.status,
        town: data.town.townName,
        radius: data.radius,
      }));
      setMain(mainData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const deleteCampaign = async (id) => {
    await axios.delete(`http://localhost:8090/campaigns/${id}`);
    fetchData();
  };

  return (
    <div className="container-fluid">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Product</th>
              <th scope="col">Keywords</th>
              <th scope="col">Bid amount</th>
              <th scope="col">Fund</th>
              <th scope="col">Status</th>
              <th scope="col">Town</th>
              <th scope="col">Radius</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {main.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.productName + " - " + data.productPrice + "$"}</td>
                <td>{data.keywords}</td>
                <td>{data.bidAmount}</td>
                <td>{data.fund}</td>
                <td>{data.status}</td>
                <td>{data.town}</td>
                <td>{data.radius}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-1"
                    to={`/viewCampaign/${data.campaignId}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-1"
                    to={`/editCampaign/${data.campaignId}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger mx-1"
                    onClick={() => deleteCampaign(data.campaignId)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
