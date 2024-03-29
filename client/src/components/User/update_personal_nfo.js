import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../utils/Form/FormField'
import { update, generateData, isFormValid, populateFields } from '../utils/Form/formAction'
import { updateUserData, clearUpdateUser } from '../../actions/user_action'

class UpdatePersonalNfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
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
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage:''
      },
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
        validationMessage:''
      }
    }
  }

  componentDidMount() {
    const newFormData = populateFields(this.state.formdata, this.props.user.authUser)
    // console.log('isi newFormData: ', {newFormData: newFormData})
    this.setState({
      formdata: newFormData
    })
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'update_user');
    this.setState({
      formError: false,
      formdata: newFormdata
    })
  }

  submitForm = (event) => {
    event.preventDefault();
    
    let dataToSubmit = generateData(this.state.formdata, 'update_user');
    let formIsValid = isFormValid(this.state.formdata, 'update_user')

    if (formIsValid) {
      this.props.updateUserData(dataToSubmit)
      .then(()=>{
        if (this.props.user.updateUser.success) {
          this.setState({
            formSuccess: true

          }, () => {
            setTimeout( () => {
              this.props.clearUpdateUser();
              this.setState({
                formSuccess: false
              })
            }, 2000)
          })
        }
      })

    } else {
      this.setState({
        formError: true
      })
    }
  }

  render() {
    // console.log('isi authUser: ', this.props.user.authUser)
    return (
      <div>
        <form onSubmit={ (event) => this.submitForm(event)}>
          <h2>Personal information</h2>
          <div className="form_block_two">
            <div className="block">
              <FormField
                id={'name'}
                formdata={this.state.formdata.name}
                change={(element) => this.updateForm(element)}
              />
            </div>
            <div className="block">
              <FormField
                id={'lastname'}
                formdata={this.state.formdata.lastname}
                change={(element) => this.updateForm(element)}
              />
            </div>
          </div>
          <div>
            <FormField
              id={'email'}
              formdata={this.state.formdata.email}
              change={(element) => this.updateForm(element)}
            />
          </div>
          <div>
            {
              this.state.formSuccess ?
                <div className="form_success">Success</div>
              : null
            }
              {this.state.formError ?
                <div className="error_label">
                  Please check your data
                </div>
                : null}
              <button onClick={(event) => this.submitForm(event)}>
                Update personal info
              </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user
  }
}

const mapActionsToProps = {
  updateUserData,
  clearUpdateUser
}

export default connect(mapStateToProps, mapActionsToProps)(UpdatePersonalNfo)