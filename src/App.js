import { useReducer } from "react";
import "./App.css";
import BubblePlot from "./components/BubblePlot";
import { useFetchData } from "./hooks/useFetchData";
import { appReducer } from "./reducers/appReducer";

const fields = ["salary", "headcount", "compratio"];

const capitalizeString = (str) => {
  if (str) return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  else return "";
};

const url = "https://mocki.io/v1/18936d28-2f79-4840-b146-5622e8ad1e77";
function App() {
  const [state, dispatch] = useReducer(appReducer, {
    x_field: "salary",
    y_field: "headcount",
    size_field: "compratio",
    text_field: "title",
  });

  const { data, isLoading, error } = useFetchData(url);

  console.log(data, isLoading, error);

  if (isLoading) {
    return <>Fetching Data....</>;
  }

  if (error) {
    return <>{`Loading failed!!!!  error: ${error}`} </>;
  }

  return (
    <div className="app">
      <div className="filters">
        <div className="filter" id={"x_label"}>
          <label for="x_label">Select X: </label>
          <select
            id="x_label_select"
            name="x_label"
            onChange={(e) =>
              dispatch({
                type: "CHANGE_X_FIELD",
                payload: e.target.value,
              })
            }
          >
            {fields.map((each, index) => (
              <option key={index} value={each}>
                {each}
              </option>
            ))}
          </select>
        </div>
        <div className="filter" id={"y_label"}>
          <label for="y_label">Select Y: </label>
          <select
            id="y_label_select"
            name="y_label"
            onChange={(e) =>
              dispatch({
                type: "CHANGE_Y_FIELD",
                payload: e.target.value,
              })
            }
          >
            {fields.map((each, index) => (
              <option key={index} value={each}>
                {each}
              </option>
            ))}
          </select>
        </div>
        <div className="filter" id={"size_field"}>
          <label for="size_field">Select Size: </label>
          <select
            id="size_field_select"
            name="size_field"
            onChange={(e) =>
              dispatch({
                type: "CHANGE_SIZE_FIELD",
                payload: e.target.value,
              })
            }
          >
            {fields.map((each, index) => (
              <option key={index} value={each}>
                {each}
              </option>
            ))}
          </select>
        </div>
      </div>
      {data && (
        <BubblePlot
          data={data}
          xField={state.x_field}
          yField={state.y_field}
          sizeField={state.size_field}
          textField={state.text_field}
          yAxisLabel={capitalizeString(state.y_field)}
          xAxisLabel={capitalizeString(state.x_field)}
        />
      )}
    </div>
  );
}

export default App;
