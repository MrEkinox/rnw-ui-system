import { jsx as _jsx } from "react/jsx-runtime";
import { TextField } from "../TextField";
import { memo, useCallback, useMemo, useState } from "react";
import { Button } from "../Button";
import { Icon } from "../Icon";
export const PasswordField = memo((props) => {
    const [isVisible, setIsVisible] = useState(false);
    const onToggleVisibility = useCallback(() => setIsVisible((visible) => !visible), []);
    const endIcon = useMemo(() => (_jsx(Button, Object.assign({ onPress: onToggleVisibility, size: "small" }, { children: _jsx(Icon, { type: "Ionicons", name: isVisible ? "eye" : "eye-off" }) }))), [isVisible, onToggleVisibility]);
    return (_jsx(TextField, Object.assign({ textContentType: "password", endIcon: endIcon }, props, { secureTextEntry: !isVisible })));
});
