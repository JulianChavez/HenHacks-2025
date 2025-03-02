import google.generativeai as genai
import os

os.environ["GOOGLE_API_KEY"] = "AIzaSyDYrGLAYyEAqJRyjGvdfxf6Kd3-5bJGvSY"

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize conversation history
conversation_history = []

def create_prompt(user_input, test_analysis):
    global conversation_history

    # Start with the analysis context
    prompt = f"""
    User has just received an analysis on their blood test results. Here are the details:

    {test_analysis}

    """
    
    # Add the user input to the conversation history
    conversation_history.append(f"User: {user_input}")
    
    # Add all previous conversation exchanges
    prompt += "\n".join(conversation_history)

    # Append the AI's response request
    prompt += "\nAI:"

    return prompt

def continue_conversation(user_input, test_analysis):
    prompt = create_prompt(user_input, test_analysis)
    response = genai.generate_response(prompt)

    # Add AI's response to conversation history
    conversation_history.append(f"AI: {response}")
    
    return response

test_analysis = ""

print("Welcome to the chat bot! Type 'exit' to end the conversation.\n")

while True:
    # Get user input
    user_input = input("You: ")
    
    # Check for exit condition
    if user_input.lower() == "exit":
        print("Ending the conversation. Goodbye!")
        break
    
    # Get the AI's response based on the conversation so far
    response = continue_conversation(user_input, test_analysis)
    
    # Print the AI's response
    print("AI:", response)
