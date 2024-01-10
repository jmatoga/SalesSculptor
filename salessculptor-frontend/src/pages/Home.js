import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Home({ handleLogoutApp }) {
  const [main, setMain] = useState([]);
  const [account, setAccount] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const mainResponse = await axios.get(
        `http://localhost:8090/campaigns/list/${sessionStorage.getItem(
          "loggedId"
        )}`
      );
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
        balance: data.account.balance,
      }));
      setMain(mainData);

      // even if no campaigns, we can see balance
      const accountResponse = await axios.get(
        `http://localhost:8090/accounts/${sessionStorage.getItem("loggedId")}`
      );
      setAccount(accountResponse.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const deleteCampaign = async (id) => {
    await axios.delete(`http://localhost:8090/campaigns/${id}`);
    fetchData();
  };

  const handleLogout = () => {
    sessionStorage.clear();
    handleLogoutApp();
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 order-md-1 border rounded p-4 mt-2 shadow h-100">
          <h5 className="text-center mb-4">Balance</h5>
          <h3>
            <b>Account owner:</b>
            <br />
            {account.accountOwner}
          </h3>
          <h4>
            ${account.balance}
            <br />
            <br />
          </h4>
          <form action="" onSubmit={handleLogout}>
            <button type="submit" className="btn btn-outline-danger w-100">
              Log out
            </button>
          </form>
        </div>

        <div className="col-md-9">
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
                    <td>
                      <i>
                        <b>{data.name}</b>
                      </i>
                    </td>
                    <td>
                      {data.productName + " - " + data.productPrice + "$"}
                    </td>
                    <td>{data.keywords}</td>
                    <td>{data.bidAmount}$</td>
                    <td>{data.fund}$</td>
                    <td>
                      <i>{data.status}</i>
                    </td>
                    <td>{data.town}</td>
                    <td>{data.radius} km</td>
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
      </div>
    </div>
  );
}
