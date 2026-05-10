import { body, param } from "express-validator";
import { validatorResult } from "../helpers/validate.helper.js";

export const taskValidationPost = [
    body('title')
        .exists().withMessage('El título es obligatorio')
        .notEmpty().withMessage('El título no puede estar vacío')
        .isString().withMessage('El título debe ser una cadena de texto')
        .isLength({ max: 255 }).withMessage('El título no puede superar los 255 caracteres'),
    
    body('description')
        .optional()
        .isString().withMessage('La descripción debe ser una cadena de texto'),

    body('completed')
        .optional()
        .isBoolean().withMessage('El campo completed debe ser un valor booleano (true/false)'),
    
    (req, res, next) => validatorResult(req, res, next)

];

export const idParamValidation = [
    param('id')
        .isInt().withMessage('El ID debe ser un número entero'),
    (req, res, next) => validatorResult(req, res, next)
];

export const updateTaskValidation = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID en la URL debe ser un número entero válido y mayor a 0'),

    body('title')
        .optional()
        .notEmpty().withMessage('Si envías el título, no puede estar vacío')
        .isString().withMessage('El título debe ser texto'),

    body('completed')
        .optional()
        .isBoolean().withMessage('El campo completed debe ser true o false'),

    (req, res, next) => validatorResult(req, res, next)

];