import dotenv from 'dotenv';
import mongodb from 'mongodb';

dotenv.config();

const MongoClient = mongodb.MongoClient;

let index;

const init = (callback) => {
    if (index) {
        console.log('index initialized');
        return callback(null, index);
    }
    MongoClient.connect(process.env.MONGO_URI)
        .then((client) => {
            index = client;
            callback(null, index);
        })
        .catch((err) => {
            callback(err);
        });
};

const get = () => {
    if (!index)  {
        console.log('index not found');
        throw Error('index not found');
    }
    return index;
}

export { init, get };