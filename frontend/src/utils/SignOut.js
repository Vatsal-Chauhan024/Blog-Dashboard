export const SignOut = async (dispatch, signOutSuccess) => {
    try {
        const res = await fetch("/api/user/signout", {
          method: "POST"
        })
        if(!res.ok){
          console.log(data.message)
        }
        else {
          dispatch(signOutSuccess())
        }
      } catch (error) {
        console.log(error.message)
      }
}