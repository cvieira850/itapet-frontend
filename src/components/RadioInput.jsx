import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { useField } from '@unform/core'

import { uniqueId } from 'lodash/util'

function RadioInput({ name, value, label, ...rest }) {
  const inputRef = useRef()

  const [id] = useState(uniqueId('radioinput-'))

  const { fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: `${fieldName}[${value}]`,
      ref: inputRef.current,
      path: 'checked',
    })
  }, [fieldName, registerField, value])

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type="radio" id={id} name={fieldName} ref={inputRef} {...rest} />
    </div>
  )
}

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
}

export default RadioInput
