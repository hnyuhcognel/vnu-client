import { ErrorMessage } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import Select from 'react-select'
import { FormFeedback, FormGroup, Label } from 'reactstrap'

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
}

SelectField.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  options: [],
}

function SelectField(props) {
  const { field, form, options, label, placeholder, disabled, handleSetNewGroup } = props
  console.log('SelectField ~ handleSetNewGroup', handleSetNewGroup)
  const { name, value } = field
  const { errors, touched } = form
  const showError = errors[name] && touched[name]

  const optionsInFormat = []

  options.forEach((option) => {
    optionsInFormat.push({ value: option.id_nhom, label: option.ten_nhom })
  })

  optionsInFormat.push({ value: 'khac', label: 'Nhóm khác...' })

  const selectedOption = optionsInFormat.find((option) => option.id_nhom === value)

  const handleSelectedOptionChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : selectedOption

    const changeEvent = {
      target: {
        name: name,
        value: selectedValue,
      },
    }
    field.onChange(changeEvent)
    selectedOption.value === 'khac' && handleSetNewGroup(true)
    selectedOption.value !== 'khac' && handleSetNewGroup(false)
  }

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}

      <Select
        id={name}
        {...field}
        value={selectedOption}
        onChange={handleSelectedOptionChange}
        placeholder={placeholder}
        isDisabled={disabled}
        options={optionsInFormat}
        className={showError ? 'is-invalid' : ''}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  )
}

export default SelectField
