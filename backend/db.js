const mongoose = require("mongoose");

const mongoURI = 'mongodb+srv://food:food123@cluster0.tldmqpb.mongodb.net/food?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected to MongoDB");

    const foodItemsPromise = mongoose.connection.db.collection("food_items").find({}).toArray();
    const foodCategoryPromise = mongoose.connection.db.collection("food_category").find({}).toArray();

    const [foodItems, foodCategory] = await Promise.all([foodItemsPromise, foodCategoryPromise]);

    global.food_items = foodItems;
    global.foodCategory = foodCategory;

    // console.log(global.food_items);
    // console.log(global.foodCategory);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

module.exports = mongoDB;
