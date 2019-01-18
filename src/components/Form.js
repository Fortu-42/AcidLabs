import React, { Component } from "react";
import acid from "./acid.png";
import "./formStyles.css";

class Form extends Component {
  state = {
    password: "",
    passwordError: "",
    isPasswordValid: false,
    email: "",
    emailError: "",
    isEmailValid: false,
    isFormValid: false,
    timer: 0
  };

  changeEmail = async e => {
    await this.setState({
      email: e.target.value
    });

    if (this.state.timer) clearTimeout(this.state.timer);

    this.setState({
      timer: setTimeout(() => {
        this.validateEmail();
      }, 1000)
    });
  };

  validateEmail = async () => {
    const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!regExpEmail.test(this.state.email)) {
      await this.setState({
        emailError: "Por favor introduzca un email válido",
        isEmailValid: false
      });
    } else {
      await this.setState({ emailError: "", isEmailValid: true });
    }
    this.enableSubmit();
  };

  changePassword = async e => {
    await this.setState({
      password: e.target.value
    });

    if (this.state.timer) clearTimeout(this.state.timer);

    this.setState({
      timer: setTimeout(() => {
        this.validatePassword();
      }, 1000)
    });
  };

  validatePassword = async () => {
    if (this.state.password.length < 4) {
      await this.setState({
        passwordError: "La contraseña debe tener al menos 4 caracteres",
        isPasswordValid: false
      });
    } else {
      await this.setState({ passwordError: "", isPasswordValid: true });
    }
    this.enableSubmit();
  };

  enableSubmit = () => {
    if (this.state.isEmailValid && this.state.isPasswordValid) {
      this.setState({ isFormValid: true });
    } else {
      this.setState({ isFormValid: false });
    }
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className='form-container'>
        <form onSubmit={e => this.onSubmit(e)}>
          <img alt='acidLab-logo' src={acid} />
          <label>Email</label>
          <input
            name='email'
            onChange={e => this.changeEmail(e)}
            value={this.state.email}
            type='text'
            onBlur={this.validateEmail}
            className={`input-form ${
              this.state.emailError
                ? "error"
                : this.state.isEmailValid
                ? "valid"
                : ""
            }`}
            placeholder='Introduzca email'
          />
          <p>{this.state.emailError}</p>
          <label>Contraseña</label>
          <input
            name='password'
            onChange={e => this.changePassword(e)}
            value={this.state.password}
            type='password'
            onBlur={this.validatePassword}
            className={`input-form ${
              this.state.passwordError
                ? "error"
                : this.state.isPasswordValid
                ? "valid"
                : ""
            }`}
            placeholder='Introduzca contraseña'
          />
          <p>{this.state.passwordError}</p>
          <div className='button-container'>
            {this.state.isFormValid ? (
              <button>Iniciar Sesión</button>
            ) : (
              "Por favor, complete el formulario correctamente"
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
