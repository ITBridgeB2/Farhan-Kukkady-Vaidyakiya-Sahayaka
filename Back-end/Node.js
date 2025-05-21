import cors from 'cors';
import express from 'express'
import mysql from 'mysql2/promise'
//const mysql = require("mysql2/promise");
var userapp = express();
userapp.use(express.json());
userapp.use(express.urlencoded());
userapp.use(cors())
const db = {
    host: "localhost",
    user: "root",
    password: 'root',
    database: 'vaidya'
};
//get user and validate
//http://localhost:9091/userdetails/9663330910/mypass
userapp.get("/clone/:mobileNumber/:password", async function (request, response) {    //localhost:9090/clone
    const mobileNumber = request.params.mobileNumber;
    const password = request.params.password;
    const connection = await mysql.createConnection(db);
    const [result] = await 
    connection.execute('SELECT * FROM clone where mobileNumber = ? and password = ? ', [mobileNumber, password]);
    if (result.length == 0)
        return response.status(204).json(204,"user not found");   //all the visitors
    else
    return response.status(200).json(result[0]); // return only the first matching user

})
//save visitor
userapp.post("/clone",async function (req,res) {
    try{
        //creates a connection
        const connection=await mysql.createConnection(db);
        //it will fetch data from body and assign it to individual varaiables
        //Data is given in json body
        const{firstName,lastName,email,mobileNumber,password}=req.body
        const[result]=await connection.execute('INSERT INTO clone VALUES(?,?,?,?,?)',[firstName,lastName,email,mobileNumber,password])
    
        await connection.close();
        res.status(201).json({message:"Data inserted successfully"})
    }catch(error)
    {
        console.log('Error Inserting data',error)
        res.status(500).json({error:'Failed to insert data'})
    }
    
})
userapp.post("/save_patient_details", async function (req, res) {
    try {
      // Create a connection to the database
      const connection = await mysql.createConnection(db);
  
      // Destructure the data from the request body
      const {
        patientName,
        pNumber,
        dateOfBirth,
        disease,
        hospital,
        hasBplCard,
        assistantName,
        assistantPhone,
        relationshipToPatient,
      } = req.body;
      
      
  
      // Insert data into the database
      const [result] = await connection.execute(
        'INSERT INTO clone2 (patient_name, phone_number, date_of_birth, disease, hospital, has_bpl_card, assistant_name, assistant_phone, relationship_to_patient) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          patientName,
          pNumber,
          dateOfBirth,
          disease,
          hospital,
          hasBplCard,
          assistantName,
          assistantPhone,
          relationshipToPatient,
        ]
      );
  
      // Close the database connection
      await connection.close();
  
      // Respond with a success message
      res.status(201).json({ message: "Patient details saved successfully!" });
    } catch (error) {
      console.log("Error Inserting Data", error);
      res.status(500).json({ error: "Failed to save patient details" });
    }
  });
  // Get all patient entries from clone2
userapp.get("/clone2", async (req, res) => {
    try {
      const connection = await mysql.createConnection(db);
      const [patients] = await connection.execute("SELECT * FROM clone2");
      await connection.end();
      res.status(200).json(patients);
    } catch (error) {
      console.error("Error fetching patient records:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });
  // Get single patient details by ID
userapp.get("/clone2/:id", async (req, res) => {
    try {
      const connection = await mysql.createConnection(db);
      const [patient] = await connection.execute("SELECT * FROM clone2 WHERE id = ?", [req.params.id]);
      await connection.end();
  
      if (patient.length === 0) {
        res.status(404).json({ message: "Patient not found" });
      } else {
        res.status(200).json(patient[0]);
      }
    } catch (error) {
      console.error("Error fetching patient:", error);
      res.status(500).json({ error: "Failed to fetch patient" });
    }
  });
  
  userapp.put('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
  
    try {
      const connection = await mysql.createConnection(db);
  
      // Convert ISO date string to YYYY-MM-DD
      const formattedDate = new Date(data.date_of_birth).toISOString().split('T')[0];
  
      const query = `
        UPDATE clone2 SET 
          patient_name = ?, phone_number = ?, date_of_birth = ?, disease = ?, hospital = ?, 
          has_bpl_card = ?, assistant_name = ?, assistant_phone = ?, relationship_to_patient = ?
        WHERE id = ?
      `;
  
      const hasBplCard = data.has_bpl_card === 'true' || data.has_bpl_card === true ? 1 : 0;
  
      const values = [
        data.patient_name,
        data.phone_number,
        formattedDate, // ✅ fixed date format
        data.disease,
        data.hospital,
        hasBplCard,
        data.assistant_name,
        data.assistant_phone,
        data.relationship_to_patient,
        id
      ];
  
      await connection.execute(query, values);
      await connection.end();
      res.send({ message: "User updated successfully" });
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).send("Update failed");
    }
  });
  
  
  

  

userapp.listen(8080)
console.log("Server started on port 8080")


