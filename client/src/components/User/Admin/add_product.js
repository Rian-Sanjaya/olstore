import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserDashboardSidebar from '../../../hoc/user'
import FormField from '../../utils/Form/FormField'
import FileUpload from '../../utils/Form/fileUpload'
import { getBrands, getWoods, addProduct, clearProduct } from '../../../actions/product_action'
import { populateOptionFields, update, generateData, isFormValid, resetFields } from '../../utils/Form/formAction'

class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Product name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Product description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter your description'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel: true
      },
      price: {
        element: 'input',
        value: '',
        config:{
            label: 'Product price',
            name: 'price_input',
            type: 'number',
            placeholder: 'Enter your price'
        },
        validation:{
            required: true
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showlabel: true
      },
      brand: {
          element: 'select',
          value: '',
          config:{
              label: 'Product Brand',
              name: 'brands_input',
              options:[]
          },
          validation:{
              required: true
          },
          valid: false,
          touched: false,
          validationMessage:'',
          showlabel: true
      },
      shipping: {
        element: 'select',
        value: '',
        config:{
          label: 'Shipping',
          name: 'shipping_input',
          options:[
            {key:true,value:'Yes'},
            {key:false,value:'No'},
          ]
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showlabel: true
      },
      available: {
        element: 'select',
        value: '',
        config:{
          label: 'Available, in stock',
          name: 'available_input',
          options:[
            {key:true,value:'Yes'},
            {key:false,value:'No'},
          ]
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showlabel: true
      },
      wood: {
        element: 'select',
        value: '',
        config:{
          label: 'Wood material',
          name: 'wood_input',
          options:[]
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showlabel: true
      },
      frets: {
        element: 'select',
        value: '',
        config:{
          label: 'Frets',
          name: 'frets_input',
          options:[
            {key:20,value:20},
            {key:21,value:21},
            {key:22,value:22},
            {key:24,value:24}
          ]
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showlabel: true
      },
      publish: {
        element: 'select',
        value: '',
        config:{
          label: 'Publish',
          name: 'publish_input',
          options:[
            {key:true,value:'Public'},
            {key:false,value:'Hidden'},
          ]
        },
        validation:{
          required: true
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showlabel: true
      },
      images:{
        value:[],
        validation:{
            required: false
        },
        valid: true,
        touched: false,
        validationMessage:'',
        showlabel: false
      }
    }
  }

  componentDidMount() {
    const formdata = this.state.formdata

    this.props.getBrands()
    .then( () => {
      const newFormData = populateOptionFields(formdata, this.props.product.brands, 'brand')
      this.updateFields(newFormData)
    })

    this.props.getWoods()
    .then( res => {
      const newFormData = populateOptionFields(formdata, this.props.product.woods, 'wood')
      this.updateFields(newFormData)
    })
  }

  updateFields = newFormdata => {
    this.setState({
      formdata: newFormdata
    })
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'product');
    
    this.setState({
        formError: false,
        formdata: newFormdata
    })
  }
  
  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata, 'product')

    this.setState({
      formdata: newFormData,
      formSuccess: true
    }, () => {
      this.setState({
        formSuccess: false
      }, () => {
        this.props.clearProduct()
      })
    })
  }

  submitForm = (event) => {
    event.preventDefault()

    let dataToSubmit = generateData(this.state.formdata, 'product')
    let formIsValid = isFormValid(this.state.formdata, 'product')
    
    if (formIsValid) {
      this.props.addProduct(dataToSubmit)
      .then( () => {
        console.log('>>> addProduct success: ', this.props.product.addProduct.success)
        if (this.props.product.addProduct.success) {
          this.resetFieldHandler()
        } else {
          this.setState({ formError: true })
        }
      })
    } else {
      this.setState({
        formError: true
      })
    }
  }

  imagesHandler = (images) => {
    const newFormData = {
        ...this.state.formdata
    }
    newFormData['images'].value = images;
    newFormData['images'].valid = true;

    this.setState({
        formdata:  newFormData
    })
  }

  render() {
    return (
      <UserDashboardSidebar>
        <div>
          <h1>Add Product</h1>

          <form onSubmit={ event => {} }>
            <FileUpload
                imagesHandler={(images)=> this.imagesHandler(images)}
                reset={this.state.formSuccess}
            />

            <FormField
              id={'name'}
              formdata={this.state.formdata.name}
              change={ element => this.updateForm(element) }
            />

            <FormField
              id='description'
              formdata={this.state.formdata.description}
              change={ element => this.updateForm(element) }
            />

            <FormField
              id={'price'}
              formdata={this.state.formdata.price}
              change={ element => this.updateForm(element) }
            />

            <div className='form_divider'></div>

            <FormField
              id='brand'
              formdata={this.state.formdata.brand}
              change={ element => this.updateForm(element) }
            />

            <FormField
              id={'shipping'}
              formdata={this.state.formdata.shipping}
              change={(element) => this.updateForm(element)}
            />

            <FormField
              id={'available'}
              formdata={this.state.formdata.available}
              change={(element) => this.updateForm(element)}
            />

            <div className="form_devider"></div>

            <FormField
              id={'wood'}
              formdata={this.state.formdata.wood}
              change={(element) => this.updateForm(element)}
            />

            <FormField
              id={'frets'}
              formdata={this.state.formdata.frets}
              change={(element) => this.updateForm(element)}
            />

            <div className="form_devider"></div>

            <FormField
              id={'publish'}
              formdata={this.state.formdata.publish}
              change={(element) => this.updateForm(element)}
            />

            {this.state.formSuccess ?
              <div className="form_success">
                Success
              </div>
            : null}

            {this.state.formError ?
              <div className="error_label">
                Please check your data
              </div>
            : null}

            <button onClick={ event => this.submitForm(event) }>
              Add Product
            </button>
          </form>
        </div>
      </UserDashboardSidebar>
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
    getWoods,
    addProduct,
    clearProduct
}

export default connect(mapStateToProps, mapActionsToProps)(AddProduct)