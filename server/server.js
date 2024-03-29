const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const formidable = require('express-formidable')
const cloudinary = require('cloudinary')
const SHA1 = require('crypto-js/sha1')
const multer = require('multer')
const moment = require('moment')
const fs = require('fs')
const path = require('path')
// const mailer = require('nodemailer')

const app = express()
const mongoose = require('mongoose')
const async = require('async')
require('dotenv').config()

mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE)
// mongoose.connect(process.env.MONGODB_URI)

// for url by query string (/api/product/article?id=article_id&type=single)
app.use(bodyParser.urlencoded({extended: true}))
// for url by param (/api/product/article/:id)
app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static('client/build'))

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

// Models
const { User } = require('./models/user')
const { Brand } = require('./models/brand')
const { Wood } = require('./models/wood')
const { Product } = require('./models/product')
const { Site } = require('./models/site')

// Middlewares
const { auth } = require('./middleware/auth')
const { admin } = require('./middleware/admin')

// UTILS
const { sendMail } = require('./utils/index')

// const smtpTransport = mailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: "myolstore.sj@gmail.com",
//     pass: ""
//   }
// })

// const mail = {
//   from: "OLStore <myolstore.sj@gmail.com>",
//   to: "rian.sj@gmail.com",
//   subject: "Send text email",
//   text: "Testing our olstore mails",
//   html: "<b>Hellow guys this works</b>"
// }

// smtpTransport.sendMail(mail, function(error, res) {
//   if (error) console.log(error)
//   else console.log('email sent')

//   smtpTransport.close()
// })

//================================
//             PRODUCTS
//================================

app.post('/api/product/shop', (req, res) => {
  let order = req.body.order ? req.body.order : 'desc'
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id'
  let limit = req.body.limit ? parseInt(req.body.limit) : 100
  let skip = parseInt(req.body.skip)
  let findArgs = {}

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
      } else {
        findArgs[key] = req.body.filters[key]
      }
    }
  }

  findArgs['publish'] = true

  Product
  .find(findArgs)
  .populate('brand')
  .populate('wood')
  .sort([[sortBy, order]])
  .skip(skip)
  .limit(limit)
  .exec( (err, articles) => {
    if (err) return res.status(400).send(err)
    res.status(200).json({
      size: articles.length,
      articles
    })
  })
})

// url / route by query
// /api/product/article?id=articleid1,articleid2,articleid3&type=array
app.get('/api/product/articles_by_id', (req, res) => {
  let type = req.query.type
  let items = req.query.id  // can be one id or many id

  if (type === 'array') {
    let ids = req.query.id.split(',')
    items = []    // change into array
    items = ids.map( item => {
      // filter by ObjectId type in mongodb
      return mongoose.Types.ObjectId(item)
    })
  }

  // brand and wood is a ref type
  Product.
  find({ '_id': {$in: items} }).
  populate('brand').
  populate('wood').
  exec((err, docs) => {
    if (err) return res.status(400).send(err)

    return res.status(200).send(docs)
  })
})

app.post('/api/product/article', auth, admin, (req, res) => {
  const product = new Product(req.body)

  product.save((err, doc) => {
    if (err) return res.json({success: false, err})

    res.status(200).json({
      success: true,
      article: doc
    })
  })
})

// BY ARRIVAL
// /articles?sortBy=createdAt&order=desc&limit=4

// BY SELL
// /articles?sortBy=sold&order=desc&limit=100

app.get('/api/product/articles', (req,res) => {

  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Product.
  find()
  .populate('brand')
  .populate('wood')
  .sort([[sortBy,order]])
  .limit(limit)
  .exec((err,articles)=>{
      if(err) return res.status(400).send(err);
      res.status(200).send(articles)
  })
})

app.post('/api/product/article', auth, admin, (req, res) => {
  const product = new Product(req.body)

  product.save( (err, doc) => {
    if (err) return res.json({ success: false, err })

    res.status(200).json({
      success: true,
      article: doc
    })
  })
})

//================================
//             WOODS
//================================

app.post('/api/product/wood', auth, admin, (req, res) => {
  const wood = new Wood(req.body)

  wood.save((err, doc) => {
    if (err) return res.json({success: false, err})

    res.status(200).json({
      success: true,
      wood: doc
    })
  })
})

app.get('/api/product/woods', (req, res) => {
  Wood.find({}, (err, woods) => {
    if (err) return res.status(400).send(err)

    res.status(200).send(woods)
  })
})

//================================
//             BRAND
//================================

app.post('/api/product/brand', auth, admin, (req, res) => {
  const brand = new Brand(req.body)

  brand.save((err, doc) => {
    if (err) return res.json({success: false, err})

    res.status(200).json({
      success: true,
      brand: doc
    })
  })
})

app.get('/api/product/brands', (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) return res.status(400).send(err)

    res.status(200).send(brands)
  })
})


//================================
//             USERS
//================================

app.post('/api/users/reset_user', (req, res) => {
  console.log('email: ', req.body.email)
  User.findOne(
    {'email': req.body.email},
    (err, user) => {
      user.generateResetToken( (err, user) => {
        if (err) return res.json({ success: false, err })
        
        sendMail(user.email, user.name, null, 'reset_password', user)

        return res.json({ success: true })
      })
    }
  )
})

app.post('/api/users/reset_password',(req,res)=>{

  var today = moment().startOf('day').valueOf();

  User.findOne({
      resetToken: req.body.resetToken,
      resetTokenExp:{
          $gte: today
      }
  },(err,user)=>{
      if(!user) return res.json({success:false,message:'Sorry, token bad, generate a new one.'})
  
      user.password = req.body.password;
      user.resetToken = '';
      user.resetTokenExp= '';

      user.save((err,doc)=>{
          if(err) return res.json({success:false,err});
          return res.status(200).json({
              success: true
          })
      })
  })
})

app.get('/api/users/auth', auth, (req, res) => {
  // console.log('isi req: ', req)
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  })
})

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body)

  user.save((err, doc) => {
    if (err) return res.json({success: false, message: err.message})

    sendMail(doc.email, doc.name, null, "welcome")

    return res.status(200).json({
      success: true,
      message: ''
    })
  })
})

app.post('/api/users/login', (req, res) => {
  User.findOne({'email': req.body.email}, (err, user) => {
    if (!user) return res.json({loginSuccess: false, message: 'Auth failed, email not found'})

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({loginSuccess: false, message: 'Wrong password'})

      user.generateToken((err, user) => {
        // if (err) return res.status(400).send(err)
        if (err) return res.status(400).json({loginSuccess: false, message: err.message})

        res.cookie('w_auth', user.token).status(200).json({
          loginSuccess: true, 
          message: ''
        })
      })
    })
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: '' },
    (err, doc) => {
      if (err) return res.json({success: false, err})

      return res.status(200).send({
        success: true
      })
    }
  )
})

app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(req.files.file.path, (result) => {
    console.log(result)
    res.status(200).send({
      public_id: result.public_id,
      url: result.url
    })
  }, {
    public_id: `${Date.now()}`,
    resource_type: 'auto'
  })
})

app.get('/api/users/removeimage', auth, admin, (req, res) => {
  let image_id = req.query.public_id

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error })
    res.status(200).send('ok')
  })
})

app.post('/api/users/addToCart',auth,(req,res)=>{

  User.findOne({_id: req.user._id},(err,doc)=>{
      let duplicate = false;

      doc.cart.forEach((item)=>{
          if(item.id == req.query.productId){
                duplicate = true;  
          }
      })

      if(duplicate){
          User.findOneAndUpdate(
              {_id: req.user._id, "cart.id":mongoose.Types.ObjectId(req.query.productId)},
              { $inc: { "cart.$.quantity":1 } },
              { new:true },
              ()=>{
                  if(err) return res.json({success:false,err});
                  res.status(200).json(doc.cart)
              }
          )
      } else {
          User.findOneAndUpdate(
              {_id: req.user._id},
              { $push:{ cart:{
                  id: mongoose.Types.ObjectId(req.query.productId),
                  quantity:1,
                  date: Date.now()
              } }},
              { new: true },
              (err,doc)=>{
                  if(err) return res.json({success:false,err});
                  res.status(200).json(doc.cart)
              }
          )
      }
  })
});

app.get('/api/users/removeFromCart',auth,(req,res)=>{

  User.findOneAndUpdate(
      {_id: req.user._id },
      { "$pull":
          { "cart": {"id":mongoose.Types.ObjectId(req.query._id)} }
      },
      { new: true },
      (err,doc)=>{
          let cart = doc.cart;
          let array = cart.map(item=>{
              return mongoose.Types.ObjectId(item.id)
          });

          Product.
          find({'_id':{ $in: array }}).
          populate('brand').
          populate('wood').
          exec((err,cartDetail)=>{
              return res.status(200).json({
                  cartDetail,
                  cart
              })
          })
      }
  );
})

app.post('/api/users/update_profile',auth,(req, res) => {

  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      "$set": req.body
    },
    { new: true },
    (err, doc) => {
      if (err) return res.json({success: false, err});
      return res.status(200).send({
        success: true
      })
    }
  );
});

//=================================
//              SITE
//=================================

app.get('/api/site/site_data', (req, res) => {
  Site.find({}, (err, site) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(site[0].siteInfo)
  });
});

app.post('/api/site/site_data', auth, admin, (req, res) => {
  Site.findOneAndUpdate(
      { name: 'Site'},
      { "$set": { siteInfo: req.body }},
      { new: true },
      (err, doc) => {
          if (err) return res.json({ success: false, err });
          return res.status(200).send({
              success: true,
              siteInfo: doc.siteInfo
          })
      }
  )
})

// DEFAULT
if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  app.get('/*', (req, res) => {
    res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 3002

app.listen(port, () => {
  console.log(`Server running at ${port}`)
})