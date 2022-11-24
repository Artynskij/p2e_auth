import "./Dropdown.scss";
import Select from "react-select";

import makeAnimated from "react-select/animated";


export const Dropdown = ({name, options, setSelectValue,isMulti }: any) => {
  
  const onChange = (newValue:any): void => {
   const selectValue = {
    value:name,
    label:newValue.label
   } 
      setSelectValue(selectValue);
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
        placeholder={name}
        classNamePrefix={"dropdown-styles"}
        closeMenuOnSelect={true}
        components={animatedComponents}
        pageSize={30}
        isMulti={isMulti}
        onChange={onChange}

        options={options}
      />
      <div className="dropdown__selected_value"></div>
    </div>
  );
};
