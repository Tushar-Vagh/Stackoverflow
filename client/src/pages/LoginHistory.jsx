import React, { useEffect, useState } from "react";
import { getLoginHistory } from "../api";
import LoginHistoryCard from "../components/LoginHistoryCard";

const LoginHistory = () => {
  const [loginhistory, setLoginhistory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getLoginHistory()
      .then((res) => setLoginhistory(res.data.loginHistory))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <div style={{ marginTop: "50px", padding: "20px" }} className="">
      <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
        {loginhistory &&
          !isLoading &&
          loginhistory.map((history) => (
            <LoginHistoryCard history={history} key={history._id} />
          ))}
      </div>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading && <div style={{ fontSize: "40px" }}>Loading...</div>}
      </div>
    </div>
  );
};

export default LoginHistory;
