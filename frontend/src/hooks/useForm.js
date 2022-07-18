import { useFormatMessage } from '../i18n/hooks/useFormatMessage';

const { useReducer, useCallback, useMemo } = require('react');

const ACTION_TYPES = {
  UPDATE_FIELD: 'UPDATE_FIELD',
  DISPLAY_ERRORS: 'DISPLAY_ERRORS',
  SET_STATE: 'SET_STATE',
};

const DEFAULT_GET_ERROR = () => '';

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_FIELD:
      const { error, value, name } = action.payload;
      return {
        ...state,
        values: {
          ...state.values,
          [name]: value,
        },
        errors: {
          ...state.errors,
          [name]: error,
        },
      };
    case ACTION_TYPES.DISPLAY_ERRORS:
      return {
        ...state,
        errors: action.payload.errors,
      };
    case ACTION_TYPES.SET_STATE:
      return action.payload.newState;
    default:
      return state;
  }
}

/**
 *
 * @param {Array[Object]} fields array containing state for the form fields
 * @param {string} field.name string identifying a specific field
 * @param {string} field.value value for a specific field
 * @param {string} field.defaultValue initial value for a specific field
 * @param {string} field.error human readable string for a specific field error
 * @param {string} field.getError function that receives current field value and returns a human readable string error
 *
 * @returns {Object} containing fields state and updateField function
 */
const useForm = ({ fields = [] }) => {
  const formatMessage = useFormatMessage();
  const initialState = useMemo(
    () => ({
      values: fields.reduce(
        (carry, field) => ({ ...carry, [field.name]: field.defaultValue || '' }),
        {},
      ),
      errors: fields.reduce((carry, field) => ({ ...carry, [field.name]: '' }), {}),
    }),
    [fields],
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateField = useCallback(
    (name) => (value) => {
      const field = fields.find(({ name: fieldName }) => fieldName === name) || {};
      const error = field.getError ? field.getError(value, formatMessage) : DEFAULT_GET_ERROR();
      dispatch({ type: ACTION_TYPES.UPDATE_FIELD, payload: { name, value, error } });
    },
    [fields, formatMessage],
  );

  const isValid = useMemo(() => {
    return fields.every(({ name, getError }) => {
      const fieldIsInvalid = getError ? getError(state.values[name], formatMessage) : false;
      return !fieldIsInvalid;
    });
  }, [fields, state.values, formatMessage]);

  const displayErrors = useCallback(
    (formValues) => {
      const errors = fields.reduce((carry, { name, getError }) => {
        const error = getError ? getError(formValues[name], formatMessage) : DEFAULT_GET_ERROR();
        return { ...carry, [name]: error };
      }, {});
      dispatch({ type: ACTION_TYPES.DISPLAY_ERRORS, payload: { errors } });
    },
    [fields, formatMessage],
  );

  const reset = useCallback(() => {
    dispatch({ type: ACTION_TYPES.SET_STATE, payload: { newState: initialState } });
  }, [initialState]);

  return {
    ...state,
    updateField,
    isValid,
    displayErrors,
    reset,
  };
};

export default useForm;
