const router = require("express").Router();
const { rmSync } = require("fs");
const store = require("../db/store.js");
const notes = "";
// API routes
//get all notes
router.get("/note", function(req,res){
 // retrieve all notes and res.json them back to front end;
    // read contents of dbjson send them to user
    // fs.promises.readFile("./db/db.json", "utf8", function(err,data){
    //    res.json(JSON.parse(data)); 
    // })
    // .catch((error) => {
    //     console.error(error);
    //        });
    // res.json(notes); 
    console.log(res)
    store.getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err))
});

router.post("/note", function(req,res){
    console.log(req.body)
    store.saveNote(req.body)
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err))
//     //creates a note from req.body; save note
//     const note = {
//         id: uuidv4(),
//         title: req.body.title,
//         text: req.body.text,
    // }
//     //read data from db json
//     fs.promises.readFile("../db/db.json","utf8",function(err,note){
//         res.json(JSON.parse(note));
//         notes.push(note);
//         JSON.stringify(notes);
//         fs.promises.writeFile("./db/db.json", notes, "utf8",function(err,data){
//             res.send(notes);
//         })
//         .catch((error) => {
//             console.error(error);
//           });
//     })
//     //parse out array
//     //push to array
//     //stringify
//     //write to file with new array
//     //respond to user

//     res.json(note);
});

router.delete("/note/:id", function (req, res){
    //Delete a note based off id
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (err, data) {   
        if (err) throw err      
        const notes = JSON.parse(data);    
        const {id} = req.params;     
        const newNotes = notes.filter((note) => note.id !== +id);       
        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(newNotes), function (err, data) {             
            if (err) throw err
            res.end("I hope it worked")         
        });     
    });
});
module.exports = router;