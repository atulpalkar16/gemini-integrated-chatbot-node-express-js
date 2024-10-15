import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
const API_URL = process.env.API_URL;

app.use(express.json());
app.use(express.static("public"));

// Serve the index.html for the root route
app.get("/", (req, res) => res.sendFile(path.resolve("index.html")));

// API route to handle the chatbot
app.post("/api", async (req, res) => {
  const userInput = req.body.userInput;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userInput }] }],
      }),
    });

    if (!response.ok) throw new Error("Failed to fetch from the Gemini API");

    const data = await response.json();
    res.json(data); // Send the response back to the client
  } catch (err) {
    console.error("Error: " + err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, console.log(`connected to server ${PORT}`));
