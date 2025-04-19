import React, { useState, useEffect } from "react";
import { getSystemThemes } from "../../services/api";
import "../../styles/Theme.css";
const ThemeSelector = ({ register, setValue, selectedTheme, customTheme }) => {
  const [systemThemes, setSystemThemes] = useState([]);
  const [themeMode, setThemeMode] = useState(
    selectedTheme ? "system" : "custom"
  );

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await getSystemThemes();
        setSystemThemes(res.data);
      } catch (err) {
        console.error("Failed to fetch system themes:", err);
      }
    };
    fetchThemes();
  }, []);

  const handleThemeModeChange = (mode) => {
    setThemeMode(mode);
    if (mode === "system") {
      setValue("customTheme", null);
    } else {
      setValue("selectedTheme", null);
    }
  };

  const handleSystemThemeChange = (themeId) => {
    setValue("selectedTheme", themeId);
  };

  const handleCustomThemeChange = (field, value) => {
    setValue("customTheme", {
      ...(customTheme || {}),
      [field]: value,
    });
  };

  return (
    <div className="theme-selector">
      <h3>Theme Selection</h3>

      <div className="theme-mode-selector">
        <label>
          <input
            type="radio"
            name="themeMode"
            checked={themeMode === "system"}
            onChange={() => handleThemeModeChange("system")}
          />
          Use System Theme
        </label>
        <label>
          <input
            type="radio"
            name="themeMode"
            checked={themeMode === "custom"}
            onChange={() => handleThemeModeChange("custom")}
          />
          Custom Theme
        </label>
      </div>

      {themeMode === "system" && (
        <div className="system-themes">
          <h4>Select a System Theme</h4>
          <div className="theme-grid">
            {systemThemes.map((theme) => (
              <div
                key={theme._id}
                className={`theme-card ${
                  selectedTheme === theme._id ? "selected" : ""
                }`}
                onClick={() => handleSystemThemeChange(theme._id)}
              >
                <div
                  className="theme-preview"
                  style={{
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                  }}
                >
                  <div style={{ color: theme.colors.primary }}>Primary</div>
                  <div style={{ color: theme.colors.secondary }}>Secondary</div>
                  <p>Sample text with {theme.fonts.primary} font</p>
                </div>
                <h5>{theme.name}</h5>
              </div>
            ))}
          </div>
        </div>
      )}

      {themeMode === "custom" && (
        <div className="custom-theme">
          <h4>Customize Your Theme</h4>
          <div className="color-pickers">
            <div className="color-picker">
              <label>Primary Color</label>
              <input
                type="color"
                value={customTheme?.colors?.primary || "#6200ee"}
                onChange={(e) =>
                  handleCustomThemeChange("colors.primary", e.target.value)
                }
              />
            </div>
            <div className="color-picker">
              <label>Secondary Color</label>
              <input
                type="color"
                value={customTheme?.colors?.secondary || "#03dac6"}
                onChange={(e) =>
                  handleCustomThemeChange("colors.secondary", e.target.value)
                }
              />
            </div>
            <div className="color-picker">
              <label>Background Color</label>
              <input
                type="color"
                value={customTheme?.colors?.background || "#ffffff"}
                onChange={(e) =>
                  handleCustomThemeChange("colors.background", e.target.value)
                }
              />
            </div>
            <div className="color-picker">
              <label>Text Color</label>
              <input
                type="color"
                value={customTheme?.colors?.text || "#333333"}
                onChange={(e) =>
                  handleCustomThemeChange("colors.text", e.target.value)
                }
              />
            </div>
          </div>

          <div className="font-selectors">
            <div className="font-selector">
              <label>Primary Font</label>
              <select
                value={customTheme?.fonts?.primary || "sans-serif"}
                onChange={(e) =>
                  handleCustomThemeChange("fonts.primary", e.target.value)
                }
              >
                <option value="sans-serif">Sans-serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>
            <div className="font-selector">
              <label>Secondary Font</label>
              <select
                value={customTheme?.fonts?.secondary || "serif"}
                onChange={(e) =>
                  handleCustomThemeChange("fonts.secondary", e.target.value)
                }
              >
                <option value="sans-serif">Sans-serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>
          </div>

          <div className="theme-preview">
            <h5
              style={{
                color: customTheme?.colors?.primary || "#6200ee",
                fontFamily: customTheme?.fonts?.primary || "sans-serif",
              }}
            >
              Preview Heading
            </h5>
            <p
              style={{
                color: customTheme?.colors?.text || "#333333",
                fontFamily: customTheme?.fonts?.secondary || "serif",
              }}
            >
              This is a preview of how your text will look with the selected
              theme.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
