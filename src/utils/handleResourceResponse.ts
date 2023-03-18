import { Response } from 'express'
import { HydratedDocument } from 'mongoose'
export const handleResourceResponse = <T>(
    res: Response,
    resource: HydratedDocument<T> | null
) => {
    if (resource) {
        return res.json(resource)
    }
    res.status(404)
    res.json({ message: 'Resource not found' })
}
