import React from "react";

const CountItem = (props) => {

  return (
    <div className="count-item" style={{ marginLeft: "3px", marginRight: "3px" }}>
      <div
        style={{
          border: "1px,solid,red",
          borderRadius: "30px",
          padding: "3px",
          backgroundImage: "linear-gradient(to bottom, #ff8a00, #da1b60)"
        }}
      >
        <div className="count-item-value"><p style={{textAlign:"center", fontFamily:"Minecraft"}}>{String(props.value).padStart(2, "0")}</p></div>
      </div>
      <div className="count-item-title" style={{ width: "100%", alignItems: "center", textAlign: "center" }}>{props.title}</div>
    </div>
  );
};

export default CountItem;
