// bring in services and call service in the controleer

const indexControlle = (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
}

module.exports = {
    indexControlle
}