import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import { get, mapValues } from 'lodash';

import { is, generateErrors } from '@/shared/helpers/validation';
import Field from './Field';
import toast from '../helpers/toast';

const defaultProps = {
  validate: undefined,
  validations: undefined,
  validateOnBlur: false,
};

const Form = ({ validate, validations, ...otherProps }: any) => (
  <Formik
    {...otherProps}
    validate={(values: any) => {
      if (validate) {
        return validate(values);
      }
      if (validations) {
        return generateErrors(values, validations);
      }
      return {};
    }}
  />
);

Form.Element = (props: any) => <FormikForm noValidate {...props} />;

Form.Field = mapValues(Field, (FieldComponent) => ({ name, validate, ...props }: any) => (
  <FormikField name={name} validate={validate}>
    {({ field, form: { touched, errors, setFieldValue } }: any) => (
      <FieldComponent
        {...field}
        {...props}
        name={name}
        error={get(touched, name) && get(errors, name)}
        onChange={(value: any) => setFieldValue(name, value)}
      />
    )}
  </FormikField>
));

Form.initialValues = (data: any, getFieldValues: any) =>
  getFieldValues((key: any, defaultValue = '') => {
    const value = get(data, key);
    return value === undefined || value === null ? defaultValue : value;
  });

Form.handleAPIError = (error: any, form: any) => {
  if (error.data.fields) {
    form.setErrors(error.data.fields);
  } else {
    console.log(error);
    toast.error(error);
  }
};

Form.is = is;

Form.defaultProps = defaultProps;

export default Form;
