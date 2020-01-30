const express = require('express');
const app = express();

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
const cors = require('cors');
app.use(cors());

//Setup Port
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

app.use(express.static('./dist'));

//Routes
app.get('/', (req, res) => {
	res.send('./dist/index.html');
});
