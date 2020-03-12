var Sequelize = require("sequelize");
const Op = Sequelize.Op;
const httpStatus = require("http-status");
const logger = require("../../utils/logger");
const {
    errorMessage,
    version,
    emailType,
    role
} = require("../../../config/constants");
const mysqldb = require("../../../config/sequelize");
const controllerName = "[adminController]";


/*exports.getAllAdmins = async (req, res) => {
    const methodName = '[getAllAdmins]';
    try {
        // let result = await adminService.getAllAdmins();
        return 'Done'

    } catch (error) {
        logger.error(controllerName, methodName, error);
        return customResponse.setResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, errorMessage.FAILED, version.v1, error);
    }
};

exports.findByActivationId = async (req, res) => {
    const methodName = '[findByActivationId]';
    try {
        let result = await adminService.findAdminByActivationCode(req.params);
        if (result) {
            return customResponse.setResponse(res, true, httpStatus.OK, errorMessage.SUCCESS, version.v1, result);
        } else {
            return customResponse.setResponse(res, false, httpStatus.NOT_FOUND, errorMessage.NO_SUBMISSION_FOUND, version.v1, 'No User Found');
        }
    } catch (error) {
        logger.error(controllerName, methodName, error);
        return customResponse.setResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, errorMessage.FAILED, version.v1, error);
    }
};

exports.createAdmin = async (req, res) => {
    const methodName = '[createAdmin]';
    try {
        let reqParams = req.body;
        if (reqParams) {
            let adminCreated = await adminService.createAdmin(reqParams);
            if (adminCreated) {
                const accountDetails = {
                    email: reqParams.email,
                    email_type: emailType.sendPasswordSetForAdmin
                };
                const emailVariables = {
                    USERNAME: reqParams.name,
                    ACTIVATE_LINK: `${adminHost}/setPassword?activationCode=${adminCreated.activationCode}`
                };
                emailService.sendEmailTemplate(emailVariables, accountDetails);
                return customResponse.setResponse(res, true, httpStatus.OK, errorMessage.SUCCESS, version.v1, adminCreated);
            }else{
                return customResponse.setResponse(res, true, httpStatus.FAILED, errorMessage.FAILED, version.v1, 'Email Id Exit');
            }
        }
    } catch (error) {
        logger.error(controllerName, methodName, error);
        return customResponse.setResponse(res, false, httpStatus.INTERNAL_SERVER_ERROR, errorMessage.FAILED, version.v1, error);
    }
};*/

