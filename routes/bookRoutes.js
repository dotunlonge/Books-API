module.exports = function(app){
    const bookController = require("../controllers/bookController");
    app.route("/books")
    .get(bookController.get_all_books)
    .post(bookController.add_a_book)

    app.route("/books/:id")
    .get(bookController.find_a_book)
    .put(bookController.update_a_book)
    .delete(bookController.delete_a_book)

    app.use(function(req,res){
        res.status(404).send({
            error: 404
        })
    })
}