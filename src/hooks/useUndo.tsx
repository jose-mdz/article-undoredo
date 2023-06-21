import { useState } from "react";

export function useUndo<T>(initialState: T): {
    document: T;
    setDocument(s: T): void;
    undo(): void;
    store(): void;
}{
    const [document, setDocument] = useState(initialState);
    const [undoStack, setUndoStack] = useState<T[]>([initialState]);

    const store = () => {
        setUndoStack([...undoStack, document]);
    };

    const undo = () => {
        if(undoStack.length > 1){
            const desired = undoStack[undoStack.length - 2];
            setUndoStack(undoStack.slice(0, undoStack.length - 1));
            setDocument(desired);
        }
    };

    return { document, setDocument, undo, store };
}