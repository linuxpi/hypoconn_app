import React, {Component} from 'react';

import { login } from '../../../services/users.js';

import styles from './Login.css';

const USERNAME = 'username';
const PASSWORD = 'password';

export default class LoginComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        let newState = {}
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    handleSubmit() {
        let requestData = {}
        requestData[USERNAME] = this.state[USERNAME];
        requestData[PASSWORD] = this.state[PASSWORD];
        login(requestData).catch(err => console.log(err)).then(res => console.log(res));
    }

    render() {
        let iconImage = require('../../../assets/images/hypoconn.png');
        return (
            <div className={styles.loginContainer}>
                <div className={styles.header}>
                    <img src={iconImage} className={styles.logo}/>
                    <span className={styles.logoCaption}>manage hypothes.is annotations</span>
                </div>
                <div className={styles.loginForm}>
                    <form>
                        <div className={styles.fieldContainer}>
                            <input
                                placeholder={USERNAME.toUpperCase()}
                                name={USERNAME}
                                type="text"
                                maxLength={120}
                                className={styles.loginInput}
                                value={this.state[USERNAME]}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className={styles.fieldContainer}>
                            <input
                                placeholder={PASSWORD.toUpperCase()}
                                name={PASSWORD}
                                type="password"
                                maxLength={120}
                                className={styles.loginInput}
                                value={this.state[PASSWORD]}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </form>
                    <button
                        // disabled={!(this.state[USERNAME] && this.state[PASSWORD])}
                        className={`${styles.submitButton} ${!(this.state[USERNAME] && this.state[PASSWORD]) ? styles.disabledButton : ''}`}
                        onClick={this.handleSubmit}
                    >
                    .
                    </button>
                </div>
            </div>
        )
    }
}
