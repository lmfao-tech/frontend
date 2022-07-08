import { atomWithStorage } from "jotai/utils";

// Set the string key and the initial value
const darkModeAtom = atomWithStorage("darkMode", false);

export default darkModeAtom