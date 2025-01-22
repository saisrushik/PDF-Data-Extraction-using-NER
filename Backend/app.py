from flask import Flask, request, jsonify
from flask_cors import CORS

import pdfplumber
#from transformers import AutoTokenizer, AutoModelForTokenClassification
#from transformers import pipeline
import spacy 
import re

app = Flask(__name__)
CORS(app)  # Allow all origins

'''
# Load the NLP model
tokenizer = AutoTokenizer.from_pretrained("dslim/bert-base-NER")
model = AutoModelForTokenClassification.from_pretrained("dslim/bert-base-NER")

#ner_model = pipeline("ner", model=model, tokenizer=tokenizer)
# ner_model= pipeline('ner', model='dbmdz/bert-large-cased-finetuned-conll03-english')
'''

nlp = spacy.load("en_core_web_lg")

@app.route('/upload-pdf', methods=['POST'])
def extract_data():
    file = request.files['file']
    with pdfplumber.open(file) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
    
    
    # Apply NER on the extracted text
    doc = nlp(text)
    extracted_data = {'Name': '', 'Phone': '', 'Address': ''}
    print(doc)

    #regex for 10-digit phone numbers
    phone_pattern = r'\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'  

    for ent in doc.ents:
        if ent.label_ == "PERSON" and not extracted_data['Name']:
            extracted_data['Name'] = ent.text
        elif ent.label_ == "GPE" and not extracted_data['Address']:
            extracted_data['Address'] = ent.text
        elif extracted_data['Phone'] == '':
            phone_match = re.search(phone_pattern, text)
            if phone_match:
                extracted_data['Phone'] = phone_match.group()
                '''
                
            if not extracted_data['Phone']:
                extracted_data['Phone'] = ent.text
                '''

    return jsonify(extracted_data)

if __name__ == '__main__':
    app.run(debug=True)
