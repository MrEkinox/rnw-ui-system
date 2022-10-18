import { Grow, GrowProps } from "../Grow";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import {
  FlexAlignType,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useTheme } from "../../theme";
import { Card, CardProps } from "../Card";
import { Icon } from "../Icon";

export interface PopoverProps extends CardProps {
  parentRef: React.RefObject<any>;
  open?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
  arrowEnabled?: boolean;
  arrowPosition?: FlexAlignType;
  animation?: Omit<GrowProps, "visible">;
}

export const Popover = memo<React.PropsWithChildren<PopoverProps>>(
  ({
    parentRef,
    open,
    onClose,
    children,
    containerStyle,
    arrowEnabled,
    animation,
    arrowPosition,
    color = "primary",
    style,
    ...props
  }) => {
    const [inAnimation, setInAnimation] = useState(false);
    const theme = useTheme();
    const popoverRef = useRef<View>(null);
    const { height: windowHeight, width: windowWidth } = useWindowDimensions();
    const { setScrollLocked } = useScrollLock();
    const [parentDimensions, setParentDimensions] = useState({
      width: 0,
      height: 0,
    });
    const [position, setPosition] = useState({
      x: 0,
      y: 0,
      directionY: "bottom",
      directionX: "center" as FlexAlignType,
    });

    const arrowColor = theme.palette[color] || color;
    const borderRadius = theme.borderRadius;

    const openPopover = useCallback(() => {
      parentRef.current?.measureInWindow(
        (px, py, parentWidth, parentHeight) => {
          popoverRef.current?.measure((x2, y2, childWidth, childHeight) => {
            console.log("openPopover");
            let directionY = "bottom";
            let y = 0;
            let x = px;
            let directionX: FlexAlignType = "center";
            if (py + childHeight <= windowHeight) {
              y = py + parentHeight;
              directionY = "bottom";
            } else if (py - childHeight >= 0) {
              y = py - childHeight;
              directionY = "top";
            } else {
              y = windowHeight / 2 - childHeight / 2;
              directionY = "center";
            }
            if (px + parentWidth / 2 - childWidth / 2 < windowWidth) {
              x = px + parentWidth / 2 - childWidth / 2;
              directionX = "center";
            } else if (px + childWidth >= windowWidth) {
              x = px + parentWidth / 2 - childWidth / 2;
              directionX = "flex-end";
            } else if (px - childWidth <= 0) {
              x = px + childWidth / 2 + parentWidth / 2;
              console.log({ px, childWidth, parentWidth });
              directionX = "flex-start";
            }
            console.log({ directionX });
            setScrollLocked(true);
            setPosition({ x, y, directionY, directionX });
            setParentDimensions({ width: parentWidth, height: parentHeight });
          });
        }
      );
    }, [parentRef, setScrollLocked, windowHeight, windowWidth]);

    const dynamicArrowPosition = arrowPosition || position.directionX;

    const closePopover = useCallback(() => {
      setScrollLocked(false);
      onClose?.();
    }, [onClose, setScrollLocked]);

    const arrowStyle: StyleProp<ViewStyle> = useMemo(
      () => ({
        marginVertical: -15,
        marginHorizontal: 15,
        alignSelf: dynamicArrowPosition,
      }),
      [dynamicArrowPosition]
    );

    const arrowComponent = useMemo(() => {
      if (arrowEnabled === false) return null;
      return (
        <Icon
          type="Ionicons"
          name={position.directionY === "bottom" ? "caret-up" : "caret-down"}
          size={30}
          color={arrowColor}
          style={arrowStyle}
        />
      );
    }, [arrowEnabled, arrowColor, arrowStyle, position.directionY]);

    const popoverStyle = useMemo(
      (): StyleProp<ViewStyle> => [
        {
          opacity: parentDimensions.width ? 1 : 0,
          position: "absolute",
          minHeight: 50,
          top: position.y,
          left: position.x,
        },
        style,
      ],
      [parentDimensions.width, position.x, position.y, style]
    );

    const cardStyle = useMemo(
      (): StyleProp<ViewStyle> => [
        styles.card,
        { borderRadius },
        containerStyle,
      ],
      [borderRadius, containerStyle]
    );

    const transformOrigin = useMemo(() => {
      let positionX = "50%";
      if (dynamicArrowPosition === "flex-start") positionX = "10%";
      else if (dynamicArrowPosition === "flex-end") positionX = "90%";

      const positionY = position.directionY === "bottom" ? "0%" : "100%";

      return `${positionX} ${positionY}`;
    }, [position.directionY, dynamicArrowPosition]);

    if (!open && !inAnimation) return null;

    return (
      <Modal
        nativeID="popover"
        visible
        onDismiss={closePopover}
        transparent
        onShow={openPopover}
        onRequestClose={closePopover}
      >
        <Pressable style={styles.backdrop} onPress={closePopover} />
        <View style={popoverStyle} ref={popoverRef}>
          <Grow
            visible={open}
            onAnimationState={setInAnimation}
            enabled
            transformOrigin={transformOrigin}
            {...animation}
          >
            {position.directionY === "bottom" && arrowComponent}
            <Card
              variant="outlined"
              elevation={10}
              color={color}
              style={cardStyle}
              {...props}
            >
              {children}
            </Card>
            {position.directionY === "top" && arrowComponent}
          </Grow>
        </View>
      </Modal>
    );
  }
);

Popover.displayName = "Popover";

const styles = StyleSheet.create({
  card: {
    minHeight: 50,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  backdrop: {
    width: "100%",
    height: "100%",
  },
});
