import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ user, size = "md", style = "avataaars" }) => {
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

  // Создаем URL для аватара из DiceBear с разными стилями
  const getAvatarUrl = (name, size, avatarStyle) => {
    const seed = generateSeed(name);
    const sizePx = sizePixels[size];

    // Разные стили аватаров для разнообразия
    const styles = {
      avataaars: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&size=${sizePx}`,
      bottts: `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}&size=${sizePx}`,
      pixel: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}&size=${sizePx}`,
      identicon: `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}&size=${sizePx}`,
      initials: `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&size=${sizePx}`,
      lorelei: `https://api.dicebear.com/7.x/lorelei/svg?seed=${seed}&size=${sizePx}`,
      micah: `https://api.dicebear.com/7.x/micah/svg?seed=${seed}&size=${sizePx}`,
      miniavs: `https://api.dicebear.com/7.x/miniavs/svg?seed=${seed}&size=${sizePx}`,
      bigEars: `https://api.dicebear.com/7.x/big-ears/svg?seed=${seed}&size=${sizePx}`,
      bigSmile: `https://api.dicebear.com/7.x/big-smile/svg?seed=${seed}&size=${sizePx}`,
      croodles: `https://api.dicebear.com/7.x/croodles/svg?seed=${seed}&size=${sizePx}`,
      funEmoji: `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${seed}&size=${sizePx}`,
      notionists: `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&size=${sizePx}`,
      shapes: `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&size=${sizePx}`,
      thumbs: `https://api.dicebear.com/7.x/thumbs/svg?seed=${seed}&size=${sizePx}`
    };

    return styles[avatarStyle] || styles.avataaars;
  };

  // Выбираем стиль аватара на основе имени пользователя для разнообразия
  const getAvatarStyle = (name) => {
    const styles = [
      "avataaars",
      "bottts",
      "pixel",
      "identicon",
      "initials",
      "lorelei",
      "micah",
      "miniavs",
      "bigEars",
      "bigSmile",
      "croodles",
      "funEmoji",
      "notionists",
      "shapes",
      "thumbs"
    ];
    const index = name.charCodeAt(0) % styles.length;
    return styles[index];
  };

  const selectedStyle = getAvatarStyle(user.name);

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
          src={getAvatarUrl(user.name, size, selectedStyle)}
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
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  style: PropTypes.oneOf([
    "avataaars",
    "bottts",
    "pixel",
    "identicon",
    "initials",
    "lorelei",
    "micah",
    "miniavs",
    "bigEars",
    "bigSmile",
    "croodles",
    "funEmoji",
    "notionists",
    "shapes",
    "thumbs"
  ])
};

export default Avatar;
