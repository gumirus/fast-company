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

  const sizePixels = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56
  };

  // Генерируем уникальный seed на основе имени пользователя
  const generateSeed = (name) => {
    return name.toLowerCase().replace(/\s+/g, "");
  };

  // Используем только стиль micah для всех аватаров
  const getAvatarUrl = (name, size) => {
    const seed = generateSeed(name);
    const sizePx = sizePixels[size];
    return `https://api.dicebear.com/7.x/micah/svg?seed=${seed}&size=${sizePx}`;
  };

  // Показываем avatarUrl, если оно есть, иначе fallback на DiceBear
  const avatarSrc = user.avatarUrl
    ? user.avatarUrl
    : getAvatarUrl(user.name, size);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div
        className="rounded-circle overflow-hidden"
        style={{
          width: `${sizePixels[size]}px`,
          height: `${sizePixels[size]}px`,
          border: "2px solid #e9ecef"
        }}
      >
        <img
          src={avatarSrc}
          alt={`Avatar of ${user.name}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
          onError={(e) => {
            // Fallback к инициалам если изображение не загрузилось
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback с инициалами */}
        <div
          className={`rounded-circle d-flex align-items-center justify-content-center text-white ${getAvatarColor(
            user.name
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
            {getInitials(user.name)}
          </span>
        </div>
      </div>
    </div>
  );
};

Avatar.propTypes = {
  user: PropTypes.object.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"])
};

export default Avatar;
