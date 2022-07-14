const errorHandler = (err, req, res, next) => {

    if (err) {
      res.status(err.statusCode ?? 400).json({
        error: err.message,
      });
    }
  
    next(err);
  };
  
  export default errorHandler;
  