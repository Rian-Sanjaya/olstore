import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormField from '../../utils/Form/FormField'
import { update, generateData, isFormValid, resetFields } from '../../utils/Form/formAction'
import { getWoods, addWood } from '../../../actions/product_action'

class ManageWoods extends Component {
  state = {
    formError:false,
    formSuccess:false,
    formdata:{
      name: {
        element: 'input',
        value: '',
        config:{
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter the wood'
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage:''
      },
    }
  }

  componentDidMount() {
    this.props.getWoods()
  }

  showCategoryItems = () => (
    this.props.product.woods ?
      this.props.product.woods.map((item,i)=>(
        <div className="category_item" key={item._id}>
          {item.name}
        </div>
      ))
    : null
  )

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'woods');
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  }

  resetFieldsHandler = () =>{
    const newFormData = resetFields(this.state.formdata, 'woods');

    this.setState({
      formdata: newFormData,
      formSuccess:true
    });
  }

  submitForm= (event) =>{
    event.preventDefault();
    
    let dataToSubmit = generateData(this.state.formdata, 'woods');
    let formIsValid = isFormValid(this.state.formdata, 'woods')
    let existingWoods = this.props.product.woods;

    if(formIsValid){
      this.props.addWood(dataToSubmit, existingWoods)
      .then( res => {
        if(res.success){
          this.resetFieldsHandler();
        }else{
          this.setState({formError:true})
        }
      })

    } else {
      this.setState({
        formError: true
      })
    }
  }

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Woods</h1>

        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">
              {this.showCategoryItems()}
            </div>
          </div>

          <div className="right">  
            <form onSubmit={(event)=> this.submitForm(event)}>

              <FormField
                id={'name'}
                formdata={this.state.formdata.name}
                change={(element) => this.updateForm(element)}
              />

                {this.state.formError ?
                  <div className="error_label">
                    Please check your data
                  </div>
                : null}

                <button onClick={(event) => this.submitForm(event)}>
                  Add wood
                </button>

            </form>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    product: state.product
  }
}

const mapActionsToProps = {
  getWoods,
  addWood
}

export default connect(mapStateToProps, mapActionsToProps)(ManageWoods)