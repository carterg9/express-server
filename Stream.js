const express = require("express");

const app = express();
app.use(express.static("public")); //to serve public as a static folder 

const PORT = 3000;

app.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang=“en”>
 <head>

    <title>Cdeazy </title>
    <meta charset=“utf-8”>
    <style>

    body{
        margin: 0;
        padding: 0;
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
        background-image: url("/Background.jpg");
        background-repeat: no-repeat;
        background-position: center;
        background-attachment: fixed;
        background-size: cover;
        color: white;
    }
    
        #MainContent {
        background: #2b2727;
        min-height: 100vh;
        width: 1050px;
        margin-left: auto;
        margin-right: auto;
        color: #F2F0EF;
        overflow: auto;
    }

    h1 {
        text-align: center;	
        padding: 10px;
        background-color: #2E6F00;
        color: #F2F0EF;
        border-radius: 40px;
        margin: 0 200px;
        font-size: 40px;
    }
}
     </style>
 </head>

<body>

    <div id="MainContent">
        <h1>  Welcome to Cdeazy  </h1>
            <h2> The new and upcoming music rating platform! </h2>
            <p> Please be patient with development! I'm Still working on it! </p>
                
    </div>
</body>
    `);
});


app.get('/api/getName', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json({ name: 'Carter Gs Website' });
});

app.get('/api/getImage', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.sendFile(__dirname + '/john.png');
});



app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
});

