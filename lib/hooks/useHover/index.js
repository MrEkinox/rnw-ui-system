"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHoverIndex = exports.useHover = void 0;
var react_1 = require("react");
var useHover = function () {
    var _a = (0, react_1.useState)(false), isActive = _a[0], setIsActive = _a[1];
    var handlers = (0, react_1.useMemo)(function () { return ({
        onTouchStart: function () { return setIsActive(true); },
        onTouchEnd: function () { return setIsActive(false); },
        onHoverIn: function () { return setIsActive(true); },
        onHoverOut: function () { return setIsActive(false); },
    }); }, []);
    return { handlers: handlers, isActive: isActive };
};
exports.useHover = useHover;
var useHoverIndex = function () {
    var _a = (0, react_1.useState)(-1), index = _a[0], setIndex = _a[1];
    var handlers = (0, react_1.useCallback)(function (itemIndex) { return ({
        onTouchStart: function () { return setIndex(itemIndex); },
        onTouchEnd: function () { return setIndex(-1); },
        onHoverIn: function () { return setIndex(itemIndex); },
        onHoverOut: function () { return setIndex(-1); },
    }); }, []);
    return (0, react_1.useMemo)(function () { return ({ handlers: handlers, index: index }); }, [handlers, index]);
};
exports.useHoverIndex = useHoverIndex;
