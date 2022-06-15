import { useState, useCallback } from 'react';
import { isFunction } from 'lodash';

const useMergeState = (initialState: any) => {
  const [state, setState] = useState(initialState || {});

  const mergeState = useCallback((newState: any) => {
    if (isFunction(newState)) {
      setState((currentState: any) => ({ ...currentState, ...newState(currentState) }));
    } else {
      setState((currentState: any) => ({ ...currentState, ...newState }));
    }
  }, []);

  return [state, mergeState];
};

export default useMergeState;
