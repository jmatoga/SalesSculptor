import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditCampaign() {
  const [towns, setTowns] = useState([]);
  const [products, setProducts] = useState([]);
  const [keywordsList, setKeywordsList] = useState([]);
  const [oldValues, setOldValues] = useState({
    bidAmount: "",
    fund: "",
  });

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
      accountId: "",
      accountOwner: "",
      balance: "",
    },
  });
  const [bidAmountErrorMessage, setBidAmountErrorMessage] = useState("");
  const [fundErrorMessage, setFundErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  let navigate = useNavigate();
  const { id } = useParams();

  const handleLogout = () => {
    sessionStorage.clear();
    setLoggedIn(false);
    alert("Logged out successfully!");
    navigate("/");
  };

  useEffect(() => {
    fetchData();
  }, [id]);

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
        `http://localhost:8090/campaigns/withDropDownListOptions/${id}`
      );

      const { campaign, product, town, keyword } = mainResponse.data;
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
        campaignId: campaign.campaignId,
        name: campaign.name,
        product: {
          productId: campaign.product.productId.toString(),
          productName: campaign.product.productName,
          productPrice: campaign.product.productPrice,
        },
        keywords: campaign.keywords,
        bidAmount: campaign.bidAmount,
        fund: campaign.fund,
        status: campaign.status,
        town: {
          townId: campaign.town.townId.toString(),
          townName: campaign.town.townName,
        },
        radius: campaign.radius,
        account: {
          accountId: campaign.account.accountId.toString(),
          accountOwner: campaign.account.accountOwner,
          balance: campaign.account.balance,
        },
      });

      setOldValues({
        bidAmount: campaign.bidAmount,
        fund: campaign.fund,
      });
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const onInputChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (parseFloat(oldValues.fund) > parseFloat(campaign.fund)) {
      setFundErrorMessage("Fund cannot be less than previous fund");
      return;
    } else if (
      parseFloat(campaign.fund - oldValues.fund) >
      parseFloat(campaign.account.balance)
    ) {
      setFundErrorMessage("Added fund cannot be greater than balance");
      return;
    } else {
      setFundErrorMessage("");
    }

    if (parseFloat(campaign.bidAmount) < 1.0) {
      setBidAmountErrorMessage("Bid Amount should be at least 1$");
      return;
    }
    if (parseFloat(campaign.bidAmount) > parseFloat(campaign.fund)) {
      setBidAmountErrorMessage("Bid Amount cannot be greater than fund");
      return;
    }

    setCampaign({
      ...campaign,
      account: {
        balance: (campaign.account.balance -=
          parseFloat(campaign.fund) - parseFloat(oldValues.fund)),
      },
    });

    await axios.put(`http://localhost:8090/campaigns/${id}`, campaign);
    navigate("/campaigns");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 order-md-1 border rounded p-4 mt-2 shadow h-100">
          <h5 className="text-center mb-4">Balance</h5>
          <h3 className="text-center">
            <b>Account owner: </b>
            <br />
            {campaign.account.accountOwner}
          </h3>
          <h4 className="text-center">
            ${campaign.account.balance}
            <br />
            <br />
          </h4>
          <form action="" onSubmit={handleLogout}>
            <button type="submit" className="btn btn-outline-danger w-100">
              Log out
            </button>
          </form>
        </div>
        <div className="col-md-9 order-md-2 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Campaign</h2>
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
                value={campaign.name}
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
                value={{
                  value: campaign.product.productId,
                  label: `${campaign.product.productId}. ${campaign.product.productName} - ${campaign.product.productPrice}$`,
                }}
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
                placeholder="Enter bid amount"
                name="bidAmount"
                pattern="^\d+(\.\d{1,2})?$"
                value={campaign.bidAmount}
                onChange={(e) => {
                  onInputChange(e);
                }}
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
                value={campaign.fund}
                onChange={(e) => {
                  onInputChange(e);
                }}
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
                value={campaign.status}
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
                value={{
                  value: campaign.town.townId,
                  label: campaign.town.townName,
                }}
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
                value={campaign.radius}
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

  // return (
  //   <div className="container">
  //     <div className="row">
  //       <div className="col-md-3 border rounded p-4 mt-2 shadow">
  //         <h5 className="text-center mb-4">Balance</h5>
  //         <h3 className="text-center">${campaign.account.balance}</h3>
  //         {/* add account info */}
  //       </div>
  //       <div className="col-md-9 border rounded p-4 mt-2 shadow">
  //         <h2 className="text-center mb-4">Edit Campaign</h2>
  //         <form onSubmit={(e) => onSubmit(e)}>
  //           <div className="mb-3">
  //             <label htmlFor="Name" className="form-label">
  //               Name
  //             </label>
  //             <input
  //               type={"text"}
  //               className="form-control"
  //               placeholder="Enter Name of your Campaign"
  //               name="name"
  //               value={campaign.name}
  //               onChange={(e) => onInputChange(e)}
  //             />
  //           </div>
  //           <div className="mb-3">
  //             <label htmlFor="products">Product</label>
  //             <Select
  //               id="products"
  //               name="products"
  //               options={products}
  //               onChange={handleProductChange}
  //               value={{
  //                 value: campaign.product.productId,
  //                 label: `${campaign.product.productId}. ${campaign.product.productName} - ${campaign.product.productPrice}$`,
  //               }}
  //               placeholder="Select product"
  //               isSearchable
  //               isClearable
  //               required
  //               onInvalid={(e) => {
  //                 e.target.setCustomValidity("Please select a product");
  //               }}
  //               onBlur={(e) => {
  //                 e.target.setCustomValidity("");
  //               }}
  //               styles={{
  //                 control: (provided) => ({ ...provided, textAlign: "left" }),
  //               }}
  //             />
  //           </div>
  //           <div className="mb-3">
  //             <label htmlFor="keywords">Keywords</label>
  //             <Select
  //               id="keywords"
  //               name="keywords"
  //               options={keywordsList}
  //               onChange={handleKeywordChange}
  //               value={keywordsList.filter((option) =>
  //                 campaign.keywords.includes(option.label)
  //               )}
  //               placeholder="Select keywords..."
  //               isSearchable
  //               isClearable
  //               required
  //               isMulti // to allow multiple keywords
  //               onInvalid={(e) => {
  //                 e.target.setCustomValidity("Please select keywords");
  //               }}
  //               onBlur={(e) => {
  //                 e.target.setCustomValidity("");
  //               }}
  //               styles={{
  //                 control: (provided) => ({ ...provided, textAlign: "left" }),
  //               }}
  //             />
  //           </div>
  //           <div className="mb-3">
  //             <label htmlFor="BidAmount" className="form-label">
  //               Bid Amount
  //             </label>
  //             <input
  //               type={"text"}
  //               className="form-control"
  //               placeholder="Enter bid amount"
  //               name="bidAmount"
  //               pattern="^\d+(\.\d{1,2})?$"
  //               value={campaign.bidAmount}
  //               onChange={(e) => {
  //                 onInputChange(e);
  //               }}
  //               onInvalid={(e) => {
  //                 e.target.setCustomValidity(
  //                   "Please enter a number with up to two decimal places"
  //                 );
  //               }}
  //               onBlur={(e) => {
  //                 e.target.setCustomValidity("");
  //               }}
  //             />
  //             {bidAmountErrorMessage && (
  //               <p style={{ color: "red", marginTop: "5px" }}>
  //                 {bidAmountErrorMessage}
  //               </p>
  //             )}
  //           </div>
  //           <div className="mb-3">
  //             <label htmlFor="Fund" className="form-label">
  //               Fund
  //             </label>
  //             <input
  //               type={"text"}
  //               className="form-control"
  //               placeholder="Enter fund"
  //               name="fund"
  //               pattern="^\d+(\.\d{1,2})?$"
  //               value={campaign.fund}
  //               onChange={(e) => {
  //                 onInputChange(e);
  //               }}
  //               onInvalid={(e) => {
  //                 e.target.setCustomValidity(
  //                   "Please enter a number with up to two decimal places"
  //                 );
  //               }}
  //               onBlur={(e) => {
  //                 e.target.setCustomValidity("");
  //               }}
  //             />
  //             {fundErrorMessage && (
  //               <p style={{ color: "red", marginTop: "5px" }}>
  //                 {fundErrorMessage}
  //               </p>
  //             )}
  //           </div>
  //           <div className="mb-3">
  //             <label htmlFor="Status" className="form-label">
  //               Status
  //             </label>
  //             <select
  //               className="form-control"
  //               name="status"
  //               value={campaign.status}
  //               onChange={(e) => onInputChange(e)}
  //             >
  //               <option value="ON">ON</option>
  //               <option value="OFF">OFF</option>
  //             </select>
  //           </div>
  //           <div className="mb-3">
  //             <label htmlFor="towns" className="form-label">
  //               Town
  //             </label>
  //             <Select
  //               id="towns"
  //               name="towns"
  //               options={towns}
  //               onChange={handleTownChange}
  //               value={{
  //                 value: campaign.town.townId,
  //                 label: campaign.town.townName,
  //               }}
  //               placeholder="Select a town"
  //               isSearchable
  //               isClearable
  //               required
  //               onInvalid={(e) => {
  //                 e.target.setCustomValidity("Please select a town");
  //               }}
  //               onBlur={(e) => {
  //                 e.target.setCustomValidity("");
  //               }}
  //               styles={{
  //                 control: (provided) => ({ ...provided, textAlign: "left" }),
  //               }}
  //             />
  //           </div>
  //           <div className="mb-3">
  //             <label htmlFor="Radius" className="form-label">
  //               Radius
  //             </label>
  //             <input
  //               type={"text"}
  //               className="form-control"
  //               placeholder="Enter radius in kilometers"
  //               name="radius"
  //               pattern="\d+"
  //               value={campaign.radius}
  //               onChange={(e) => onInputChange(e)}
  //               onInvalid={(e) => {
  //                 e.target.setCustomValidity(
  //                   "Please enter a valid number in kilometers"
  //                 );
  //               }}
  //               onBlur={(e) => {
  //                 e.target.setCustomValidity("");
  //               }}
  //             />
  //           </div>
  //           <button type="submit" className="btn btn-success">
  //             Submit
  //           </button>
  //           <Link className="btn btn-danger mx-2" to="/campaigns">
  //             Cancel
  //           </Link>
  //         </form>
  //       </div>
  //     </div>
  //     <div style={{ height: "100px" }}></div>
  //   </div>
  // );
}
