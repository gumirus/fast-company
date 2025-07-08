import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ user, size = "md" }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name) => {
    const colors = [
      "bg-primary",
      "bg-secondary",
      "bg-success",
      "bg-danger",
      "bg-warning",
      "bg-info",
      "bg-dark",
      "bg-light"
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
    xl: "w-5 h-5"
  };

  return (
    <div
      className={`rounded-circle d-flex align-items-center justify-content-center text-white ${getAvatarColor(
        user.name
      )} ${sizeClasses[size]}`}
      style={{
        minWidth:
          size === "sm"
            ? "32px"
            : size === "md"
            ? "40px"
            : size === "lg"
            ? "48px"
            : "56px",
        height:
          size === "sm"
            ? "32px"
            : size === "md"
            ? "40px"
            : size === "lg"
            ? "48px"
            : "56px"
      }}
    >
      <span
        className="fw-bold"
        style={{
          fontSize:
            size === "sm"
              ? "12px"
              : size === "md"
              ? "14px"
              : size === "lg"
              ? "16px"
              : "18px"
        }}
      >
        {getInitials(user.name)}
      </span>
    </div>
  );
};

Avatar.propTypes = {
  user: PropTypes.object.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"])
};

export default Avatar;
