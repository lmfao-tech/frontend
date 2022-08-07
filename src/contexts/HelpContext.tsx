import { createContext, useContext, useEffect, useState } from "react";

interface Help {
    helpOpen: boolean;
    setHelpOpen: (helpOpen: boolean) => void;
}

const HelpContext = createContext<Help>({ helpOpen: false, setHelpOpen: () => {} });

const HelpProvider = ({ children }: any) => {

    const [helpOpen, setHelpOpen] = useState(false);

    useEffect(() => {

        function e(ev: KeyboardEvent) {
            if (ev.key === "q" || ev.key.toLowerCase() === "esc") {
                setHelpOpen(false);
            }
        }

        window.addEventListener("keypress", e)
    
        return () => {
          window.removeEventListener("keypress", e);
        }
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <HelpContext.Provider value={{ helpOpen, setHelpOpen }}>
            {children}
        </HelpContext.Provider>
    )
}

export const useHelp = () => {
    const context = useContext(HelpContext);
    if (!context) {
        throw new Error("useHelp must be used within a HelpProvider");
    }
    return context;
}

export default HelpProvider;