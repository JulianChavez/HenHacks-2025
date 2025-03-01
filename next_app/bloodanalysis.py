import google.generativeai as genai 
import pandas as pd
import os
import pdfplumber
import csv
import json

def extract_text_from_pdf(pdf_path):
    """Extracts text from a PDF file."""
    text_data = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                text_data.append(text)
    return "\n".join(text_data)

def parse_bloodwork_data(text):
    """Parses extracted text into structured bloodwork data."""
    lines = text.split("\n")
    data = []
    
    for line in lines:
        parts = line.split()
        if len(parts) >= 2:  
            test_name = " ".join(parts[:-1])  
            test_value = parts[-1]  
            data.append([test_name, test_value])
    
    return data

def save_to_csv(data, output_csv):
    """Saves extracted bloodwork data to a CSV file."""
    with open(output_csv, "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["Test Name", "Value"])  
        writer.writerows(data)

def pdf_to_csv(pdf_path, output_csv):
    """Complete pipeline: Extract, Parse, and Save bloodwork data."""
    text = extract_text_from_pdf(pdf_path)
    structured_data = parse_bloodwork_data(text)
    save_to_csv(structured_data, output_csv)

pdf_to_csv("/home/bgoltser/Downloads/bloodwork.pdf", "bloodwork.csv")

os.environ["GOOGLE_API_KEY"] = "AIzaSyDYrGLAYyEAqJRyjGvdfxf6Kd3-5bJGvSY"

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def analyze_bloodwork(file_path):
    df = pd.read_csv(file_path)
    
    bloodwork_text = df.to_string(index=False)

    prompt = f"""

    You are an AI-powered medical assistant analyzing blood test results.

    Instructions:
    Provide clear and actionable health recommendations based on the test results.
    Present the blood test results in a structured breakdown with:
    Test Name
    Result
    Reference Range
    Notes (explanation, significance, and possible concerns)
    If age, gender, or health conditions are provided, tailor your recommendations accordingly.
    Blood Test Results:
    {bloodwork_text}

    Expected Output Format:

    Summary:
    **Summarize key takeaways** in simple language, mentioning:
   - Any potential concerns or abnormalities
   - Possible causes
   - Suggestions for lifestyle changes or further testing

    Recommendations:

    [Actionable suggestion 1]
    [Actionable suggestion 2]
    [Etc.]
    Blood Test Breakdown:

    Test Name	| Result	| Reference Range	| Notes
    
    Ensure your response is clear, concise, and medically informative. If age, gender, or health conditions are provided, tailor your recommendations accordingly. Avoid making definitive diagnoses and always suggest consulting a healthcare provider if needed.
    
    """

    model = genai.GenerativeModel("gemini-1.5-pro")
    response = model.generate_content(prompt)

    return response.text


if __name__ == "__main__":
    file_path = "bloodwork.csv" 
    result = analyze_bloodwork(file_path)
    json_string = json.dumps(result)
