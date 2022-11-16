
const resultController = {
    async create(req, res, next) {
        res.json({ status: 'create result' })
    },

    async index(req, res, next) {
        res.json({ status: 'index result' })
    },

    async update(req, res, next) {
        res.json({ status: 'update result' })
    },

    async delete(req, res, next) {
        res.json({ status: 'delete result' })
    }
}

export default resultController;