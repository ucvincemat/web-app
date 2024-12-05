
# DRG Seed Bank

**Deep Rock Galactic Seed Bank**, or DRG Seed is a database project for cataloging mission seeds for the game, Deep Rock Galactic. It can serve as a pretty good tool for tracking and managing procedural generation data for missions.

## How do you find the seed in-game?

The seed can easily be identified by first going into a mission. Once the map has loaded in, going in the pause menu and looking at the bottom-left part of your screen you will see a whole load of numbers. The top portion is the status and the **Game Version**. Below that is three numbers, **G**, **M**, and **P**, which work together to provide the map generation. You can also see the **Season** next to it, which is important on calculating the *Season Events*.

![G:50279|M:29167|P:13130|S1](https://file.garden/ZggW6kDRARPwyYbT/school%20stuff/image_2024-12-05_201035064.png)

## How do I use DRG Seed Bank?

It is pretty simple.

To **View** Seed Bank:
1. Go to [Render Website](https://drg-seed-bank.onrender.com/).
2. Or.. check [how to run it locally.](#how-do-i-run-drg-seed-bank-locally)

To **Add** Seeds:
1. Click the ``Add New Seed`` button on the top to open up a modal window.
2. Fill in the details of the specific seed you have found.
3. Press `Publish Seed Entry` to confirm.
4. Your data will now be added to the database.

To **Modify** Seeds:
1. Click the ``Edit`` button next to the desired seed you want to modify.
2. The same modal with open and you can edit the details.
3. Press `Publish Seed Entry` to confirm.
4. The data will now be updated in the database.
 
To **Modify** Seeds:
1. Click the ``Delete`` button next to the desired seed you want to delete.
2. Click `Yes` to confirm deletion.
3. The data will now be gone in the database.

## How do I run DRG Seed Bank locally?

1. Clone the repository.
2. Install dependencies: `npm install express sqlite3`.
3. Run the app by typing this command in the directory: `npm start`.
4. This will run it by default in `http://localhost:3000/`.
5. Proceed to catalogue your seeds using the frontend.
6. Your data will be saved and stored on `database.db`.

### Happy seed finding!