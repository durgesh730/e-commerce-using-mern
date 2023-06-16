import express from "express";
const router = express.Router();
import bcrypt from 'bcryptjs';
import authenticate from "../middleware/authenticate.js";
// import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import Items from "../models/itemsSchema.js";
import Cart from "../models/cartSchema.js";
import Form from "../models/formSchema.js";


const keysecret = "durgeshchaudharydurgeshchaudhary";

// // email config
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "durgeshchaudhary020401@gmail.com",
//         pass: "lqfxwpogsaocehjc"
//     }
// })

//signup API path /user/signup

router.post('/signup', async (req, res) => {
    const { fname, email, password, type } = req.body;
    // console.log(req.body)
    try {
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password, salt);

        const savedEmail = await User.findOne({ email: email })
        if (savedEmail) {
            res.status(404).json({ error: "This Email is Already Exist" });
        } else {
            const data = new User({ name: fname, email, password: pass, type })
            const user = await data.save()
            const userdata = {
                user: {
                    id: user.id
                }
            }
            let token = jwt.sign(userdata, keysecret)
            if (token && user) {
                res.status(201).json({ status: 201, token, user })
            } else {
                res.status(401).send("Some error occured")
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(401).send("Some error occured")
    }
})

//login API  using post 

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const Ismatch = await bcrypt.compare(password, user.password);
            if (!Ismatch) {
                res.status(422).json({ error: "invalid details" })
            } else {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                let token = jwt.sign(data, keysecret);
                res.status(201).json({ status: 201, user, token })
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(401).send("Some error occured")
    }
})


// user validation 

// router.get("/validuser", authenticate, async (req, res) => {
//     try {
//         const ValidUserOne = await userdb.findOne({ _id: req.userId });
//         res.status(201).json({ status: 201, ValidUserOne });
//     } catch (error) {
//         res.status(401).json({ status: 401, error });
//     }
// });

// Get Users data 

// router.get("/users", authenticate, async (req, res) => {
//     try {
//         const user = await userdb.findOne({ _id: req.userId });
//         res.status(201).json({ status: 201, user });
//     } catch (error) {
//         res.status(401).json({ status: 401, error });
//     }
// });


// student form API

router.post('/SaveOrderDetails', authenticate, async (req, res) => {
    const ite = req.body.items
    const it = req.body.data
    try {
        const finalUser = new Form({ phone: ite.phone, address: ite.address, pincode: ite.pincode, city: ite.city, state: ite.state, userId: req.user.id, id: it.id });
        const storeData = await finalUser.save();
        res.status(200).json({ status: 200, storeData })

    } catch (error) {
        res.status(201).json({ status: 201, message: "some internal error occurred" })
    }
})

router.put("/updatecount/:id", async (req, res) => {
    const font = req.body
    const da = font.data.rating;
    try {
        const newData = {};
        if (da.rate) {
            newData.rate = da.rate;
        }
        if (font.reducecount) {
            newData.count = font.reducecount
        }
        const save = await Items.findByIdAndUpdate({ _id: req.params.id },
            { $set: { rating: newData } }, { new: true })
        res.status(200).json({ status: 200, save });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

router.put("/updatecountAdmin/:id", async (req, res) => {
    const data = req.body;
    try {
        const newData = {};
        if (data.rate) {
            newData.rate = data.rate;
        }
        if (data.count.value) {
            newData.count = data.count.value
        }
        const save = await Items.findByIdAndUpdate({ _id: req.params.id },
            { $set: { rating: newData } }, { new: true })
        res.status(200).json({ status: 200, save });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})


router.post('/postItems', async (req, res) => {
    const ite = req.body;
    try {
        const finalUser = await Items.insertMany(ite);
        res.status(201).json({ status: 201, finalUser })
    } catch (error) {
        res.status(201).json({ status: 201, message: "Some internal error occurred" })
    }
})

router.get("/items", async (req, res) => {
    try {
        const colData = await Items.find()
        res.status(200).json(colData)
    } catch (error) {
        res.status(201).json({ status: 201, message: "Some internal error occurred" })
    }
})


router.post('/addcartitem', authenticate, async (req, res) => {
    const it = req.body;
    try {
        const data = new Cart({
            userId: req.user.id, ItemId: it.ItemId, Count: it.Count
        })
        const save = await data.save();
        res.status(200).json({ status: 200, save });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

router.get('/getcartItem', authenticate, async (req, res) => {
    const user = req.user;
    try {
        const cart = await Cart.find({ userId: user.id });
        res.status(200).json(cart);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

router.get("/forcartitems/:id", async (req, res) => {
    try {
        const colData = await Items.find({ id: req.params.id })
        res.status(200).json(colData)
    } catch (error) {
        res.status(201).json({ status: 201, message: "Some internal error occurred" })
    }
})


router.get("/palcedItems", async (req, res) => {
    try {
        const colData = await Form.find()
        res.status(200).json(colData)
    } catch (error) {
        res.status(201).json({ status: 201, message: "Some internal error occurred" })
    }
})

router.delete("/deletecartItem/:id", async (req, res) => {
    try {
        const colData = await Cart.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ status: 200, colData })
    } catch (error) {
        res.status(201).json({ status: 201, message: "Some internal error occurred" })
    }
})


export default router;