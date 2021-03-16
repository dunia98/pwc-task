const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pwc', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}); //monogo data base my localhost,my DB pwc