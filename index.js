import styled from "styled-components";
// Assume UIColorScheme is properly defined in "../../xCodeInfo"
import { UIColorScheme } from "../../xCodeInfo";
import AppFlexBox from "../Layout/AppFlexBox";
import Select from "react-select";
import { useEffect, useState } from "react";
import AppText from "../FontStyle/AppText";

/**
 * `AppSelectInput` is a customizable select input component for React applications. It integrates with `react-select` and provides additional styling and layout through `styled-components`. It supports error handling, custom width, and additional text display.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} [props.options=[]] - The options for the select input, each option as an object with `label` and `value` properties.
 * @param {*} [props.value=() => {}] - The currently selected value. Should correspond to one of the options' value.
 * @param {Function} [props.setValue=() => {}] - Callback function to set the selected option value.
 * @param {string} [props.className=""] - Additional CSS class for custom styling.
 * @param {string} [props.width="200"] - Width of the select input component, specified as a string to allow different units (e.g., "200px", "100%").
 * @param {string} [props.errorMessage=""] - Error message to display if there's an error.
 * @param {string} [props.text=""] - Additional text to display above the select input.
 * @returns {React.Component} A styled select input component.
 */
function AppSelectInput({
  options = [],
  value = () => {},
  setValue = () => {},
  className = "",
  width = "200",
  errorMessage = "",
  text = "",
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const matchingOption = options.find((option) => option.value === value);
    setSelectedOption(matchingOption || null);
  }, [value, options]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setValue(selectedOption ? selectedOption.value : null);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: 0,
      height: 30,
      minHeight: 30,
      margin: 0,
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      height: 15,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      padding: 3,
    }),
  };

  return (
    <AppSelectInputStyle
      isError={!!errorMessage}
      width={width}
      className={className}
    >
      <div className="form-container">
        <AppFlexBox flexType="d-flex" direction="flex-column">
          <AppText headingType="normal text">{text}</AppText>
          <Select
            className="select-input"
            options={options}
            onChange={handleChange}
            value={selectedOption}
            styles={customStyles}
          />
        </AppFlexBox>
      </div>
      {errorMessage && <span className="errorMessage">{errorMessage}</span>}
    </AppSelectInputStyle>
  );
}

export default AppSelectInput;

const AppSelectInputStyle = styled.div`
  width: ${(props) => props.width};
  .form-container {
    margin-top: 10px;
    padding: 3px;
    border-radius: 5px;
    width: 100%;

    input {
      margin: 5px;
      height: 15px;
      outline: none;
      border: none;
      width: 100%;
      font-size: 12px;
    }
  }

  .errorMessage {
    color: #bf0303;
    font-size: 10px;
  }

  .select-input {
    font-size: 10px !important;
    width: 100%;
  }
`;
