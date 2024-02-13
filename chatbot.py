import pymongo
from flask import Flask, request, render_template, jsonify

# MongoDB connection details
MONGO_URI = "mongodb+srv://MongCha:KungpaoChicken@cluster0.emvgydh.mongodb.net/"
DATABASE_NAME = "ChatBot"
COLLECTION_NAME = "dummy_data"

# Connect to MongoDB
client = pymongo.MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]

# Initialize Flask app
app = Flask(__name__)
app.template_folder = 'templates'

@app.route("/")
def home():
    """Serves the HTML form for user input."""
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def answer_question():
    """Handles user's question, retrieves data from MongoDB, and generates response."""
    question = request.form["question"]

    # Process query (consider NLP for complexity)
    query = question.lower().strip()

    # Perform MongoDB query using `$text` or exact match based on your needs
    result = collection.find_one({"$text": {"$search": query}})  # Consider full-text search or adjust for your fields

    # Generate response based on query and retrieved data
    if result:
        # Extract relevant information based on your data structure
        formatted_name = f"{result.get('firstname')} {result.get('lastname')}"  # Adjust names based on your field names
        age = result.get("age")
        occupation = result.get("occupation")
        salary = result.get("salary")  # Consider formatting
        response = f"""Here's what I found:\n
        Name: {formatted_name}
        Age: {age}
        Occupation: {occupation}
        Salary: {salary}"""
    else:
        response = "Sorry, I couldn't find any information related to your question."

    return jsonify({"answer": response})

if __name__ == "__main__":
    app.run(debug=True)
