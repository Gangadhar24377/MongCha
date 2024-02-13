import os
import google.generativeai as genai
import pyttsx3
import threading
import queue
from pymongo import MongoClient

os.environ['GOOGLE_API_KEY'] = "AIzaSyBkff4dQNILsBxzp5M7qsaQpcRoirf18lc"
genai.configure(api_key = os.environ['GOOGLE_API_KEY'])

model = genai.GenerativeModel('gemini-pro')

engine = pyttsx3.init()
speech_queue = queue.Queue()

client = MongoClient(os.environ['mongodb+srv://MongCha:KungpaoChicken@cluster0.emvgydh.mongodb.net/'])
db = client['Mongcha']
collection = db['mongcha']

def speak():
    while True:
        text = speech_queue.get()
        if text is None:
            break
        engine.say(text)
        engine.runAndWait()

threading.Thread(target=speak, daemon=True).start()

while True:
    user_input = input("User: ")
    if user_input.lower() == "quit":
        speech_queue.put(None)
        break
    elif user_input.lower() == "stop":
        engine.stop()
        continue
    
    db_response = collection.find_one({"question": user_input})
    if db_response:
        response_text = db_response['answer']
    else:
        response = model.generate_content(user_input)
        response_text = response.text
    print("Chatbot: ", response_text)
    speech_queue.put(response_text)