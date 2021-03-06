import React, { Component } from 'react';
import { FieldFeedback, FieldFeedbacks, FormWithConstraints } from 'react-form-with-constraints';
import { login } from '../../../services/users.js';
import styles from './Login.css';


const USERNAME = 'username';
const PASSWORD = 'password';

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValid: true,
      errors: {}
    };

    this.state[USERNAME] = ''
    this.state[PASSWORD] = ''

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleInputChange(event) {
    event.preventDefault();
    let newState = {}
    newState[event.target.name] = event.target.value;
    this.setState(newState);
    const fields = await this.form.validateFields(event.currentTarget);
    const fieldIsValid = fields.every(fieldFeedbacksValidation => {
      let errors = { ...this.state.errors };
      let isFieldValid = fieldFeedbacksValidation.isValid();
      errors[fieldFeedbacksValidation.name] = !isFieldValid;
      this.setState({ errors: errors });
      return isFieldValid;
    });
    this.setState({ formValid: this.form.isValid(), loginError: undefined });
  }

  async handleSubmit() {
    const fields = await this.form.validateForm();
    const formIsValid = fields.every(field => field.isValid());
    this.setState({ formValid: formIsValid });
    if (formIsValid) {
      let requestData = {}
      requestData[USERNAME] = this.state[USERNAME];
      requestData[PASSWORD] = this.state[PASSWORD];
      this.setState({ loggingIn: true });
      login(requestData).then(res => {
        localStorage.setItem('token', res.token);
        this.setState({ loggingIn: false });
      }).catch((err) => {
        this.setState({'loginError': err.error, loggingIn: false});
      });
    }
  }

  render() {
    let iconImage = require('../../../assets/images/hypoconn.png');
    return (
      <div className={styles.loginContainer}>
        <div className={styles.header}>
          <img src={iconImage} className={styles.logo} />
          <span className={styles.logoCaption}>manage hypothes.is annotations</span>
        </div>
        <div className={styles.loginForm}>
          <FormWithConstraints ref={formRef => { this.form = formRef; }}>
            <div className={styles.fieldContainer}>
              <input
                placeholder={USERNAME.toUpperCase()}
                name={USERNAME}
                type="text"
                maxLength={120}
                className={`${styles.loginInput} ${this.state.errors[USERNAME] ? styles.errorInput : ''}`}
                value={this.state[USERNAME]}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className={styles.fieldContainer}>
              <input
                placeholder={PASSWORD.toUpperCase()}
                name={PASSWORD}
                type="password"
                maxLength={120}
                className={`${styles.loginInput} ${this.state.errors[PASSWORD] ? styles.errorInput : ''}`}
                value={this.state[PASSWORD]}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className={`${styles.errorContainer} ${this.state.formValid ? styles.hidebox : ''}`}>
              <FieldFeedbacks for={USERNAME}>
                <FieldFeedback when="valueMissing">username is required!</FieldFeedback>
              </FieldFeedbacks>
              <FieldFeedbacks for={PASSWORD}>
                <FieldFeedback when="valueMissing">password is required!</FieldFeedback>
              </FieldFeedbacks>
            </div>
            <div className={`${styles.errorContainer} ${!this.state.loginError ? styles.hidebox : ''}`}>
               <div><span>{this.state.loginError}</span></div>
            </div>
          </FormWithConstraints>
          <div className={styles.btnContainer}>
            <button
              disabled={!this.state.formValid}
              className={
                `${styles.submitButton}
                ${!this.state.formValid ? styles.disabledButton : ''}
                ${this.state.loggingIn ? styles.loader: ''}
              `}
              onClick={this.handleSubmit}
            >.</button>
          </div>
        </div>
      </div>
    )
  }
}
