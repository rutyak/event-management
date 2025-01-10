import React, { useState, useEffect } from "react";
import "./FormPopover.css";

const FormPopover = ({ btnTitle, fields, onSubmit, itemId, itemData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(
    fields?.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]:
          field.type === "checkbox" ? false : field.type === "file" ? null : "",
      }),
      {}
    )
  );

  useEffect(() => {
    if (itemData && itemId) {
      const updatedFormData = { ...formData };
      fields.forEach((field) => {
        if (itemData[field.name] !== undefined) {
          updatedFormData[field.name] = itemData[field.name];
        }
      });
      setFormData(updatedFormData);
    }
  }, [itemData, itemId, fields]);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, itemId);
    setIsOpen(false);
  };

  return (
    <div className="form-popover-container">
      {btnTitle.includes("Edit") ? (
        <div className="edit-button" onClick={togglePopover}>
          Edit
        </div>
      ) : (
        <button
          className="add-button"
          onClick={togglePopover}
        >
          {btnTitle}
        </button>
      )}

      {isOpen && (
        <div className="popover-overlay" onClick={togglePopover}>
          <div className="popover-content" onClick={(e) => e.stopPropagation()}>
            <div className="popover-header">
              <h3>{btnTitle}</h3>
              <button className="close-button" onClick={togglePopover}>
                ✖
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-fields">
                {fields.map((field, index) => (
                  <div className="form-group" key={index}>
                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleInputChange}
                        required={field.required}
                      >
                        <option value="">{field.placeholder}</option>
                        {field.options.map((option, idx) => (
                          <option key={idx} value={option.value}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "checkbox" ? (
                      <label style={{ display: "flex" }}>
                        <input
                          type="checkbox"
                          style={{ width: "auto" }}
                          name={field.name}
                          checked={formData[field.name] || false}
                          onChange={handleInputChange}
                          required={field.required}
                        />
                        <p style={{ width: "auto" }}>{field.label}</p>
                      </label>
                    ) : field.type === "file" ? (
                      <input
                        type="file"
                        name={field.name}
                        onChange={handleInputChange}
                        required={field.required}
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ""}
                        placeholder={field.placeholder}
                        onChange={handleInputChange}
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
              </div>
              <button type="submit" className="save-button">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPopover;
