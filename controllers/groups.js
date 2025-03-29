const mongo = require('../data/index');
const {Group} = require('../models/models');

const list = async (req, res) => {
    // #swagger.tags = ['Groups']
    // #swagger.summary = 'List Groups'
    // #swagger.description = 'List all the groups in the database'
    // #swagger.responses[204] = { description: 'No Content' }
    // #swaager.end
    try {
        await mongo.get().db().collection('groups').find({}, (err, res) => {
            if (err) {
                res.status(500, 'Unable to retrieve groups').end();
            }
        }).toArray().then((found) => {
            if (found.length === 0) {
                res.status(204, 'No Content').end();
            } else {
                let groups = []
                for (let i = 0; i < found.length; i++) {
                    groups.push(new Group(found[i].groupId, found[i].name));
                }
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(groups);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json("something terrible happened");
    }
};

const create = async (req, res) => {
    // #swagger.tags = ['Groups']
    // #swagger.summary = 'Create Group'
    // #swagger.description = 'Create a new group and add it to the database'
    // #swaager.end
    try {
        let groupId = req.body.groupId;
        if (!groupId.match(/^\w+$/)) {
            res.status(400).json('Invalid Group Id').send();
            return;
        }

        const group = new Group(groupId, req.body.name);
        const result = await mongo.get().db().collection('groups').insertOne(group);
        res.setHeader('Content-Type', 'application/json');
        if (result.acknowledged) {
            res.status(201).json(new Group(group.groupId, group.name));
        } else {
            res.status(500).json('Unable to create a group');
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("something terrible happened");
    }
}

const getById = async (req, res) => {
    // #swagger.tags = ['Groups']
    // #swagger.summary = 'Find Group'
    // #swagger.description = 'Find a group by the given identifier'
    // #swagger.responses[200] = { description: 'Successful retrieval' }
    // #swagger.responses[404] = { description: 'Resource not found' }
    // #swaager.end
    try {
        const groupId = req.params.id;

        if (!groupId.match(/^\w+$/)) {
            res.status(400).json('Invalid Group Id').send();
            return;
        }

        const result = await mongo.get().db().collection('groups').findOne({groupId: groupId});
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(new Group(result.groupId, result.name));
        } else {
            res.status(404).send();
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("something terrible happened");
    }
};

const updateById = async (req, res) => {
    // #swagger.tags = ['Groups']
    // #swagger.summary = 'Update Group'
    // #swagger.description = 'Update the group data for a specific group (by groupId)'
    // #swagger.responses[204] = { description: 'Successfully updated' }
    // #swagger.responses[404] = { description: 'Entity not found' }
    // #swaager.end
    try {
        const groupId = req.params.id;
        if (!groupId.match(/^\w+$/)) {
            res.status(400).json('Invalid Group Id').send();
            return;
        }

        const group = new Group(groupId, req.body.name);
        const result = await mongo.get().db().collection('groups')
            .replaceOne({groupId: group.groupId}, group);
        if (result.acknowledged) {
            if (result.modifiedCount === 1) {
                res.status(200).json(group);
            } else {
                res.status(404).send();
            }
        } else {
            res.status(500).send();
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("something terrible happened");
    }
}

const deleteById = async (req, res) => {
    // #swagger.tags = ['Groups']
    // #swagger.summary = 'Delete Group'
    // #swagger.description = 'Remove a group from the database (by identifier)'
    // #swaager.end
    try {
        const groupId = req.params.id;
        if (!groupId.match(/^\w+$/)) {
            res.status(400).json('Invalid Group Id').send();
            return;
        }

        const result = await mongo.get().db().collection('groups').deleteOne({groupId: groupId});
        if (result.acknowledged) {
            if (result.deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).send();
            }
        } else {
            res.status(500).send();
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("something terrible happened");
    }
}

module.exports = {
    create, list, getById, updateById, deleteById
};