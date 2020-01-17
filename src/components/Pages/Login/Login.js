import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from './../../../actions/userActions';
import { validateEmail } from '../../../helpers/validators';
import './login.scss';

const renderInput = ({ input, placeholder, meta }) => {
  const showError = meta.error && meta.touched;
  return (
    <div>
      <input
        autoComplete='off'
        {...input}
        className={`form-input ${showError ? 'input-error' : ''}`}
        type='text'
        placeholder={placeholder}
      />
      <div className={`error ${showError ? '' : 'hidden'}`}>{meta.error}</div>
    </div>
  );
};

const validate = formValues => {
  const errors = {};
  Object.keys(formValues).forEach(key => {
    const value = formValues[key];
    errors[key] = !value && key !== 'about' && key !== 'siteUrl' && 'This is a required field';
    if (key === 'email' && value) {
      errors[key] = !validateEmail(value) && 'Please insert a valid email';
    }
  });
  return errors;
};

const Login = props => {
  const onSubmit = ({ email, password }) => {
    props.login(email, password);
  };

  return (
    <div className='login'>
      <div className='login-card'>
        <div className='login-header'>
          <img alt='logo' src={require('./app.svg')} />
          <div className='header'>Sign In</div>
        </div>
        <form className='login-form' onSubmit={props.handleSubmit(onSubmit)}>
          <Field name='email' component={renderInput} placeholder='Email' />
          <Field name='password' component={renderInput} placeholder='Password' />
          <div>
            <button className='btn primary'>
              {props.isLoading ? (
                <div className='lds-ellipsis'>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
            <div className={`header-error ${props.loginError ? '' : 'hidden-none'}`}>
              Looks like something went wrong, please check your data or try again later
            </div>
          </div>
          <div className='sign-up'>
            <Link to='/register'>{"Don't have an account? Sign Up"}</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const loginReduxForm = reduxForm({
  form: 'loginForm',
  validate,
  initialValues: {
    email: '',
    password: '',
  },
})(Login);

const mapStateToProps = state => {
  return { isLoading: state.user.isLoading, loginError: state.user.userError };
};
export default connect(mapStateToProps, { login })(loginReduxForm);
