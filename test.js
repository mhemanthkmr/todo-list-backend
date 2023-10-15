const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://mhemanthkmr:Hemanth123$@mongodb.selfmade.ninja:27017/users",
  {
    dbName: "mhemanthkmr_Test",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function updateCourse(id) {
  console.log("Test");
  const course = await Course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = "Another Author";
  const result = await course.save();
  console.log(result);
}

updateCourse("5a68fdf95db93f6477053ddd");
