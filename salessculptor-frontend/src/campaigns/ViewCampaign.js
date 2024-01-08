import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewCampaign() {
  const [campaign, setCampaign] = useState({
    accountId: "1",
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
  });

  const balance = 1000;

  const { id } = useParams();

  const loadCampaign = async () => {
    try {
      const result = await axios.get(`http://localhost:8090/campaigns/${id}`);
      setCampaign(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCampaign();
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 offset-md-2 border rounded p-4 mt-2 shadow">
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
                  {campaign.product.productDesc}
                </li>
                <li className="list-group-item">
                  <b>Product Price: </b>
                  {campaign.product.productPrice}
                </li>
                <li className="list-group-item">
                  <b>Keywords: </b>
                  {campaign.keywords}
                </li>
                <li className="list-group-item">
                  <b>Bid amount: </b>
                  {campaign.bidAmount}
                </li>
                <li className="list-group-item">
                  <b>Fund: </b>
                  {campaign.fund}
                </li>
                <li className="list-group-item">
                  <b>Status: </b>
                  {campaign.status}
                </li>
                <li className="list-group-item">
                  <b>Town: </b>
                  {campaign.town.townName}
                </li>
                <li className="list-group-item">
                  <b>Radius: </b>
                  {campaign.radius}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to="/">
            Back to list of campaigns
          </Link>
        </div>
      </div>
    </div>
  );
}
