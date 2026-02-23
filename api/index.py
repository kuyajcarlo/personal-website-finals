import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)


CORS(app)

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@app.route('/')
def home():
    return jsonify({"message": "Carlo's Portfolio API is running!"})

@app.route('/api/comments', methods=['GET'])
def get_comments():
    try:
        response = supabase.table('comments').select("*").order('created_at', desc=True).execute()
        return jsonify({"success": True, "data": response.data})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/comments', methods=['POST'])
def post_comment():
    try:
        data = request.json
        name = data.get('name')
        message = data.get('message') 
        if not name or not message:
            return jsonify({"success": False, "error": "Missing name or message"}), 400


        new_comment = {"name": name, "comment": message}
        response = supabase.table('comments').insert(new_comment).execute()
        
        return jsonify({"success": True, "data": response.data})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

