const express = require('express')
const mongoose= require('mongoose')
const app = express()
const path = require('path');
const customer = require('./model/customer')
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect('mongodb://127.0.0.1:27017/bicycleCustomers').then(() => {
    console.log('mongodb started');
})
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
})


app.post('/order',async (req, res) => {
    const Body=  req.body;


    const existing_customer=   await customer.findOne({
        Mobile_Number: Body.phone,
     })

     if( existing_customer) {

        await customer.findOneAndUpdate(

           { Mobile_Number: Body.phone},{ Item_no : `${existing_customer.Item_no} +${Body.select}`}
        )
        
     }

     else {
        await customer.create({

            Item_no:Body.select,
            First_and_Last_Name : Body.name,
            Mobile_Number: Body.phone,
            Complete_Address: Body.address,
            Area_PIN_code :Body.pincode,
            House_Number:Body.Hno,
          })


     }

     

      

      



      res.redirect('/order/placed')
} )

app.get('/order/placed' , async(req,res) => {

    res.sendFile(path.join(__dirname, '../public', 'placed.html'));
})




app.listen(3000 , ()=> console.log(`server started on PORT 3000`))