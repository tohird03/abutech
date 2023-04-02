import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthStore } from "./redux/Store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={AuthStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
