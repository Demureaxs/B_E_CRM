import mongoose from "mongoose";
import Wedding from "../models/weddingsModel";

const dbURI = "mongodb+srv://demureaxs:Thomas1987@balievecrm.fqziq8t.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(dbURI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
 }).then(() => {
  console.log("Connected to MongoDB")
  createMockData();
}).catch((err) => {
  console.log("Error connecting to MongoDB", err)
})

function createMockData() {
  const mockWeddingData = [
    {
      agent: "John Doe",
      name: "Alice and Bob",
      email: "aliceandbob@example.com",
      date: new Date("2023-09-30"),
      venue: "The Grand Palace",
      guests: "200",
      foodAndBeverage: "Delicious Catering",
      decoration: "Elegant Decor",
      production: "Top Notch Productions",
      photographer: "Candid Memories",
      videographer: "Cinematic Moments",
      vendorProgress: "Planning Stage",
      checklist: [
        {
          type: "Decorations",
          vendor: "Elegant Decor",
          tasks: [
            {
              task: "Centerpieces",
              completed: false,
              todos: [
                {
                  todo: "Choose floral arrangements",
                  date: new Date("2023-05-10"),
                  deadline: new Date("2023-05-25"),
                  done: false,
                },
                {
                  todo: "Order vases",
                  date: new Date("2023-05-26"),
                  deadline: new Date("2023-06-10"),
                  done: false,
                },
              ],
            },
          ],
        },
        {
          type: "Catering",
          vendor: "Delicious Catering",
          tasks: [
            {
              task: "Menu Selection",
              completed: false,
              todos: [
                {
                  todo: "Schedule tasting",
                  date: new Date("2023-05-15"),
                  deadline: new Date("2023-05-30"),
                  done: false,
                },
                {
                  todo: "Choose menu",
                  date: new Date("2023-06-01"),
                  deadline: new Date("2023-06-15"),
                  done: false,
                },
              ],
            },
          ],
        },
      ],
      payments: [
        {
          date: new Date("2023-04-01"),
          amount: 5000,
        },
        {
          date: new Date("2023-06-01"),
          amount: 10000,
        },
      ],
    },
    {
      agent: "Jane Smith",
      name: "Emma and Lucas",
      email: "emmaandlucas@example.com",
      date: new Date("2023-08-20"),
      venue: "Ocean View Resort",
      guests: "150",
      foodAndBeverage: "Seaside Catering",
      decoration: "Beachside Bliss",
      production: "Wave Productions",
      photographer: "Sunset Snaps",
      videographer: "Beachside Films",
      vendorProgress: "Planning Stage",
      checklist: [
        {
          type: "Decorations",
          vendor: "Beachside Bliss",
          tasks: [
            {
              task: "Centerpieces",
              completed: false,
              todos: [
                {
                  todo: "Choose sea-themed arrangements",
                  date: new Date("2023-04-20"),
                  deadline: new Date("2023-05-05"),
                  done: false,
                },
                {
                  todo: "Order shells and starfish",
                  date: new Date("2023-05-06"),
                  deadline: new Date("2023-05-20"),
                  done: false,
                },
              ],
            },
          ],
        },
        {
          type: "Catering",
          vendor: "Seaside Catering",
          tasks: [
            {
              task: "Menu Selection",
              completed: false,
              todos: [
                {
                  todo: "Schedule tasting",
                  date: new Date("2023-04-25"),
                  deadline: new Date("2023-05-10"),
                  done: false,
                },
                {
                  todo: "Choose menu",
                  date: new Date("2023-05-11"),
                  deadline: new Date("2023-05-25"),
                  done: false,
                },
              ],
            },
          ],
        },
      ],
      payments: [
        {
          date: new Date("2023-03-10"),
          amount: 7000,
        },
        {
          date: new Date("2023-05-10"),
          amount: 10000,
        },
      ],
    }
  ];
  
  mockWeddingData.forEach((wedding) => {
    const mockWedding = new Wedding(wedding);
    
    mockWedding.save((err) => {
      if (err) {
        console.error("Error saving mock data:", err);
      } else {
        console.log("Mock data saved successfully.");
      }
    });
  
  })

}




