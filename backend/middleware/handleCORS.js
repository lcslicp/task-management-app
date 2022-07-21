const handleCORS = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://doowit.netlify.app/');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Accept'
  );
  next();
};

export default handleCORS;
