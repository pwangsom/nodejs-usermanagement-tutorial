const mysql = require('mysql');

// Connection Pool
let pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME

});


// View Users
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connection as ID ' + connection.threadId);

        // User the connection
        connection.query('SELECT * FROM user', (err, rows) => {
            connection.release();

            if(!err){
                res.render('home', { rows });
            } else {
                console.log(err);
            }

            console.log('The data from user table: \n', rows);
        });
    });
}

// Find User by Fist or Last Name
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('Connection as ID ' + connection.threadId);

        let searchTerm = req.body.search;

        // User the connection
        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?',
                    ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            connection.release();

            if(!err){
                res.render('home', { rows });
            } else {
                console.log(err);
            }

            console.log('The data from user table: \n', rows);
        });
    });
}

exports.newUserForm = (req, res) => {
    res.render('add-user');
}

// Add new user
exports.addNewUser = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;
    let searchTerm = req.body.search;
  
    // User the connection
    connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
      if (!err) {
        res.render('add-user', { alert: 'User added successfully.' });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }