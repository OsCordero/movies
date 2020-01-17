import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from './../../../actions/userActions';
import {
  validateRange,
  validateAge,
  validateEmail,
  validateURL,
} from '../../../helpers/validators';
import countries from '../../../constants/countries';
import './register.scss';

const renderInput = ({ input, placeholder, meta, type }) => {
  const showError = meta.error && meta.touched;
  return (
    <div>
      <input
        autoComplete='off'
        {...input}
        className={`form-input ${showError ? 'input-error' : ''}`}
        type={type ? type : 'text'}
        placeholder={placeholder}
      />
      {renderError(showError, meta.error)}
    </div>
  );
};

const renderRadioInput = ({ input, meta, options, typeSelect }) => {
  const showError = meta.error && meta.touched;
  return (
    <div>
      <div className='radios-gender'>
        {options.map(option => (
          <div key={option.title} className='radio-gender'>
            <Field {...input} component='input' type={typeSelect} value={option.value} />
            <label className='check-label'> {option.title}</label>
          </div>
        ))}
      </div>
      {renderError(showError, meta.error)}
    </div>
  );
};

const renderSelectInput = ({ input, meta, options, placeholder }) => {
  const showError = meta.error && meta.touched;

  return (
    <div>
      <select {...input} className='form-input' name='address'>
        <option value=''> {`Select your ${placeholder}`} </option>
        {options.map((option, key) => (
          <option key={key} value={key}>
            {option.country ? option.country : option}
          </option>
        ))}
      </select>
      {renderError(showError, meta.error)}
    </div>
  );
};
const renderError = (showError, error) => {
  return (
    <div className={`error ${showError ? '' : 'hidden'}`}>
      {error} <span className='danger-tag'>&#x26A0;</span>
    </div>
  );
};
const validate = formValues => {
  const errors = {};
  Object.keys(formValues).forEach(key => {
    const value = formValues[key];
    errors[key] = !value && key !== 'about' && key !== 'siteUrl' && 'This is a required field';

    if ((key === 'firstname' || key === 'lastname') && value) {
      errors[key] =
        !validateRange(value, 4, 15) &&
        'This field must have more than 4 characters and less than 15';
    }
    if (key === 'email' && value) {
      errors[key] = !validateEmail(value) && 'Please insert a valid email';
    }
    if (key === 'confirmPassword' && value) {
      errors[key] = !(value === formValues['password']) && "Passwords doesn't match";
    }
    if (key === 'siteUrl' && value) {
      errors[key] = !validateURL(value) && 'Please insert a valid URL';
    }
    if (key === 'birthDate' && value) {
      errors[key] = !validateAge(value) && "Look's like you're too young";
    }
    if (key === 'agree' && !value) {
      errors[key] = 'Please accept our terms and privacy policy ';
    }
  });

  return errors;
};

const Register = props => {
  const [showState, setShowState] = useState(false);
  const [selectedCountry, setselectedCountry] = useState(null);

  const onSubmit = ({ email, password }) => {
    props.register(email, password);
  };

  return (
    <div className='register'>
      <div className='register-card'>
        <div className='register-header'>
          <img alt='logo' src={require('./app.svg')} />
          <div className='header'>Create Account</div>
        </div>
        <form className='register-form' onSubmit={props.handleSubmit(onSubmit)}>
          <div className='name'>
            <Field name='firstname' component={renderInput} placeholder='Fisrtname' />
            <Field name='lastname' component={renderInput} placeholder='Lastname' />
          </div>
          <Field name='email' component={renderInput} placeholder='Email' />
          <Field name='password' type='password' component={renderInput} placeholder='Password' />
          <Field
            name='confirmPassword'
            type='password'
            component={renderInput}
            placeholder='Confirm password'
          />
          <Field name='birthDate' component={renderInput} placeholder='Birth date' type='date' />
          <Field
            name='telephone'
            component={renderInput}
            placeholder='Telephone number'
            normalize={(val, prevVal) => {
              if (val) {
                return /^\d+$/.test(val) ? val : prevVal;
              }
              return val;
            }}
          />
          <Field
            name='siteUrl'
            type='text'
            component={renderInput}
            placeholder='Personal site url'
          />
          <Field name='about' component={renderInput} type='textarea' placeholder='About me ' />
          <Field
            name='gender'
            component={renderRadioInput}
            placeholder='Genre'
            options={[
              { title: 'Male', value: 'male' },
              { title: 'Female', value: 'female' },
            ]}
            typeSelect={'radio'}
          />
          <Field
            onChange={props => {
              props.target.value ? setShowState(true) : setShowState(false);
              setselectedCountry(props.target.value);
            }}
            name='country'
            component={renderSelectInput}
            placeholder='Country'
            options={Object.values(countries.countries)}
          />
          {showState && (
            <Field
              name='state'
              placeholder='State'
              component={renderSelectInput}
              options={Object.values(countries.countries)[selectedCountry].states}
            />
          )}

          <div className='agree'>
            <p className='agree-message'>
              By clicking Sign Up, you agree to our Terms and Privacy Policy
            </p>
            <Field
              name='agree'
              component={renderRadioInput}
              typeSelect='checkbox'
              options={[{ title: 'I Agree', value: true }]}
            />
          </div>
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
                'SIGN UP'
              )}
            </button>
            <div className={`header-error ${props.registerError ? '' : 'hidden-none'}`}>
              Looks like something went wrong, please check your data or try again later
            </div>
          </div>
          <div className='sign-in'>
            <Link to='/login'>Already have an account? Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const registerReduxForm = reduxForm({
  form: 'registerForm',
  validate,
  initialValues: {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    telephone: '',
    siteUrl: '',
    about: '',
    gender: '',
    country: '',
    state: '',
    agree: '',
  },
})(Register);

const mapStateToProps = state => {
  return {
    isLoading: state.user.isLoading,
    registerError: state.user.userError,
  };
};
export default connect(mapStateToProps, { register })(registerReduxForm);
