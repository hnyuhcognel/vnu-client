import { ErrorMessage } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { FormFeedback, FormGroup, Input } from 'reactstrap'
import './styles.scss'

function InputField(props) {
  const { field, form, type, placeholder, disabled, value, onInput } = props
  const { name } = field
  const { errors, touched } = form
  const showError = errors[name] && touched[name]

  return (
    <FormGroup>
      <Input
        className='input'
        id={name}
        {...field}
        onInput={onInput}
        value={value}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        invalid={showError}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  )
}

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  placeholder: PropTypes.string,
}

InputField.defaultProps = {
  type: 'text',
  placeholder: '',
}

export default InputField
