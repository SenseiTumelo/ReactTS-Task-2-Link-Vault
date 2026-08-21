# 🔖 Bookmark Manager — React TypeScript

## 📌 Project Overview

This project is the **second official React task** based on React Lesson 2.

The goal of the project is to build a simple **Minimum Viable Product (MVP) bookmark manager** that allows users to save, manage, and search their favourite links.

The application works similarly to the bookmark functionality available in web browsers, but instead of being limited to a single browser, the project demonstrates how bookmark data can be stored and retrieved using the browser's **Local Storage**.

For this MVP, `localStorage` is used as a proof of concept. In a real-world application, the solution could later be extended by connecting it to a backend API and database.

## 🎯 Objective

The objective of this task is to demonstrate an understanding of:

* JavaScript arrays and array manipulation.
* Array methods.
* JavaScript objects and object manipulation.
* React's `useState` hook.
* React components.
* React props.
* React hooks.
* Browser Local Storage.
* JSON objects and JSON methods.
* Responsive web design.

## ✨ Features

The application provides users with the ability to manage their favourite links through a simple and responsive interface.

### 🔗 Link Management

Users can:

* Create and save new links.
* View saved links.
* Edit existing links.
* Delete saved links.

Each bookmark can contain:

* **Title** – The name of the saved link.
* **URL** – The web address.
* **Description** – Additional information about the link.
* **Tags** – Optional tags used to categorise and search bookmarks.

### 🔎 Search

Users can search through their saved bookmarks using:

* Title
* URL / Link
* Description
* Tags

The search functionality dynamically filters the saved bookmarks based on the user's search input.

## 💾 Data Persistence

The application uses the browser's **Local Storage API** to persist bookmark data.

When a user saves, updates, or deletes a bookmark, the application updates the data stored in Local Storage.

JSON methods are used to convert JavaScript objects and arrays into a format that can be stored in Local Storage and then convert the stored data back into usable JavaScript data.

Example:

```typescript
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

const savedBookmarks = JSON.parse(
  localStorage.getItem("bookmarks") || "[]"
);
```

This allows bookmark information to remain available even after the browser page is refreshed.

> **Note:** Local Storage is used only for this MVP and proof of concept. A production application would typically use a backend API and database.

## 🛠️ Technologies Used

* **React** – Building the user interface and reusable components.
* **TypeScript** – Providing static typing and type safety.
* **CSS** – Styling and responsive design.
* **Vite** – Development server and build tool.
* **Local Storage** – Persisting bookmark data in the browser.
* **JavaScript Array Methods** – Filtering, mapping, finding and manipulating bookmark data.
* **JSON** – Serialising and deserialising stored bookmark data.
* **Git & GitHub** – Version control and source-code management.

> **Note:** The project uses **plain CSS** for styling.

## 🧩 React Concepts Used

### Components

The application is divided into reusable React components rather than placing the entire interface inside a single component.

A possible component structure is:

```text
src/
├── assets/
├── components/
│   ├── Header.tsx
│   ├── BookmarkForm.tsx
│   ├── BookmarkList.tsx
│   ├── BookmarkCard.tsx
│   ├── SearchBar.tsx
│   └── EmptyState.tsx
├── types/
│   └── Bookmark.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

The exact structure may vary depending on the implementation.

### Props

Props are used to pass information and functionality between parent and child components.

For example, a bookmark card can receive a bookmark object and callback functions for editing and deleting the bookmark.

```typescript
interface BookmarkCardProps {
  bookmark: Bookmark;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (id: string) => void;
}
```

### State

React's `useState` hook is used to manage application data such as:

* Saved bookmarks
* Form values
* Search terms
* Editing state
* UI states

Example:

```typescript
const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
```

### Array Methods

Array methods are used to manipulate and display bookmark data.

Examples include:

```typescript
map()
filter()
find()
findIndex()
some()
```

For example, searching bookmarks can be implemented using `filter()`:

```typescript
const filteredBookmarks = bookmarks.filter((bookmark) =>
  bookmark.title.toLowerCase().includes(searchTerm.toLowerCase())
);
```

### Objects

Each bookmark is represented as a JavaScript/TypeScript object.

Example:

```typescript
interface Bookmark {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
}
```

A collection of bookmarks is represented as an array of these objects.

## 🔄 CRUD Operations

The application implements the four fundamental CRUD operations.

| Operation  | Description               |
| ---------- | ------------------------- |
| **Create** | Add a new bookmark        |
| **Read**   | Display saved bookmarks   |
| **Update** | Edit an existing bookmark |
| **Delete** | Remove a bookmark         |

### Create

Users can enter bookmark information into the form and save a new bookmark.

### Read

Saved bookmarks are displayed in the application's bookmark list.

### Update

Users can select an existing bookmark and modify its title, URL, description, or tags.

### Delete

Users can remove bookmarks they no longer need.

## 🔎 Search Functionality

The search feature allows users to find bookmarks based on multiple properties.

The application checks the search term against:

```text
Title
URL
Description
Tags
```

This demonstrates the use of array manipulation and filtering techniques in React.

## 📱 Responsive Design

The application is designed to work across different screen sizes:

* 📱 Mobile
* 📲 Tablet
* 💻 Laptop
* 🖥️ Desktop

Responsive CSS techniques are used to ensure that the interface remains easy to use and visually consistent across different devices.

## 🎨 User Interface
![Alt text](/public/ui.JPG)
The interface focuses on:

* Simple navigation
* Clear visual hierarchy
* Easy-to-use bookmark forms
* Readable typography
* Consistent spacing
* Aesthetic colour combinations
* Responsive layouts
* Clear buttons and actions
* User-friendly bookmark cards

The design aims to make adding, searching, editing, and deleting bookmarks straightforward.

## 🚀 Getting Started

### Prerequisites

Before running the project, make sure you have:

* Node.js installed.
* npm installed.
* Git installed.

### Clone the Repository

```bash
git clone https://github.com/SenseiTumelo/ReactTS-Task-2-Link-Vault.git
```

Navigate into the project:

```bash
cd ReactTS-Task-2-Link-Vault
```

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

The application will be available through the local development URL provided by Vite.

## 🏗️ Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🧪 Testing

The application should be tested to ensure that:

* New bookmarks can be created.
* Bookmark information is displayed correctly.
* Existing bookmarks can be edited.
* Bookmarks can be deleted.
* Search works using the title.
* Search works using the URL.
* Search works using the description.
* Search works using tags.
* Data remains available after refreshing the page.
* Empty states are handled correctly.
* The interface works on mobile and desktop screens.
* The application builds successfully without errors.

## 📚 Concepts Covered

This project demonstrates the following concepts:

### 1. Arrays and Array Methods

Used for storing, searching, filtering, mapping, and manipulating bookmarks.

### 2. Objects and Object Methods

Used to represent individual bookmark records and their properties.

### 3. Local Storage

Used to persist bookmark data in the user's browser.

### 4. React Components

Used to divide the application into reusable UI elements.

### 5. React State

Used to manage dynamic application data.

### 6. React Props

Used to pass data and functions between components.

### 7. React Hooks

React hooks such as `useState` are used to manage component state and application behaviour.

### 8. JSON

`JSON.stringify()` and `JSON.parse()` are used when saving and retrieving data from Local Storage.

### 9. Responsive Web Design

CSS media queries and responsive layout techniques are used to support different screen sizes.

## 🔮 Future Improvements

Although this project is an MVP, it can be extended into a more complete bookmark management application.

Potential improvements include:

* User authentication and registration.
* Backend API.
* Database integration.
* Cloud-based bookmark synchronisation.
* User profiles.
* Bookmark categories.
* Advanced tag management.
* Favourite/pinned bookmarks.
* Sorting bookmarks.
* Pagination.
* Import/export bookmarks.
* Dark mode.
* Bookmark preview cards.
* Browser extension integration.
* Sharing bookmarks with other users.

A backend database could replace Local Storage to allow users to access their bookmarks from different devices and browsers.

## 🌐 Deployment

The application can be deployed using services such as:

* GitHub Pages
* Firebase Hosting
* Vercel
* Netlify

### Live Demo

**Live Application:** `<add-your-live-demo-url-here>`

### GitHub Repository

**Repository:** `<add-your-github-repository-url-here>`

## 🎓 Learning Outcomes

After completing this project, the following skills were demonstrated:

* Building React applications with TypeScript.
* Creating reusable React components.
* Managing state with React hooks.
* Passing data using props.
* Working with arrays and objects.
* Using JavaScript array methods.
* Implementing CRUD functionality.
* Working with browser Local Storage.
* Using JSON to persist application data.
* Implementing search and filtering.
* Creating responsive interfaces with CSS.
* Structuring and maintaining a React project.
* Applying front-end development best practices.

## 👨‍💻 Author

**Tumelo Motjopi**

Software Developer | React TypeScript Developer

---

## 📄 License

This project was created for educational purposes as part of the React TypeScript curriculum.
