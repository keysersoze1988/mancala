exports.error = function (message) {
    return{
        code: "-1",
        message: message,
    }
};

exports.success = function (data) {
   return (
        {
            code: "0",
            message: "success",
            data: data
        } 
    )
};