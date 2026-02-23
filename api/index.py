import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Enable CORS - since frontend and backend are on the same domain in Vercel, 
# this is mostly for local development.
CORS(app)

# Supabase setup
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@app.route('/')
def home():
    return jsonify({"message": "Carlo's Portfolio API is running!"})

@app.route('/api/comments', methods=['GET'])
def get_comments():
    try:
        # Fetch comments from Supabase
        response = supabase.table('comments').select("*").order('created_at', desc=True).execute()
        return jsonify({"success": True, "data": response.data})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/comments', methods=['POST'])
def post_comment():
    try:
        data = request.json
        name = data.get('name')
        message = data.get('message') # Use 'comment' if you renamed the column in Supabase

        if not name or not message:
            return jsonify({"success": False, "error": "Missing name or message"}), 400

        # Insert into Supabase
        # IMPORTANT: If you renamed your column to 'comment', change "message": message to "comment": message
        new_comment = {"name": name, "message": message}
        response = supabase.table('comments').insert(new_comment).execute()
        
        return jsonify({"success": True, "data": response.data})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# DO NOT add app.run() here. Vercel handles the execution.