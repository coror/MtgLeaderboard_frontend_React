// formReducer.ts

export type FormAction<T> =
  | { type: 'UPDATE_FIELD'; field: keyof T; value: T[keyof T] }
  | { type: 'RESET_FORM'; payload: T };

export const formReducer = <T extends Record<string, unknown>>(
  state: T,
  action: FormAction<T>
): T => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      // The `as T[keyof T]` is needed for type safety because TypeScript can't
      // guarantee `action.value` matches `state[action.field]` at compile time
      return {
        ...state,
        [action.field]: action.value as T[keyof T],
      };
    case 'RESET_FORM':
      return action.payload;
    default:
      return state;
  }
};
