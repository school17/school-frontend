const picUrl = [
  "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdX7wWCMOvGYD6_4-MthVKf-DjjgLF_GqQzg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTU53EcOIyxE7pOZJBvGHJGbDk39EYxvOhbdw&usqp=CAU",
  "https://i.pinimg.com/originals/43/23/9f/43239f6fe2fddf4316ddb6685861cbb8.jpg"
] 

const getProfilePicUrl = () => {
  const random = Math.random();
  if (random < 0.20) {
    return picUrl[0]
  }

  else if (random < 0.40) {
    return picUrl[1]
  }
  else if (random < 0.80) {
    return picUrl[2]
  }
  else if (random < 0.80) {
    return picUrl[3]
  }
  else if (random < 0.99) {
    return picUrl[4]
  }
}


export default getProfilePicUrl