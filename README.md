# Phonebook Frontend
## Description
This is the frontend of the Phonebook application. It was initially developed with data stored in local state but was later integrated with a backend based on Node.js and Express, Whitch uses a MongoDB database.

## Features
1. **Add Names**
	- A simple application was created to add names to the phonebook.
	- Local state is used to store the entered names.
2. **Prevent Duplicate Names**
	- A validation was implement to prevent adding a name that already exists.
	- An alert is displayed to the user in case of duplicates.
3. **Add Phone Numbers**
	- The functionality was expanded to include phone numbers along with names.
	- A new field was added to the form for entering the number.
4. **Search and Filtering**
	- A search field was added to filter names in the phonebook
	- The search is case-insensitive
5. **Refactoring into Components**
	- The application was divided into reusable componentes:
		- **Filter:** Search field.
		- **PersonForm:** Form for adding new contacts.
		- **Persons:** List of contacts
6. **Integration with JSON Server**
	- A `json-server` was configured to handle persistent data in the local backend.
	- Initial data is now retrieved via an HTTP request using `axios` and `useEffect`.
7. **Data Persistence in Backend**
	- The functionality to save new contacts in the backend was implemented.
8. **Services Module**
	- The code was refactored to handle HTTP requests in a separete module (`services/persons.js`)
9. **Delete Contacts**
	- A button was added to delete contacts.
	- `window.confirm` is used to confirm the action before deletion.
10. **Edit Contacts**
	- Users can modify a phone number if the contact already exist.
	- Confirmation is requested before making changes.
11. **Status Notifications**
	- A notification message was added to indicate the success or failure of an operation.
	- The message automatically disappears after a few seconds.
	- Display an error message when a validation error occurs.
	- Errors returned by Mongoose are now shown in the UI
12. **Concurrency Error Handling**
	- Detects if a contact has already been deleted in another instance of the application.
	- Displays an error message if the operation fails due to outdated data.
## Installation and Usage
### Requirements
- Node.js installed
- A backend running on the same network or locally
### Installation
Clone the repository:
```sh
git clone <REPO_URL>
cd phonebook-frontend
```
Install dependencies:
```sh
npm install
```
### Configuration
Create a `.env` file and add the backend URL:
```sh
REACT_APP_BACKEND_URL=http://localhost:3001
```
### Execution
Start the application in development mode:
```sh
npm start
```
## Author
Diego Zapata
Project developed as part of the **Full Stack Open** course.
