"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScrollLock = void 0;
var react_1 = require("react");
var useScrollLock = function () {
    var body = document.body;
    var _a = (0, react_1.useState)(body.style.overflow === "hidden"), isScrollLock = _a[0], setLock = _a[1];
    var setScrollLocked = (0, react_1.useCallback)(function (state) {
        if (state) {
            body.style.overflow = "hidden";
            setLock(true);
        }
        else {
            body.style.overflow = "visible";
            setLock(false);
        }
    }, [body.style]);
    return (0, react_1.useMemo)(function () { return ({ isScrollLock: isScrollLock, setScrollLocked: setScrollLocked }); }, [isScrollLock, setScrollLocked]);
};
exports.useScrollLock = useScrollLock;
