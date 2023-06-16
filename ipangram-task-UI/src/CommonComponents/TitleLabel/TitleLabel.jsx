import React from "react";

const TitleLabel = ({ titleLabel }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <span style={{ fontWeight: "700", fontSize: "32px", color: "#5B2C6F" }}>
        |
      </span>
      <strong style={{ fontSize: "24px", fontWeight: "600", color: "#5B2C6F" }}>
        {titleLabel}
      </strong>
    </div>
  );
};

export default TitleLabel;
