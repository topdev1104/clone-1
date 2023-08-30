import { useContext } from "react";

import { MainPageStateContext } from "../providers/MainPageStateProvider";

export const useMainPageState = () => useContext(MainPageStateContext);
