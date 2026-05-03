import { useCallback, useEffect, useRef, useState } from "react";
import type { EditChain, EditOp } from "../../../services/audio_edit_client";
import {
  applySliderState,
  chainToSliderState,
  type DirectModSliderState,
} from "../lib/slider_chain";

const DEBOUNCE_MS = 200;
const HISTORY_LIMIT = 32;

export interface UseChainStateResult {
  chain: EditChain;
  sliderState: DirectModSliderState;
  setSliderState: (next: DirectModSliderState) => void;
  upsertOp: (op: EditOp) => void;
  removeOp: (opId: string) => void;
  reorderOps: (idsInOrder: string[]) => void;
  setChain: (chain: EditChain) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  pendingExecution: boolean;
  flush: () => void;
}

interface UseChainStateOptions {
  initialChain?: EditChain;
  onCommit?: (chain: EditChain) => void;
}

const EMPTY_CHAIN: EditChain = { version: 1, ops: [] };

export function useChainState(options: UseChainStateOptions = {}): UseChainStateResult {
  const initial = options.initialChain ?? EMPTY_CHAIN;
  const [chain, setChainRaw] = useState<EditChain>(initial);
  const [past, setPast] = useState<EditChain[]>([]);
  const [future, setFuture] = useState<EditChain[]>([]);
  const [pendingExecution, setPendingExecution] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCommitRef = useRef(options.onCommit);
  onCommitRef.current = options.onCommit;

  const scheduleCommit = useCallback((next: EditChain) => {
    setPendingExecution(true);
    if (debounceRef.current !== null) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPendingExecution(false);
      onCommitRef.current?.(next);
    }, DEBOUNCE_MS);
  }, []);

  const flush = useCallback(() => {
    if (debounceRef.current !== null) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    setPendingExecution(false);
    onCommitRef.current?.(chain);
  }, [chain]);

  useEffect(() => {
    return () => {
      if (debounceRef.current !== null) clearTimeout(debounceRef.current);
    };
  }, []);

  const pushHistory = useCallback(
    (current: EditChain) => {
      setPast((p) => {
        const next = [...p, current];
        if (next.length > HISTORY_LIMIT) next.shift();
        return next;
      });
      setFuture([]);
    },
    [],
  );

  const setChain = useCallback(
    (next: EditChain) => {
      setChainRaw((current) => {
        if (current === next) return current;
        pushHistory(current);
        scheduleCommit(next);
        return next;
      });
    },
    [pushHistory, scheduleCommit],
  );

  const setSliderState = useCallback(
    (next: DirectModSliderState) => {
      setChainRaw((current) => {
        const updated = applySliderState(current, next);
        pushHistory(current);
        scheduleCommit(updated);
        return updated;
      });
    },
    [pushHistory, scheduleCommit],
  );

  const upsertOp = useCallback(
    (op: EditOp) => {
      setChainRaw((current) => {
        const filtered = current.ops.filter((o) => o.id !== op.id);
        const updated: EditChain = { ...current, ops: [...filtered, op] };
        pushHistory(current);
        scheduleCommit(updated);
        return updated;
      });
    },
    [pushHistory, scheduleCommit],
  );

  const removeOp = useCallback(
    (opId: string) => {
      setChainRaw((current) => {
        if (!current.ops.some((o) => o.id === opId)) return current;
        const updated: EditChain = {
          ...current,
          ops: current.ops.filter((o) => o.id !== opId),
        };
        pushHistory(current);
        scheduleCommit(updated);
        return updated;
      });
    },
    [pushHistory, scheduleCommit],
  );

  const reorderOps = useCallback(
    (idsInOrder: string[]) => {
      setChainRaw((current) => {
        const map = new Map(current.ops.map((o) => [o.id, o]));
        const reordered: EditOp[] = [];
        for (const id of idsInOrder) {
          const op = map.get(id);
          if (op) reordered.push(op);
        }
        if (reordered.length !== current.ops.length) return current;
        const updated: EditChain = { ...current, ops: reordered };
        pushHistory(current);
        scheduleCommit(updated);
        return updated;
      });
    },
    [pushHistory, scheduleCommit],
  );

  const undo = useCallback(() => {
    setPast((prevPast) => {
      if (prevPast.length === 0) return prevPast;
      const previous = prevPast[prevPast.length - 1];
      if (!previous) return prevPast;
      setChainRaw((current) => {
        setFuture((f) => [...f, current]);
        scheduleCommit(previous);
        return previous;
      });
      return prevPast.slice(0, -1);
    });
  }, [scheduleCommit]);

  const redo = useCallback(() => {
    setFuture((prevFuture) => {
      if (prevFuture.length === 0) return prevFuture;
      const next = prevFuture[prevFuture.length - 1];
      if (!next) return prevFuture;
      setChainRaw((current) => {
        setPast((p) => [...p, current]);
        scheduleCommit(next);
        return next;
      });
      return prevFuture.slice(0, -1);
    });
  }, [scheduleCommit]);

  return {
    chain,
    sliderState: chainToSliderState(chain),
    setSliderState,
    upsertOp,
    removeOp,
    reorderOps,
    setChain,
    undo,
    redo,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    pendingExecution,
    flush,
  };
}
