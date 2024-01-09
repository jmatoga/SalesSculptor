import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function ViewCampaign() {
  const [campaign, setCampaign] = useState({
    campaignId: "",
    name: "",
    keywords: "",
    bidAmount: "",
    fund: "",
    status: "ON",
    town: {
      townId: "",
      townName: "",
    },
    radius: "",
    product: {
      productId: "",
      productName: "",
      productDesc: "",
      productPrice: "",
    },
    account: {
      accountId: sessionStorage.getItem("loggedId"),
      accountOwner: "",
      balance: "",
    },
  });
  const [loggedIn, setLoggedIn] = useState(false);

  let navigate = useNavigate();

  const { id } = useParams();

  const loadCampaign = async () => {
    try {
      const result = await axios.get(`http://localhost:8090/campaigns/${id}`);
      setCampaign(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setLoggedIn(false);
    alert("Logged out successfully!");
    navigate("/");
  };

  useEffect(() => {
    loadCampaign();
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 order-md-1 border rounded p-4 mt-2 shadow h-100">
          <h5 className="text-center mb-4">Balance</h5>
          <h3 className="text-center">
            <b>Account owner: </b>
            <br></br>
            {campaign.account.accountOwner}
          </h3>
          <h4 className="text-center">
            ${campaign.account.balance}
            <br></br>
            <br></br>
          </h4>
          <form action="" onSubmit={handleLogout}>
            <button type="submit" className="btn btn-outline-danger w-100">
              Log out
            </button>
          </form>
        </div>
        <div className="col-md-9 order-md-2 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Campaign Details</h2>
          <div className="card">
            <div className="card-header">
              Details of campaign with id: <b>{campaign.campaignId}</b>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name: </b>
                  {campaign.name}
                </li>
                <li className="list-group-item">
                  <b>Product: </b>
                  {campaign.product.productName}
                </li>
                <li className="list-group-item">
                  <b>Product Description: </b>
                  <br></br>
                  {campaign.product.productDesc}
                </li>
                <li className="list-group-item">
                  <b>Product Price: </b>
                  {campaign.product.productPrice + "$"}
                </li>
                <li className="list-group-item">
                  <b>Keywords: </b>
                  <br></br>
                  {campaign.keywords}
                </li>
                <li className="list-group-item">
                  <b>Bid amount: </b>
                  {campaign.bidAmount}$
                </li>
                <li className="list-group-item">
                  <b>Fund: </b>
                  {campaign.fund}$
                </li>
                <li className="list-group-item">
                  <b>Status: </b>
                  <i>{campaign.status}</i>
                </li>
                <li className="list-group-item">
                  <b>Town: </b>
                  {campaign.town.townName}
                </li>
                <li className="list-group-item">
                  <b>Radius: </b>
                  {campaign.radius} km
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to="/campaigns">
            Back to list of campaigns
          </Link>
        </div>
      </div>
    </div>
  );
}
