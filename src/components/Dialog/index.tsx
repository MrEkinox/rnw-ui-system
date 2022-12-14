import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from "react-native";
import { useScrollLock } from "../../hooks/useScrollLock";
import { Card } from "../Card";
import ColorJS from "color";
import { CardContent } from "../Card/CardContent";

export interface DialogProps extends ViewProps {
  open?: boolean;
  animationType?: "none" | "slide" | "fade";
  presentationStyle?:
    | "fullScreen"
    | "pageSheet"
    | "formSheet"
    | "overFullScreen";
  onClose?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  width?: number;
}

export const Dialog = memo<React.PropsWithChildren<DialogProps>>(
  ({
    children,
    onClose,
    open = false,
    animationType,
    style,
    width,
    contentStyle,
    presentationStyle,
    ...props
  }) => {
    const animation = useMemo(() => new Animated.Value(0), []);
    const [inAnimation, setInAnimation] = useState(false);
    const { setScrollLocked } = useScrollLock();
    const [currentOpen, setCurrentOpen] = useState(false);

    const backgroundColor = ColorJS("#000").fade(0.5).toString();

    const openDialog = useCallback(() => {
      setCurrentOpen(true);
      setScrollLocked(true);
    }, [setScrollLocked]);

    const closeDialog = useCallback(() => {
      setCurrentOpen(false);
      setScrollLocked(false);
      onClose?.();
    }, [onClose, setScrollLocked]);

    useEffect(() => {
      if (open) openDialog();
      else if (currentOpen) closeDialog();
    }, [closeDialog, currentOpen, open, openDialog]);

    const backdropStyle: StyleProp<ViewStyle> = useMemo(
      () => [styles.backdrop, { backgroundColor }],
      [backgroundColor]
    );

    const cardStyle = useMemo(
      () => [
        styles.card,
        !!width && { width },
        { transform: [{ scale: animation }] },
        style,
      ],
      [animation, width, style]
    );

    useEffect(() => {
      Animated.timing(animation, {
        toValue: currentOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setInAnimation(currentOpen));
    }, [animation, currentOpen]);

    const opacityStyle = useMemo(
      () => [
        {
          opacity: animation.interpolate({
            inputRange: [0, 0.25, 0.75, 1],
            outputRange: [0, 0, 1, 1],
          }),
        },
        styles.dialog,
      ],
      [animation]
    );

    if (!currentOpen && !inAnimation) return null;

    return (
      <Modal
        visible
        transparent
        animationType={animationType}
        onRequestClose={closeDialog}
        presentationStyle={presentationStyle}
      >
        <Animated.View style={opacityStyle}>
          <Pressable style={backdropStyle} onPress={closeDialog} />
          <Animated.View style={cardStyle}>
            <Card variant="outlined" {...props}>
              <ScrollView style={styles.scroll}>
                <CardContent style={contentStyle}>{children}</CardContent>
              </ScrollView>
            </Card>
          </Animated.View>
        </Animated.View>
      </Modal>
    );
  }
);

Dialog.displayName = "Dialog";

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    width: 450,
    maxWidth: "90%",
  },
  scroll: {
    maxHeight: "80vh",
  },
  dialog: { alignItems: "center", justifyContent: "center", flex: 1 },
  backdrop: { width: "100%", height: "100%" },
});
