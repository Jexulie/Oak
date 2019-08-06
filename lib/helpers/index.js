module.exports.sanitizeName = function(name){
    const ILLEGALS = [
        '@', '-',
    ];

    //** copy string  */
    let sanitized = (' ' + name).slice(1);

    ILLEGALS.forEach(i => {
        sanitized = sanitized.replace(i, '');
    });

    sanitized = sanitized.toLowerCase();

    return sanitized;
}
module.exports.upperFirstLetter = function(string){
    return string[0].toUpperCase() + string.slice(1);
}