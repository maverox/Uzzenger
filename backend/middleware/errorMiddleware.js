//create a middleware for not found routes
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`); //originalUrl is the url that was requested      
    res.status(404);
    next(error); //pass the error to the next middleware
}


//create a errorHandler middleware for handling errors at routes    
const errorHandler = (err, req, res, next) => {
    //check for status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    //send status code
    res.status(statusCode);
    //send json object
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}
module.exports = { notFound, errorHandler }