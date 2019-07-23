import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormField from '../../utils/Form/FormField'
import { update, generateData, isFormValid, resetFields } from '../../utils/Form/formAction'
import { getBrands, addBrand } from '../../../actions/product_action'

class ManageBrands extends Component {
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
          placeholder: 'Enter the brand'
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

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'brands');
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  }

  resetFieldsHandler = () =>{
    const newFormData = resetFields(this.state.formdata, 'brands');

    this.setState({
      formdata: newFormData,
      formSuccess: true
    });
  }

  submitForm = (event) => {
    event.preventDefault();
        
    let dataToSubmit = generateData(this.state.formdata, 'brands');
    let formIsValid = isFormValid(this.state.formdata, 'brands')
    let existingBrands = this.props.product.brands;

    if (formIsValid) {
      this.props.addBrand(dataToSubmit, existingBrands)
      .then( res => {
        console.log('>>>> isi res: ', res)
        if (res.success) {
          this.resetFieldsHandler();
        } else {
          this.setState({formError: true})
        }
      })
    } else {
      this.setState({
        formError: true
      })
    }
  }

  showCategoryItems = () => (
    this.props.product.brands ?
      this.props.product.brands.map( (item, i) => (
        <div className='category_item' key={item._id}>
          {item.name}
        </div>
      ))
    : null
  )

  componentDidMount() {
    this.props.getBrands()
  }

  render() {
    return (
      <div className="admin_category_wrapper">
        < h1>Brands</h1>

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
                Add brand
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    product: state.product
  }
}

const mapActionsToProps = {
  getBrands,
  addBrand
}

export default connect(mapStateToProps, mapActionsToProps)(ManageBrands)