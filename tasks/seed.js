const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const polls = data.polls;

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        return users.addUser("Patrick", "Hill", "graffixnyc@gmail.com","M","Flushing","NY","41","testingfornow");
    }).then((patrick) => {
        const id = patrick._id;

        return polls
            .addPoll("Technology", "11/27/2016","What Phone Should I buy?","iPhone 7","Galaxy S7","Google Pixel XL","Other (leave in comments)", id)
            .then(() => {
                return polls.addPoll("Education", "11/27/2016","What Class Should I take next semester?","CS 546","CS 522","CS 545","CS 522", id);
            })
            .then(() => {
                return polls.addPoll("Technology", "11/27/2016","What is a better laptop?","MacBook Pro 13","Dell XPS 13","Lenovo Yoga","HP Envy", id);
            });
    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});
