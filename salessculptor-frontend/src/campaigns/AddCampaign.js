import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddCampaign() {
  const [towns, setTowns] = useState([]);
  const [products, setProducts] = useState([]);
  const [keywordsList, setKeywordsList] = useState([]);
  const [campaign, setCampaign] = useState({
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
      productPrice: "",
    },
    account: {
      accountId: sessionStorage.getItem("loggedId"),
      accountOwner: "",
      balance: "",
    },
  });
  const [bidAmountErrorMessage, setBidAmountErrorMessage] = useState("");
  const [fundErrorMessage, setFundErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  let navigate = useNavigate();

  const handleKeywordChange = (selectedOption) => {
    const keywordsString = selectedOption
      ? selectedOption.map((option) => option.label).join(", ")
      : "";
    setCampaign({ ...campaign, keywords: keywordsString });
  };

  const handleTownChange = (selectedOption) => {
    if (selectedOption) {
      setCampaign({
        ...campaign,
        town: {
          townId: selectedOption.value,
          townName: selectedOption.label,
        },
      });
    }
  };

  const handleProductChange = (selectedOption) => {
    if (selectedOption) {
      const { value, label } = selectedOption;
      const [productId, rest] = label.split(". ");
      const [productName, productPrice] = rest.split(" - ");
      setCampaign({
        ...campaign,
        product: {
          productId: productId,
          productName: productName,
          productPrice: productPrice.slice(0, -1), // delete $ sign
        },
      });
    }
  };

  const fetchData = async () => {
    try {
      const mainResponse = await axios.get(
        `http://localhost:8090/dropDownListOptions/${sessionStorage.getItem(
          "loggedId"
        )}`
      );

      const { product, town, keyword, account } = mainResponse.data;
      const productsData = product.map((product) => ({
        value: product.productId.toString(),
        label: `${product.productId}. ${product.productName} - ${product.productPrice}$`,
      }));
      setProducts(productsData);

      const townsData = town.map((town) => ({
        value: town.townId,
        label: town.townName,
      }));
      setTowns(townsData);

      const keywordsData = keyword.map((keyword) => ({
        value: keyword.keywordId.toString(),
        label: keyword.keywordName,
      }));
      setKeywordsList(keywordsData);

      setCampaign({
        ...campaign,
        account: {
          accountId: account.accountId,
          accountOwner: account.accountOwner,
          balance: account.balance,
        },
      });
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { productId, name, keywords, bidAmount, fund, status, town, radius } =
    campaign;

  const onInputChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setLoggedIn(false);
    alert("Logged out successfully!");
    navigate("/");
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // to make normal look of link

    if (parseFloat(bidAmount) < 1) {
      setBidAmountErrorMessage("Bid Amount should be at least 1$");
      return;
    }

    if (parseFloat(fund) <= 0) {
      setFundErrorMessage("Bid Amount should be at least 1$");
      return;
    } else if (parseFloat(fund) > campaign.account.balance) {
      setFundErrorMessage("Fund cannot be greater than balance");
      return;
    }

    setCampaign({
      ...campaign,
      account: {
        balance: (campaign.account.balance -= parseFloat(fund)),
      },
    });

    await axios.post("http://localhost:8090/campaigns/addCampaign", campaign);
    navigate("/campaigns");
  };

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
          <h2 className="text-center mb-4">Add Campaign</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Name of your Campaign"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="products">Product</label>
              <Select
                id="products"
                name="products"
                options={products}
                onChange={handleProductChange}
                value={products.find((option) => option.value === productId)}
                placeholder="Select product"
                isSearchable
                isClearable
                required
                onInvalid={(e) => {
                  e.target.setCustomValidity("Please select a product");
                }}
                onBlur={(e) => {
                  e.target.setCustomValidity("");
                }}
                styles={{
                  control: (provided) => ({ ...provided, textAlign: "left" }),
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="keywords">Keywords</label>
              <Select
                id="keywords"
                name="keywords"
                options={keywordsList}
                onChange={handleKeywordChange}
                value={keywordsList.filter((option) =>
                  campaign.keywords.includes(option.label)
                )}
                placeholder="Select keywords..."
                isSearchable
                isClearable
                required
                isMulti // to allow multiple keywords
                onInvalid={(e) => {
                  e.target.setCustomValidity("Please select keywords");
                }}
                onBlur={(e) => {
                  e.target.setCustomValidity("");
                }}
                styles={{
                  control: (provided) => ({ ...provided, textAlign: "left" }),
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="BidAmount" className="form-label">
                Bid Amount
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter bid amount (min 1$)"
                name="bidAmount"
                pattern="^\d+(\.\d{1,2})?$"
                value={bidAmount}
                onChange={(e) => onInputChange(e)}
                onInvalid={(e) => {
                  e.target.setCustomValidity(
                    "Please enter a number with up to two decimal places"
                  );
                }}
                onBlur={(e) => {
                  e.target.setCustomValidity("");
                }}
              />
              {bidAmountErrorMessage && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  {bidAmountErrorMessage}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Fund" className="form-label">
                Fund
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter fund"
                name="fund"
                pattern="^\d+(\.\d{1,2})?$"
                value={fund}
                onChange={(e) => onInputChange(e)}
                onInvalid={(e) => {
                  e.target.setCustomValidity(
                    "Please enter a number with up to two decimal places"
                  );
                }}
                onBlur={(e) => {
                  e.target.setCustomValidity("");
                }}
              />
              {fundErrorMessage && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  {fundErrorMessage}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Status" className="form-label">
                Status
              </label>
              <select
                className="form-control"
                name="status"
                value={status}
                onChange={(e) => onInputChange(e)}
              >
                <option value="ON">ON</option>
                <option value="OFF">OFF</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="towns" className="form-label">
                Town
              </label>
              <Select
                id="towns"
                name="towns"
                options={towns}
                onChange={handleTownChange}
                value={towns.find((option) => option.value === town)}
                placeholder="Select a town"
                isSearchable
                isClearable
                required
                onInvalid={(e) => {
                  e.target.setCustomValidity("Please select a town");
                }}
                onBlur={(e) => {
                  e.target.setCustomValidity("");
                }}
                styles={{
                  control: (provided) => ({ ...provided, textAlign: "left" }),
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Radius" className="form-label">
                Radius
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter radius in kilometers"
                name="radius"
                pattern="\d+"
                value={radius}
                onChange={(e) => onInputChange(e)}
                onInvalid={(e) => {
                  e.target.setCustomValidity(
                    "Please enter a valid number in kilometers"
                  );
                }}
                onBlur={(e) => {
                  e.target.setCustomValidity("");
                }}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <Link className="btn btn-danger mx-2" to="/campaigns">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
