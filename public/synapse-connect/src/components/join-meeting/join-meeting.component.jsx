import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import './join-meeting.styles.css';
import Button from '../button/button.component';

const defaultFormFields = {
  meetingLink: '',
  meetingPassword: ''
};

const JoinMeeting = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { meetingLink, meetingPassword } = formFields; 

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value});
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label={'Meeting link'}
          type='text'
          required
          name='meetingLink'
          value={meetingLink}
          onChange={handleFieldChange}
        />

        <FormInput
          label={'Meeting Password'}
          type='text'
          required
          name='meetingPassword'
          value={meetingPassword}
          onChange={handleFieldChange}
        />

        <Button type='button'>
          Join Meeting
        </Button>

      </form>
    </div>
  );
};

export default JoinMeeting;
