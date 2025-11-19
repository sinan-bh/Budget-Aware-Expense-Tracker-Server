import Category from "../model/categorySchema.js";

export const getCategoryService = async (userId) => {
  const list = await Category.find({ userId: userId });
  return {
    message: "Categories fetched successfully",
    data: { categories: list },
  };
};

export const addCategoryService = async (userId, categoryData) => {
  const { name, color } = categoryData;
  const cat = await Category.create({ userId: userId, name, color });
  return { message: "Category added successfully", data: { category: cat } };
};

export const deleteCategoryService = async (categoryId, userId) => {
  await Category.deleteOne({ _id: categoryId, userId: userId });
  return { message: "Category deleted successfully" };
};
