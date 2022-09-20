import { useState, useEffect } from "react";
import { VictoryPie, VictoryLabel } from "victory";
export default function MortCalc(props) {
  const [intrest, setIntrest] = useState(0);
  const [calculatordata, Setcalculatordata] = useState({
    hvalue: props.price,
    dpay: "",
    dper: "10",
    loanamt: "",
    intrate: "2.5",
    loanterm: "30",
  });
  const [calculated, setcalculated] = useState(null);

  useEffect(() => {
    let valll =
      (parseFloat(calculatordata.loanamt) *
        parseFloat(calculatordata.loanterm) *
        parseFloat(calculatordata.intrate)) /
      100;
    setIntrest(valll);
  }, [calculatordata.loanamt, calculatordata.loanterm, calculatordata.intrate]);

  useEffect(() => {
    let dpayment =
      (parseInt(calculatordata.dper) / 100) * parseInt(calculatordata.hvalue);
    Setcalculatordata((prevState) => ({
      ...prevState,
      ["dpay"]: dpayment.toFixed(2),
    }));
    /* console.log(calculatordata.dpay); */
  }, [calculatordata.hvalue, calculatordata.dper]);

  useEffect(() => {
    let mortamt =
      parseFloat(calculatordata.hvalue) - parseFloat(calculatordata.dpay);
    Setcalculatordata((prevState) => ({
      ...prevState,
      ["loanamt"]: mortamt.toFixed(2),
    }));
    /* console.log(calculatordata.dpay); */
  }, [calculatordata.hvalue, calculatordata.dper, calculatordata.dpay]);

  function CalcMonth() {
    let i = parseFloat(calculatordata.intrate) / 100;
    let g = i / 12;
    let h = 1 + g;
    let tenn = parseInt(calculatordata.loanterm * 12);
    let powerr = Math.pow(h, tenn);
    let aa = g * powerr;
    let numm = parseFloat(calculatordata.loanamt) * aa;
    let deno = powerr - 1;
    let monthh = numm / deno;
    return monthh;
  }

  useEffect(() => {
    setcalculated(CalcMonth().toFixed(2));
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    Setcalculatordata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setcalculated(CalcMonth().toFixed(2));
    /* console.log(calculatordata); */
  };

  return (
    <>
      <div className="row row-cols-1 row-cols-md-2 rounded-mine px-2 shadow-lgg mx-0">
        <div className="my-3 d-block d-sm-none">
          <h3 className="fs-2">
            ${calculated} <span className="fs-5 text-secondary">/mo</span>
          </h3>
        </div>
        <div className="col-md-8 col-lg-7 my-2 my-sm-5">
          <div className="row row-cols-1 row-cols-sm-2">
            <div className="col-sm-4 d-flex align-items-center">
              <label className="mortlabel" htmlFor="hvalue">
                Home Value :
              </label>
            </div>
            <div className="col-sm-8">
              <div className="input-group">
                <span className="input-group-text bg-light" id="basic-addon1">
                  $
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="basic-addon1"
                  id="hvalue"
                  value={calculatordata.hvalue}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 my-3">
            <div className="col-sm-4 d-flex align-items-center">
              <label htmlFor="dpay" className="mortlabel">
                Down Payment :
              </label>
            </div>
            <div className="col-sm-8">
              <div className="input-group">
                <span className="input-group-text  bg-light">$</span>
                <input
                  type="text"
                  className="form-control"
                  id="dpay"
                  value={calculatordata.dpay}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  className="form-control"
                  id="dper"
                  value={calculatordata.dper}
                  onChange={handleChange}
                />
                <span className="input-group-text rounn bg-light">%</span>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2  my-3">
            <div className="col-sm-4 d-flex align-items-center">
              <label htmlFor="loanamt" className="mortlabel">
                Mortgage Amt :
              </label>
            </div>
            <div className="col-sm-8">
              <div className="input-group">
                <span className="input-group-text bg-light" id="basic-addon2">
                  $
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="basic-addon2"
                  id="loanamt"
                  value={calculatordata.loanamt}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2  my-3">
            <div className="col-sm-4 d-flex align-items-center">
              <label htmlFor="intrate" className="mortlabel">
                Interest Rate (%) :
              </label>
            </div>
            <div className="col-sm-8">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="basic-addon3"
                  id="intrate"
                  value={calculatordata.intrate}
                  onChange={handleChange}
                />
                <span className="input-group-text bg-light" id="basic-addon3">
                  %
                </span>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2  my-3">
            <div className="col-sm-4 d-flex align-items-center">
              <label htmlFor="loanterm" className="mortlabel">
                Mortgage Term :
              </label>
            </div>
            <div className="col-sm-8">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="basic-addon4"
                  id="loanterm"
                  value={calculatordata.loanterm}
                  onChange={handleChange}
                />
                <span className="input-group-text bg-light" id="basic-addon4">
                  Yrs
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 my-0 mb-5 my-sm-5 col-lg-5">
          <div className="rounded-mine bg-light">
            <div className="p-3 rounded-mine">
              <h3 className="fs-2 fw-bold text-mine">
                ${calculated} <span className="fs-5 text-secondary">/mo</span>
              </h3>
              <p className="text-secondary">
                Your Estimated Monthly Mortgage Payment.
              </p>
            </div>
            <div className="rounded-mine">
              <svg viewBox="0 0 400 400">
                <VictoryPie
                  standalone={false}
                  width={400}
                  height={400}
                  data={[
                    {
                      x: `Mortrage \n$ ${parseInt(
                        calculatordata.loanamt
                      ).toLocaleString()}`,
                      y: parseInt(calculatordata.loanamt),
                    },
                    {
                      x: `Intrest \n $ ${parseInt(intrest).toLocaleString()}`,
                      y: parseInt(intrest),
                    },
                  ]}
                  innerRadius={68}
                  labelRadius={100}
                  padding={{ left: 120, right: 120 }}
                  colorScale={["rgb(82 170 146)", "rgb(82 130 146)"]}
                />
                <VictoryLabel
                  textAnchor="middle"
                  style={{ fontSize: 15 }}
                  x={200}
                  y={200}
                  text={"$" + calculated + "/mo"}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mortgg3 px-5">
        <span className="text-danger">*</span>
        This calculator is for demonstration purposes only. The Canadian Real
        Estate Association does not guarantee that all calculations are
        accurate. Always consult a professional financial advisor before making
        personal financial decisions.
      </div> */}
    </>
  );
}
