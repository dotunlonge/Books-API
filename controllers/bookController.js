const mongoose = require("mongoose");
const Book = mongoose.model("Books");

exports.add_a_book = function(req,res){
    const new_book = new Book(req.body);
    new_book.save((err,book)=>{
        if(err) res.send(err);
        res.json(book);
    })
}

exports.get_all_books = function(req,res){
    Book.find({}, function(err,books){
        if(err) res.send(err);
        res.json(books)
    })
}

exports.delete_a_book = function(req,res){
    Book.deleteOne({ _id : req.params.id},
        function(err,book){
            if(err) res.send(err);
            res.json(book)
        })
}

exports.find_a_book = function(req,res){
    Book.findById(req.params.id, function(err,book){
        if(err) res.send(err);
        res.json(book);
    })
}

exports.update_a_book = function(req,res){
    Book.findByIdAndUpdate(req.params.id, req.body, function(err,book){
        if(err) res.send(err);
        res.json(book);
    })
}