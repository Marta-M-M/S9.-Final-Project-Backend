import { body, check } from 'express-validator';
//body():se utiliza para validar los campos en el cuerpo (body)
//check():se utiliza para validar los campos en el cuerpo (body), los parámetros de la ruta (params)

// Validator for creating or updating an event
export const eventValidator = [
    body("title")
        .exists()
        .withMessage("Title is required")
        .isString()
        .withMessage("Title must be a string")
        .isLength({ min: 5 })
        .withMessage("Title must be at least 5 characters long"),
    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
    body("f_ini")
        .exists()
        .withMessage("Start date is required")
        .isISO8601()
        .withMessage("Start date must be in ISO8601 format"),
    body("f_fin")
        .exists()
        .withMessage("End date is required")
        .isISO8601()
        .withMessage("End date must be in ISO8601 format")
        .custom((value, { req }) => {
            if (value <= req.body.f_ini) {
                throw new Error("End date must be after start date");
            }
            return true;
        }),
    body("capacity")
        .exists()
        .withMessage("Capacity is required")
        .isInt()
        .withMessage("Capacity must be an integer")
        .custom((value) => {
            if (value < 0) {
                throw new Error("Capacity must be a non-negative number");
            }
            return true;
        })
        .custom((value) => {
            if (value > 15) { // Cambia este valor según tus necesidades
                throw new Error("Capacity must not exceed 15");
            }
            return true;
        })
];

