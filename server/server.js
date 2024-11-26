const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


var uuid = require('uuid');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'sql9.freemysqlhosting.net',
  user: 'sql9635361',
  port: 3306,
  password: '7mKRztMdjg',
  database: 'sql9635361',
  connectionLimit: 8
});

// pool.connect(function(err) {
// if (err) throw err;
//   console.log('Database is connected successfully!');
// });
module.exports = pool;

const port = process.env.PORT || 5022;

app.listen(port, () => {
  console.log('Database is connected successfully!');
  console.log(`Server running on port ${port}`);
});

app.get('/user', (req, res) => {
  const userID = req.query.id;
  const sql = 'SELECT FirstName, LastName, Email, Password, Address, DateJoined FROM Users WHERE UserID = ?';
  
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(sql, [userID], (error, result) => {
      connection.release();
      if (error) {
        throw error;
      } else if (result.length === 0) {
        res.status(404).send('User not found');
      } else {
        res.json({firstName: result[0].FirstName, lastName: result[0].LastName, email: result[0].Email, address: result[0].Address, dateJoined: result[0].DateJoined, password: result[0].Password});
      }
    });
  });
});

// Function by Ammar
app.get('/vehicles', (req, res) => {
  const userID = req.query.id;
  const sql = 'SELECT * FROM Vehicles WHERE UserID = ?';

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(sql, [userID], (error, result) => {
      connection.release();
      if (error) {
        throw error;
      } else if(result.length === 0) {
        res.status(404).send('No vehicles found');
      } else {
        res.send(result);
      }
    });
  });
});

// Function by Ammar
app.post('/addVehicle', (req, res) => {
  const {UserID, Make, Model} = req.body;
  const sql = 'INSERT INTO Vehicles (UserID, Make, Model) VALUES (?, ?, ?)';

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(sql, [UserID, Make, Model], (error) => {
      connection.release();
      if (error) {
        throw error;
      } else {
        res.status(200).json({ message: 'Vehicle added successfully.' });
      }
    });
  });
});

// Function by Ammar
app.delete('/deleteVehicle', (req, res) => {
  const {VehicleID} = req.query;
  const sql = 'DELETE FROM Vehicles WHERE VehicleID = ?';
  
  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query(sql, [VehicleID], (error) => {
      connection.release();
      if (error) {
        throw error;
      }
      else {
        res.send('Vehicle deleted');
      }
    })
  })
})

// Function by Ammar
app.post('/userUpdate', (req, res) => {
  const userID = req.query.id;
  const sql = 'UPDATE Users SET FirstName = ?, LastName = ?, Email = ?, Address = ? WHERE UserID = ?';
  const { firstName, lastName, email, address } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(sql, [firstName, lastName, email, address, userID], (error) => {
      connection.release();
      if (error) {
        throw error;
      } else {
        res.send('User updated');
      }
    });
  });
});

// API Endpoints for Vendor Review Table
app.get('/review', (req, res) => {
  const vendor_id = req.query.id;
  const sql = 'SELECT * FROM vendors_review WHERE vendor_id = ?';

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(sql, [vendor_id], (error, result) => {
      connection.release();
      if (error) { 
        throw error;
      } else if (result.length === 0) {
        res.status(204).send('reviews for this vendor not found');
      } else {
        const reviews = result.map(item => ({
          rating: item.rating,
          heading: item.heading,
          description: item.description
        }));
        res.json(reviews);
      }
    });
  });
});

app.post('/addReview', (req, res) => {
  const sql = 'INSERT INTO vendors_review (vendor_id, rating, heading, description) VALUES (?, ?, ?, ?)';
  const { vendor_id, rating, heading, description } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(sql, [vendor_id, rating, heading, description], (error) => {
      connection.release();
      if (error) {
        throw error;
      } else {
        res.send('review added');
      }
    });
  });
});

//Function by Sameer 
app.get('/vendors', (req, res) => {
  const sql = 'SELECT * FROM vendors';

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(sql, (error, result) => {
      connection.release();
      if (error) {
        console.error("Error fetching vendors:", error);
        res.status(500).send("Error fetching vendors");
      } else {
        res.json(result);
      }
    });
  });
});

// Function by Sameer
app.get('/vendors/:id', (req, res) => {
  const vendorId = req.params.id;
  const sql = 'SELECT * FROM vendors WHERE vendor_id = ?';

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(sql, [vendorId], (error, result) => {
      connection.release();
      if (error) {
        console.error("Error fetching vendor details:", error);
        res.status(500).send("Error fetching vendor details");
      } else {
        if (result.length === 0) {
          res.status(404).send("Vendor not found");
        } else {
          res.json(result[0]);
        }
      }
    });
  });
});

// Function by Sameer
app.post('/addOrder', (req, res) => {
  let { vendor_id, package } = req.body;
  const query = `INSERT INTO orders(vendor_id, package) VALUES(${mysql.escape(vendor_id)}, ${mysql.escape(package)})`;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(query, (error, result) => {
      connection.release();
      if (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ message: 'Error inserting data' });
      } else {
        res.status(200).json({ message: 'Order placed successfully' });
      }
    });
  });
});

// Function by Sameer
app.get('/getOrders/:id', (req, res) => {
  const vendorId = req.params.id;
  const sql = 'SELECT * FROM orders WHERE vendor_id = ?';

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(sql, [vendorId], (error, result) => {
      connection.release();
      if (error) {
          res.status(500).send("Error fetching orders");
      } else {
          res.json(result);
      }
    });
  });
});

// Function by Ammar
app.post('/login', (req, res) => {
  const {email, password} = req.body;
  const sql = 'SELECT * FROM Users WHERE Email = ?';

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(sql, [email], async (error, result) => {
      connection.release();
      if (error) {
        throw error;
      } else if (result.length === 0) {
        res.status(404).send('User not found');
      } else {
        const user = result[0];
        const hashedPass = user.Password;
        const verify = await bcrypt.compare(password, hashedPass);

        if (verify) {
          res.json({ userID: user.UserID });
        } else {
          res.status(403).send('Invalid credentials.');
        }
      }
    });
  });
});


// Function by Yara
app.post('/api/register', async (req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;
  const UserID = uuid.v4();

  pool.getConnection((err, connection) => {
    if (err) {
      console.log("Error:", err);
    }

    const checkIfUserExists = 'SELECT * FROM Users WHERE Email = ?';

    connection.query(checkIfUserExists, [Email], async (checkResult) => {
      if (checkResult?.length > 0) {
        connection.release();
        return res.status(409).send({ error: 'User with this email already exists. Please log in.' });
      }

      const hashedPass = await bcrypt.hash(Password, 10);

      const addUser = 'INSERT INTO Users (UserID, FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?, ?)';
    
      connection.query(addUser, [UserID, FirstName, LastName, Email, hashedPass], (addError) => {
        connection.release();
        if (addError) {
          console.error('An error occurred when inserting user details:', addError);
          return res.status(500).json({ error: 'An error occurred when creating an account.' });
        } else {
          return res.status(200).json({ message: 'Registration successful.' });
        }
      });
    });
  });
});


/**
 * Created By: Raunak Singh
 * API Endpoints for 'blogs' table
 */
app.get("/blogs", (req, res) => {
  const sql = "SELECT * FROM blogs";

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(sql, (error, result) => {
      connection.release();
      if (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).send("Error fetching blogs");
      } else {
        const blogs = result.map((item) => ({
          user_id: item.user_id,
          title: item.title,
          content: item.content,
          date_posted: item.date_posted,
        }));
        res.json(blogs);
      }
    });
  });
});

app.post("/addBlog", (req, res) => {
  const sql = "INSERT INTO blogs (user_id, title, content, date_posted) VALUES (?, ?, ?, ?)";
  const { user_id, title, content, date_posted } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(sql, [user_id, title, content, date_posted], (error, result) => {
      connection.release();
      if (error) {
        console.error("Error adding blog:", error);
        res.status(500).send("Error adding blog");
      } else {
        res.status(200).json({ message: "Blog added successfully", blogId: result.insertId });
      }
    });
  });
});