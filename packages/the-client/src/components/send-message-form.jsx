import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendMessageService } from '../services/send-message-service.js';

const INITIAL_FORM_DATA = {
  message: ''
};

export function SendMessageForm() {
  const [ formData, setFormData ] = useState(INITIAL_FORM_DATA);

  const isValid = () => Boolean(formData.message);

  const handleInputChange = (event) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [event.target.name]: event.target.value
    }));
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: sendMessageService
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    mutateAsync(formData.message).then(() => setFormData(INITIAL_FORM_DATA));
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
          type="text"
          name="message"
          value={ formData.message }
          disabled={ isLoading }
          onChange={ handleInputChange }
      />
      <button type="submit" disabled={ !isValid() || isLoading }>
        Send
      </button>
    </form>
  );
}