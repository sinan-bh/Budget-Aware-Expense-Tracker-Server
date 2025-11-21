import customError from "../../config/customError.js";
import { monthlyReportServices } from "../services/reports.service.js";

export const monthlyReportController = async (req) => {
    try {
        return await monthlyReportServices(req.user.id, req.query.month);
    } catch (error) {
        return customError(
            error.statusCode || error.status || 500,
            error.message || "Something went wrong"
        );
    }
};
