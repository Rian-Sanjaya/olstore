import React, {Component} from 'react'
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import FormField from '../utils/Form/FormField'
import { update, generateData, isFormValid } from '../utils/Form/formAction'
import { registerUser } from '../../actions/user_action'
// import Modal from '@material-ui/core/Modal'
// import Dialog from '@material-ui/core/Dialog'

class Register extends Component {
  state = {
    formError: false,
    formErrorMsg: '',
    formSuccess:false,
    formdata:{
      name: {
        element: 'input',
        value: '',
        config:{
            name: 'name_input',
            type: 'text',
            placeholder: 'Enter your name'
        },
        validation:{
            required: true
        },
        valid: false,
        touched: false,
        validationMessage:''
      },
      lastname: {
        element: 'input',
        value: '',
        config:{
            name: 'lastname_input',
            type: 'text',
            placeholder: 'Enter your lastname'
        },
        validation:{
            required: true
        },
        valid: false,
        touched: false,
        validationMessage:''
      },
      email: {
        element: 'input',
        value: '',
        config:{
            name: 'email_input',
            type: 'email',
            placeholder: 'Enter your email'
        },
        validation:{
            required: true,
            email: true
        },
        valid: false,
        touched: false,
        validationMessage:''
      },
      password: {
        element: 'input',
        value: '',
        config:{
            name: 'password_input',
            type: 'password',
            placeholder: 'Enter your password'
        },
        validation:{
            required: true,
            confirm: 'confirmPassword'
        },
        valid: false,
        touched: false,
        validationMessage:''
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config:{
            name: 'confirm_password_input',
            type: 'password',
            placeholder: 'Confirm your password'
        },
        validation:{
            required: true,
            confirm: 'password'
        },
        valid: false,
        touched: false,
        validationMessage:''
      }
    }
  }

  updateForm(element) {
    const newFormdata = update(element, this.state.formdata, 'register')
    
    this.setState({
      formError: false,
      formErrorMsg: '',
      formdata: newFormdata
    })
  }

  submitForm(event) {
    event.preventDefault()

    let dataToSubmit = generateData(this.state.formdata, 'register')
    let formIsValid = isFormValid(this.state.formdata, 'register')
    
    if (formIsValid) {
      if (this.state.formdata.password.value !== this.state.formdata.confirmPassword.value) {
        this.setState({
          formError: true,
          formErrorMsg: 'Password do not match'
        })
      } else {
        this.props.registerUser(dataToSubmit)
      }

    } else {
      this.setState({
        formError: true,
        formErrorMsg: 'Something wrong, please check again your data'
      })
    }
  }

  render() {
    const { formError, formErrorMsg } = this.state
    const { register } = this.props

    if (register && register.success) {
      setTimeout( () => {
        return this.props.history.push('/register_login')
      }, 1000)
    }

    return (
      <div className='page_wrapper'>
        {/* <Modal open={false} onClose={() => {}}>
          <div className='dialog_alert'>
            <div>Register Success</div>
            <div>You will be redirected to the LOGIN page</div>
          </div>
        </Modal> */}

        <div className='container'>
          <div className='register_login_container'>
            <div className='left'>
              <form onSubmit={(event) => this.submitForm(event)}>
                
                <h2>Personal information</h2>
                <div className='form_block_two'>
                  <div className='block'>
                    <FormField
                      id={'name'}
                      formdata={this.state.formdata.name}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={'lastname'}
                      formdata={this.state.formdata.lastname}
                      change={(element)=> this.updateForm(element)}
                    />
                  </div>
                </div>

                <div>
                  <FormField
                    id={'email'}
                    formdata={this.state.formdata.email}
                    change={(element)=> this.updateForm(element)}
                  />
                </div>

                <h2>Verify password</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={'password'}
                      formdata={this.state.formdata.password}
                      change={(element)=> this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={'confirmPassword'}
                      formdata={this.state.formdata.confirmPassword}
                      change={(element)=> this.updateForm(element)}
                    />
                  </div>
                </div>

                <div>
                  { formError || (register && register.message) ?
                    <div className="error_label">
                        {formErrorMsg ? 
                          formErrorMsg 
                          : register.message ?
                            register.message 
                            : 'Something wrong'}
                    </div>
                    :null}
                  <button onClick={(event)=> this.submitForm(event)}>
                    Create an account
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    register: state.user.register
  }
}

const mapActionsToProps = {
  registerUser
}

export default connect(mapStateToProps, mapActionsToProps)(Register)