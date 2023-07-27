# Moments api rest with Adonis  

This code is a part of material of course [Matheus Battisti - Hora de codar]

(https://github.com/matheusbattisti/curso_adonis_api_yt)
  

## Steps to install and run  

1. Run `npm i` to install packages.
2. Find the file `.env.example` in the project and create a copy with name `.env`.
3. Run: `node ace generate:key`.
4. Copy the generated key to file `.env` to property `APP_KEY`.
5. Run: `node ace migration:run` to database initializate.
6. Run: `node ace serve` to run api rest.  

## Populate database with user

While an automatic routine for populating users (as administrator) in the database, optionally either the SqlLite database can be populated manually (the file) or using Postman, just make a `POST` request to

`http://{server}:{port}/api/users`

with the following body:  

    {
		"fullName": "System Administrator",
		"login": "admin",
		"password": "admin"
	}  

# Front-end project  

The repository for the front-end part (made in Angular) of the project can be found at [Moments front](https://github.com/mchomem/moments).