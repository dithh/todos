import { Response } from 'express'
import { HydratedDocument } from 'mongoose'
export const sendResourceIfExists = <T>(
    res: Response,
    resource: HydratedDocument<T> | null,
    resourceName: string
) => {
    if (resource) {
        return res.json(resource)
    }

    res.status(404)
    res.json({ message: `${resourceName} not found` })
}
