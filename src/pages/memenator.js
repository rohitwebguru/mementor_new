import "../assets/index.css";
import Header from "../components/header";
import { useRef } from "react";

function Memenator() {
  const frequencyQuestionRef = useRef(null);
  const PresaleRef = useRef(null);

  const handleScrollToFrequencyQuestion = () => {
    if (frequencyQuestionRef.current) {
      frequencyQuestionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleScrollToPresale = () => {
    if (PresaleRef.current) {
      PresaleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <Header  handleScrollToFrequencyQuestion={handleScrollToFrequencyQuestion} handleScrollToPresale={handleScrollToPresale}/>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-8 col-12">
            <div className="body-wrap-dashboard">
              <div className="dashboard-up">
                <div className="dashboard-container-center">
                  <div className="child-wrap-dashboard">
                    <div className="main-stat-token-con">
                      <div className="stat-token-con">
                        <h2>Memeinator Price</h2>
                        <p>$10.48</p> <p>USD</p>{" "}
                      </div>
                      <div className="stat-token-con">
                        <h2>Memeinator Circulating Supply / Total</h2>
                        <p>358,309 / 1,000,000</p>
                      </div>
                      <div className="stat-token-con">
                        <h2>Market Cap</h2>
                        <p>$3,755,082.55</p>
                      </div>
                      <div className="stat-token-con">
                        <h2>Treasury Value</h2>
                        <p>$6,447,520.94</p>
                      </div>
                      <div className="stat-token-con">
                        <h2>APR</h2>
                        <p>46.83%</p>
                      </div>
                      <div className="stat-token-con">
                        <h2>Percentage Of Supply Staked</h2>
                        <p>90.85%</p>
                      </div>
                    </div>
                    <div className="top-shader"></div>
                    <div className="left-shader"></div>
                    <div className="bottom-shader"></div>
                    <div className="right-shader"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-8 col-12">
            <div className="user-table">
              <table>
                <thead>
                  <tr>
                    <th>Staking Amount</th>
                    <th>Duration Of Staking</th>
                    <th>Earned Reward</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>$1000</td>
                    <td>6 months</td>
                    <td>$50</td>
                  </tr>
                  <tr>
                    <td>$2000</td>
                    <td>10 months</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                    <td>$1000</td>
                    <td>6 months</td>
                    <td>$50</td>
                  </tr>
                  <tr>
                    <td>$2000</td>
                    <td>10 months</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                    <td>$1000</td>
                    <td>6 months</td>
                    <td>$50</td>
                  </tr>
                  <tr>
                    <td>$2000</td>
                    <td>10 months</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                    <td>$1000</td>
                    <td>6 months</td>
                    <td>$50</td>
                  </tr>
                  <tr>
                    <td>$2000</td>
                    <td>10 months</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                    <td>$1000</td>
                    <td>6 months</td>
                    <td>$50</td>
                  </tr>
                  <tr>
                    <td>$2000</td>
                    <td>10 months</td>
                    <td>$100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Memenator;
