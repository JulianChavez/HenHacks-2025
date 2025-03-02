import google.generativeai as genai 
import os

os.environ["GOOGLE_API_KEY"] = "AIzaSyDYrGLAYyEAqJRyjGvdfxf6Kd3-5bJGvSY"

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def create_prompt(user_input, test_analysis):
    prompt = f"""
    User has just received an analysis on their blood test results. Here are the details:

    {test_analysis}

    The user is asking the following question: 
    {user_input}

    Based on this, provide a detailed, empathetic response that explains the test results, summary, or recommendations and provide recommendations where appropriate. If necessary, clarify medical terms and suggest next steps (such as scheduling a follow-up appointment, or lifestyle changes).
    """
    return prompt

user_input = ""
test_analysis = ""

prompt = create_prompt(user_input, test_analysis)
response = genai.generate_response(prompt)

