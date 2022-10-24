"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScrollLock = void 0;
const react_1 = require("react");
const useScrollLock = () => {
    const body = document.body;
    const [isScrollLock, setLock] = (0, react_1.useState)(body.style.overflow === "hidden");
    const setScrollLocked = (0, react_1.useCallback)((state) => {
        if (state) {
            body.style.overflow = "hidden";
            setLock(true);
        }
        else {
            body.style.overflow = "visible";
            setLock(false);
        }
    }, [body.style]);
    return (0, react_1.useMemo)(() => ({ isScrollLock, setScrollLocked }), [isScrollLock, setScrollLocked]);
};
exports.useScrollLock = useScrollLock;
