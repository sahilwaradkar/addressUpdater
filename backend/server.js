const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sahil@1702",
    database: "address_updater"
})

app.get("/", (req, res) =>{
    const sql = "SELECT * FROM `address`";
    db.query(sql, (err, data) =>{
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.post("/add", (req, res) => {
    const sql = "INSERT INTO address (`name`, `street`, `city`, `state`, `pincode`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.street,
        req.body.city,
        req.body.state,
        req.body.zipcode
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put("/update/:id", (req, res) => {
    const sql = "UPDATE address set `name` = ?, `street` = ?, `city` = ?, `state` = ?, `pincode` = ? WHERE  id=?";
    const values = [
        req.body.name,
        req.body.street,
        req.body.city,
        req.body.state,
        req.body.zipcode
    ]
    const id = req.params.id;
    
    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete("/address/:id", (req, res) => {
    const sql = "DELETE FROM  address WHERE id=?";
    const id = req.params.id;
    
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("listening");
})
