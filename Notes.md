<!-- Pass is the highest comp. and renders Auth
index.js (renders Pass)
Pass renders Auth (extra layer?)
Auth is where user starts out as false; when the user logs in, they are set to true; if true, render (GiftStorm) app
GiftStorm renders NavBar and App
App is the main hub (have an isLoaded that is always the last thing to make sure everything renders in time)
Friends is highest level for Friends
- renders FriendList, FOccasions, etc.



On the higher component rendering cards (the one with the game id), add a "currentlyEditing" empty string (which will ultimately receive an obejct)

In Rachel's Friends.js:
  state = {
    addModal: false,
    editModal: false,
    friendOccasions: [],
    userOccasions: [],
    isLoaded: false,
    currentlyEditing: "",
    notTracking: []
  }
  toggleAdd = (e) => {
    return this.setState({
      addModal: !this.state.addModal,
    })
  }

  toggleEdit = (friend) => {
    return new Promise((resolve) => {
      this.setState({
        editModal: !this.state.editModal,
        currentlyEditing: friend
      }, () => resolve())
    })
  }

  You need something like a toggleEdit

  The edit functionality needs to grab the key of the item that contains the "edit" link (which you can assign when you map over the database). Also, toggleEdit values needs to be reset. 
  
  use defaultValue with autofocus. -->