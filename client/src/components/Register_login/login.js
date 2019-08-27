import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'
import FormField from '../utils/Form/FormField'
import { update, generateData, isFormValid } from '../utils/Form/formAction'
import {loginUser} from '../../actions/user_action'

class Login extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'login')
    this.setState({
      formError: false,
      formdata: newFormdata
    })
  }

  submitForm = (event) => {
    event.preventDefault();
        
    let dataToSubmit = generateData(this.state.formdata, 'login');
    let formIsValid = isFormValid(this.state.formdata, 'login')
    
    if (formIsValid) {
      this.props.loginUser(dataToSubmit)

    } else {
      this.setState({
        formError: true
      })
    }
  }

  render() {
    const {formdata, formError} = this.state
    const { login } = this.props
    
    if (login && login.loginSuccess) {
      return <Redirect to='/user/dashboard' />
    }

    return (
      <div className='signin_wrapper'>
        <form onSubmit={ (event) => this.submitForm(event) }>
          <FormField
            id={'email'}
            formdata={formdata.email}
            change={ (element) => this.updateForm(element) }
          />

          <FormField
            id={'password'}
            formdata={this.state.formdata.password}
            change={(element)=> this.updateForm(element)}
          />

          { formError || (login && login.message) ?
              <div className="error_label">
                { formError ?
                    'Something wrong, please check again your data'
                    : login.message ?
                    login.message
                      : 'Something wrong'
                }
              </div>
            : null
          }

          {/* <button onClick={(event)=> this.submitForm(event)}>
              Log in
          </button> */}
          <button type='submit'>
              Log in
          </button>

          <button
            style={{ marginLeft: '10px' }}
            onClick={ () => this.props.history.push('/forgot_pass') }
          >
            Forgot my password
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    login: state.user.login
  }
}

const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Login))