const { useReducer, useCallback, useMemo } = require('react');

const ACTION_TYPES = {
  UPDATE_FIELD: 'UPDATE_FIELD',
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
        touched: {
          ...state.touched,
          [name]: true,
        },
        errors: {
          ...state.errors,
          [name]: error,
        },
      };
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
 * @param {boolean} field.touched boolean that determines if the user already updated the specific field at least once
 *
 * @returns {Object} containing fields state and updateField function
 */
const useForm = ({ fields = [] }) => {
  const initialState = useMemo(
    () => ({
      values: fields.reduce(
        (carry, field) => ({ ...carry, [field.name]: field.defaultValue || '' }),
        {},
      ),
      errors: fields.reduce((carry, field) => ({ ...carry, [field.name]: '' }), {}),
      touched: fields.reduce((carry, field) => ({ ...carry, [field.name]: false }), {}),
    }),
    [fields],
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateField = useCallback(
    (name) => (value) => {
      const field = fields.find(({ name: fieldName }) => fieldName === name) || {};
      const error = field.getError ? field.getError(value) : DEFAULT_GET_ERROR();
      dispatch({ type: ACTION_TYPES.UPDATE_FIELD, payload: { name, value, error } });
    },
    [fields],
  );

  return {
    ...state,
    updateField,
  };
};

export default useForm;
