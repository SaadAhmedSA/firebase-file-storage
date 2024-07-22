import {storage,ref, getDownloadURL,uploadBytesResumable} from "./firebase.js";


let btn = document.getElementById("upload")
let imge = document.getElementById("image")


const file = document.getElementById("input")
btn.addEventListener("click", async()=>{

  const url = await uploadto(file.files[0])
 
  console.log("url---",url);
})

file.addEventListener("change",(e)=>{
  imge.src=URL.createObjectURL(e.target.files[0])
})


const uploadto =(file)=>{
  // let file = document.getElementById("input")
  return new Promise ((resolve,reject)=>{
    const storageRef = ref(storage, `Student/234d5432/`);
    const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    reject(error)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      resolve(downloadURL);
    });
  }
);
  })
}

