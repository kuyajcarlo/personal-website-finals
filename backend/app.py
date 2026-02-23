from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["*"])

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "Carlo's Portfolio API is running!"})


@app.route("/api/comments", methods=["GET"])
def get_comments():
    try:
        response = supabase.table("comments").select("*").order("created_at", desc=True).execute()
        return jsonify({"success": True, "data": response.data}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/comments", methods=["POST"])
def post_comment():
    try:
        body = request.get_json()
        name = body.get("name", "").strip()
        message = body.get("message", "").strip()

        if not name or not message:
            return jsonify({"success": False, "error": "Name and message are required."}), 400

        if len(name) > 100:
            return jsonify({"success": False, "error": "Name too long."}), 400

        if len(message) > 1000:
            return jsonify({"success": False, "error": "Message too long."}), 400

        data = {"name": name, "comment": message}
        response = supabase.table("comments").insert(data).execute()

        return jsonify({"success": True, "data": response.data}), 201
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=8080)