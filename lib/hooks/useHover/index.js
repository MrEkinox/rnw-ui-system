"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHoverIndex = exports.useHover = void 0;
const react_1 = require("react");
const useHover = () => {
    const [isActive, setIsActive] = (0, react_1.useState)(false);
    const handlers = (0, react_1.useMemo)(() => ({
        onTouchStart: () => setIsActive(true),
        onTouchEnd: () => setIsActive(false),
        onHoverIn: () => setIsActive(true),
        onHoverOut: () => setIsActive(false),
    }), []);
    return { handlers, isActive };
};
exports.useHover = useHover;
const useHoverIndex = () => {
    const [index, setIndex] = (0, react_1.useState)(-1);
    const handlers = (0, react_1.useCallback)((itemIndex) => ({
        onTouchStart: () => setIndex(itemIndex),
        onTouchEnd: () => setIndex(-1),
        onHoverIn: () => setIndex(itemIndex),
        onHoverOut: () => setIndex(-1),
    }), []);
    return (0, react_1.useMemo)(() => ({ handlers, index }), [handlers, index]);
};
exports.useHoverIndex = useHoverIndex;
