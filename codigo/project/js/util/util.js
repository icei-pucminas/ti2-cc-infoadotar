/// <summary>
/// Chack if an email is valid
/// </summary>
/// <param name="email">a email</param>
/// <returns>a boolean result</returns>
function validEmail(email) {
    return typeof email == 'string'? 
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) : false;
}

function validarUrl(url) {
    return typeof url == 'string'? 
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(url) : false;
}