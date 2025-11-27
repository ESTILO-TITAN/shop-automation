import { useState, useCallback, useRef } from 'react';

export const useUndoRedo = (initialState) => {
    const [index, setIndex] = useState(0);
    const [history, setHistory] = useState([initialState]);

    const setState = useCallback((newState) => {
        const newHistory = history.slice(0, index + 1);
        newHistory.push(newState);
        setHistory(newHistory);
        setIndex(newHistory.length - 1);
    }, [history, index]);

    const undo = useCallback(() => {
        if (index > 0) {
            setIndex(index - 1);
        }
    }, [index]);

    const redo = useCallback(() => {
        if (index < history.length - 1) {
            setIndex(index + 1);
        }
    }, [index, history.length]);

    const canUndo = index > 0;
    const canRedo = index < history.length - 1;

    return {
        state: history[index],
        setState,
        undo,
        redo,
        canUndo,
        canRedo
    };
};

export const useAutosave = (data, saveFunction, interval = 30000) => {
    const timeoutRef = useRef(null);
    const [lastSaved, setLastSaved] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const save = useCallback(async () => {
        setIsSaving(true);
        try {
            await saveFunction(data);
            setLastSaved(new Date());
        } catch (error) {
            console.error('Autosave failed:', error);
        } finally {
            setIsSaving(false);
        }
    }, [data, saveFunction]);

    const scheduleSave = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(save, interval);
    }, [save, interval]);

    return {
        lastSaved,
        isSaving,
        scheduleSave,
        saveNow: save
    };
};

export default { useUndoRedo, useAutosave };
