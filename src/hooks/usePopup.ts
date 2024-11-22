import { useState } from "react";

export function usePopup(initialState: boolean = false) {
    const [isOpen, setIsOpen] = useState(initialState);
    const closePopup = () => setIsOpen(false);
    const openPopup = () => setIsOpen(true);

    return { isOpen, openPopup, closePopup };
}
