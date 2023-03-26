import React, { useEffect, useState } from "react";

const DonateItem = ({data, donate, report, indx }) => {
    const [tokenAmount, setTokenAmount] = useState();
  return (
    <div className="donate-items">
      <div className="left-ctn">
        <h3>{data.subject}</h3>
        <p className="item">{data.description}</p>
        <span className="item">{`${data.fund_delivered}/${data.fund_required}`}</span>
      </div>
      <div className="right-ctn">
        {data.approved && (
          <>
            <input
              type="number"
              placeholder="Token amount"
              value={tokenAmount || ""}
              onChange={(e) => setTokenAmount(e.target.value)}
            />
            <button
              className="donate-btn"
              onClick={() => donate(indx, tokenAmount)}
            >
              Donate
            </button>
          </>
        )}
        <button
          className="report-btn"
          onClick={() => report(data.ngo_address)}
        >
          report
        </button>
      </div>
    </div>
  );
};

export default DonateItem;
