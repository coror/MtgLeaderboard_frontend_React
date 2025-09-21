import { Player } from '../models/player';

type FormState = {
  selectedPlayerOne: Player | null;
  selectedPlayerTwo: Player | null;
  scoreOne: number;
  scoreTwo: number;
};

type Action =
  | {
      type: 'UPDATE_FIELD';
      field: keyof FormState;
      value: FormState[keyof FormState];
    }
  | { type: 'RESET_FORM'; payload: FormState };

const formReducer = (state: FormState, action: Action): FormState => {
  if (action.type === 'UPDATE_FIELD') {
    return {
      ...state,
      [action.field]: action.value,
    };
  }

  if (action.type === 'RESET_FORM') {
    return action.payload; // Use initial state passed in payload
  }
  return state;
};

export default formReducer;
