import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./features/app/components/App";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.querySelector("#root")!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
