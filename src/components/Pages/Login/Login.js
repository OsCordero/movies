import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import './login.scss';

const renderInput = ({ input, placeholder, meta }) => {
  const showError = meta.error && meta.touched;
  return (
    <div>
      <input
        autoComplete='off'
        {...input}
        className={`login-input ${showError ? 'input-error' : ''}`}
        type='text'
        placeholder={placeholder}
      />
      <div className={`error ${showError ? '' : 'hidden'}`}>{meta.error}</div>
    </div>
  );
};

const onSubmit = formProps => {
  console.log(formProps);
};

const validate = formValues => {
  const errors = {};
  if (!formValues.username) {
    errors.username = 'Username field is required';
  }

  if (!formValues.password) {
    errors.password = 'Password field is required';
  }
  return errors;
};

const Login = props => {
  return (
    <div className='login'>
      <div className='login-card'>
        <div className='header'>Sign In</div>
        <form className='login-form' onSubmit={props.handleSubmit(onSubmit)}>
          <Field name='username' component={renderInput} placeholder='Username' />
          <Field name='password' component={renderInput} placeholder='Password' />
          <button className='btn primary'>Sign In</button>
          <div className='sign-up'>
            <Link to='/register'>Don't have an account? Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default reduxForm({ form: 'loginForm', validate })(Login);
