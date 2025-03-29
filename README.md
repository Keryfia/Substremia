# Stremio Subtitles Addon

A Stremio addon for managing subtitles with an integrated web interface.

## Features

- Upload and manage subtitles for movies and TV series
- Intuitive web interface
- Support for .srt files
- Metadata storage on Firebase Firestore
- Caching system to improve performance
- Full integration with Stremio

## Configuration

To run this addon, you will need some API keys and configurations.

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Copy the `.env.example` file to a new file named `.env`:
    ```bash
    cp .env.example .env
    ```
    Edit the `.env` file with your keys and configurations:

    *   **Firebase Service Account:**
        *   Go to your Firebase project console: https://console.firebase.google.com/
        *   Navigate to **Project settings** > **Service accounts**.
        *   Click **Generate new private key** and download the JSON file.
        *   **Method 1 (Recommended for Vercel):** Copy the entire content of the downloaded JSON file and paste it as the value for `FIREBASE_SERVICE_ACCOUNT_JSON` in your `.env` file (or directly into Vercel's environment variables). Ensure it's a valid JSON string (you might need to enclose it in quotes or use an online tool to minify/escape it if you encounter issues).
        *   **Method 2 (Alternative for local development):** Save the downloaded JSON file to a secure location (make sure it's listed in `.gitignore`) and set the `FIREBASE_SERVICE_ACCOUNT_KEY_PATH` variable in your `.env` file to the full path of the file (e.g., `FIREBASE_SERVICE_ACCOUNT_KEY_PATH=/Users/your_user/keys/firebase-key.json`). If you use this method, you can comment out or remove `FIREBASE_SERVICE_ACCOUNT_JSON`.

    *   **TMDB API Key:**
        *   Register or log in to The Movie Database (TMDB): https://www.themoviedb.org/
        *   Go to your account settings > API.
        *   Request an API key (v3 auth).
        *   Copy your v3 API key and paste it as the value for `TMDB_API_KEY` in the `.env` file.

    *   **Cache TTL (Optional):**
        *   You can modify `CACHE_TTL` to change the cache duration in seconds (default: 3600 = 1 hour).

4.  **Run (Local Development):**
    ```bash
    npm run dev
    ```
    The addon will typically be accessible at `http://localhost:5000` (or the port specified in your `.env` file). Check the terminal output for the exact address.

5.  **Deploy (Vercel):**
    *   Connect your GitHub/GitLab/Bitbucket repository to Vercel.
    *   Configure the environment variables directly in the Vercel UI (Project Settings > Environment Variables):
        *   `FIREBASE_SERVICE_ACCOUNT_JSON`: Paste the entire content of the Firebase service account JSON here (as described in Method 1 above).
        *   `TMDB_API_KEY`: Paste your TMDB API key.
        *   `CACHE_TTL` (Optional): Set the cache duration if different from the default.
    *   Vercel should automatically detect it as a Node.js project and configure the build and deployment. The build command `npm run build` (if defined in `package.json`) and the start command `npm start` (or the file specified in `vercel.json`) will be used.

6.  **Install in Stremio:**
    *   Once your addon is deployed (e.g., on Vercel), you will get a public URL (like `https://<your-deployment-name>.vercel.app`).
    *   To install the addon in Stremio, take your deployment URL and append `/addon/manifest.json` to it.
        *   Example: `https://<your-deployment-name>.vercel.app/addon/manifest.json`
    *   Open Stremio, go to the Addons section, paste this full URL into the search bar (where it says "Addon Repository Url or Info Hash"), and press Enter.
    *   Click the "Install" button for your addon.

## Subtitles Structure

This section describes the expected structure if subtitles were stored locally (Note: This addon uses Firebase for metadata, actual subtitle files might be handled differently or stored elsewhere depending on your implementation).

```
/subtitles
  /movies
    /tt1234567 # IMDB ID
      it.srt   # Language code
      en.srt
  /series
    /tt7654321 # IMDB ID
      /s01e01  # Season/Episode
        it.srt   # Language code
        en.srt
```

**Note:** Language codes should follow the ISO 639-1 standard (e.g., `en` for English, `it` for Italian, `es` for Spanish).

## API Endpoints

- `GET /api/subtitles/:type/:id/:lang` - Get subtitles (implementation might depend on storage)
- `POST /api/upload` - Upload new subtitles
- `GET /api/list/:type/:id` - List available languages for an item
- `GET /api/listall` - List all indexed subtitles (metadata)
- `DELETE /api/subtitles/:type/:id/:lang` - Remove subtitles (metadata and potentially stored file)
# Substremia
