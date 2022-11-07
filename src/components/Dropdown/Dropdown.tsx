import "./Dropdown.scss";
import Select from "react-select";

import makeAnimated from "react-select/animated";


export const Dropdown = ({ options, setSelectValue }: any) => {
  const onChange = (newValue: any): void => {
    setSelectValue(newValue);
  };



  const animatedComponents = makeAnimated();
  // const mockOptions = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla1", label: "Vanilla1111123sssssssssssssssssssssssssssss" },
  //   { value: "vanilla2", label: "Vanilla1111123sssssssssssssssssssssssssssss" },
  //   { value: "vanilla3", label: "Vanilla1111123sssssssssssssssssssssssssssss" },
  //   { value: "vanilla4", label: "Vanilla1111123sssssssssssssssssssssssssssss" },
  //   { value: "vanilla5", label: "Vanilla1111123sssssssssssssssssssssssssssss" },
  //   { value: "vanilla6", label: "Vanilla1111123sssssssssssssssssssssssssssss" },
  //   { value: "vanilla7", label: "Vanilla" },
  //   { value: "vanilla8", label: "Vanilla" },
  //   { value: "vanilla9", label: "Vanilla" },
  // ];
  return (
    <div className={"dropdown__ctn__selected_value"}>
      <Select
        placeholder={"выберите игру"}
        classNamePrefix={"dropdown-styles"}
        closeMenuOnSelect={true}
        components={animatedComponents}
        pageSize={30}
        isMulti
        onChange={onChange}

        options={options}
      />
      <div className="dropdown__selected_value"></div>
    </div>
  );
};
