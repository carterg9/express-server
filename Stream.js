const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Course Server</title>
        </head>
        <body>
            <h1>Hello from my server!</h1>
            <p>This page is being served by Node.js and Express.</p>
            <p> message updated? </p>
             <form>
                 <input type="text" name = "textinput" value = "default_value" id="myText">
                 <input type = "password" name = "mypass">
                 <input type = "week" name = "myweek">
                 <input type = "color" name = "mycolor">
                 <input type="submit" value="Submit">
             </form>
        </body>
        </html>
    `);
});


app.get('/api/getName', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json({ name: 'Carter Gs Website' });
});

app.get('/api/getImage', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.sendFile('/public/john.png');
});



app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
});

