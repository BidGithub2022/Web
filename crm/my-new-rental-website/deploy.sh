#!/bin/bash

# Install Node.js dependencies and build Next.js app
npm install
npm run build
npm run export

# Install Python dependencies
pip install -r requirements.txt

# Start the application
streamlit run app.py