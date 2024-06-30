import os
import hashlib

def compute_hash(file_path, hash_function='sha256'):
    hash_func = hashlib.new(hash_function)
    with open(file_path, 'rb') as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_func.update(chunk)
    return hash_func.hexdigest()

def rename_files_to_hash(directory, hash_function='sha256'):
    for root, _, files in os.walk(directory):
        for filename in files:
            file_path = os.path.join(root, filename)
            file_hash = compute_hash(file_path, hash_function)
            file_extension = os.path.splitext(filename)[1]
            new_file_name = f"{file_hash}{file_extension}"
            new_file_path = os.path.join(root, new_file_name)
            if new_file_path != file_path:
                os.rename(file_path, new_file_path)
                print(f"Renamed {file_path} to {new_file_path}")

directory = "music"
rename_files_to_hash(directory)
