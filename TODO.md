## TODO

# Main objective
- Automatically load more results when scrolling down
- By default order the results by most popular
- Open the specific Spot page when clicking on a SpotGridItem
    - Show a list of spots nearby this spot. 
    - show all related Media. 

## unlock spots 
- login page
- logout button (profile icon menu)
- account page
    - show available credits
    - profile info

12/8/2019
- create plan route button in Infobar
- create css styles for SpotGridItem.unlocked class
- create database join table for users_unlockedspots
- create api for adding and removing database entries from the join table
- pass unlocked data through SpotSearchResponse
    - change Spot typedef on server to support isUnlocked
    - modify query to add isUnlocked property to response
- add unlock button to SpotGridItem
    - create mutation unlockSpot

## adding media
- create a page for adding Media.
- the user should provide a name and description optionally
- let the user select an image and load it automatically after being selected.
- check the contents of the image using Google Cloud Vision API and verify it.
- Location data should be used from the image its exif data
- Footage should be related to a Spot if it exists in close proximity,
Otherwise a new Spot should be created using stills from the image or video.