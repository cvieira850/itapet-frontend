import { darken } from 'polished';

const validationErrorSpan = {
  color: 'rgb(77,171,154)',
  alignSelf: 'flex-start',
  margin: '0 0 10px',
  fontWeight: 'bold',
  marginTop: '3px',
};

const button = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  border: '0',
  fontWeight: 'bold',
  color: '#fff',
  fontSize: '16px',
  transition: 'background 0.2s',
};

const actionButton = {
  ...button,
  background: 'rgb(77,171,154)',

  '&:hover': {
    background: darken(0.03, 'rgb(77,171,154)'),
  },
};

const cancelButton = {
  ...button,
  background: '#cccccc',

  '&:hover': {
    background: darken(0.03, '#cccccc'),
  },
};

export { validationErrorSpan, actionButton, cancelButton };
