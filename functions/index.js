const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const firebase = require("firebase-admin");
const credentials = require("./key.json");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
}, functions.config().firebase);


const db = firebase.firestore();

const app = express();
app.use(express.json());
app.use(cors({origin: true}));
app.use(express.urlencoded({extended: true}));


app.get("/Working", (req, res) => {
  res.status(200).send("Yes it is.");
});

app.post("/Signup", (req, res) => {
  db.collection("Accounts").add({
    "FullName": req.body.FullName,
    "Phone": req.body.Phone,
    "Email": req.body.Email,
    "Password": req.body.Password,
  }).then((doc)=>{
    const aid = doc._path.segments[1];
    res.send({AccountID: aid});
  });
});

app.post("/Login", (req, res) => {
  db.collection("Accounts").
      where("Phone", "==", req.body.Phone).
      where("Password", "==", req.body.Password).
      get().then((accounts)=>{
        const size = accounts._size;
        if (size == 0) {
          const result = {Status: false};
          res.send(result);
        }
        accounts.forEach((account)=>{
          res.send(account);
        });
      });
});

app.post("/LoginCheckPhone", (req, res) => {
  db.collection("Accounts").
      where("Phone", "==", req.body.Phone).
      get().then((accounts)=>{
        const size = accounts._size;
        if (size == 0) {
          const result = {
            Status: false,
          };
          res.send(result);
        }
        accounts.forEach((account)=>{
          res.send(account);
        });
      });
});

app.post("/CreateGym", (req, res) => {
  db.collection("Gym").add({
    "GymName": req.body.GymName,
    "Address1": req.body.Address1,
    "Address2": req.body.Address2,
    "City": req.body.City,
    "State": req.body.State,
    "Country": req.body.Country,
    "Phone": req.body.Phone,
    "Email": req.body.Email,
  }).then((doc)=>{
    res.send(doc);
  });
});

app.post("/MyGyms", (req, res) => {
  db.collection("Accounts").
      doc(req.body.AccountDocID).
      collection("Roles").
      get().then((roles)=>{
        const data = [];
        roles.forEach((role)=>{
          data.push(role);
        });
        res.send(data);
      });
});

app.post("/GetGym", (req, res) => {
  db.collection("Gym").doc(req.body.GymDocID).get().then((gym)=>{
    res.send(gym);
  });
});

app.post("/AddRoles", (req, res) => {
  const AccountDocID = req.body.AccountDocID;
  const GYMDocID = req.body.GYMDocID;

  db.collection("Accounts").doc(AccountDocID).collection("Roles").add({
    "GYMDocID": GYMDocID,
    "Powers": req.body.Powers,
  }).then((doc)=>{
    db.collection("Gym").doc(GYMDocID).collection("Roles").add({
      "AccountDocID": AccountDocID,
      "Powers": req.body.Powers,
    }).then((doc)=>{
      res.send(true);
    });
  });
});

app.post("/CreateSubscription", (req, res) => {
  console.log(req.body.GymDocID);
  db.collection("Gym").doc(req.body.GymDocID).collection("SubScriptions").add({
    "SubScriptionNameIn": req.body.SubscriptionNameIn,
    "Cost": req.body.Price,
    "MarginPer": req.body.MarginPer,
    "DiscountPer": req.body.DiscountPer,
    "TaxPer": req.body.TaxPer,
    "Price": req.body.Price,
    "Days": req.body.Days,
    "Months": req.body.Months,
    "Details": req.body.Details,
    "Image": req.body.Image,
  }).then((doc)=>{
    res.send(doc);
  });
});

app.post("/GetSubscriptions", (req, res) => {
  db.collection("Gym").
      doc(req.body.GymDocID).
      collection("SubScriptions").
      get().then((SubScriptions)=>{
        const data = [];
        SubScriptions.forEach((subScription)=>{
          data.push(subScription);
        });
        res.send(data);
      });
});

app.post("/CreateOrder", (req, res) => {
  db.collection("Gym").doc(req.body.GymDocID).collection("Orders").add({
    "AccountDocID": req.body.AccountDocID,
    "GymDocID": req.body.GymDocID,
    "SubscriptionDocID": req.body.SubscriptionDocID,
    "DiscountPer": req.body.DiscountPer,
    "DiscountAmount": req.body.DiscountAmount,
    "DiscountCode": req.body.DiscountCode,
    "TaxPer": req.body.TaxPer,
    "Price": req.body.Price,
    "StartDate": req.body.StartDate,
    "EndDate": req.body.EndDate,
    "Status": req.body.Status,
    "Note": req.body.Note,
    "PaymentStatus": req.body.PaymentStatus,
    "PaymentReceived": req.body.PaymentReceived,
    "PaymentMethod": req.body.PaymentMethod,
    "PaymentId": req.body.PaymentId,
    "PaymentDetails": req.body.PaymentDetails,
    "PaymentIssue": req.body.PaymentIssue,
    "TimeStamp": req.body.TimeStamp,
  }).then((doc)=>{
    res.send(doc);
  });
});

app.post("/LinkGymSubscriptionToProfile", (req, res) => {
  db.collection("Accounts").
      doc(req.body.AccountDocID).
      collection("Subscriptions").add({
        "GymDocID": req.body.GymDocID,
        "SubscriptionDocID": req.body.SubscriptionDocID,
        "OrderDocID": req.body.OrderDocID,
        "ExpiryDate": req.body.ExpiryDate,
        "TimeStamp": req.body.TimeStamp,
      }).then((doc)=>{
        res.send(doc);
      });
});

app.post("/Subscribers", (req, res) => {
  db.collection("Gym").
      doc(req.body.GymDocID).
      collection("Orders").
      where("SubscriptionDocID", "==", req.body.SubDocID).
      get().then((doc)=>{
        const data = [];
        doc.forEach((d)=>{
          data.push(d);
        });
        res.send(data);
      });
});


app.post("/GetAccount", (req, res) => {
  db.collection("Accounts").
      doc(req.body.AccountDocID).
      get().then((doc)=>{
        res.send(doc);
      });
});


// app.post("/GetAttendance", (req, res) => {
//   db.collection("Accounts").
//       doc(req.body.AccountDocID).
//       collection("")
//       get().then((doc)=>{
//         res.send(doc);
//       });
// });


app.post("/GetSubscription", (req, res) => {
  db.collection("Gym").
      doc(req.body.GymDocID).
      collection("SubScriptions").get().
      then((doc)=>{
        const data = [];
        doc.forEach((d)=>{
          data.push(d);
        });
        res.send(data);
      });
});

exports.app = functions.https.onRequest(app);
