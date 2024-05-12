const casual = require('casual')
const express = require('express')
const mysql = require('mysql')

const app = express()   
const PORT = 3000

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
})

app.get('/', (req, res) => {
    const name = casual.name
    const sql = `INSERT INTO people (name) VALUES ('${name}')`

    connection.query(sql, (error, results) => {
        if(error) {
            console.error('Failed to insert the record:', error)
            res.status(500).send('Failed to insert the record to the database')
        } else {
            connection.query('SELECT name FROM people', (error, results) => {
                if(error) {
                    console.error('Failed to fetch names:', error)
                    res.status(500).send('Failed to fetch names from the database')
                } else {
                    const names = results.map(result => result.name)
                    res.send(`
                        <h1>Full Cycle Rocks!</h1>
                        <ul>
                        ${names.map(name => `<li>${name}</li>`).join('')}
                        </ul>
                    `)
                }
            })
        }
    })
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})