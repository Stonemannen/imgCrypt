imgCrypt
=========

Encrypt hidden messages inside images by manipulating individual pixels

## How it works
When you encrypt the program changes color of random pixels and saves in a file which pixels and how to decrypt them. 

## Installation
```sh
$ npm install
```

## Usage
```sh
#Encrypt message
$ node encrypt.js -i source_image_path -m your_message -k where_to_save_key_file -o output_file(must be png)

#Decrypt message
$ node decrypt.js -i image_with_hidden_message -k key_file

```
