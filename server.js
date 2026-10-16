//Carter Giesbrecht - 3184975 - Midterm Server

//requres
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.static("public")); //Serving static files from public directory  
app.use(bodyParser.urlencoded({ extended: false })); //body parser middleware

const PORT = 3000; //local host

//Html form
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
	    background-color: #2e6f009d;
	    color: #F2F0EF;
	    border-radius: 40px;
	    font-size: 40px;
	}

     #header { 
	    padding: 10px;
	    margin: 0px auto;
	    background: #EDCBF6
    }

    #ratingForm{  
        display: none
    }
     </style>
 </head>

 <div id ="header"> 
   <img src= "/Groovy.png" width= "25%" height= "15%" alt=“CDEAZY”>
</div>

<body>

    <div id="MainContent">
		<h1>  Welcome to Cdeazy ${req.query.name || ""} </h1>  
			<h2> The new and upcoming music rating platform! </h2> 
            <p> Please be patient with development! I'm Still working on it! </p><br> <h3> Press the button below to download the Cdeazy logo! </h3>
            <a href="/download"><button>Download Cdeazy Logo</button></a>

            <h3> Please enter your name below to be greeted! </h3> 
            <form action="/" method="GET">
                <input type="text" name="name" placeholder="Enter your name">
                <button type="submit">Submit</button>
            </form>

            <br>
            <br>

            <button id ="ajaxAppear">Click to see the album of the month!</button>
            <div id = "album"> </div>
           
            <div id="ratingForm">
            <p> Please rate the album of the month below! </p>
            <form action="/rating" method="POST">
                    <select name="rating" id="rating">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button type="submit">Submit Rating</button>
                </form>
            </div>

            <script>
                document.getElementById("ajaxAppear").addEventListener("click", function() {
                    var myAjax = new XMLHttpRequest();

                    myAjax.open("POST", "/album");

                    myAjax.onload = function() {
                        if (myAjax.status === 200) {
                            document.getElementById("album").innerHTML = '<img src="/jam.png" alt="Album of the Month" width="300" style="border-radius: 20px;  padding: 10px; background-color: #2e6f009d;">';
                            document.getElementById("ajaxAppear").style.display = "none"; // Hide the button after clicking
                            document.getElementById("ratingForm").style.display = "block"; //show rating
                        }
                    };
                    myAjax.send();
                });
            </script>
				
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
    res.sendFile(__dirname + '/public/john.png');
});

app.get('/download', (req, res) => {
    res.download(__dirname + '/public/Groovy.png', 'CdeazyLogo.png', (err) => {
        if (err) {
            console.error('Error downloading file:', err);
        }
    });
});

app.post('/album', (req, res) => {
    res.sendFile(__dirname + '/public/jam.png');
});

app.post('/rating', (req, res) => {
    console.log("Received rating:", req.body.rating);
    res.send(
        `<!DOCTYPE html>
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
    

    h1 {
	    text-align: center;	
	    padding: 10px;
	    background-color: #2E6F00;
	    color: #EDCBF6;
	    border-radius: 40px;
	    margin: 0 200px;
	    font-size: 40px;
	}

	body{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
    button{
        justify-content: top-right
    }

     </style>
 </head>

<body>
    <h1> Thanks for leaving your review of ${req.body.rating} out of 5 </h1>
</body>`
    );

});

//Custon error handlers 
app.use((err, req, res, next) => {
    res.status(500).sendFile(path.join(__dirname, '500.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
});

