# Express REST api using File system

## Install the following

```
npm install express
```


## To start the application run

```
npm run dev
```

### The following commands can be run

* GET - The following command will get all the users present
    ```
    http://localhost:3000/users
    ```
    The Following command will give user corresponding to the ID - number
     ```
    http://localhost:3000/users/ID
    ```
    

* POST -- The following command will create a new user or give error if the keys are not valid

    ```
    http://localhost:3000/users
    ```
    
    The following body must be passed as JSON the values can change.     
    ```
        {
            "id": "10",
            "name": "Raj Pandey",
            "profileImage": "assets/images/Raj.png",
            "introduction": "Computer Engineer, Painter, Poet, Reader",
            "profileLink": "https://cs-raj.github.io/pw-2/"
        }
    ```
* DELETE -- This will delete user of the specific ID from the file
     ```
    http://localhost:3000/users/ID
    ```

* PUT -- This will update the user with the given data in the body. The User with specific ID will be modified

     ```
    http://localhost:3000/users/ID
    ```
    
    The following type of payload must be present in body.
    
    ```
        {
            "name": "Raj Pandey",
            "profileImage": "assets/images/Raj.png",
            "introduction": "Computer Engineer, Painter, Poet, Reader",
            "profileLink": "https://cs-raj.github.io/pw-2/"
        }
    ```
