const Waste = require('../models/Waste');
const router = require('express').Router();
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');


// POST
router.post('/', async (req, res) => {

    const newWaste = new Waste(req.body);

    try {
        // console.log("Hi");
        const savedWaste = await newWaste.save();
        res.status(200).json(savedWaste);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL WASTE INPUTS
router.get('/', async (req, res) => {
    try {
        const allWaste = await Waste.find();
        res.status(200).json(allWaste);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ONE WASTE
router.get('/find/:id', async (req, res) => {
    try {
        const waste = await Waste.findById(req.params.id);
        res.status(200).json(waste);
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        await Waste.findByIdAndDelete(req.params.id);
        res.status(200).json("Waste item deleted");
    } catch (error) {
        res.status(500).json(error);
    }
});


// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const updatedWaste = await Waste.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json("Waste item updated");
    } catch (error) {
        res.status(500).json(error);
    }
});

// Send mail
router.post('/mail',(req,res) => {
    // console.log(req.query);
     let config = {
        service : 'gmail',
        auth : {
            user : process.env.EMAIL,
            pass : process.env.PASSWORD
        }
     }

     let transporter = nodemailer.createTransport(config);
     
     let MailGenerator = new Mailgen({
        theme : "default",
        product : {
            name : "Municipality Corporation © ",
            link : "https://mailgen.js"
        }
     })

    let response = {
        body : {
            name : req.query.key2,
            intro : "We sincerely thank you for bringing your concerns to our attention, and we are delighted to inform you that your complaint has been successfully resolved.",
            table : {
                data : [
                    {
                        Type :  req.query.key3,
                        // description :  req.query.key1,
                        Quantity : `${req.query.key4} kg`,
                        Status : " Solved",
                    }
                ]
            },
            outro : "Looking forward to serve you in future",
            signature : "Best regards",
        }
    }

     let mail = MailGenerator.generate(response);

     let message = {
        from : process.env.EMAIL,
        to : req.query.key1,
        subject : "Resolution of Filed Complaint",
        html : mail
     }   
     
     transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg : "You should receive an email"
        })
     }).catch(error => {
        return res.status(500).json({ error })
     })

    //  res.status(201).json("Get Mail.....");
});

module.exports = router;