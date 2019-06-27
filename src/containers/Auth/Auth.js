import React from 'react';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import axios from 'axios';

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default class Auth extends React.Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Почта',
        errorMessage: 'Введите корректный почтовый адрес',
        valid: false,
        touched: false,
        validation: {
          reqiured: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите правльный пароль',
        valid: false,
        touched: false,
        validation: {
          reqiured: true,
          minLength: 6
        }
      }
    }
  };

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };

    try {
      const response = await axios.post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDyXEodjwKiy1okAj170IP1fwOv8Xbz2dU`,
        authData
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };

    try {
      const response = await axios.post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDyXEodjwKiy1okAj170IP1fwOv8Xbz2dU`,
        authData
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  submitHandler = event => {
    event.preventDefault();
    return;
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.reqiured) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  handlerOnChange = (event, controlName) => {
    const { formControls } = this.state;

    const formControl = { ...formControls };
    const control = { ...formControl[controlName] };
    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControl[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls: formControl,
      isFormValid
    });
  };

  renderInput = () => {
    const { formControls } = this.state;
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={event => this.handlerOnChange(event, controlName)}
        />
      );
    });
  };

  render() {
    const { isFormValid } = this.state;

    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInput()}

            <Button
              type={'succes'}
              onClick={this.loginHandler}
              disabled={!isFormValid}
            >
              Войти
            </Button>

            <Button
              type={'primary'}
              onClick={this.registerHandler}
              disabled={!isFormValid}
            >
              Регистрация
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
