// getting-started.js
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017');
//console.log(mongoose)

/*
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;    

  MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

    var collection = db.collection('test_insert');
    collection.insert({a:2}, function(err, docs) {

      collection.count(function(err, count) {
        console.log(format("count = %s", count));
      });

      // Locate all the entries using find
      collection.find().toArray(function(err, results) {
        console.dir(results);
        // Let's close the db
        db.close();
      });      
    });
  })
*/

/*
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');


// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});
var Schema = mongoose.Schema;
var kittySchema = new Schema({
    name: String
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name"
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);
var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak() // "Meow name is fluffy"

fluffy.save(function (err, fluffy) {
  if (err) // TODO handle the error
  fluffy.speak();
});

Kitten.find(function (err, kittens) {
  console.log(kittens)
  if (err) {
  	//manage errors
  }
 
});

Kitten.find({ name: /^Fluff/ }, function(err, result){
console.log(121212)
console.log(result)

})
*/

var application_root = __dirname,
    path = require("path"),
    mongoose = require('mongoose');

var express = require("express");
    
var app = express();

// Database

mongoose.connect('mongodb://localhost/ecomm_database');

// Config

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/api', function (req, res) {
  res.send('Ecomm API is running');
});

// Launch server



app.listen(4242);

app.get('/api', function (req, res) {  
  res.send('Ecomm API is running');  
});  

app.get('/', function (req, res) {
    res.redirect('/app.html');
});

//SOUS TRAITANT
var Schema = mongoose.Schema;
var SousTraitant = new Schema({
  name: { type: String, required: false },  
  contactName: { type: String, required: false },  
  mail: { type: String, required: false },  
  fax: { type: String, required: false },  
  phone: { type: String, required: false },  
  cell: { type: String, required: false },  
  adresse: { type: String, required: false },  
  codePostal: { type: String, required: false },  
  ville: { type: String, required: false },  
  province: { type: String, required: false },  
  actif: { type: String, required: false },  
  note: { type: String, required: false },  
  licenseRbq: { type: String, required: false },  
  siteWeb: { type: String, required: false },
  tps: { type: String, required: false }

})
var SousTraitantModel = mongoose.model('SousTraitant', SousTraitant);  
//GET
app.get('/api/sousTraitants', function (req, res){
  return SousTraitantModel.find(function (err, sousTraitants) {
    if (!err) {
      return res.send(sousTraitants);
    } else {
      return console.log(err);
    }
  });
});

//POST
app.post('/api/sousTraitants', function (req, res){
  var sousTraitant;
  console.log("POST: ");
  console.log(req.body);
  sousTraitant = new SousTraitantModel({
  name:req.body.name,
  contactName:req.body.contactName,
  mail:req.body.mail,
  fax:req.body.fax,
  phone:req.body.phone,
  cell:req.body.cell,
  adresse:req.body.adresse,
  codePostal:req.body.codePostal,
  ville:req.body.ville,
  province:req.body.province,
  actif:req.body.actif,
  note:req.body.note,
  licenseRbq:req.body.licenseRbq,
  siteWeb:req.body.siteWeb,
  tps:req.body.tps
  });
  sousTraitant.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(sousTraitant);
});

app.get('/api/sousTraitants/:id', function (req, res){
  return SousTraitantModel.findById(req.params.id, function (err, sousTraitant) {
    if (!err) {
      return res.send(sousTraitant);
    } else {
      return console.log(err);
    }
  });
});

//PUT
app.put('/api/sousTraitants/:id', function (req, res){
  return SousTraitantModel.findById(req.params.id, function (err, sousTraitant) {
        sousTraitant.name        =req.body.name;
        sousTraitant.contactName =req.body.contactName;
        sousTraitant.mail        =req.body.mail;
        sousTraitant.fax         =req.body.fax;
        sousTraitant.phone       =req.body.phone;
        sousTraitant.cell        =req.body.cell;
        sousTraitant.adresse     =req.body.adresse;
        sousTraitant.codePostal  =req.body.codePostal;
        sousTraitant.ville       =req.body.ville;
        sousTraitant.province    =req.body.province;
        sousTraitant.actif       =req.body.actif;
        sousTraitant.note        =req.body.note;
        sousTraitant.licenseRbq  =req.body.licenseRbq;
        sousTraitant.siteWeb     =req.body.siteWeb;
        sousTraitant.tps     =req.body.tps;
          return sousTraitant.save(function (err) {
            if (!err) {
              console.log("updated");
            } else {
              console.log(err);
            }
            return res.send(sousTraitant);
          });
  });
});


//DELETE
app.delete('/api/sousTraitants/:id', function (req, res){
  return SousTraitantModel.findById(req.params.id, function (err, sousTraitant) {
    return sousTraitant.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});



//EMPLOYES
var Employe = new Schema({
  prenom: { type: String, required: false },  
  nom: { type: String, required: false },  
  mail: { type: String, required: false },  
  password: { type: String, required: false },  
  phone: { type: String, required: false },  
  cell: { type: String, required: false },  
  adresse: { type: String, required: false },  
  codePostal: { type: String, required: false },  
  ville: { type: String, required: false },  
  province: { type: String, required: false },  
  admin: { type: String, required: false },  
  login: { type: String, required: false },  
  photo: { type: String, required: false },  
  coutHoraire: { type: String, required: false }
})
var EmployeModel = mongoose.model('Employe', Employe);  
//GET
app.get('/api/employes', function (req, res){
  return EmployeModel.find(function (err, employes) {
    if (!err) {
      return res.send(employes);
    } else {
      return console.log(err);
    }
  });
});

//POST
app.post('/api/employes', function (req, res){
  var employe;
  console.log("POST: ");
  console.log(req.body);
  employe = new EmployeModel({
  prenom:req.body.prenom,
  nom:req.body.nom,
  mail:req.body.mail,
  password:req.body.password,
  phone:req.body.phone,
  cell:req.body.cell,
  adresse:req.body.adresse,
  codePostal:req.body.codePostal,
  ville:req.body.ville,
  province:req.body.province,
  admin:req.body.admin,
  login:req.body.login,
  photo:req.body.photo,
  coutHoraire:req.body.coutHoraire
  });
  employe.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(employe);
});

app.get('/api/employes/:id', function (req, res){
  return EmployeModel.findById(req.params.id, function (err, employe) {
    if (!err) {
      return res.send(employe);
    } else {
      return console.log(err);
    }
  });
});

//PUT
app.put('/api/employes/:id', function (req, res){
  return EmployeModel.findById(req.params.id, function (err, employe) {
  employe.prenom      = req.body.prenom;
  employe.nom         = req.body.nom;
  employe.mail        = req.body.mail;
  employe.password    = req.body.password;
  employe.phone       = req.body.phone;
  employe.cell        = req.body.cell;
  employe.adresse     = req.body.adresse;
  employe.codePostal  = req.body.codePostal;
  employe.ville       = req.body.ville;
  employe.province    = req.body.province;
  employe.admin       = req.body.admin;
  employe.login       = req.body.login;
  employe.photo       = req.body.photo;
  employe.coutHoraire = req.body.coutHoraire;
    return employe.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(employe);
    });
  });
});


//DELETE
app.delete('/api/employes/:id', function (req, res){
  return EmployeModel.findById(req.params.id, function (err, employe) {
    return employe.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});
