import streamlit as st
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import subprocess
import os
from pathlib import Path

# Initialize FastAPI
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def build_nextjs():
    try:
        # Get the current working directory
        current_dir = os.getcwd()
        st.write(f"Current directory: {current_dir}")

        # Check if we're in the Next.js project directory
        if not os.path.exists("package.json"):
            st.error("package.json not found. Make sure you're in the Next.js project directory.")
            return False

        st.info("Building Next.js application...")
        
        # Install dependencies
        st.write("Installing dependencies...")
        subprocess.run(["npm", "install"], check=True)
        
        # Build the application
        st.write("Building the application...")
        subprocess.run(["npm", "run", "build"], check=True)
        
        # Export static files
        st.write("Exporting static files...")
        subprocess.run(["npm", "run", "export"], check=True)
        
        if os.path.exists("out"):
            st.success("Build completed successfully!")
            return True
        else:
            st.error("Build completed but 'out' directory not found")
            return False
            
    except subprocess.CalledProcessError as e:
        st.error(f"Build failed: {str(e)}")
        return False
    except Exception as e:
        st.error(f"An error occurred: {str(e)}")
        return False

def main():
    st.set_page_config(
        page_title="OmSmartStay",
        page_icon="🏠",
        layout="wide"
    )

    st.title("OmSmartStay Website")

    # Only try to mount static files if build is successful
    if build_nextjs():
        try:
            out_dir = os.path.join(os.getcwd(), "out")
            if os.path.exists(out_dir):
                app.mount("/", StaticFiles(directory=out_dir, html=True), name="static")
                st.success("Static files mounted successfully")
                
                # Display the website in an iframe
                st.components.v1.iframe(
                    src="http://localhost:3000",
                    height=800,
                    scrolling=True
                )
            else:
                st.error(f"Output directory not found at: {out_dir}")
        except Exception as e:
            st.error(f"Failed to load website: {str(e)}")
    else:
        st.error("Failed to build the website. Please check the logs above.")

    # Display directory contents for debugging
    st.subheader("Directory Contents:")
    try:
        contents = os.listdir(os.getcwd())
        st.write(contents)
    except Exception as e:
        st.error(f"Failed to list directory contents: {str(e)}")

if __name__ == "__main__":
    main()