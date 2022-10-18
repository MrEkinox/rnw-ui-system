export declare const useHover: () => {
    handlers: {
        onTouchStart: () => void;
        onTouchEnd: () => void;
        onHoverIn: () => void;
        onHoverOut: () => void;
    };
    isActive: boolean;
};
export declare const useHoverIndex: () => {
    handlers: (itemIndex: number) => {
        onTouchStart: () => void;
        onTouchEnd: () => void;
        onHoverIn: () => void;
        onHoverOut: () => void;
    };
    index: number;
};
