import { Grow, GrowProps } from "../Grow";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
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
  solo?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
  arrowEnabled?: boolean;
  arrowPosition?: FlexAlignType;
  animation?: Omit<GrowProps, "visible">;
}

type RefDimensions = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const getDimensions = (ref: React.RefObject<any>) => {
  return new Promise<RefDimensions>((resolve) => {
    if (ref?.current) {
      ref.current?.measureInWindow((x, y, width, height) =>
        resolve({ x, y, width, height })
      );
    } else resolve({ x: 0, y: 0, width: 0, height: 0 });
  });
};

const getPosition = async (
  parentRef: React.RefObject<any>,
  popoverRef: React.RefObject<any>,
  solo?: boolean
) => {
  const { width, height } = Dimensions.get("window");

  const {
    x: parentX,
    y: parentY,
    width: parentWidth,
    height: parentHeight,
  } = await getDimensions(parentRef);
  const { width: childWidth, height: childHeight } = await getDimensions(
    popoverRef
  );

  let directionY = "bottom";
  let y = 0;
  let x = parentX;
  let directionX: FlexAlignType = "center";

  if (parentY + childHeight <= height) {
    y = solo ? 0 : parentY + parentHeight;
    directionY = "bottom";
  } else if (parentY - childHeight >= 0) {
    y = solo ? -(childHeight + parentHeight) : parentY - childHeight;
    directionY = "top";
  } else if (!solo) {
    y = height / 2 - childHeight / 2;
    directionY = "center";
  }
  if (parentX + parentWidth / 2 - childWidth / 2 < width) {
    x = solo ? 0 : parentX + parentWidth / 2 - childWidth / 2;
    directionX = "center";
  } else if (parentX + childWidth >= width) {
    x = parentX + parentWidth / 2 - childWidth / 2;
    directionX = "flex-end";
  } else if (parentX - childWidth <= 0) {
    x = parentX + childWidth / 2 + parentWidth / 2;
    directionX = "flex-start";
  }
  return { x, y, directionY, directionX };
};

export const Popover = memo<React.PropsWithChildren<PopoverProps>>(
  ({
    parentRef,
    open,
    onClose,
    children,
    solo,
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
    const { setScrollLocked } = useScrollLock();
    const { width, height } = useWindowDimensions();
    const [position, setPosition] = useState({
      x: 0,
      y: 0,
      directionY: "bottom",
      directionX: "center" as FlexAlignType,
    });

    const arrowColor = theme.palette[color] || color;
    const borderRadius = theme.borderRadius;

    const openPopover = useCallback(async () => {
      if (!open) return;
      const newPosition = await getPosition(parentRef, popoverRef, solo);
      setPosition(newPosition);
    }, [open, parentRef, solo]);

    useEffect(() => {
      openPopover();
    }, [width, height, openPopover]);

    useEffect(() => {
      setScrollLocked(open || false);
    }, [open, setScrollLocked]);

    const dynamicArrowPosition = arrowPosition || position.directionX;

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
          position: "absolute",
          minHeight: 40,
          top: position.y,
          left: position.x,
          zIndex: +99,
        },
        style,
      ],
      [position.x, position.y, style]
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

    const Container = !solo ? Modal : View;

    return (
      <Container
        nativeID="popover"
        visible
        onDismiss={onClose}
        transparent
        onShow={openPopover}
        onRequestClose={onClose}
      >
        {!solo && <Pressable style={styles.backdrop} onPress={onClose} />}
        <View onLayout={openPopover} style={popoverStyle} ref={popoverRef}>
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
      </Container>
    );
  }
);

Popover.displayName = "Popover";

const styles = StyleSheet.create({
  card: {
    minHeight: 40,
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
