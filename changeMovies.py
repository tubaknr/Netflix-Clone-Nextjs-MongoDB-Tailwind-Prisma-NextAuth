import json
import os

# JSON file path
file_path = 'movies.json'

# Define the thumbnail website URL
thumbnail_website_url = "https://upload.wikimedia.org/"  # Adjust this URL as needed

# Check if the file exists
if not os.path.exists(file_path):
    print(f"File not found: {file_path}")
else:
    try:
        # Read the JSON file
        with open(file_path, 'r') as file:
            movies = json.load(file)

        # Update all movies
        for movie in movies:
            movie['duration'] = "10 minutes"
            # Remove unnecessary fields
            movie.pop('thumbnail_width', None)
            movie.pop('thumbnail_height', None)
            movie.pop('cast', None)
            movie.pop('year', None)  # Remove year
            movie.pop('href', None)  # Remove href

            # Change genres to a single genre string
            if 'genre' in movie and isinstance(movie['genre'], list) and movie['genre']:
                movie['genre'] = movie['genre'][0]  # Keep only the first genre
            elif 'genres' in movie and isinstance(movie['genres'], list) and movie['genres']:
                movie['genre'] = movie['genres'][0]  # Keep only the first genre if it was in 'genres'
                movie.pop('genres', None)  # Remove old genres key

            # Rename extract to description
            if 'extract' in movie:
                movie['description'] = movie.pop('extract')

            # Rename thumbnail to thumbnailUrl
            if 'thumbnail' in movie:
                movie['thumbnailUrl'] = movie.pop('thumbnail')

            # Add videoUrl
            movie['videoUrl'] = thumbnail_website_url + movie.get('thumbnailUrl', '').split('/')[-1]

        # Write updated data back to the same file
        with open(file_path, 'w') as file:
            json.dump(movies, file, indent=2)

        print("All updates completed successfully, including removing href instances.")
    except json.JSONDecodeError:
        print("Could not read JSON file. Please check the file format.")
    except Exception as e:
        print(f"An error occurred: {e}")
