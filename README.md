# FullstackPart3
 This is for the exercies of the part 3 of que Fullstack Open course

### Exercises 3.1.-3.6. 

**NB:** It's recommended to do all of the exercises from this part into a new dedicated git repository, and place your source code right at the root of the repository. Otherwise, you will run into problems in exercise 3.10.

**NB:** Because this is not a frontend project and we are not working with React, the application **is not created** with create vite@latest -- --template react. You initialize this project with the _npm init_ command that was demonstrated earlier in this part of the material.

**NB:** Because the "node_modules" is created using "npm init", it will not be excluded when you are trying to add your code to git using "git add .", therefore please create a file called ".gitignore" and write "node_modules" so that git ignores it everytime you try to add, commit or push to a remote repo.

**Strong recommendation:** When you are working on backend code, always keep an eye on what's going on in the terminal that is running your application.

#### 3.1: Phonebook backend step 1 *Done*

Implement a Node application that returns a hardcoded list of phonebook entries from the address [http://localhost:3001/api/persons](http://localhost:3001/api/persons).

Data:

```js
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
```

Output in the browser after GET request:

![JSON data of 4 people in browser from api/persons](https://fullstackopen.com/static/b9a0a7eece81829541c485fdd078f25a/5a190/22e.png)

Notice that the forward slash in the route _api/persons_ is not a special character, and is just like any other character in the string.

The application must be started with the command _npm start_.

The application must also offer an _npm run dev_ command that will run the application and restart the server whenever changes are made and saved to a file in the source code.