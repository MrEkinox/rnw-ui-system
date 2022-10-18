import {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar, SnackbarProps } from "../../components/Snackbar";

interface SnackbarContextProps {
  enqueueSnackbar: (options: SnackbarProps) => void;
  closeSnackbar: (id: number) => void;
}

const SnackbarContext = createContext<SnackbarContextProps>({
  enqueueSnackbar: () => {},
  closeSnackbar: () => {},
});
SnackbarContext.displayName = "SnackbarContext";

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = memo((props: React.PropsWithChildren) => {
  const [snackbars, setSnackbars] = useState<
    Array<SnackbarProps & { id: number }>
  >([]);

  const closeSnackbar = useCallback((id: number) => {
    setSnackbars((snackbar) => snackbar.filter((snack) => snack.id !== id));
  }, []);

  const enqueueSnackbar = useCallback(
    ({ force, duration, ...options }: SnackbarProps) =>
      new Promise<void>((resolve) => {
        const id = Math.floor(Math.random() * 16);
        setSnackbars((curSnacks) => {
          if (
            !force &&
            curSnacks.find(({ message }) => message === options.message)
          )
            return curSnacks;

          return [...curSnacks, { id, ...options }];
        });

        if (duration !== -1) {
          setTimeout(() => {
            closeSnackbar(id);
            resolve();
          }, duration || 3000);
        } else resolve();
      }),
    [closeSnackbar]
  );

  const snackbarPostion = useMemo(
    () =>
      snackbars.reduce(
        (acc, snackbar) => {
          if (snackbar.position === "right") {
            return { ...acc, right: [...acc.right, snackbar] };
          }
          if (snackbar.position === "center") {
            return { ...acc, center: [...acc.center, snackbar] };
          }

          return { ...acc, left: [...acc.left, snackbar] };
        },
        {
          right: [] as typeof snackbars,
          left: [] as typeof snackbars,
          center: [] as typeof snackbars,
        }
      ),
    [snackbars]
  );

  const providerValue = useMemo(
    () => ({ enqueueSnackbar, closeSnackbar }),
    [closeSnackbar, enqueueSnackbar]
  );

  return (
    <SnackbarContext.Provider value={providerValue}>
      {props.children}
      <View style={styles.bottomLeft}>
        {snackbarPostion.left.map((snackbar, index) => (
          <Snackbar style={styles.margin} key={index} {...snackbar} />
        ))}
      </View>
      <View style={styles.bottomRight}>
        {snackbarPostion.right.map((snackbar, index) => (
          <Snackbar style={styles.margin} key={index} {...snackbar} />
        ))}
      </View>
      <View style={styles.bottomCenter}>
        {snackbarPostion.center.map((snackbar, index) => (
          <Snackbar style={styles.margin} key={index} {...snackbar} />
        ))}
      </View>
    </SnackbarContext.Provider>
  );
});

const styles = StyleSheet.create({
  bottomLeft: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },
  bottomRight: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  bottomCenter: {
    position: "absolute",
    right: 0,
    left: 0,
    alignItems: "center",
    bottom: 20,
  },
  margin: {
    marginTop: 10,
  },
});

SnackbarProvider.displayName = "SnackbarProvider";
