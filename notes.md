Backend Development

DB operations
    Create
    Read
    Update
    Delete

models
    orm.js
        const orm = {
            findOne: (table, id) => {},
            findMany: () => {},
            createOne: () => {},
            createMany: () => {},
            updateOne: () => {},
            updateMany: () => {},
            deleteOne: () => {},
            deleteMany: () => {}
        }
        module.exports = orm;


controllers
    apiController.js
        const apiController = {
            findOne: (req, res) => { 
                let id = req.params.id;
                orm.findOne("customer", id)
            },
            findMany: () => { orm.findMany() },
            createOne: () => { orm.createOne() },
            createMany: () => { orm.createMany() },
            updateOne: () => { orm.updateOne() },
            updateMany: async (req,res) => { 
                let updatedCustomer = await orm.updateMany(req.params.id) 
                let updatedProvider = await orm.updateMany(req.params.id) 
                let newSession = { customer_id: updatedCustomer.id, prodiver_id: updatedProvider.id }
                let updatedSession = await orm.updateOne("sessions", newSession)
                if (updatedSession !== undefined) {
                    res.json(updatedSession)
                }
            },
            deleteOne: () => { orm.deleteOne() },
            deleteMany: () => { orm.deleteMany() }
        }
        module.exports = orm;

routes
    apiRoutes.js
        router.route("/api/customer/:id")
            .get(apiController.findOne)
            .post(apiController.createOne)
            .put(apiController.updateOne)
            .delete(apiController.deleteOne)
 
        router.route("/api/customers")
            .get(orm.findMany())
            .post(orm.createMany())
            .put(orm.updateMany())
            .delete(orm.deleteMany())



1. Request is made from the frontend
2. Server gets hit, uses routes
3. Routes index get hit, uses apiRoutes
4. Defined route is hit, calls controller function based on method
5. Controller function takes (req, res) and calls an orm (object relational model) function
6. Orm function make db query and returns results (callback function)
7. Controller does res.json() with the new data
8. Arrives back in the frontend
