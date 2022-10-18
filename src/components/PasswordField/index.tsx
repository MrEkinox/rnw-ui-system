import { TextField, TextFieldProps } from "../TextField";
import React, { memo, useCallback, useMemo, useState } from "react";
import { Button } from "../Button";
import { Icon } from "../Icon";

export type PasswordField = TextFieldProps;

export const PasswordField = memo<PasswordField>((props) => {
  const [isVisible, setIsVisible] = useState(false);

  const onToggleVisibility = useCallback(
    () => setIsVisible((visible) => !visible),
    []
  );

  const endIcon = useMemo(
    () => (
      <Button onPress={onToggleVisibility} size="small">
        <Icon type="Ionicons" name={isVisible ? "eye" : "eye-off"} />
      </Button>
    ),
    [isVisible, onToggleVisibility]
  );

  return (
    <TextField
      textContentType="password"
      endIcon={endIcon}
      {...props}
      secureTextEntry={!isVisible}
    />
  );
});
