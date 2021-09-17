Movie_Service :

There two endpoints :
1 POST /movies

  http://localhost:3000/movies

  - Creates the movie by title of movie, example:

 	{
    	"title": "marvel"
	}

  - User must be authorized and have 'role'
  - Basic role can create 5 per month , after 5 gets message :
	  {
   		"youRole": "Your role is basic. Please, change Premium"
	  }
  - Premium role creates unlimited

2 GET /movies

  http://localhost:3000/movies

  - return all created movies by an authorized user.

-------------------------------------------------------------------------------------


Used DB :

Here used simple light 'nedb' database. Github for db : https://github.com/louischatriot/nedb


-------------------------------------------------------------------------------------


