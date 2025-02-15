# Pokémon List App

This is a React Native application that allows users to log in using Firebase, fetch a list of Pokémon from a public API, and manage them between two columns: "Favorites" and "Not Favorites". The app uses Firebase for authentication and the [PokeAPI](https://pokeapi.co/api/v2/pokemon) to retrieve Pokémon data.

## Features Implemented

- **User Authentication**: The app allows users to log in with email and password via Firebase Authentication.
- **Fetching Pokémon Data**: Upon successful login, the app makes an HTTP request to the [PokeAPI](https://pokeapi.co/api/v2/pokemon) to fetch a list of Pokémon.
- **Favorites Management**: The list of Pokémon is displayed in a table with two columns:
  - **Favorites**
  - **Not Favorites**
- **Move Pokémon between Columns**: By clicking the star icon in either column, the user can move it to the opposite column. The Pokémon will be ordered by height in both columns.

## Requirements Fulfilled

1. **Firebase Authentication**:

   - The app uses Firebase Authentication for login via email and password.
   - Users must log in before accessing the Pokémon list.

2. **Fetching Pokémon Data**:

   - After login, the app fetches the Pokémon list from the API at `https://pokeapi.co/api/v2/pokemon`.
   - Each Pokémon's details are fetched from the endpoint `https://pokeapi.co/api/v2/pokemon/:id/`.

3. **Organizing Pokémon by Height**:

   - The fetched Pokémon data is organized by height using a refactored sorting function (originally inefficient) to display the Pokémon in ascending order of height in the table.

4. **Favorites and Not Favorites Columns**:

   - Pokémon are initially shown in the "Not Favorites" column.
   - Users can move Pokémon between columns by clicking on them, which updates the order while maintaining the height-based sorting.

5. **Detail Page**:

   - Clicking on a Pokémon name takes the user to a **Detail Page** that displays the Pokémon’s full information including name, height, weight, and base experience.

6. **Code Structure**:

   - The code is organized following **Hexagonal Architecture**, where:
     - The **domain layer** contains business logic and models.
     - The **infrastructure layer** handles API requests and data fetching.
     - The **application layer** manages UI components and navigation.

7. **UI Styling**:

   - I have used **`react-native-paper`** for styling the app. It provides a consistent and Material Design-compliant UI.

8. **Commit Formatting**:

   - The project follows **Conventional Commits**, ensuring clear and structured commit messages.

9. **Unit Testing**:
   - Unit tests were implemented using **React Native Testing Library**, ensuring application reliability.

## Key Components

- **Authentication**:

  - `FirebaseAuth`: Handles user authentication.
  - `HomeScreen`: Displays the list of Pokémon and handles the logic for moving Pokémon between columns.
  - `PokemonDetailsScreen`: A screen that shows detailed information about a selected Pokémon.

- **Data Handling**:
  - `PokemonRepository`: Handles fetching Pokémon data from the API and organizing it by height.
  - `useFavorites`: A custom context for managing favorite Pokémon.

## How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pokemon-list-app.git
   cd pokemon-list-app
   ```

2. Install dependencies

   ```bash
   yarn install
   ```

3. Start the app
   ```bash
   npm run start
   ```
