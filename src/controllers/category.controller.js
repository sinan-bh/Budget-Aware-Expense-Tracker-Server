import {
  addCategoryService,
  deleteCategoryService,
  getCategoryService,
} from "../services/category.service.js";

export const getCategoriesController = async (req) => {
  try {
    return await getCategoryService(req.user.id);
  } catch (error) {
    return customError(
      error.statusCode || error.status || 500,
      error.message || "Something went wrong"
    );
  }
};

export const addCategoryController = async (req) => {
  try {
    return await addCategoryService(req.user.id, req.body);
  } catch (error) {
    return customError(
      error.statusCode || error.status || 500,
      error.message || "Something went wrong"
    );
  }
};

export const deleteCategoryController = async (req) => {
  try {
    return await deleteCategoryService(req.params.id, req.user.id);
  } catch (error) {
    return customError(
      error.statusCode || error.status || 500,
      error.message || "Something went wrong"
    );
  }
};
