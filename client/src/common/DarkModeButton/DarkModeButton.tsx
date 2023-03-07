import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const DarkModeButton = () => {
  const [isDarkMode, setDarkMode] = useState(true);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);

    if (!checked) {
      localStorage.setItem("color-theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("color-theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(false);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(true);
    }
  }, []);
  return (
    <DarkModeSwitch
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={36}
      className="mx-auto mb-8"
      moonColor="#9DB3B5"
      sunColor="#F1EA18"
    />
  );
};

export default DarkModeButton;
