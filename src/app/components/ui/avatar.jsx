import React, { useState } from "react";
import PropTypes from "prop-types";

const Avatar = ({ user, size = "md" }) => {
  const [showModal, setShowModal] = useState(false);
  if (!user) {
    return (
      <div
        className="rounded-circle bg-light d-flex align-items-center justify-content-center"
        style={{
          width: "40px",
          height: "40px",
          border: "2px solid #e9ecef"
        }}
      >
        <i className="bi bi-person-fill text-muted"></i>
      </div>
    );
  }
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  const getAvatarColor = (name) => {
    if (!name) return "bg-light";
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
  const sizePixels = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56
  };
  const generateSeed = (name) => {
    if (!name) return "placeholder";
    return name.toLowerCase().replace(/\s+/g, "");
  };
  const getAvatarUrl = (name, size) => {
    const seed = generateSeed(name);
    const sizePx = sizePixels[size];
    return `https://api.dicebear.com/7.x/micah/svg?seed=${seed}&size=${sizePx}`;
  };
  const avatarSrc = user.avatarUrl
    ? user.avatarUrl
    : getAvatarUrl(user.name, size);
  const avatarSrcLarge = user.avatarUrl
    ? user.avatarUrl
    : getAvatarUrl(user.name, "xl");
  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <div
          className="rounded-circle overflow-hidden avatar-hover"
          style={{
            width: `${sizePixels[size]}px`,
            height: `${sizePixels[size]}px`,
            border: "2px solid #e9ecef",
            cursor: "pointer"
          }}
          onClick={() => setShowModal(true)}
          title="Увеличить фото"
        >
          <img
            src={avatarSrc}
            alt={`Avatar of ${user.name || "user"}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback с инициалами */}
          <div
            className={`rounded-circle d-flex align-items-center justify-content-center text-white ${getAvatarColor(
              user.name || "Default"
            )} ${sizeClasses[size]}`}
            style={{
              width: "100%",
              height: "100%",
              display: "none"
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
              {getInitials(user.name || "??")}
            </span>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="avatar-modal-backdrop"
          onClick={() => setShowModal(false)}
        >
          <div className="avatar-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="btn-close avatar-modal-close"
              onClick={() => setShowModal(false)}
            ></button>
            <img
              src={avatarSrcLarge}
              alt={`Avatar of ${user.name || "user"}`}
              style={{
                width: 200,
                height: 200,
                objectFit: "cover",
                borderRadius: "1rem",
                border: "2px solid #e9ecef"
              }}
            />
            <div className="text-center mt-2 fw-bold">{user.name}</div>
          </div>
        </div>
      )}
    </>
  );
};

Avatar.propTypes = {
  user: PropTypes.object, // делаем user необязательным
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"])
};

export default Avatar;
