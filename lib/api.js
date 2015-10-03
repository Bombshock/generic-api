module.exports = function (mongo){
  return new API(mongo);
};

API.prototype.handle = apiHandler;

function API(mongo){
    this.mongo = mongo;
}

function apiHandler(req, res){

    if(!req.params.type){
        throw new Error("Type must be set");
    }

    var type = req.params.type;
    var id = req.params.id;
    var verb = req.method;

    if(verb === "GET"){
        if(id){
            this.mongo
                .query(type)
                .populate(true)
                .findOne(id)
                .then(successHandler, errorHandler);
        } else {
            this.mongo
                .query(type)
                .populate(true)
                .find()
                .then(successHandler, errorHandler);
        }
    } else if(verb === "POST") {
        if(id){
            //update
        } else {
            this.mongo
                .query(type)
                .populate(true)
                .insert(req.body)
                .then(successHandler, errorHandler);
        }
    }


    function successHandler(results) {
        res.send(results);
    }

    function errorHandler(err) {
        res.send(err);
        console.error(err);
    }
}