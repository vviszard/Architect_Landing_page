export interface CursorContextType {
  cursorText: string;
  cursorIcon: React.ReactNode | null;
  setCursorState: (text: string, icon?: React.ReactNode) => void;
  resetCursor: () => void;
}
